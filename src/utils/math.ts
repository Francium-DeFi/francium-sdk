import { BN } from "@project-serum/anchor";
import BigNumber from "bignumber.js";

export function getAmountByDecimals(amount: BN | BigNumber, decimals: number) {
  return new BigNumber(amount.toString()).dividedBy(new BigNumber(10 ** decimals)).toNumber();
}

export function getAprInfo(utilization: number, config: {
  threshold1: number;
  threshold2: number;
  base1: number;
  factor1: number;
  base2: number;
  factor2: number;
  base3: number;
  factor3: number;
}) {
  const {
    threshold1, threshold2,
    base1, factor1,
    base2, factor2,
    base3, factor3
  } = config;
  let borrowInterest = 0;
  if (utilization > 0 && utilization <= threshold1 / 100) {
    borrowInterest = base1 / 100 + (factor1 / 100 * utilization);
  } else if (utilization > threshold1 / 100 && utilization <= threshold2 / 100) {
    borrowInterest = base2 / 100 + (factor2 / 100 * (utilization - threshold1 / 100));
  } else if (utilization > threshold2 / 100){
    borrowInterest = base3 / 100 + (factor3 / 100 * (utilization - threshold2 / 100));
  }
  const apr = utilization * borrowInterest * 100;
  const apy = aprToApy(apr / 100) * 100;
  return {
    borrowInterest: borrowInterest * 100,
    apr,
    apy
  };
}

export function aprToApy(apr: number, n: number = 365) {
  return (1 + apr / n) ** n - 1;
}