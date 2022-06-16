import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { lendingPoolList } from '../constants/lend/pools';
import { farmPools } from '../constants/farm';
import {
  getLendingPoolInfo, getTokenPrice, FranciumFarm, getOrcaLPPrice,
  getRaydiumLPPrice, getUserRewardPosition, getLendingPoolBalance
} from '../model';
import BigNumber from 'bignumber.js';
import { formatFarmUserPosition, formatFarmUserPositionByPrice } from '../utils/formatters/farm';
import { aprToApy, getAmountByDecimals } from '../utils/math';
import { find } from 'lodash';
import * as BN from 'bn.js';
import buildFarmTransactions from '../model/farm/farm';
import buildWithdrawTransactions from '../model/farm/withdraw';
import { send2TransactionsListOneByOneWithErrorCatch, sendWalletTransaction } from '../utils/sign';
import { deposit } from '../model/lend/deposit';
import { withdraw } from '../model/lend/withdraw';

export class FranciumSDK {
  public connection: Connection;
  public farmHub: FranciumFarm;
  private farmPools: any[];
  private getTokenPrice: () => Promise<{
    [token: string]: number
  }>;
  public tokenPrice;
  public tokenPriceOnChain: {
    [token: string]: number
  } = {
      USDT: 1,
      USDC: 1
    };

  constructor(config: {
    connection: Connection;
    getTokenPrice?: () => Promise<{
      [token: string]: number
    }>;
  }) {
    this.connection = config.connection;
    this.farmHub = new FranciumFarm({ connection: this.connection });
    this.farmPools = farmPools.filter(i => i.version > 2);
    this.getTokenPrice = config.getTokenPrice;
  }

  public updateConnection(connection: Connection) {
    this.connection = connection;
    this.farmHub.connection = connection;
  }

  public async getLendingDepositTransaction(
    pool: string,
    amount: BN,
    userPublicKey: PublicKey,
    configs: {
      noRewards?: boolean;
    }
  ) {
    const { trx, signers } = await deposit(
      this.connection,
      new BigNumber(amount.toString()).toNumber(),
      pool,
      userPublicKey,
      configs
    );
    return {
      trx,
      signers
    };
  }

  public async getLendWithdrawTransaction(
    pool: string,
    rewardAmount: number,
    tokenAmount: number,
    userPublicKey: PublicKey,
    configs: {
      noRewards?: boolean;
    }
  ) {
    const { trx, signers } = await withdraw(
      this.connection,
      rewardAmount,
      tokenAmount,
      pool,
      userPublicKey,
      configs
    );
    return {
      trx,
      signers
    };
  }

  public async getFarmTransactions(
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    configs: {
      depositPcAmount: BN,
      depositCoinAmount: BN,
      borrowPcAmount: BN,
      borrowCoinAmount: BN,
      stopLoss?: number,
      currentUserInfoAccount?: PublicKey
    }
  ) {
    return buildFarmTransactions(
      this.connection,
      pair,
      lyfType,
      userPublicKey,
      this.farmHub,
      {
        amount0: configs.depositPcAmount,
        amount1: configs.depositCoinAmount,
        borrow0: configs.borrowPcAmount,
        borrow1: configs.borrowCoinAmount,
        stopLoss: configs.stopLoss || 80,
        currentUserInfoAccount: configs.currentUserInfoAccount
      }
    );
  }

  public getFarmSwapPoolId(pair: string, platform: string) {
    return this.farmHub.getSwapPoolId(pair, platform);
  }

  public async getClosePositionTransactions(
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    configs: {
      lpShares: BN;
      withdrawType: number;
      currentUserInfoAccount: PublicKey;
    }
  ) {
    return buildWithdrawTransactions(
      this.connection,
      pair,
      lyfType,
      userPublicKey,
      this.farmHub,
      {
        lpShares: new BigNumber(configs.lpShares.toString()),
        withdrawType: configs.withdrawType,
        currentUserInfoAccount: configs.currentUserInfoAccount
      }
    );
  }

  public async sendSingleTransaction(
    trx: Transaction,
    wallet: any,
    signers?: Keypair[]
  ) {
    return sendWalletTransaction(
      trx,
      this.connection,
      wallet,
      signers
    );
  }

  public async sendMultipleTransactions(
    trxs: Transaction[],
    wallet: any,
    onTrxSended?: (index: number, txid: string) => void,
    onTrxConfirmed?: (index: number, txid: string, stateInfo?: { state: string, msg: string, total?: number }) => void,
  ) {
    return send2TransactionsListOneByOneWithErrorCatch(
      trxs,
      this.connection,
      wallet,
      onTrxSended,
      onTrxConfirmed
    );
  }

  public async getTokenPriceInfo() {
    const tokenPriceFunc = this.getTokenPrice || getTokenPrice;
    let tokenPrice = {
      USDT: 1,
      USDC: 1
    } as any;
    try {
      tokenPrice = await tokenPriceFunc();
      this.tokenPrice = tokenPrice;
    } catch (err) {

    }
    this.tokenPrice = tokenPrice;
    return {
      tokenPrice
    };
  }

  public async getOnchainPriceList() {
    await this.getFarmLPPriceInfo();
    return this.tokenPriceOnChain;
  }

  public async getFarmLPPriceInfo() {
    const priceList = {
      USDT: 1,
      USDC: 1
    };
    const orcaLPPriceInfo = await getOrcaLPPrice(this.connection, priceList);
    const raydiumLPPriceInfo = await getRaydiumLPPrice(this.connection, priceList);

    this.tokenPriceOnChain = priceList;
    return { ...orcaLPPriceInfo, ...raydiumLPPriceInfo };
  }

  public async getLendingPoolInfo() {
    const lendingPoolInfos = await getLendingPoolInfo(this.connection, lendingPoolList);
    return lendingPoolInfos;
  }

  public async getFarmPoolInfo() {
    const farmPoolInfos = await this.farmHub.getFarmPoolsInfo(this.farmPools);
    return farmPoolInfos;
  }

  public async getUserFarmPositionByProgram(userPublicKey: PublicKey) {
    const infos = await this.farmHub.getUserPositionsAll(userPublicKey);
    return infos;
  }

  public async getUserFarmPosition(userPublicKey: PublicKey) {
    const farmInfo = await this.getFarmPoolInfo();
    const infos = await this.farmHub.getUserPositionsAll(userPublicKey);
    const raydiumInfos = infos.raydium;
    const orcaInfos = infos.orca;

    const strategyAccountPools = this.farmPools.map(i => {
      const targetFarmInfo = this.farmHub.getConfig(i.pair, i.lyfType || 'raydium');
      return {
        strategyAccount: targetFarmInfo.strategyAccount,
        pool: i
      };
    });

    const formattedUserInfos = [...raydiumInfos, ...orcaInfos].map(i => {
      const poolStrategyInfoAccount: PublicKey = i.data.strategyStateAccount;
      const targetPool = find(strategyAccountPools, target => {
        return target.strategyAccount.toBase58() === poolStrategyInfoAccount.toBase58();
      });
      const targetPoolInfo = find(farmInfo, target => {
        return target.strategyAccount.toBase58() === poolStrategyInfoAccount.toBase58();
      });
      return {
        ...(targetPool?.pool || {}),
        userinfo: i.data,
        userInfoPublicKey: i.publicKey,
        strategyInfo: targetPoolInfo
      };
    });

    const userPositions = formattedUserInfos.filter(
      i => i.strategyInfo
    ).map((info) => {
      if (info) {
        return formatFarmUserPosition(info.strategyInfo, info.userinfo, info.userInfoPublicKey);
      }
      return null;
    });

    return userPositions;
  }

  // can show equity value
  public async getUserFormattedFarmPosition(userPublicKey: PublicKey) {
    const LPPriceList = await this.getFarmLPPriceInfo();
    const farmInfo = await this.getFarmPoolInfo();
    const infos = await this.farmHub.getUserPositionsAll(userPublicKey);
    const raydiumInfos = infos.raydium;
    const orcaInfos = infos.orca;

    const strategyAccountPools = this.farmPools.map(i => {
      const targetFarmInfo = this.farmHub.getConfig(i.pair, i.lyfType || 'raydium');
      return {
        strategyAccount: targetFarmInfo.strategyAccount,
        pool: i
      };
    });

    const formattedUserInfos = [...raydiumInfos, ...orcaInfos].map(i => {
      const poolStrategyInfoAccount: PublicKey = i.data.strategyStateAccount;
      const targetPool = find(strategyAccountPools, target => {
        return target.strategyAccount.toBase58() === poolStrategyInfoAccount.toBase58();
      });
      const targetPoolInfo = find(farmInfo, target => {
        return target.strategyAccount.toBase58() === poolStrategyInfoAccount.toBase58();
      });
      return {
        ...(targetPool?.pool || {}),
        userinfo: i.data,
        userInfoPublicKey: i.publicKey,
        strategyInfo: targetPoolInfo
      };
    });

    const userPositions = formattedUserInfos.filter(
      i => i.strategyInfo
    ).map((info) => {
      if (info) {
        return formatFarmUserPositionByPrice(
          info.strategyInfo, info.userinfo, info.userInfoPublicKey, {
            priceList: this.tokenPriceOnChain,
            LPPriceList
          }
        );
      }
      return null;
    });

    return userPositions;
  }

  // public async getUserFarmPosition(userPublicKey: PublicKey) {
  //   const farmInfo = await this.getFarmPoolInfo();
  //   const userFarmPositions = await this.farmHub.getUserPositions(this.farmPools, userPublicKey);
  //   return userFarmPositions.map((userInfo, index) => {
  //     if (userInfo) {
  //       return formatFarmUserPosition(farmInfo[index], userInfo);
  //     }
  //     return null;
  //   });
  // }

  public async getUserLendingPosition(userPublicKey: PublicKey) {
    const lendingPoolInfos = await this.getLendingPoolInfo();
    const rewardsList = await getUserRewardPosition(this.connection, userPublicKey);
    const balanceList = await getLendingPoolBalance(this.connection, userPublicKey);
    return lendingPoolInfos.map(info => {
      const rewardPosition = rewardsList[info.pool]?.amount || 0;
      const balancePosition = balanceList[info.pool]?.amount || 0;
      const totalPosition = rewardPosition + balancePosition;
      const sharePrice = new BigNumber(info.totalAmount.toString()).dividedBy(new BigNumber(info.totalShareMintSupply.toString())).toNumber();
      return {
        pool: info.pool,
        scale: info.scale,
        rewardPosition,
        balancePosition,
        totalPosition,
        totalAmount: (sharePrice * totalPosition) / 10 ** info.scale
      };
    });
  }

  public async getFarmPoolTVL() {
    const farmLPPrice = await this.getFarmLPPriceInfo();
    const farmPoolInfos = await this.getFarmPoolInfo();
    const pools = farmPoolInfos.map(info => {
      const totalLP = getAmountByDecimals(info.totalLp, info.lpDecimals);
      const price = farmLPPrice[info.priceKey].priceAmm || 0;
      return {
        id: info.id,
        lpAmount: totalLP,
        liquidityLocked: totalLP * price
      };
    });
    return pools;
  }

  public async getLendingPoolTVL() {
    const { tokenPrice } = await this.getTokenPriceInfo();
    const lendingPoolInfos = await this.getLendingPoolInfo();
    const info = lendingPoolInfos.map(info => {
      const availableAmount = info.avaliableAmount;
      const totalAmount = info.totalAmount;
      const price = tokenPrice[info.pool];
      const liquidityLocked = getAmountByDecimals(totalAmount, info.scale) * price;
      const available = getAmountByDecimals(availableAmount, info.scale) * price;
      return {
        id: info.pool,
        apy: info.apy,
        borrowApr: info.borrowInterest,
        liquidityLocked,
        available
      };
    });
    return info;
  }
}