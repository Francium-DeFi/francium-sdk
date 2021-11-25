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
    farmingPoolRewardsTknMint: new PublicKey('4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'),
    farmingPoolRewardsTknAccount: new PublicKey('9dvYPm8LjhTrKF3bJ4Lt8YwQqxhxzWWXWGnbqfamNVQK'),
    farmingPoolRewardsTknMintB: new PublicKey('4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'),
    farmingPoolRewardsTknAccountB: new PublicKey('9dvYPm8LjhTrKF3bJ4Lt8YwQqxhxzWWXWGnbqfamNVQK'),
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
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('Hu2QsZ57NHmgKEReXYPfS79amdqyyuxzbwSdxvd1UTwv'),
    farmingPoolAuthority: new PublicKey('7af5t7Ms526TYXEh5Y4nvot6xbWyGaiQnNJf3D9dygsb'),
    farmingPoolStakeTknMint: new PublicKey('4mntRxKJWib1YTWNV4aLfszF6FeziBHdwnNAwGSfKKMX'),
    farmingPoolStakeTknAccount: new PublicKey('39bnyhokuj3RCsLZnZsjbctRtx7rsYV4hQNoxQEKx9xy'),
    farmingPoolRewardsTknMint: new PublicKey('MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey'),
    farmingPoolRewardsTknAccount: new PublicKey('2JEph4UfH6H49fmsYBZg7zSXKTUENszypmPC5qMmefkc'),
    farmingPoolRewardsTknMintB: new PublicKey('MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey'),
    farmingPoolRewardsTknAccountB: new PublicKey('BFBh633oDNn7hV89mA6TSUPGU6JeMdKzXVBHUi3Ab6Yd'),
  },
  BTC: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('9LPNrtfkDgNTf7hex7PvufE1KypP54eU6AmStgn5Bo8g'),
    farmingPoolAuthority: new PublicKey('DaB9HtEeWGfH25dFXMbYpxsUkZtqvbxQPjdsoxmpNCHK'),
    farmingPoolStakeTknMint: new PublicKey('2G9iwy9zfLaXB2bFiqSA7YbKEvtAEXVmdvGTF28jQVgg'),
    farmingPoolStakeTknAccount: new PublicKey('DNuEdaUXrYCRpELZssM9t2ZUQ6V4GJiijCEaXRr54Gpp'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('GAeyyaFDBwX7LPSp5oQBRdZDCVUePeaJFDujCVkj5NDV'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('4uL23rEj7fzNCFZ8Bv3SunLhtMamX3nAciYCSdSmAP1R'),
  },
  whETH: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('4LCHfdGYZVkNzmPrVt6LyvzEPyJ9uWgnna9Fm4GU3Mib'),
    farmingPoolAuthority: new PublicKey('GPMxFBWur7UWwpyCbU29jTvWgaoJJKVke2nwd6azJEyQ'),
    farmingPoolStakeTknMint: new PublicKey('Hk8b6i2C7PxFBPdd1TCrGssuZpCDEg4fh8yFuyHNJuJe'),
    farmingPoolStakeTknAccount: new PublicKey('4uW5PiPXRBQmcdU4Sreg1uJmfqBGazeH5ah2MnC1NSDL'),
    farmingPoolRewardsTknMint: new PublicKey("7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"),
    farmingPoolRewardsTknAccount: new PublicKey("9unatyGE1mM46TnWpwhqgr7n176m4pZ8j1vtVhF84i83"),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('7LyyPUnM2MiAH1k8xN8pN2pQJZReCprFKS78e16tweud'),
  },
  weUNI: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('ArRauaQ8xnFMdNdjdJe5vCp1h2v8iWWeHSNjf2dhMGdo'),
    farmingPoolAuthority: new PublicKey('BuujLrfraC8o5c6257Fv5jsWkoWwAn4W66eKb121mU6C'),
    farmingPoolStakeTknMint: new PublicKey('CGj7e1g4ojW1RhSocF8AKWxHFaqCQjK8kBsbHqNB4BxP'),
    farmingPoolStakeTknAccount: new PublicKey('5T5YxRxXbTidTpbcJqVdGu3UBcSc6x2W446tLSEfSEBA'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('3S6kQMUYhGKvXMRM74nsPkhNbx8PrUEsw4NdjJMbaF9K'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('hbh6ziFx6FRWdoRGqtTuRVFwr9i7iXhFNtuN66ufK4B'),
  },
  weSUSHI: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('21WzBAky2CbcmHvrxgyFhCytdF3xQA6YdzWXN7JYk7Ga'),
    farmingPoolAuthority: new PublicKey('GE7jFYgkUc533u1V38Y5hN1icrdAgCTgftHW6q2tu9ZV'),
    farmingPoolStakeTknMint: new PublicKey('EEhiV55jAt5JDpeH3GF4VGrStiPn5gCeWmqffyTp9B4E'),
    farmingPoolStakeTknAccount: new PublicKey('ES5w4AaFNfjartY74tw3dr8XjLc2DLbFpD9qmXagnE83'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('DWy2TzewHtoYw6QEczXvJoDRk6rwNrdyGkSo7t5hTzCM'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('5R1NiQM9U99DzMN21Kx3hYxfQAupEVeQ7tPsmNNa5KVo'),
  },
  SAMO: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('J5vPqifPvVYcYfgwhAkrjFq8xnsJBjFhvSwVpTbpqs5G'),
    farmingPoolAuthority: new PublicKey('3ocZg6J44UVx6gWFC8PuTDumFSsVNh7W8Md3Cf5jXR6P'),
    farmingPoolStakeTknMint: new PublicKey('A9H3fAqkWmRnnFzXXzydZHzyLQdzK5o9dMejCL27tqq8'),
    farmingPoolStakeTknAccount: new PublicKey('7zLG1aWBvgwCgkDEsKHAkPgyuUGxdYPSDUPVoXi4LuVi'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('CYHmcVin4cQzdjcEcAYJki3qQuHMWq2NR15ienvRnXwc'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('GHM6YvgVKuoBEwcaMRJjQ2yEDfyCJg7CcK2eKTZ1k7pn'),
  },
  POLIS: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('9fdYMtX2xuqUTUVFrPR2fegRHh7qakLkXwX1RVw9aTHH'),
    farmingPoolAuthority: new PublicKey('G5BxwBHd1j7KdWbHo2HwZCmEWtXjvQ8uHRVLo2g1cikM'),
    farmingPoolStakeTknMint: new PublicKey('FenVvq6s6S3McD1BCm76Ktz1EvRNCB4qYKGFU76fB7Fj'),
    farmingPoolStakeTknAccount: new PublicKey('GhbQAXhtKt31BTCLdkP92CJJRJ1wDoRnjuSBbVoz4AV2'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('FjFMXsVPA4KJxCx3ARjuTLJH1c6UwMvSHXLVZD5UcnR3'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('AG3sYd5HhxeWQ2CSzZsrK6XF6Zg9UXZh4uGUMgDW8VZp'),
  },
  ATLAS: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('DWSsuov4Jgp8d2h5f9vx142tmJMeKBqCwyzgp8YNpXUw'),
    farmingPoolAuthority: new PublicKey('D6VwvNE8Nt4QcotuUVW1as51spadXNVBD9PXidZkvDWq'),
    farmingPoolStakeTknMint: new PublicKey('4mygt5bFQrbXH9gNg75j1KVTrKGhvcYiQjir6FJ8afYH'),
    farmingPoolStakeTknAccount: new PublicKey('2EFNPCYTTy6AoAgUmeQiNNgHRnmP2zQE7pWhH8vvnPCJ'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('DWsBfN9jYzXaJ7CiprCXMbzvSWrmRvWYWSBYU2b84oGe'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('4EGXGVXAwzw4dhQPdTb5qdg9Bas99fNVgt1ZC4nDTJvZ'),
  },
  GENE: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('3EhxTvGjycQSKBY4EFz7MGA5Ke7rf39oUU2nM9qBP6Cj'),
    farmingPoolAuthority: new PublicKey('4hqgkEYCFb736sSpxvrxD5Vvq1m7FdJKzfjinrr7xHSd'),
    farmingPoolStakeTknMint: new PublicKey('9z3eDHueAMdUtym9Q2ku3hi5YXHTYjpFLp1YEEnxUHPV'),
    farmingPoolStakeTknAccount: new PublicKey('DBrkDtmFWuXqpS8svgpXt2xLpQoJQQz5QUNeMWtnzh2A'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('EfTo3cTDREravKZQtcG7cYSHkLfbHP6TLfxFnFMcFYTE'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('5GhnJNhPU4FeAeX8zPjEGboSHWJcnu9JsqSzNDeYMb4q'),
  },

  DFL: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('GiKoJhe5TN2DN2H9iW57P1ewtzZmi9vb8YhLMEVbweAH'),
    farmingPoolAuthority: new PublicKey('Cbf8HLvkmch1HBb2XQf8LHhtPtECLrBDxsR3bCXZ5tA'),
    farmingPoolStakeTknMint: new PublicKey('CGhMaGeVLxxQGJh6Y2bEYfLazumuFyEXpxF1UgrcMRJi'),
    farmingPoolStakeTknAccount: new PublicKey('bMcNaYHuVVCL6PFqXGECDD2EgKSKUeVNzZcEKYUMe3T'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('7DzVmRce9QgooSrLpN1khQXtYv1AqUncc3BoBWvQi1ZV'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('3sZNEj3a6pkCVvZBSGYs9L4Komyd66vbcStckQSpZ32A'),
  },

  CAVE: {
    programId: lendRewardProgramId,
    farmingPoolAccount: new PublicKey('66vLuAKSt93r5Psvj5pfYRFLTWsgqxXJ3SFesSaMEDfo'),
    farmingPoolAuthority: new PublicKey('3dhyC9d2Bcb1GSWbqAhyR4TB8qpGQ7p3ELEVdCBMSWZo'),
    farmingPoolStakeTknMint: new PublicKey('CYMKtPi9KmaGJVWm6A2v7zbR8ARh49r3qLPBbdFiVzf6'),
    farmingPoolStakeTknAccount: new PublicKey('AVig4LiJwdFzaQCNC3yYs46RsomoaagS6dpSmywdAbVE'),
    farmingPoolRewardsTknMint: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccount: new PublicKey('Fph8QSq4QkuAxk1Fuc4mCgvojU6V9ug7UYhXij5GqzVP'),
    farmingPoolRewardsTknMintB: new PublicKey('Hjibp1cn2bSk1dkTdpbxez3YAiBGTLjzc8xZ8LbCCUHS'),
    farmingPoolRewardsTknAccountB: new PublicKey('BuWFC1bCeLcCrXxR1sUY66RJbgu9WYZLcEdFHMoYHpKu'),
  }
};