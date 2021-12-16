import { FranciumSDK } from './main';
import { ORCA_FARM_CONFIG } from './constants/farm/orca/info';
import { RAYDIUM_FARM_CONFIG } from './constants/farm/raydium/info';
import { lendingPools } from './constants/lend/pools';
import { lendRewardInfo } from './constants/lend/rewards';
import { getTokenDecimals, splitMultipleAccountsInfo } from './utils/tools';
import { getAmountByDecimals, getAprInfo } from './utils/math';
import priceConfig from './constants/price';
import { TOKENS } from './constants/tokens';
import { farmPools } from './constants/farm';
import RAYDIUM_FARM_IDL from './constants/farm/raydium/config';
import ORCA_FARM_IDL from './constants/farm/orca/config';

export default FranciumSDK;
export const LENDING_CONFIG = lendingPools;
export const LENDING_REWARD_CONFIG = lendRewardInfo;
export {
  ORCA_FARM_CONFIG,
  RAYDIUM_FARM_CONFIG,
  RAYDIUM_FARM_IDL,
  ORCA_FARM_IDL
};
export const PRICE_CONFIG = priceConfig;
export const TOKENS_LIST = TOKENS;
export const FARM_POOLS_CONFIG = farmPools;
export const utils = {
  getTokenDecimals,
  getAmountByDecimals,
  splitMultipleAccountsInfo,
  getAprInfo
};