import axios from "axios";
import { forEach } from "lodash";
import { lyfOrcaPubkeyConfig } from "../../constants/farm/orca/info";
import { getTokenDecimals } from "../../utils/tools";

export async function getOrcaLPPrice(priceInfo: any) {
  const orcaLpInfo = {};
  const r = await axios.get('https://api.orca.so/allPools');
  forEach(lyfOrcaPubkeyConfig, (value, key) => {
    const [tokenA, tokenB] = key.split('-');
    let targetKey = `${key.replace('-', '/')}[aquafarm]`;
    const isUU = key === 'USDC-USDT';
    if (isUU) {
      targetKey = `USDC/USDT[stable][aquafarm]`;
    }
    const targetPoolInfo = r.data[targetKey];
    if (targetPoolInfo) {
      const tokenBDecimal = getTokenDecimals(tokenB);
      const tvl = Number(targetPoolInfo.tokenBAmount) / 10 ** tokenBDecimal * 2 * priceInfo[tokenB];
      const price = tvl / (Number(targetPoolInfo.poolTokenSupply) / 10 ** 6);
      const lpKey = value?.alias || key;
      orcaLpInfo[lpKey] = {
        price: isUU ? 1 : price,
        apy: Number(targetPoolInfo.apy.week || targetPoolInfo.apy.day)
      };
    }
  });
  return orcaLpInfo;
}
