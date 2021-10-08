import axios from "axios";
import { forEach, map } from "lodash";
import { lyfPubkeyConfig } from "../../constants/farm/raydium/info";

export async function getRaydiumLPPrice() {
  const raydiumLpInfo = {};
  const r = await axios.get('https://api.raydium.io/pairs');
  forEach(lyfPubkeyConfig, (value, key) => {
    const targetPoolInfo = r.data.find((i: { name: string; }) => i.name === key);
    if (targetPoolInfo) {
      raydiumLpInfo[key] = {
        price: targetPoolInfo.price,
        apy: targetPoolInfo.apy 
      }
    }
  });
  return raydiumLpInfo;
}