import * as BN from "bn.js";

export function formatFarmUserPosition(poolInfo: any, userInfo: any) {
  const totalLP = poolInfo?.totalLp;
  const totalShares = poolInfo?.totalShares;
  const userShares = userInfo?.lpShares;
  const userLP: BN = totalShares.toNumber() === 0 ? 0 : userShares.mul(totalLP).div(totalShares);
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
    priceKey: poolInfo.priceKey,
    lpDecimals: poolInfo.lpDecimals,
    borrowed: [
      {
        symbol: poolInfo.token0,
        amount: userBorrowed0
      },
      {
        symbol: poolInfo.token1,
        amount: userBorrowed1
      }
    ]
  };
}