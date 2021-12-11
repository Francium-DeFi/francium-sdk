import { BN } from "@project-serum/anchor";
// import axios from "axios";
import { forEach } from "lodash";
import { ORCA_FARM_CONFIG } from "../../constants/farm/orca/info";
import { getTokenDecimals } from "../../utils/tools";
import { getAmountByDecimals } from '../../utils/math';
import cacheGet from '../../utils/cacheGet';
import { FormatLPInfo } from "./types";
import { Connection } from "@solana/web3.js";

export async function getOrcaLPPrice(connection: Connection, priceList: {
  [symbol: string]: number
}) {
  const orcaLpInfo: {
    [pool: string]: FormatLPInfo
  } = {};
  const r = await cacheGet('https://api.orca.so/allPools');
  forEach(ORCA_FARM_CONFIG, (value, key) => {
    const [coinToken, pcToken] = key.split('-');
    const targetKey = value?.orcaPoolId || `${key.replace('-', '/')}[aquafarm]`;
    const targetPoolInfo = r.data[targetKey];
    if (targetPoolInfo) {
      const pcDecimals = getTokenDecimals(pcToken);
      const coinDecimals = getTokenDecimals(coinToken);
      const lpDecimals = 6;
      const pcAmount = new BN(targetPoolInfo.tokenBAmount);
      const coinAmount = new BN(targetPoolInfo.tokenAAmount);
      const lpTotalSupply = new BN(targetPoolInfo.poolTokenSupply);
      const lpKey = value?.alias || key;
      const pcCount = getAmountByDecimals(pcAmount, pcDecimals);
      const coinCount = getAmountByDecimals(coinAmount, coinDecimals);
      const lpAmount = getAmountByDecimals(lpTotalSupply, lpDecimals);
      const pcPerLP = pcCount / lpAmount;
      const coinPerLP = coinCount / lpAmount;
      const price = pcPerLP * priceList[pcToken] + coinPerLP * priceList[coinToken];
      let priceAmm = 2 * pcPerLP * priceList[pcToken];      
      let coinRelativePrice = pcPerLP / coinPerLP * priceList[pcToken];

      if (targetKey.includes('stable')) {
        priceAmm = price;
        coinRelativePrice = priceList[coinToken];
      }

      orcaLpInfo[lpKey] = {
        price,
        priceAmm,
        pcToken,
        coinToken,
        pcAmount,
        coinAmount,
        lpDecimals,
        lpTotalSupply,
        pcPerLP,
        coinPerLP,
        coinRelativePrice
      };
    }
  });
  return orcaLpInfo;
}
