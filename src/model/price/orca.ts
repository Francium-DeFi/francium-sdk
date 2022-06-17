import { BN } from "@project-serum/anchor";
// import axios from "axios";
import { find, forEach, map } from "lodash";
import { ORCA_FARM_CONFIG } from "../../constants/farm/orca/info";
import { getTokenDecimals, splitMultipleAccountsInfo } from "../../utils/tools";
import { getAmountByDecimals } from '../../utils/math';
import cacheGet from '../../utils/cacheGet';
import { BaseLPInfo, FormatLPInfo } from "./types";
import { Connection, PublicKey } from "@solana/web3.js";
import { AccountLayout, u64, MintLayout } from '@solana/spl-token';
import BigNumber from "bignumber.js";

// export async function getOrcaLPPrice(connection: Connection, priceList: {
//   [symbol: string]: number
// }) {
//   const orcaLpInfo: {
//     [pool: string]: FormatLPInfo
//   } = {};
//   const r = await cacheGet('https://api.orca.so/allPools');
//   forEach(ORCA_FARM_CONFIG, (value, key) => {
//     const [coinToken, pcToken] = key.split('-');
//     const targetKey = value?.orcaPoolId || `${key.replace('-', '/')}[aquafarm]`;
//     const targetPoolInfo = r.data[targetKey];
//     if (targetPoolInfo) {
//       const pcDecimals = getTokenDecimals(pcToken);
//       const coinDecimals = getTokenDecimals(coinToken);
//       const lpDecimals = 6;
//       const pcAmount = new BN(targetPoolInfo.tokenBAmount);
//       const coinAmount = new BN(targetPoolInfo.tokenAAmount);
//       const lpTotalSupply = new BN(targetPoolInfo.poolTokenSupply);
//       const lpKey = value?.alias || key;
//       const pcCount = getAmountByDecimals(pcAmount, pcDecimals);
//       const coinCount = getAmountByDecimals(coinAmount, coinDecimals);
//       const lpAmount = getAmountByDecimals(lpTotalSupply, lpDecimals);
//       const pcPerLP = pcCount / lpAmount;
//       const coinPerLP = coinCount / lpAmount;
//       const price = pcPerLP * priceList[pcToken] + coinPerLP * priceList[coinToken];
//       let priceAmm = 2 * pcPerLP * priceList[pcToken];      
//       let coinRelativePrice = pcPerLP / coinPerLP * priceList[pcToken];

//       if (targetKey.includes('stable')) {
//         priceAmm = price;
//         coinRelativePrice = priceList[coinToken];
//       }

//       orcaLpInfo[lpKey] = {
//         price,
//         priceAmm,
//         pcToken,
//         coinToken,
//         pcAmount,
//         coinAmount,
//         lpDecimals,
//         lpTotalSupply,
//         pcPerLP,
//         coinPerLP,
//         coinRelativePrice
//       };
//     }
//   });
//   return orcaLpInfo;
// }

export function updatePrice(tokenName: string, priceList: {
  [symbol: string]: number
}, LPInfo: {
  [pool: string]: BaseLPInfo
}, config?: {
  LPName?: string;
  pcPrice?: number;
  pcDecimals?: number;
}) {
  const calcPrice = config?.pcPrice || 1;
  const calcDecimals = config?.pcDecimals || 6;
  const lpName = config?.LPName || `${tokenName}-USDC`;
  const info = LPInfo[lpName];
  let price = 0;
  if (info) {
    const tokenAmount = getAmountByDecimals(info.coinAmount, getTokenDecimals(tokenName));
    const pcAmount = getAmountByDecimals(info.pcAmount, calcDecimals);
    price = pcAmount / tokenAmount * calcPrice;
  }
  priceList[tokenName] = price;
  return price;
}

export async function getOrcaLPPrice(connection: Connection, priceList: {
  [symbol: string]: number
}) {
  const keysList = [];
  const LPInfo: {
    [pool: string]: BaseLPInfo
  } = {};
  const info: {
    [pool: string]: FormatLPInfo
  } = {};

  const ORCA_EXTRA_CONFIG = {
    'stSOL-wLDO': {
      alias: null,
      ammInfo: {
        swapTknVault0: new PublicKey('GDprNAcXeR5GVGnCtkS5UqyPGMm2Sy5Lk15qqN36faMT'),
        swapTknVault1: new PublicKey('VCgdcsExfmxUDQwusLP2xqZ3ap7VuYyQMMHDPSva2hx'),
        lpMint: new PublicKey('74B9aMS7SA832xKngt5VLKmWAP3pa3qkUzWncTmQSsGF')
      }
    }
  };

  const TOTAL_CONFIG = {
    ...ORCA_FARM_CONFIG,
    ...ORCA_EXTRA_CONFIG
  };
  
  const formattedConfig = map(TOTAL_CONFIG, (value, key) => {
    const [token1, token0] = key.split('-');
    const poolKey = value?.alias || key;
    keysList.push(value?.ammInfo?.swapTknVault0, value?.ammInfo?.swapTknVault1, value?.ammInfo?.lpMint);
    LPInfo[poolKey] = {
      pcToken: token0,
      pcAmount: new BN(0),
      coinToken: token1,
      coinAmount: new BN(0),
      lpTotalSupply: new BN(0),
      lpDecimals: 6
    };
    return {
      key: value?.alias || key,
      token0Account: value?.ammInfo?.swapTknVault0,
      token1Account: value?.ammInfo?.swapTknVault1,
      lpMint:  value?.ammInfo?.lpMint
    };
  });

  const multipleInfo = await splitMultipleAccountsInfo(connection, keysList);

  multipleInfo.forEach((value, index) => {
    const configIndex = Math.floor(index / 3);
    const poolKey = formattedConfig[configIndex].key;
    // lpMintInfo
    if (index % 3 === 2) {
      const info = MintLayout.decode(value.data);
      LPInfo[poolKey].lpTotalSupply = new BN(u64.fromBuffer(info.supply).toString());
    } else if (index % 3 === 0){
      // token0
      const accountInfo = AccountLayout.decode(value.data);
      const amount = u64.fromBuffer(accountInfo.amount);
      LPInfo[poolKey].pcAmount = new BN(amount.toString());
    } else if (index % 3 === 1) {
      // token1
      const accountInfo = AccountLayout.decode(value.data);
      const amount = u64.fromBuffer(accountInfo.amount);
      LPInfo[poolKey].coinAmount = new BN(amount.toString());
    }
  });

  // get SOL, mSOL, ETH price
  if (!priceList.SOL) {
    updatePrice('SOL', priceList, LPInfo);
  }
  if (!priceList.mSOL) {
    updatePrice('mSOL', priceList, LPInfo);
  }
  if (!priceList.whETH) {
    updatePrice('whETH', priceList, LPInfo);
  }
  if (!priceList.wLDO) {
    updatePrice('wLDO', priceList, LPInfo, {
      LPName: 'stSOL-wLDO',
      pcPrice: priceList.mSOL,
      pcDecimals: 9
    });
  }
  
  forEach(LPInfo, (value, key) => {
    if (value.pcToken === 'USDC') {
      updatePrice(value.coinToken, priceList, LPInfo, {
        LPName: key
      });
    }
  });

  forEach(TOTAL_CONFIG,  (value, key) => {
    const poolKey = (value as any)?.alias || key;
    const targetPoolInfo = LPInfo[poolKey];
    const pcPrice = priceList[targetPoolInfo.pcToken];
    const coinPrice = priceList[targetPoolInfo.coinToken];
    const pcDecimals = getTokenDecimals(targetPoolInfo.pcToken);
    const coinDecimals = getTokenDecimals(targetPoolInfo.coinToken);
    const pcAmount = getAmountByDecimals(targetPoolInfo.pcAmount, pcDecimals);
    const coinAmount = getAmountByDecimals(targetPoolInfo.coinAmount, coinDecimals);

    const lpA = new BigNumber(targetPoolInfo.lpTotalSupply.toString());
    const lpAmount = lpA.div(new BigNumber(10 ** targetPoolInfo.lpDecimals)).toNumber();
    const pcPerLP = pcAmount / lpAmount;
    const coinPerLP = coinAmount / lpAmount;

    let price = pcPerLP * pcPrice + coinPerLP * coinPrice;
    const priceAmm = 2 * pcPerLP * pcPrice;
    const coinRelativePrice = pcPerLP / coinPerLP * pcPrice;

    if (!price) {
      price = priceAmm;
    }

    info[poolKey] = {
      type: 'orca',
      price,
      priceAmm,
      coinRelativePrice,
      pcPerLP,
      coinPerLP,
      ...targetPoolInfo
    };
  });
  return info;
}