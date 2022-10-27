import { Connection, Keypair, PublicKey, Transaction, ParsedInstruction, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { LendInfoItem, lendingPoolList, lendingPools } from '../constants/lend/pools';
import { farmPools } from '../constants/farm';
import {
  getLendingPoolInfo, getTokenPrice, FranciumFarm, getOrcaLPPrice,
  getRaydiumLPPrice, getUserRewardPosition, getLendingPoolBalance
} from '../model';
import BigNumber from 'bignumber.js';
import { formatFarmUserPosition, formatFarmUserPositionByPrice } from '../utils/formatters/farm';
import { aprToApy, getAmountByDecimals } from '../utils/math';
import { find, ceil } from 'lodash';
import * as BN from 'bn.js';
import buildFarmTransactions from '../model/farm/farm';
import buildWithdrawTransactions from '../model/farm/withdraw';
import { buildVersionedTransaction, send2TransactionsListOneByOneWithErrorCatch, sendVersionedTransaction, sendWalletTransaction } from '../utils/sign';
import { SWAP_FEE, rebalanceByEquity } from '../utils/rebalance';
import { getTokenDecimals } from '../utils/tools';
import { deposit } from '../model/lend/deposit';
import { withdraw } from '../model/lend/withdraw';
import { buildRepayTransactions } from '../model/farm/repay';
import { TOKENS_LIST } from '../index';

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
      mintStSol?: boolean;
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

  public async getLendingDepositTransactionV0(
    pool: string,
    amount: BN,
    userPublicKey: PublicKey,
    configs: {
      noRewards?: boolean;
      mintStSol?: boolean;
    }
  ) {
    const { trx, signers } = await deposit(
      this.connection,
      new BigNumber(amount.toString()).toNumber(),
      pool,
      userPublicKey,
      configs
    );
    const targetLendInfo: LendInfoItem = lendingPools[pool];
    const versioned = await buildVersionedTransaction(
      [trx], this.connection, targetLendInfo.lookupTableAddress, userPublicKey
    );

    return {
      trx: versioned,
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

  public async getLendWithdrawTransactionV0(
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
    const targetLendInfo: LendInfoItem = lendingPools[pool];
    const versioned = await buildVersionedTransaction(
      [trx], this.connection, targetLendInfo.lookupTableAddress, userPublicKey
    );
    return {
      trx: versioned,
      signers
    };
  }

  public async getRepayTransactions(
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    configs: {
      amount0: BN;
      amount1: BN;
      currentUserInfoAccount: PublicKey;
    }
  ) {
    return buildRepayTransactions(
      this.connection,
      pair,
      lyfType,
      userPublicKey,
      this.farmHub,
      configs
    );
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

  public async getOneFarmTransaction(
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
    const targetFarmInfo = this.farmHub.getConfig(pair, lyfType);
    const lookupTableAccount = await this.connection.getAddressLookupTable(targetFarmInfo?.lookupTableAddress)
      .then((res) => res.value);
    const blockhash = await this.connection.getLatestBlockhash()
      .then((res) => res.blockhash);
    const trx = await buildFarmTransactions(
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
        currentUserInfoAccount: configs.currentUserInfoAccount,
        useLookupTable: true
      }
    );

    const messageV0 = new TransactionMessage({
      payerKey: userPublicKey,
      recentBlockhash: blockhash,
      instructions: trx[0].instructions, // note this is an array of instructions
    }).compileToV0Message([lookupTableAccount]);

    const transactionV0 = new VersionedTransaction(messageV0);

    return transactionV0;
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
    const { trxs } = await buildWithdrawTransactions(
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
    return trxs;
  }

  public async getOneFarmClosedTransaction(
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    configs: {
      lpShares: BN;
      withdrawType: number;
      currentUserInfoAccount: PublicKey;
    }
  ) {
    const targetFarmInfo = this.farmHub.getConfig(pair, lyfType);
    const lookupTableAccount = await this.connection.getAddressLookupTable(targetFarmInfo?.lookupTableAddress)
      .then((res) => res.value);
    const blockhash = await this.connection.getLatestBlockhash()
      .then((res) => res.blockhash);
    const { trxs } = await buildWithdrawTransactions(
      this.connection,
      pair,
      lyfType,
      userPublicKey,
      this.farmHub,
      {
        lpShares: new BigNumber(configs.lpShares.toString()),
        withdrawType: configs.withdrawType,
        currentUserInfoAccount: configs.currentUserInfoAccount,
        useLookupTable: true
      }
    );
    const messageV0 = new TransactionMessage({
      payerKey: userPublicKey,
      recentBlockhash: blockhash,
      instructions: trxs[0].instructions, // note this is an array of instructions
    }).compileToV0Message([lookupTableAccount]);

    const transactionV0 = new VersionedTransaction(messageV0);

    return transactionV0;
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

  public async sendVersionedTransaction(
    trx: VersionedTransaction,
    wallet: any,
    signers?: Keypair[]
  ) {
    return sendVersionedTransaction(
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
    onTrxConfirmed?: (index: number, txid: string, stateInfo?: { state: string, msg: string, total?: number, signature?: string }) => void,
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
        const type = info.lyfType || 'raydium';
        return {
          type,
          ...formatFarmUserPosition(info.strategyInfo, info.userinfo, info.userInfoPublicKey)
        };
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
        const type = info.lyfType || 'raydium';
        return {
          type,
          ...formatFarmUserPositionByPrice(
            info.strategyInfo, info.userinfo, info.userInfoPublicKey, {
              priceList: this.tokenPriceOnChain,
              LPPriceList
            }
          )
        };
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
      const availableAmountBN = info.avaliableAmount;
      const totalAmountBN = info.totalAmount;
      const price = tokenPrice[info.pool];
      const totalAmount = getAmountByDecimals(totalAmountBN, info.scale);
      const availableAmount = getAmountByDecimals(availableAmountBN, info.scale);
      const liquidityLocked = totalAmount * price;
      const available = availableAmount * price;
      return {
        id: info.pool,
        apy: info.apy,
        borrowApr: info.borrowInterest,
        liquidityLocked,
        available,
        price,
        totalAmount,
        availableAmount
      };
    });
    return info;
  }

  public async getRebalanceInfo(userPublicKey: PublicKey, positionPublicKey: string, leverage = 3) {
    const LPPriceList = await this.getFarmLPPriceInfo();

    const getUserFormattedFarmPosition = async () => {
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
    };

    const positions = await getUserFormattedFarmPosition();

    const positionInfo = positions.find(item => item.userInfoPublicKey.toBase58() === positionPublicKey)
      || positions[0];

    const {
      lpShares,
      lpAmount,
      equityValue: userEquity,
      borrowed,
      priceKey,
      userInfo,
    } = positionInfo;
    const lpInfo = LPPriceList[priceKey];
    const {
      coinToken: token1,
      pcToken: token0,
    } = lpInfo;
    const token1Price = lpInfo.coinRelativePrice;
    const userBorrowed0Amount = getAmountByDecimals(borrowed[0].amount, getTokenDecimals(token0));
    const userBorrowed0Value = userBorrowed0Amount;
    const userBorrowed1Amount = getAmountByDecimals(borrowed[1].amount, getTokenDecimals(token1));
    const userBorrowed1Value = userBorrowed1Amount * token1Price;
    const pcAmount = getAmountByDecimals(
      new BigNumber(lpInfo.pcPerLP).multipliedBy(
        new BigNumber(lpAmount.toNumber())
      ),
      lpInfo.lpDecimals);

    console.log('RebalanceSDK params :>> ', {
      userEquity,
      token1Price,
      pcAmount,
      positionInfo,
      lpInfo,
    });
    const { longPosition, shortPosition } = rebalanceByEquity(
      leverage,
      userEquity,
      token1Price,
      pcAmount,
    );

    const borrowValue0 = longPosition.stableDebt - userBorrowed0Value;
    const borrowValue1 = shortPosition.cryptoDebt * token1Price - userBorrowed1Value;
    // let borrowRatio = borrowValue0 / (borrowValue0 + borrowValue1);
    let token0ToAdd = 0;

    const rebalanceOptions = {
      option1: {} as {
        depositPcAmount: number
        depositCoinAmount: number
        borrowPcAmount: number,
        borrowCoinAmount: number,
        stopLoss: number,
      },
      option2: {} as {
        // withdrawPercent: number
        lpSharesToWithdraw: BigNumber,
        // depositPcAmount: number
        // depositCoinAmount: number
        borrowPcAmountAfterWithdraw?: number
        borrowCoinAmountAfterWithdraw?: number
        stopLoss: number
      }
    };

    if (
      borrowValue0 >= 0 &&
      borrowValue1 >= 0
    ) {
      rebalanceOptions.option1 = {
        depositPcAmount: token0ToAdd,
        depositCoinAmount: 0,
        borrowPcAmount: borrowValue0,
        borrowCoinAmount: borrowValue1 / token1Price,
        stopLoss: userInfo.stopLoss,
      };
    } else {
      addMore();
      updateWithdrawConfig();
    }

    function ceilToken0Amount(num) {
      return ceil(num, getTokenDecimals(token0));
    }

    function addMore() {
      const B = Math.max(2 * userBorrowed0Value, 2 / 3 * userBorrowed1Value);
      const S = pcAmount;
      const S1min = (B + SWAP_FEE * S) / (1 + SWAP_FEE * 3 / 2);
      const S1max = 2 / 3 * S;
      if (S1min <= S1max) {
        const S1 = S1min;
        if (S1 - userEquity > 0) {
          token0ToAdd = ceilToken0Amount(S1 - userEquity);
        }
      }

      const S2min = S1max;
      const S2min2 = (B - SWAP_FEE * S) / (1 - SWAP_FEE * 3 / 2);
      const S2 = Math.max(S2min, S2min2);

      if (S2 - userEquity > 0) {
        token0ToAdd = ceilToken0Amount(S2 - userEquity);
      }

      const { longPosition, shortPosition } = rebalanceByEquity(
        leverage,
        userEquity + token0ToAdd,
        token1Price,
        pcAmount + token0ToAdd,
      );
      const borrowValue0 = longPosition.stableDebt - userBorrowed0Value;
      const borrowValue1 = shortPosition.cryptoDebt * token1Price - userBorrowed1Value;
      // borrowRatio = borrowValue0 / (borrowValue0 + borrowValue1);
      rebalanceOptions.option1 = {
        depositPcAmount: token0ToAdd,
        depositCoinAmount: 0,
        borrowPcAmount: borrowValue0,
        borrowCoinAmount: borrowValue1 / token1Price,
        stopLoss: userInfo.stopLoss,
      };
    }

    function updateWithdrawConfig() {
      const A = userEquity - Math.abs(pcAmount - 3 / 2 * userEquity) * SWAP_FEE;
      const aa = A / 2 / userBorrowed0Value;
      const bb = A * 3 / 2 / userBorrowed1Value;
      const remainPer = Math.min(aa, bb, 1);
      const { longPosition, shortPosition } = rebalanceByEquity(
        leverage,
        userEquity,
        token1Price,
        pcAmount,
      );
      const borrowValue0AfterWithdraw = longPosition.stableDebt - userBorrowed0Value * remainPer;
      const borrowValue1AfterWithdraw = shortPosition.cryptoDebt * token1Price - userBorrowed1Value * remainPer;
      // const borrowRatio = borrowValue0 / (borrowValue0 + borrowValue1);
      const precise = 6;
      const ceiledWithdrawPer = (ceil(1 - remainPer, 6) + 0.01) || 0;
      const lpSharesToWithdraw = new BigNumber(lpShares.toString()).multipliedBy(
        new BigNumber(ceiledWithdrawPer * (10 ** precise))
      ).div(new BigNumber(10 ** precise));
      console.log('lpSharesToWithdraw :>> ', lpShares.toString(), 1 - remainPer, lpSharesToWithdraw.toString());
      rebalanceOptions.option2 = {
        lpSharesToWithdraw,
        borrowPcAmountAfterWithdraw: borrowValue0AfterWithdraw,
        borrowCoinAmountAfterWithdraw: borrowValue1AfterWithdraw / token1Price,
        stopLoss: userInfo.stopLoss,
      };
    }

    return {
      poolInfo: {
        token0,
        token1,
        lyfType: lpInfo.type,
      },
      rebalanceOptions,
    };
  }

  public async getRebalanceTransactions(userPublicKey: PublicKey, positionPublicKey: string) {
    const { poolInfo, rebalanceOptions } = await this.getRebalanceInfo(userPublicKey, positionPublicKey);
    // console.log('getRebalanceTransactions :>> ', rebalanceOptions);
    const {
      token0,
      token1,
      lyfType,
    } = poolInfo;
    const token0Scale = 10 ** getTokenDecimals(token0);
    const token1Scale = 10 ** getTokenDecimals(token1);
    const pair = `${token1}-${token0}`;
    const trxs = await this.getFarmTransactions(
      pair,
      lyfType,
      userPublicKey,
      {
        depositPcAmount: new BN(rebalanceOptions.option1.depositPcAmount * token0Scale),
        depositCoinAmount: new BN(rebalanceOptions.option1.depositCoinAmount * token1Scale),
        borrowPcAmount: new BN(rebalanceOptions.option1.borrowPcAmount * token0Scale),
        borrowCoinAmount: new BN(rebalanceOptions.option1.borrowCoinAmount * token1Scale),
        stopLoss: rebalanceOptions.option1.stopLoss,
        currentUserInfoAccount: new PublicKey(positionPublicKey),
      }
    );
    return trxs;
  }

  public async sendRebalanceTransactions(
    userPublicKey: PublicKey,
    positionPublicKey: string,
    wallet: any,
    onTrxSended?: (index: number, txid: string) => void,
    onTrxConfirmed?: (index: number, txid: string, stateInfo?: { state: string, msg: string, total?: number, signature?: string }) => void,
  ) {
    const walletAddress = userPublicKey.toBase58();
    const { poolInfo, rebalanceOptions } = await this.getRebalanceInfo(userPublicKey, positionPublicKey);
    console.log('rebalanceOptions :>> ', rebalanceOptions);
    const {
      token0,
      token1,
      lyfType,
    } = poolInfo;
    const token0Scale = 10 ** getTokenDecimals(token0);
    const token1Scale = 10 ** getTokenDecimals(token1);
    const pair = `${token1}-${token0}`;

    const sendRebalanceTransactionsOption1 = async () => {
      if (
        !rebalanceOptions.option1.depositPcAmount
        && !rebalanceOptions.option1.depositCoinAmount
      ) {
        const trxs = await this.getFarmTransactions(
          pair,
          lyfType,
          userPublicKey,
          {
            depositPcAmount: new BN(rebalanceOptions.option1.depositPcAmount * token0Scale),
            depositCoinAmount: new BN(rebalanceOptions.option1.depositCoinAmount * token1Scale),
            borrowPcAmount: new BN(rebalanceOptions.option1.borrowPcAmount * token0Scale),
            borrowCoinAmount: new BN(rebalanceOptions.option1.borrowCoinAmount * token1Scale),
            stopLoss: rebalanceOptions.option1.stopLoss,
            currentUserInfoAccount: new PublicKey(positionPublicKey),
          }
        );

        return await this.sendMultipleTransactions(
          trxs,
          wallet,
          onTrxSended,
          onTrxConfirmed,
        );
      }
    };

    const sendRebalanceTransactionsOption2 = async () => {
      // withdraw and then deposit in
      const { closedAccount, trxs: withdrawTrxs } = await buildWithdrawTransactions(
        this.connection,
        pair,
        lyfType,
        userPublicKey,
        this.farmHub,
        {
          lpShares: rebalanceOptions.option2.lpSharesToWithdraw,
          withdrawType: 2, // minimize trading
          currentUserInfoAccount: new PublicKey(positionPublicKey),
        }
      );

      await this.sendMultipleTransactions(
        withdrawTrxs,
        wallet,
        undefined,
        async (index: number, txid: string, stateInfo) => {
          const total = stateInfo?.total;
          const lastIndex = total - 2;
          if (index === lastIndex && txid && stateInfo.state === 'success') {
            const txInfo = await this.connection.getParsedConfirmedTransaction(stateInfo.signature, 'confirmed');
            console.log(`withdraw txInfo ${index}:>> `, txInfo);
            const token0MintAddr = TOKENS_LIST[token0].mintAddress.toBase58();
            const token1MintAddr = TOKENS_LIST[token1].mintAddress.toBase58();
            const token0Before = txInfo?.meta?.preTokenBalances?.find(
              (item) => (item as any).owner === walletAddress && item.mint === token0MintAddr
            )?.uiTokenAmount;
            const token1Before = txInfo?.meta?.preTokenBalances?.find(
              (item) => (item as any).owner === walletAddress && item.mint === token1MintAddr
            )?.uiTokenAmount;
            const token0After = txInfo?.meta?.postTokenBalances?.find(
              (item) => (item as any).owner === walletAddress && item.mint === token0MintAddr
            )?.uiTokenAmount;
            const token1After = txInfo?.meta?.postTokenBalances?.find(
              (item) => (item as any).owner === walletAddress && item.mint === token1MintAddr
            )?.uiTokenAmount;

            let token0Change = (token0Before && token0After) ? new BigNumber(token0After.amount).minus(new BigNumber(token0Before.amount))
              .div(new BigNumber(10 ** token0After.decimals)).toNumber() : 0;
            let token1Change = (token1Before && token1After) ? new BigNumber(token1After.amount).minus(new BigNumber(token1Before.amount))
              .div(new BigNumber(10 ** token1After.decimals)).toNumber() : 0;

            // WSOL => SOL
            console.log('closedAccount :>> ', closedAccount);
            let WSOLChange = 0;
            if (closedAccount) {
              const waitParsed = () => {
                return new Promise(resolve => {
                  const timer = setInterval(() => {
                    const innerInstructionsAllParsed = txInfo?.meta?.innerInstructions?.every(innerInstruction => {
                      return innerInstruction.instructions.every((item: ParsedInstruction) => !item.program || !!item.parsed);
                    });
                    if (innerInstructionsAllParsed) {
                      clearInterval(timer);
                      resolve(1);
                    }
                  }, 50);
                });
              };
              await waitParsed();
              txInfo?.meta?.innerInstructions?.forEach(innerInstruction => {
                innerInstruction.instructions?.forEach((item: ParsedInstruction) => {
                  if (item.parsed?.info?.destination === closedAccount) {
                    WSOLChange = new BigNumber(item?.parsed?.info?.amount).div(new BigNumber(10 ** getTokenDecimals('SOL'))).toNumber();
                  }
                });
              });
              if (token0 === 'SOL') {
                token0Change += WSOLChange;
              }
              if (token1 === 'SOL') {
                token1Change += WSOLChange;
              }
            }
            console.log('balance change:>> ', {
              token0After, token0Before, token1After, token1Before,
              token0Change, token1Change, WSOLChange,
            });
            // if (token0Change || token1Change) {
            //   setReceivedAssets([token0Change, token1Change]);
            // }
            const trxs = await this.getFarmTransactions(
              pair,
              lyfType,
              userPublicKey,
              {
                depositPcAmount: new BN(token0Change * token0Scale),
                depositCoinAmount: new BN(token1Change * token1Scale),
                borrowPcAmount: new BN(rebalanceOptions.option2.borrowPcAmountAfterWithdraw * token0Scale),
                borrowCoinAmount: new BN(rebalanceOptions.option2.borrowCoinAmountAfterWithdraw * token1Scale),
                stopLoss: rebalanceOptions.option2.stopLoss,
                currentUserInfoAccount: new PublicKey(positionPublicKey),
              }
            );
            return await this.sendMultipleTransactions(
              trxs,
              wallet,
              onTrxSended,
              onTrxConfirmed,
            );
          }
        }
      );
    };

    if (
      !rebalanceOptions.option1.depositPcAmount
      && !rebalanceOptions.option1.depositCoinAmount
    ) {
      return sendRebalanceTransactionsOption1();
    } else {
      return sendRebalanceTransactionsOption2();
    }
  }
}
