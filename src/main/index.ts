import { Connection, PublicKey } from "@solana/web3.js";
import { lendingPoolList } from "../constants/lend/pools";
import { farmPools } from "../constants/farm";
import {
  getLendingPoolInfo, getTokenPrice, FranciumFarm, getOrcaLPPrice,
  getRaydiumLPPrice, getUserRewardPosition, getLendingPoolBalance
} from "../model";
import * as BN from 'bn.js';
import { formatFarmUserPosition } from "../utils/formatters/farm";

export class FranciumSDK {
  public connection: Connection;
  public farmHub: FranciumFarm;
  private farmPools: any[];
  public tokenPrice;

  constructor(config: {
    connection: Connection;
  }) {
    this.connection = config.connection;
    this.farmHub = new FranciumFarm({ connection: this.connection});
    this.farmPools = farmPools.filter(i => i.version > 2);
  }

  public async getTokenPriceInfo() {
    const tokenPrice = await getTokenPrice();
    this.tokenPrice = tokenPrice;
    return {
      tokenPrice
    }
  }

  public async getFarmLPPriceInfo() {
    if (!this.tokenPrice) {
      await this.getTokenPriceInfo();
    }
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
      const sharePrice = info.totalAmount.toNumber() / info.totalShareMintSupply.toNumber();
      return {
        pool: info.pool,
        scale: info.scale,
        rewardPosition,
        balancePosition,
        totalPosition,
        totalAmount: (sharePrice * totalPosition) / 10 ** info.scale
      }
    });
  }

  public async getFarmPoolTVL() {
    const farmLPPrice = await this.getFarmLPPriceInfo();
    const farmPoolInfos = await this.getFarmPoolInfo();
    const pools = farmPoolInfos.map(info => {
      const totalLP = info.totalLp.div(new BN(10).pow(new BN(info.lpDecimals))).toNumber();
      const price = farmLPPrice[info.priceKey].price || 0;
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
    console.log(tokenPrice);
    const lendingPoolInfos = await this.getLendingPoolInfo();
    const info = lendingPoolInfos.map(info => {
      const availableAmount = info.avaliableAmount;
      const totalAmount = info.totalAmount;
      const price = tokenPrice[info.pool];
      return {
        id: info.pool,
        liquidityLocked: (totalAmount.div(new BN(10).pow(new BN(info.scale))).toNumber()) * price,
        available: (availableAmount.div(new BN(10).pow(new BN(info.scale))).toNumber()) * price
      }
    });
    return info;
  }
}