import { BN } from "@project-serum/anchor";

export interface BaseLPInfo {
  pcToken: string;
  pcAmount: BN;
  coinToken: string;
  coinAmount: BN;
  lpTotalSupply: BN;
  lpDecimals: number;
}

export interface FormatLPInfo extends BaseLPInfo {
  price: number;
  pcPerLP: number;
  coinPerLP: number;
}