import { PublicKey } from "@solana/web3.js";
import * as BufferLayout from 'buffer-layout';

export interface LendRewardInfo {
  programId: PublicKey;
  farmingPoolAccount: PublicKey;
  farmingPoolAuthority: PublicKey;
  farmingPoolStakeTknMint: PublicKey;
  farmingPoolStakeTknAccount: PublicKey;
  farmingPoolRewardsTknMint: PublicKey;
  farmingPoolRewardsTknAccount: PublicKey;
  farmingPoolRewardsTknMintB: PublicKey;
  farmingPoolRewardsTknAccountB: PublicKey;
}

export const RewardPoolLayout: typeof BufferLayout.Structure = BufferLayout.struct(
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

export const RewardUserLayout: typeof BufferLayout.Structure = BufferLayout.struct(
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

export const lendRewardProgramId = new PublicKey("3Katmm9dhvLQijAvomteYMo6rfVbY5NaCRNq9ZBqBgr6");

export const lendRewardInfo: {
  [x: string]: LendRewardInfo
} = {
  USDC: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('8Eq2XZRQe2EjYiNmu7Lhgb2xVHqJ5wFvcVU6yH3CUn34'),
    farmingPoolAuthority: new PublicKey('4NWwKzVvEfKCsMeauE4cZHRR9K91FsFauxnrW6pK8H2E'),
    farmingPoolStakeTknMint: new PublicKey('62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu'),
    farmingPoolStakeTknAccount: new PublicKey('3yNu5pg2DhtaxZbAwgUSsVnemqMn1WqxnBn6tgKGj7R2'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('34R2ZVwg6uvJWFYjQ2LrrKFFaZ7CgsyZbMKwvfjxkvip'),
    farmingPoolRewardsTknMintB: new PublicKey('EgiD69Uhf8t13CRPKz1btmtHj7SogeEjyPHfnT4d13XN'),
    farmingPoolRewardsTknAccountB: new PublicKey('FGAh5YjdcyzQ841skvGQGWyejK3uPiwpEdtMncJqe7f9')
  },
  PAI: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('2Dp5WMATsyfHtMEkU2JTrffc5onPCLqZFybcYvPAPxNP'),
    farmingPoolAuthority: new PublicKey('7A88TMr5kQpHWidb5w9zeZr4dXMse6DsWTELbLe1WEyV'),
    farmingPoolStakeTknMint: new PublicKey('HDvD8a4VWbkHNG7hb4CBumNhn41DyKL51qVYBNH73o23'),
    farmingPoolStakeTknAccount: new PublicKey('8QaCpnJP61u8qm9ZJYdXgQWGNacoefmU2bDKfmLPHSmE'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('7B2BnzmT779H3KzAn8raQQEcRKSw4GhPPDS657X7NRDs'),
    farmingPoolRewardsTknMintB: new PublicKey('Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS'),
    farmingPoolRewardsTknAccountB: new PublicKey('GGwsqBzz6L7Wvq7ZKdn7yQBCU5qLdqwMfVZZQWp8uYZn')
  },
  RAY: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('9G2EXWwSaqJNgk9AWkx5u6JsUpdCaeh7ZUzsjJsSJkYz'),
    farmingPoolAuthority: new PublicKey('gbPTC9F2tnP9z9xzjeQWjNXBsuHw9ZjkG9NahZ7wDPa'),
    farmingPoolStakeTknMint: new PublicKey('5uZERkJVyhCABEdocEssPZyMXYa8GJpLhngi95yXr9jc'),
    farmingPoolStakeTknAccount: new PublicKey('GKV52HXiEDR8Qqazdp9LA5Aiwjny94v9CavCVAt7TvxS'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('E2S5VGgkvRtjSqj5qxeMKzUhE3XVsyQ2ouNgdNsaNobQ'),
    farmingPoolRewardsTknMintB: new PublicKey('4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'),
    farmingPoolRewardsTknAccountB: new PublicKey('9dvYPm8LjhTrKF3bJ4Lt8YwQqxhxzWWXWGnbqfamNVQK')
  },
  USDT: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('AKi1GE5Xa5boTwNEy4u2PaHqtQBVFcKXVU5oqXFFYST8'),
    farmingPoolAuthority: new PublicKey('CQ83mRhE3AhM1yLiGkgKut1Fsy9dZPmzCjNhLu1vKE8Y'),
    farmingPoolStakeTknMint: new PublicKey('8TtsTZQ6mU4YSW5jw4sDjSDEG1CW8QLpK7C9g5TVgBvn'),
    farmingPoolStakeTknAccount: new PublicKey('CiwYeQcjMyvt7gvkwNAQRq8DEbtAh7J3K3Zrfsb54got'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('9QsFN5L8Ld9aR8FFZ8gTM5euG6us7Rw7QWZUUthptoib'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('BC3GujgFNpbo2rYRfit7Rr3Af769Jo6ApN3vr58BQazw')
  },
  SRM: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('63Xrt9Z5jC3D9pR2RVL2D57z5bspaX6pqdDVW9XnAMU8'),
    farmingPoolAuthority: new PublicKey('D1QkTSH7UaNeCsiTsB5PGF27BAeAwu9TBNiCX4upARzg'),
    farmingPoolStakeTknMint: new PublicKey('6CZhCFwA7hbqDEoVUQdFpHaCGQU7fSSwhaJWdG4DmsQ6'),
    farmingPoolStakeTknAccount: new PublicKey('6E7dXsDkdErDuG4z7ED8knoAR9EFtnKApVvYQyytm1kU'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('gw2RdaKNv8TW7Epvz41vCZZn2AppMRoc9cZXsVtKZ1k'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('gw2RdaKNv8TW7Epvz41vCZZn2AppMRoc9cZXsVtKZ1k')
  },
  ETH: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('7rKAmXDUhqZrzM2nZbM2PxbxsErAjGPxbRgr2fFxQ9Y'),
    farmingPoolAuthority: new PublicKey('FzoCLipUnS18zMvag9ffr3ATPJicrphYZyEZeB9Acp4G'),
    farmingPoolStakeTknMint: new PublicKey('B8QXcUv5FFwyHH5V88g6PhYBc8fQvwSpza4C9PsiRpQD'),
    farmingPoolStakeTknAccount: new PublicKey('BR1gbF7jjcTaXTJfASSm1hz1h7A8My7F4meCgB9dKXwq'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('H1aJwXV3LwEghvPKJpNkjdedH7dmDyDLjrTChtomhJKQ'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('H1aJwXV3LwEghvPKJpNkjdedH7dmDyDLjrTChtomhJKQ')
  },
  SOL: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('G8MpQfTa18RcGK6xdKxKqG3u9NXWwqEMN3YM4MAFSukS'),
    farmingPoolAuthority: new PublicKey('9EkVgtRxTWJWtksC2maF7YJqKyDR45z3PrxmzUMZwGpm'),
    farmingPoolStakeTknMint: new PublicKey('92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB'),
    farmingPoolStakeTknAccount: new PublicKey('5Dwb6bW6nJ7tawnXXuJLRRsHnpDWrsQGMBNePsi2HHNc'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('CRmaS1yBemFcHAooAfRUM41ZCBpnM7FCRKi7x71YXnTj'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('CRmaS1yBemFcHAooAfRUM41ZCBpnM7FCRKi7x71YXnTj')
  },
  mSOL: {
    programId: new PublicKey("3Katmm9dhvLQijAvomteYMo6rfVbY5NaCRNq9ZBqBgr6"),
    farmingPoolAccount: new PublicKey('Hu2QsZ57NHmgKEReXYPfS79amdqyyuxzbwSdxvd1UTwv'),
    farmingPoolAuthority: new PublicKey('7af5t7Ms526TYXEh5Y4nvot6xbWyGaiQnNJf3D9dygsb'),
    farmingPoolStakeTknMint: new PublicKey('4mntRxKJWib1YTWNV4aLfszF6FeziBHdwnNAwGSfKKMX'),
    farmingPoolStakeTknAccount: new PublicKey('39bnyhokuj3RCsLZnZsjbctRtx7rsYV4hQNoxQEKx9xy'),
    farmingPoolRewardsTknMint: new PublicKey('MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey'),
    farmingPoolRewardsTknAccount: new PublicKey('2JEph4UfH6H49fmsYBZg7zSXKTUENszypmPC5qMmefkc'),
    farmingPoolRewardsTknMintB: new PublicKey('MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey'),
    farmingPoolRewardsTknAccountB: new PublicKey('BFBh633oDNn7hV89mA6TSUPGU6JeMdKzXVBHUi3Ab6Yd'),
  }
};