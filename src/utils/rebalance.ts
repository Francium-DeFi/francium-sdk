interface PositionInfo {
  userEquity: number;
  positionValue: number;
  cryptoAmount: number;
  stableAmount: number;
  cryptoDebt: number;
  stableDebt: number;
  debtRatio: number;
  cryptoPrice: number;
  lastRebalanceIndex?: number;
}

export const SWAP_FEE = 0;
// export const SWAP_FEE = 2.5 / 1000;

export function rebalanceByEquity(
  userEquity: number,
  cryptoPrice: number,
  stableAmount: number,
) {

  let loss = 0;
  if (stableAmount) {
    const prevTotalStableAmount = stableAmount;
  
    const swapAmount = Math.abs(prevTotalStableAmount - userEquity * 3 / 2);
    // console.log(`swap ${swapAmount} USDC`);
    loss = swapAmount * SWAP_FEE;
  }

  // long Info
  const longEquity = (userEquity - loss) / 4;
  const shortEquity = (userEquity - loss) * 3 / 4;

  const longPosition: PositionInfo = {
    userEquity: longEquity,
    positionValue: longEquity * 3,
    cryptoAmount: longEquity * 3 / 2 / cryptoPrice,
    stableAmount: longEquity * 3 / 2,
    cryptoDebt: 0,
    stableDebt: longEquity * 2,
    debtRatio: 2 / 3,
    cryptoPrice
  };

  const shortPosition: PositionInfo = {
    userEquity: shortEquity,
    positionValue: shortEquity * 3,
    cryptoAmount: shortEquity * 3 / 2 / cryptoPrice,
    stableAmount: shortEquity * 3 / 2,
    cryptoDebt: shortEquity * 2 / cryptoPrice,
    stableDebt: 0,
    debtRatio: 2 / 3,
    cryptoPrice
  };
  // console.log('cryptoAmount :>> ', (userEquity - loss) * 3 / 2 / cryptoPrice);
  // console.log('totalValue 2 :>> ', userEquity * 3 - loss);
  return {
    longPosition,
    shortPosition
  };
}
