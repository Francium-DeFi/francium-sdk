import { FranciumSDK } from './main';
import { ORCA_FARM_CONFIG } from './constants/farm/orca/info';
import { lendingPools } from './constants/lend/pools';
import { lendRewardInfo } from './constants/lend/rewards';
import { getTokenDecimals } from './utils/tools';
import { getAmountByDecimals } from './utils/math';
import priceConfig from './constants/price';
import { TOKENS } from './constants/tokens';
import { farmPools } from './constants/farm';

export default FranciumSDK;
export const LENDING_CONFIG = lendingPools;
export const LENDING_REWARD_CONFIG = lendRewardInfo;
export {
  ORCA_FARM_CONFIG
};
export const PRICE_CONFIG = priceConfig;
export const TOKENS_LIST = TOKENS;
export const FARM_POOLS_CONFIG = farmPools;
export const utils = {
  getTokenDecimals,
  getAmountByDecimals
};