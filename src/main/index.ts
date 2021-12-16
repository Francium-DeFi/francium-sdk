import { Connection, PublicKey } from "@solana/web3.js";
import { lendingPoolList } from "../constants/lend/pools";
import { farmPools } from "../constants/farm";
import {
  getLendingPoolInfo, getTokenPrice, FranciumFarm, getOrcaLPPrice,
  getRaydiumLPPrice, getUserRewardPosition, getLendingPoolBalance
} from "../model";
import BigNumber from 'bignumber.js';
import { formatFarmUserPosition } from "../utils/formatters/farm";
import { aprToApy, getAmountByDecimals } from "../utils/math";

export class FranciumSDK {
  public connection: Connection;
  public farmHub: FranciumFarm;
  private farmPools: any[];
  private getTokenPrice: () => Promise<{
    [token: string]: number
  }>;
  public tokenPrice;

  constructor(config: {
    connection: Connection;
    getTokenPrice?: () => Promise<{
      [token: string]: number
    }>;
  }) {
    this.connection = config.connection;
    this.farmHub = new FranciumFarm({ connection: this.connection});
    this.farmPools = farmPools.filter(i => i.version > 2);
    this.getTokenPrice = config.getTokenPrice;
  }

  public async getTokenPriceInfo() {
    const tokenPriceFunc = this.getTokenPrice || getTokenPrice;
    const tokenPrice = await tokenPriceFunc();
    this.tokenPrice = tokenPrice;
    return {
      tokenPrice
    };
  }

  public async getFarmLPPriceInfo() {
    // if (!this.tokenPrice) {
    await this.getTokenPriceInfo();
    // }
    const orcaLPPriceInfo = await getOrcaLPPrice(this.connection,this.tokenPrice);
    const raydiumLPPriceInfo = await getRaydiumLPPrice(this.connection, this.tokenPrice);
    return {...orcaLPPriceInfo, ...raydiumLPPriceInfo};
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
    console.log(infos);
    return infos;
  }

  public async getUserFarmPosition(userPublicKey: PublicKey) {
    const farmInfo = await this.getFarmPoolInfo();
    const userFarmPositions = await this.farmHub.getUserPositions(this.farmPools, userPublicKey);
    return userFarmPositions.map((userInfo, index) => {
      if (userInfo) {
        return formatFarmUserPosition(farmInfo[index], userInfo);
      }
      return null;
    });
  }

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

  public async getLendingPoolTVL () {
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