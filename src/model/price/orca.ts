import { BN } from "@project-serum/anchor";
import axios from "axios";
import { forEach } from "lodash";
import { ORCA_FARM_CONFIG } from "../../constants/farm/orca/info";
import { getTokenDecimals } from "../../utils/tools";
import { getAmountByDecimals } from '../../utils/math';
import { FormatLPInfo } from "./types";
import { Connection } from "@solana/web3.js";

export async function getOrcaLPPrice(connection: Connection, priceList: {
  [symbol: string]: number
}) {
  const orcaLpInfo: {
    [pool: string]: FormatLPInfo
  } = {};
  const r = await axios.get('https://api.orca.so/allPools');
  forEach(ORCA_FARM_CONFIG, (value, key) => {
    const [coinToken, pcToken] = key.split('-');
    let targetKey = value?.orcaPoolId || `${key.replace('-', '/')}[aquafarm]`;
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
      const totalValue = pcCount * 2 * priceList[pcToken];
      const lpAmount = getAmountByDecimals(lpTotalSupply, lpDecimals);
      orcaLpInfo[lpKey] = {
        price: totalValue / lpAmount,
        pcToken,
        coinToken,
        pcAmount,
        coinAmount,
        lpDecimals,
        lpTotalSupply,
        pcPerLP: pcCount / lpAmount,
        coinPerLP: coinCount / lpAmount 
      };
    }
  });
  return orcaLpInfo;
}
