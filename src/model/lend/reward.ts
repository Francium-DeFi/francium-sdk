import { Connection, PublicKey } from "@solana/web3.js";
import { findAssociatedTokenAddress } from "../../utils/tools";
import { LendingPoolLayout, lendingPools, lendingPoolList } from '../../constants/lend/pools';
import { lendRewardInfo, lendRewardProgramId, RewardPoolLayout, RewardUserLayout } from '../../constants/lend/rewards';
import { toBigIntLE } from 'bigint-buffer';

export const SLOTS_PER_DAY = 160 * 24 * 60 * 60 / 64;

const poolsWithReward = lendingPoolList.filter(i => {
  const info = lendRewardInfo[i.pool];
  return !!info;
})

export async function getRewardPoolInfo(connection: Connection) {
  const accounts = poolsWithReward.map(i => {
    const info = lendRewardInfo[i.pool];
    return info?.farmingPoolAccount;
  });
  const accountInfos = await connection.getMultipleAccountsInfo(accounts, 'confirmed');
  return accountInfos.map(i => {
    const buf = Buffer.from(i.data);
    const decodeData = RewardPoolLayout.decode(buf);
    return decodeData;
  });
}

export async function getUserRewardPosition(connection: Connection, userPublicKey: PublicKey) {
  const infoAccounts = await Promise.all(poolsWithReward.map(async (i) => {
    const info = lendRewardInfo[i.pool];
    const associatedAccount = await findAssociatedTokenAddress(userPublicKey, info.farmingPoolStakeTknMint);
    
    const [rewardInfoAccount] = await PublicKey.findProgramAddress([
      userPublicKey.toBuffer(),
      info.farmingPoolAccount.toBuffer(),
      associatedAccount.toBuffer()
    ], lendRewardProgramId);
    return rewardInfoAccount;
  }));

  const accountInfos = await connection.getMultipleAccountsInfo(infoAccounts, 'confirmed');

  const result = {};

  accountInfos.forEach((i, index) => {
    const buf = Buffer.from(i.data);
    const decodeData = RewardUserLayout.decode(buf);
    const targetPool = poolsWithReward[index];
    result[targetPool.pool] = {
      scale: targetPool.scale,
      amount: decodeData?.staked_amount || 0
    }
  });
  return result;
}

// export async function getUserPendingRewards(
//   connection: Connection,
//   userPublicKey: PublicKey
// ) {
//   const currentSlot = await connection.getSlot();
//   const poolInfoList = await getRewardPoolInfo(connection);
//   const userInfoList = await getUserRewardPosition(connection, userPublicKey);

//   const userAmountList = poolsWithReward.map((i, index) => {
//     const poolInfo = poolInfoList[index];
//     const userInfo = userInfoList[index];
//     if (!poolInfo) {
//       return 0;
//     }
//     if ( currentSlot < poolInfo.rewards_start_slot
//       || poolInfo.last_update_slot > poolInfo.rewards_end_slot)  {
//       const old_accumulated_rewards_per_share = parseInt( toBigIntLE(poolInfo.accumulated_rewards_per_share).toString(), 10);
//       return (old_accumulated_rewards_per_share  * userInfo.staked_amount / 10 ** 12 - userInfo.rewards_debt);
//     }
  
//     const start = Math.max(poolInfo.last_update_slot, poolInfo.rewards_start_slot);
//     const end = Math.min(currentSlot, poolInfo.rewards_end_slot);
//     const slotsElpased = end - start;
  
//     const old_accumulated_rewards_per_share = parseInt(
//       toBigIntLE(poolInfo.accumulated_rewards_per_share).toString(), 10
//     );
//     const update_accumulated_rewards_per_share = old_accumulated_rewards_per_share +
//       10 ** 12 * slotsElpased * poolInfo.rewards_per_day / SLOTS_PER_DAY / (poolInfo.total_staked_amount);
//     return (update_accumulated_rewards_per_share  * userInfo.staked_amount / 10 ** 12 - userInfo.rewards_debt);
//   });

//   return userAmountList;
// }
