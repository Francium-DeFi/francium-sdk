import { Connection } from "@solana/web3.js";
import * as BN from 'bn.js';
import { forEach, map, find } from "lodash";
import { OpenOrders } from "@project-serum/serum";
import { ACCOUNT_LAYOUT, MINT_LAYOUT, AMM_INFO_LAYOUT_V4 } from "../../constants/price/layout";
import { RAYDIUM_FARM_CONFIG, SERUM_PROGRAM_ID_V3 } from "../../constants/farm/raydium/info";
import { getTokenDecimals, splitMultipleAccountsInfo } from "../../utils/tools";
import { getAmountByDecimals } from "../../utils/math";
import { BaseLPInfo, FormatLPInfo } from "./types";
import { legacyInfoList } from '../../constants/farm/raydium/legacy';
import BigNumber from "bignumber.js";
import { updatePrice } from "./orca";

const list = { ...RAYDIUM_FARM_CONFIG, ...legacyInfoList };

export async function getRaydiumLPInfo(connection: Connection) {
  const publicKeys = [] as any;

  const poolInfo: {
    [pool: string]: BaseLPInfo
  } = {};

  map(list, (value, poolKey) => {
    const raydiumInfo: any = value.raydiumInfo;
    const key = (value as any)?.alias || poolKey;
    const {
      ammOpenOrders,
      ammId,
      lpDecimals
    } = raydiumInfo;

    // format
    const ammPcAccount = raydiumInfo.ammUsdcAccount || raydiumInfo.ammPcAccount;
    const ammCoinAccount = raydiumInfo.ammTknAccount || raydiumInfo.ammCoinAccount;
    const lpMintAccount = value.lpMint;

    publicKeys.push(
      {
        key: 'ammTknAccount',
        pool: key,
        value: ammCoinAccount
      },
      {
        key: 'ammUsdcAccount',
        pool: key,
        value: ammPcAccount
      },
      {
        key: 'ammOpenOrders',
        pool: key,
        value: ammOpenOrders
      },
      {
        key: 'ammId',
        pool: key,
        value: ammId
      },
      {
        key: 'lpMintAccount',
        pool: key,
        value: lpMintAccount
      }
    );

    const [token1, token0] = poolKey.split('-');

    poolInfo[key] = {
      pcToken: token0,
      pcAmount: new BN(0),
      coinToken: token1,
      coinAmount: new BN(0),
      lpTotalSupply: new BN(0),
      lpDecimals: lpDecimals || 6
    };
  });

  const keysList = publicKeys.map(i => i.value);

  // getMultipleAccountsInfo MAX is 100; 
  const multipleInfo = await splitMultipleAccountsInfo(connection, keysList);

  multipleInfo.forEach((info, index) => {
    if (info) {
      const address = keysList[index].toBase58();
      const data = Buffer.from(info.data);

      const targetKeys = find(publicKeys, i => i.value.toBase58() === address);
      if (targetKeys) {
        switch (targetKeys.key) {
          case 'ammTknAccount': {
            const parsed = ACCOUNT_LAYOUT.decode(data);
            poolInfo[targetKeys.pool].coinAmount =
              poolInfo[targetKeys.pool].coinAmount.add(new BN(parsed.amount.toString()));
            break;
          }
          case 'ammUsdcAccount': {
            const parsed = ACCOUNT_LAYOUT.decode(data);
            poolInfo[targetKeys.pool].pcAmount =
              poolInfo[targetKeys.pool].pcAmount.add(new BN(parsed.amount.toString()));
            break;
          }
          case 'ammOpenOrders': {
            const OPEN_ORDERS_LAYOUT = OpenOrders.getLayout(SERUM_PROGRAM_ID_V3);
            const parsed = OPEN_ORDERS_LAYOUT.decode(data);
            const { baseTokenTotal, quoteTokenTotal } = parsed;
            poolInfo[targetKeys.pool].coinAmount =
              poolInfo[targetKeys.pool].coinAmount.add(new BN(baseTokenTotal.toString()));
            poolInfo[targetKeys.pool].pcAmount =
              poolInfo[targetKeys.pool].pcAmount.add(new BN(quoteTokenTotal.toString()));
            break;
          }
          case 'ammId': {
            const parsed = AMM_INFO_LAYOUT_V4.decode(data);

            const { needTakePnlCoin, needTakePnlPc } = parsed;
            poolInfo[targetKeys.pool].coinAmount =
              poolInfo[targetKeys.pool].coinAmount.sub(new BN(needTakePnlCoin.toString()));
            poolInfo[targetKeys.pool].pcAmount =
              poolInfo[targetKeys.pool].pcAmount.sub(new BN(needTakePnlPc.toString()));
            break;
          }
          case 'lpMintAccount': {
            const parsed = MINT_LAYOUT.decode(data);
            poolInfo[targetKeys.pool].lpTotalSupply =
              poolInfo[targetKeys.pool].lpTotalSupply.add(new BN(parsed.supply.toString()));
            break;
          }
          default:
        }
      }
    }
  });

  return poolInfo;
}


export async function getRaydiumLPPrice(connection: Connection, priceList: {
  [symbol: string]: number
}) {
  const info: {
    [pool: string]: FormatLPInfo
  } = {};
  const raydiumLPInfo = await getRaydiumLPInfo(connection);

  if (!priceList.RAY) {
    updatePrice('RAY', priceList, raydiumLPInfo);
  }

  forEach(raydiumLPInfo, (value, key) => {
    if (value.pcToken === 'USDC' || value.pcToken === 'USDT') {
      if (!priceList[value.coinToken]) {
        updatePrice(value.coinToken, priceList, raydiumLPInfo, {
          LPName: key
        });
      }
    }

    if (value.pcToken === 'stSOL' && value.coinToken === 'BTC') {
      updatePrice(value.coinToken, priceList, raydiumLPInfo, {
        LPName: key,
        pcPrice: priceList?.mSOL,
        pcDecimals: 9
      });
    }
  });


  forEach(list, (value, poolKey) => {
    const key = (value as any)?.alias || poolKey;
    const targetPoolInfo = raydiumLPInfo[key];
    if (targetPoolInfo) {
      const pcPrice = priceList[targetPoolInfo.pcToken];
      const coinPrice = priceList[targetPoolInfo.coinToken];
      const pcDecimals = getTokenDecimals(targetPoolInfo.pcToken);
      const coinDecimals = getTokenDecimals(targetPoolInfo.coinToken);
      const pcAmount = getAmountByDecimals(targetPoolInfo.pcAmount, pcDecimals);
      const coinAmount = getAmountByDecimals(targetPoolInfo.coinAmount, coinDecimals);
      // const lpAmount = getAmountByDecimals(targetPoolInfo.lpTotalSupply, targetPoolInfo.lpDecimals);

      const lpA = new BigNumber(targetPoolInfo.lpTotalSupply.toString());
      const lpAmount = lpA.div(new BigNumber(10 ** targetPoolInfo.lpDecimals)).toNumber();
      const pcPerLP = pcAmount / lpAmount;
      const coinPerLP = coinAmount / lpAmount;

      let price = pcPerLP * pcPrice + coinPerLP * coinPrice;
      const priceAmm = 2 * pcPerLP * pcPrice;
      const coinRelativePrice = pcPerLP / coinPerLP * pcPrice;
      const tvl = getAmountByDecimals(targetPoolInfo.lpTotalSupply, targetPoolInfo.lpDecimals) * priceAmm;

      if (!price) {
        price = priceAmm;
      }

      info[key] = {
        type: 'raydium',
        price,
        priceAmm,
        coinRelativePrice,
        pcPerLP,
        coinPerLP,
        tvl,
        ...targetPoolInfo
      };
    }
  });
  return info;
}