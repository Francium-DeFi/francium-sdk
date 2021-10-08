// import { getCoinPriceInfo } from '@/actions/info';
// import { getTokenDecimals } from '@/constants/tokens';
// import store from '@/store';
// import axios from 'axios';
// import { forEach, isEmpty } from 'lodash-es';
// import { lyfOrcaPubkeyConfig } from './info';

// export async function getOrcaLpInfo() {
//   const orcaLpInfo = {};
//   const r = await axios.get('https://api.orca.so/allPools');
//   let priceInfo = store.getState().priceInfo;
//   if (isEmpty(priceInfo)) {
//     priceInfo = await getCoinPriceInfo();
//   }
//   forEach(lyfOrcaPubkeyConfig, (value, key) => {
//     const [tokenA, tokenB] = key.split('-');
//     let targetKey = `${key.replace('-', '/')}[aquafarm]`;
//     const isUU = key === 'USDC-USDT';
//     if (isUU) {
//       targetKey = `USDC/USDT[stable][aquafarm]`;
//     }
//     // console.log(r.data[targetKey]);
//     const targetPoolInfo = r.data[targetKey];
//     if (targetPoolInfo) {
//       const tokenBDecimal = getTokenDecimals(tokenB);
//       const tvl = Number(targetPoolInfo.tokenBAmount) / 10 ** tokenBDecimal * 2 * priceInfo[tokenB];
//       const lpValue = tvl / (Number(targetPoolInfo.poolTokenSupply) / 10 ** 6);
//       const lpKey = value?.alias || key;
//       orcaLpInfo[lpKey] = {
//         lpValue: isUU ? 1 : lpValue,
//         apy: targetPoolInfo.apy.week || targetPoolInfo.apy.day
//       };
//     }
//   });

//   return orcaLpInfo;
// }
