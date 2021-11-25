import { BN } from "@project-serum/anchor";

export function getAmountByDecimals(amount: BN, decimals: number) {
  return amount.div(new BN(10).pow(new BN(decimals))).toNumber()
}

export function getAPRByUtilization(utilization: number) {
  let apr = 0 + 0.25 * utilization;
  if (utilization > 0.6 && utilization < 0.9) {
    apr = 0.15 + 0.25 * (utilization - 0.6);
  } else if (utilization >= 0.9) {
    apr = 0.225 + 13 * (utilization - 0.9);
  }
  return apr;
}

export function aprToApy(apr: number, n: number = 365) {
  return (1 + apr / n) ** n - 1;
}