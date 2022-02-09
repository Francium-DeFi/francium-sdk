import { Connection, PublicKey } from '@solana/web3.js';
import * as BufferLayout from 'buffer-layout';
import { lendRewardInfo } from '../../constants/lend/rewards';

export const FarmingUserLayout: typeof BufferLayout.Structure = BufferLayout.struct(
  [
    BufferLayout.u8("version"),
    BufferLayout.nu64("staked_amount"),
    BufferLayout.nu64("rewards_debt"),
    BufferLayout.nu64("rewards_debt_b"),
    BufferLayout.blob(32, "farming_pool"),
    BufferLayout.blob(32, "user_main"),
    BufferLayout.blob(32, "stake_token_account"),
    BufferLayout.blob(32, "rewards_token_accont"),
    BufferLayout.blob(32, "rewards_token_account_b"),
    BufferLayout.blob(128, "padding")
  ]
);

export const FarmingPoolLayout: typeof BufferLayout.Structure = BufferLayout.struct(
  [
    BufferLayout.u8("version"),
    BufferLayout.u8("is_dual_rewards"),
    BufferLayout.blob(32, "admin"),
    BufferLayout.blob(32, "token_program_id"),
    BufferLayout.blob(32, "pool_authority"),
    BufferLayout.blob(32, "staked_token_mint"),
    BufferLayout.blob(32, "staked_token_account"),
    BufferLayout.blob(32, "rewards_token_mint"),
    BufferLayout.blob(32, "rewards_token_account"),
    BufferLayout.blob(32, "rewards_token_mint_b"),
    BufferLayout.blob(32, "rewards_token_account_b"),
    BufferLayout.nu64("pool_stake_cap"),
    BufferLayout.nu64("user_stake_cap"),
    BufferLayout.nu64("rewards_start_slot"),
    BufferLayout.nu64("rewards_end_slot"),
    BufferLayout.nu64("rewards_per_day"),
    BufferLayout.nu64("rewards_start_slot_b"),
    BufferLayout.nu64("rewards_end_slot_b"),
    BufferLayout.nu64("rewards_per_day_b"),
    BufferLayout.nu64("total_staked_amount"),
    BufferLayout.nu64("last_update_slot"),
    BufferLayout.blob(16, "accumulated_rewards_per_share"),
    BufferLayout.blob(16, "accumulated_rewards_per_share_b"),
    BufferLayout.blob(128, "padding")
  ]
);

export async function findUserLendRewardAddress(
  userPublicKey: PublicKey,
  userStakeTokenAccount: PublicKey,
  farmingPoolAccount: PublicKey = lendRewardInfo.USDC.farmingPoolAccount,
  programId: PublicKey = lendRewardInfo.USDC.programId
) {
  const [farmInfoPub, nonce] = await PublicKey.findProgramAddress([
    userPublicKey.toBuffer(),
    farmingPoolAccount.toBuffer(),
    userStakeTokenAccount.toBuffer()
  ], programId);
  return farmInfoPub;
}

export async function loadLendRewardUserInfo(connection: Connection, userInfoAccount: PublicKey, programId: PublicKey) {
  const accountInfo = await connection.getAccountInfo(userInfoAccount, 'confirmed');
  if (accountInfo === null) {
    throw new Error('Failed to find account');
  }

  if (!accountInfo.owner.equals(programId)) {
    throw new Error(`Invalid owner: ${JSON.stringify(accountInfo.owner)}`);
  }
  const buf = Buffer.from(accountInfo.data);

  const decodeData = FarmingUserLayout.decode(buf);
  return decodeData;
}
