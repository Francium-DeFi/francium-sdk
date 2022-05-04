import { PublicKey } from "@solana/web3.js";
import * as BN from "bn.js";
import { getTokenMintAddress } from "../tools";

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
    userInfo?.borrowed0.mul(poolBorrowRate0).div(userBorrowRate0);
  const userBorrowed1: BN =
    userInfo?.borrowed1.mul(poolBorrowRate1).div(userBorrowRate1);
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