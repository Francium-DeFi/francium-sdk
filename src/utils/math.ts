import { BN } from "@project-serum/anchor";

export function getAmountByDecimals(amount: BN, decimals: number) {
  return amount.div(new BN(10).pow(new BN(decimals))).toNumber()
}