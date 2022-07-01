import { PublicKey } from "@solana/web3.js";
import * as BN from "bn.js";
import { getAmountByDecimals } from "../math";
import { getTokenDecimals, getTokenMintAddress } from "../tools";

export function formatFarmUserPosition(poolInfo: any, userInfo: any, userInfoPublicKey?: PublicKey) {
  const totalLP = poolInfo?.totalLp;
  const totalShares = poolInfo?.totalShares;
  const userShares = userInfo?.lpShares;
  const userLP: BN = totalShares.eq(new BN(0)) ? 0 : userShares.mul(totalLP).div(totalShares);
  const poolBorrowRate0 = poolInfo?.cumulatedBorrowRate0;
  const userBorrowRate0 = userInfo?.cumulatedBorrowRate0;
  const poolBorrowRate1 = poolInfo?.cumulatedBorrowRate1;
  const userBorrowRate1 = userInfo?.cumulatedBorrowRate1;
  const userBorrowed0: BN =
    userInfo?.borrowed0.add(userInfo?.pendingRepay0).mul(poolBorrowRate0).div(userBorrowRate0);
  const userBorrowed1: BN =
    userInfo?.borrowed1.add(userInfo?.pendingRepay1).mul(poolBorrowRate1).div(userBorrowRate1);
  return {
    id: poolInfo.id,
    lpAmount: userLP,
    lpShares: userShares,
    priceKey: poolInfo.priceKey,
    lpDecimals: poolInfo.lpDecimals,
    userInfoPublicKey,
    pcMint: getTokenMintAddress(poolInfo.token0),
    coinMint: getTokenMintAddress(poolInfo.token1),
    borrowed: [
      {
        symbol: poolInfo.token0,
        amount: userBorrowed0,
        mint: getTokenMintAddress(poolInfo.token0)
      },
      {
        symbol: poolInfo.token1,
        amount: userBorrowed1,
        mint: getTokenMintAddress(poolInfo.token1)
      }
    ]
  };
}

export function formatFarmUserPositionByPrice(
  poolInfo: any, userInfo: any, userInfoPublicKey: PublicKey, configs: {
    priceList: any,
    LPPriceList: any
  }
) {
  const totalLP = poolInfo?.totalLp;
  const totalShares = poolInfo?.totalShares;
  const userShares = userInfo?.lpShares;
  const userLP: BN = totalShares.eq(new BN(0)) ? 0 : userShares.mul(totalLP).div(totalShares);
  const poolBorrowRate0 = poolInfo?.cumulatedBorrowRate0;
  const userBorrowRate0 = userInfo?.cumulatedBorrowRate0;
  const poolBorrowRate1 = poolInfo?.cumulatedBorrowRate1;
  const userBorrowRate1 = userInfo?.cumulatedBorrowRate1;
  const decimals0 = getTokenDecimals(poolInfo.token0);
  const decimals1 = getTokenDecimals(poolInfo.token1);
  const token0Price = configs.priceList[poolInfo.token0];
  const token1Price =  configs.priceList[poolInfo.token1];
  const userBorrowed0: BN =
    userInfo?.borrowed0.add(userInfo?.pendingRepay0).mul(poolBorrowRate0).div(userBorrowRate0);
  const userBorrowed1: BN =
    userInfo?.borrowed1.add(userInfo?.pendingRepay1).mul(poolBorrowRate1).div(userBorrowRate1);
  const lpEquity = getAmountByDecimals(userLP, poolInfo?.lpDecimals) * configs.LPPriceList[poolInfo?.priceKey].priceAmm;
  const token0Equity = getAmountByDecimals(userInfo?.tkn0, decimals0) * token0Price;
  const token1Equity = getAmountByDecimals(userInfo?.tkn1, decimals1) * token1Price;
  const totalPositionValue = lpEquity + token0Equity + token1Equity;
  const debtValue = getAmountByDecimals(userBorrowed0, decimals0) * token0Price + getAmountByDecimals(userBorrowed1, decimals1) * token1Price;
  const equityValue = totalPositionValue - debtValue;

  return {
    id: poolInfo.id,
    lpAmount: userLP,
    lpShares: userShares,
    priceKey: poolInfo.priceKey,
    lpDecimals: poolInfo.lpDecimals,
    userInfo,
    userInfoPublicKey,
    pcMint: getTokenMintAddress(poolInfo.token0),
    coinMint: getTokenMintAddress(poolInfo.token1),
    borrowed: [
      {
        symbol: poolInfo.token0,
        amount: userBorrowed0,
        mint: getTokenMintAddress(poolInfo.token0)
      },
      {
        symbol: poolInfo.token1,
        amount: userBorrowed1,
        mint: getTokenMintAddress(poolInfo.token1)
      }
    ],
    totalPositionValue,
    debtValue,
    equityValue
  };
}