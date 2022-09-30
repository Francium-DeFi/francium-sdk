import BigNumber from 'bignumber.js';

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
  dstLeverage: number,
  userEquity: number,
  cryptoPrice: number,
  stableAmount?: number,
) {

  const loss = 0;
  // if (stableAmount) {
  //   const swapAmount = Math.abs(stableAmount - userEquity * dstLeverage / 2);
  //   // console.log(`swap ${swapAmount} USDC`);
  //   loss = swapAmount * SWAP_FEE;
  // }
  const _userEquity = new BigNumber(userEquity);
  const _dstLeverage = new BigNumber(dstLeverage);
  const dstTotalValue = _userEquity.multipliedBy(_dstLeverage).minus(new BigNumber(loss));
  // long Info
  const longEquity = (userEquity - loss) / 4;
  const shortEquity = (userEquity - loss) * 3 / 4;

  const longPosition = {
    // userEquity: longEquity,
    // positionValue: longEquity * 3,
    // cryptoAmount: longEquity * 3 / 2 / cryptoPrice,
    // stableAmount: longEquity * 3 / 2,
    // cryptoDebt: 0,
    stableDebt: longEquity * 2,
    // debtRatio: 2 / 3,
    // cryptoPrice
  };

  const shortPosition = {
    // userEquity: shortEquity,
    // positionValue: shortEquity * 3,
    // cryptoAmount: shortEquity * 3 / 2 / cryptoPrice,
    // stableAmount: shortEquity * 3 / 2,
    cryptoDebt: shortEquity * 2 / cryptoPrice,
    // stableDebt: 0,
    // debtRatio: 2 / 3,
    // cryptoPrice
  };
  // console.log('cryptoAmount :>> ', (userEquity - loss) * 3 / 2 / cryptoPrice);
  // console.log('totalValue 2 :>> ', userEquity * 3 - loss);
  const NSADebtValue = dstTotalValue.div(new BigNumber(2));
  return {
    NSADebtValue,
    SADebtValue: dstTotalValue.minus(_userEquity).minus(NSADebtValue),
    longPosition,
    shortPosition
  };
}
