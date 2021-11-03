import { PublicKey } from "@solana/web3.js";
import { nu64, struct, u8, blob } from 'buffer-layout';
import { publicKey, u128, u64 } from '@project-serum/borsh';
import { NATIVE_MINT } from "@solana/spl-token";
import { TOKENS } from "../../tokens";

export const lyfOrcaProgramId = new PublicKey("DmzAmomATKpNp2rCBfYLS7CSwQqeQTsgRYJA1oSSAJaP");

export const Orca_Swap_ProgramId = new PublicKey("9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP");
export const Orca_Stake_ProgramId = new PublicKey("82yxjeMsvaURa4MbZZ7WZZHfobirZYkH1zF8fmeGtyaQ");

export const ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT = struct([
  u8('isInitialized'),
  u8('accountType'),
  publicKey('globalFarm'),
  publicKey('owner'),
  u64('baseTokensConverted'),
  blob(32, "cumulativeEmissionsCheckpoint")
]);

export const ORCA_FARM_CONFIG = {
  'SOL-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'SOL/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: NATIVE_MINT,

    strategyAccount: new PublicKey('29wLC9dHKab4oG6Z8ZtaFzTvjEXNbYCqMvngypTjBjK5'),
    strategyAuthority: new PublicKey('9dhoieCDdX3qawKK283vtcLmKHnvnMm3VQTKybyBcSdd'),
    strategyFarmInfo: new PublicKey('SE8HYc8FbhZWvYpivptYNwS8UtVE4etThqQdYVk2MFr'),
    strategyTknAccount0: new PublicKey('7BfcrabaNMRCtgR8Er8CVQvyTqhaPUzx1Gqh9RoicRQN'),
    strategyTknAccount1: new PublicKey('FfrdqDdCBgaUt2CgZ6KrFnmWH95585FATMLAgy1H3Pi4'),
    strategyLpTknAccount: new PublicKey('BLuioHGTmNzniUboHeyacY2vHRPcbdu73XcBfjC6ouEU'),
    strategyRewardTknAccount: new PublicKey('6xPHCUVr3y19bXiwWTivWv1ELfjxghBpG4zqjMyk3HdP'),
    strategyFarmTknAccount: new PublicKey('6bm6H7NqcTiVYh3cBBVYsuS5qaA9GhpGyyLQP38s9mzT'),
    strategyBorrowCreditAccount0: new PublicKey('26FzXjvbgXTfTmgqXYwdEVLifbbkSWxDekA5K5sSvLRc'),
    strategyBorrowCreditAccount1: new PublicKey('EECTcKvdCZkq5uP6cqgpCouPmuMHWARokXGaPaoDm7Vf'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      0: {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB")
      },
      1: {
        tknMint: NATIVE_MINT, // wsol
        lendingPoolInfoAccount: new PublicKey("EnZC8MB6QLTxwN1LNqCXYC7XMpvXqitnYQPf5y5AcQRn"),
        lendingPoolTknAccount: new PublicKey("GiJwrxQW5NQWWAva4rnDMXwHxfrhyUzwMX5to1pmCCgF"),
        lendingPoolFeeAccount: new PublicKey("2BDZqoVKAX3PJKeZJytjk7oEpbUu3jvdgdi6tA8VusnY"),
        lendingPoolShareMint: new PublicKey("92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB"),
        lendingPoolShareAccount: new PublicKey("Hyi1jMgc9MMEZyaG9ziL2PvT7zbeRNKhb5K1kj9bxz4x"),
        lendingPoolCreditMint: new PublicKey("7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG"),
        lendingPoolCreditAccount: new PublicKey("WuPCgCuyLSXatdjyWqkGjCPSQFgKLwcfsNR9fDq3hVL")
      }
    },
    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("EGZ7tiLeH62TPV1gL8WwbXGzEPa9zmcpVnnkPKKnrE2U"),
      swapPoolAuthority: new PublicKey("JU8kmKzDHF9sXWsnoznaFDFezLsE5uomX2JkRMbmsQP"),
      lpMint: new PublicKey("APDFRM3HMr8CAGXwKHiu2f5ePSpaiEJhaURwhsRrUUt9"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("8JnSiuvQq3BVuCU3n4DrSTw9chBSPvEMswrhtifVkr1o"),
      swapTknVault0: new PublicKey("75HgnSvXbWKZBpZHveX68ZzAhDqMzNDS29X6BGLtxMo1"),
      swapTknVault1: new PublicKey("ANP74VNsHwSrq9uUSjiSNyNWvf6ZPrKTmE4gHoNd13Lg"),

      rewardsSwapPoolId: new PublicKey("2ZnVuidTHpi5WWKUwFXauYGhvdT9jRKYv5MDahtbwtYr"),
      rewardsSwapPoolAuthority: new PublicKey("2PH1quJj9MHQXATCmNZ6qQ2gZqM8R236DpKaz99ggVpm"),
      rewardsTargetlpMint: new PublicKey("2uVjAuRXavpM6h1scGQaxqb6HVaNRn6T2X7HHXTabz25"),
      rewardsSwapfeeAccount: new PublicKey("4Zc4kQZhRQeGztihvcGSWezJE1k44kKEgPCAkdeBfras"),
      rewardsSwapPoolRewardsVault: new PublicKey("AioST8HKQJRqjE1mknk4Rydc8wVADhdQwRJmAAYX1T6Z"),
      rewardsSwapPoolTargetVault: new PublicKey("73zdy95DynZP4exdpuXTDsexcrWbDJX9TFi2E6CDzXh4"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("85HrPbJtrN82aeB74WTwoFxcNgmf5aDNP2ENngbDpd5G"),
      stakePoolAuthority: new PublicKey("MDcWkwPqr5HrA91g4GGax7bVP1NDDetnR12nGhoAdYj"),
      stakePoolFarmTknMint: new PublicKey("FFdjrSvNALfdgxANNpt3x85WpeVMdQSH5SEP2poM8fcK"),
      stakePoolRewardsTknVault: new PublicKey("kjjFC8RAF7GuBQ9iYgyTcPmvsRafJ2Ec2AmoS6DjakJ"),
      stakePoolLpVault: new PublicKey("7ipefo5V3QEJWeuT2PohFSEUaranZxMSeWQo2rcNigr3")
    }
  },

  // 'SOL-USDT': {
  //   protocolVersion: 2,
  //   protocolSubVersion: 1,

  //   programId: lyfOrcaProgramId,
  //   tknMint0: tokens.usdtToken.mint,
  //   tknMint1: NATIVE_MINT,

  //   strategyAccount: new PublicKey('DevU87HDXGfYsUKJNS97YS9R6P4TbNLD1eUSZ7sSfNB4'),
  //   strategyAuthority: new PublicKey('2dRsttrBhduPHoNLriSeNP9yNyUb5e1oiVSKwch3MJpo'),
  //   strategyFarmInfo: new PublicKey('FbqdGkXEyXJZpGKM7MeJn23YwvA1jUY7pPvviyCFRs2Z'),
  //   strategyTknAccount0: new PublicKey('9Qfy7xddA4bmUyBqYwMBUYpJxZ7adz9Y62AsrawFmu2g'),
  //   strategyTknAccount1: new PublicKey('EwftyfBufXquoVQy1iYELmSswMge7m7N6NUCxmxUwRge'),
  //   strategyLpTknAccount: new PublicKey('9VZQT2xpcSqACvUy23fUM1HUNvB4C8xuGQ78PNcWqgya'),
  //   strategyRewardTknAccount: new PublicKey('8JvuGoy3fsiis8htZeme3cSHNqH1U3BA5GGDP3SwJEn4'),
  //   strategyFarmTknAccount: new PublicKey('HVAs3JrUcqci24keyS2vSjzeqBKgFfv9gzuYhEH5yuNE'),
  //   strategyBorrowCreditAccount0: new PublicKey('93ZoqdVE4CiXNG459cHgm4zqoMjHCaBPQQEjhmW7TrpP'),
  //   strategyBorrowCreditAccount1: new PublicKey('P1NoeEn39pBGiUaGyWPLg2LBFMWw3MCJ571MKsvzTTz'),

  //   strategyRewardsSwapTargetAccount: new PublicKey('EwftyfBufXquoVQy1iYELmSswMge7m7N6NUCxmxUwRge'),

  //   lendingPoolConfig: {
  //     programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
  //     marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //     marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
  //     marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

  //     "0": {
  //       tknMint: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"), // usdt
  //       lendingPoolInfoAccount: new PublicKey("EyqWUeme2B1dhuwJvJVi2coYPcGWmWrakcpsSFeikrhb"),
  //       lendingPoolTknAccount: new PublicKey("Acx3Ky9pk8CyYftA9HYF31EbVhBDi21EqJsFtMW2XxXW"),
  //       lendingPoolFeeAccount: new PublicKey("7gAN5Y4hGAG2A9vyr9dURGosjmo4Rwiaqz4iKZGNenE1"),
  //       lendingPoolShareMint: new PublicKey("8TtsTZQ6mU4YSW5jw4sDjSDEG1CW8QLpK7C9g5TVgBvn"),
  //       lendingPoolShareAccount: new PublicKey("EfLgyXRGFi9MUCMgrsFBuAJ7pMPXBceKhD6x4PgdvLLc"),
  //       lendingPoolCreditMint: new PublicKey("CoheXVD8cAdVaKznfay22dBpfML5Fbz5g4j67syKgRg4"),
  //       lendingPoolCreditAccount: new PublicKey("EAQxDXsA6RXxWtA1PwZNnTnj2MapHBtMzvUmfuGPJCPX"),
  //     },
  //     "1": {
  //       tknMint: NATIVE_MINT, // wsol
  //       lendingPoolInfoAccount: new PublicKey("EnZC8MB6QLTxwN1LNqCXYC7XMpvXqitnYQPf5y5AcQRn"),
  //       lendingPoolTknAccount: new PublicKey("GiJwrxQW5NQWWAva4rnDMXwHxfrhyUzwMX5to1pmCCgF"),
  //       lendingPoolFeeAccount: new PublicKey("2BDZqoVKAX3PJKeZJytjk7oEpbUu3jvdgdi6tA8VusnY"),
  //       lendingPoolShareMint: new PublicKey("92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB"),
  //       lendingPoolShareAccount: new PublicKey("Hyi1jMgc9MMEZyaG9ziL2PvT7zbeRNKhb5K1kj9bxz4x"),
  //       lendingPoolCreditMint: new PublicKey("7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG"),
  //       lendingPoolCreditAccount: new PublicKey("WuPCgCuyLSXatdjyWqkGjCPSQFgKLwcfsNR9fDq3hVL"),
  //     }
  //   },
  //   ammInfo: {
  //     swapProgramId: Orca_Swap_ProgramId,
  //     swapPoolId: new PublicKey("Dqk7mHQBx2ZWExmyrR2S8X6UG75CrbbpK2FSBZsNYsw6"),
  //     swapPoolAuthority: new PublicKey("2sxKY7hxVFrY5oNE2DgaPAJFamMzsmFLM2DgVcjK5yTy"),
  //     lpMint: new PublicKey("FZthQCuYHhcfiDma7QrX7buDHwrZEd7vL8SjS6LQa3Tx"),
  //     lpDecimals: 6,
  //     swapFeeAccount: new PublicKey("BBKgw75FivTYXj85D2AWyVdaTdTWuSuHVXRm1Xu7fipb"),
  //     swapTknVault0: new PublicKey("E8erPjPEorykpPjFV9yUYMYigEWKQUxuGfL2rJKLJ3KU"),
  //     swapTknVault1: new PublicKey("DTb8NKsfhEJGY1TrA7RXN6MBiTrjnkdMAfjPEjtmTT3M"),

  //     rewardsSwapPoolId: new PublicKey("2ZnVuidTHpi5WWKUwFXauYGhvdT9jRKYv5MDahtbwtYr"),
  //     rewardsSwapPoolAuthority: new PublicKey("2PH1quJj9MHQXATCmNZ6qQ2gZqM8R236DpKaz99ggVpm"),
  //     rewardsTargetlpMint: new PublicKey("2uVjAuRXavpM6h1scGQaxqb6HVaNRn6T2X7HHXTabz25"),
  //     rewardsSwapfeeAccount: new PublicKey("4Zc4kQZhRQeGztihvcGSWezJE1k44kKEgPCAkdeBfras"),
  //     rewardsSwapPoolRewardsVault: new PublicKey("AioST8HKQJRqjE1mknk4Rydc8wVADhdQwRJmAAYX1T6Z"),
  //     rewardsSwapPoolTargetVault: new PublicKey("73zdy95DynZP4exdpuXTDsexcrWbDJX9TFi2E6CDzXh4"),

  //     stakeProgramId: Orca_Stake_ProgramId,
  //     stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
  //     stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

  //     stakePoolFarmInfo: new PublicKey("DGtiR1LWNPGV9A5byh7EjAoh9NC2cW5YDcmxCpUJosD2"),
  //     stakePoolAuthority: new PublicKey("MDcWkwPqr5HrA91g4GGax7bVP1NDDetnR12nGhoAdYj"),
  //     stakePoolFarmTknMint: new PublicKey("GwrBA1F8rGummDCDd8NY9Eu1cLNuJqbT8WaGxgWpFwGL"),
  //     stakePoolRewardsTknVault: new PublicKey("56zCKs1djdXoanxwx7LQH9CvwVGKDFSQCmxiZNAtRcyX"),
  //     stakePoolLpVault: new PublicKey("F8jVfL2oQSk7A3w98BdvV9zdsx7XhtFh5t2GNbjRe9xA"),
  //   },
  // },

  // 'ETH-SOL': {
  //   protocolVersion: 2,
  //   protocolSubVersion: 1,

  //   programId: lyfOrcaProgramId,
  //   tknMint0: NATIVE_MINT,
  //   tknMint1: tokens.ethToken.mint,

  //   strategyAccount: new PublicKey('GPySRVcWB92MzeALTtWuXUMcGmCpegZ8y47CzC3qEGpU'),
  //   strategyAuthority: new PublicKey('85ujzoN4xuxFPaHsKUnRFHoQpE8dVpvCHU974YpcQkCW'),
  //   strategyFarmInfo: new PublicKey('BGTbTBi2E1aDDkm1A8y2D94A54fSEscGM9dVFtMAxGcu'),
  //   strategyTknAccount0: new PublicKey('Fx9sG8xMFxsuAYWteQvgb9CrkJJrZLbnDq5bc9jupYJx'),
  //   strategyTknAccount1: new PublicKey('HMRdi6KhJ9V8EuviUqbU72jnGYXEQDNAic7Ls1EJaYcA'),
  //   strategyLpTknAccount: new PublicKey('4cfbYCSpFFuTw5sjoprYujj8uWuH9vjRA7GrHgvuSZ4a'),
  //   strategyRewardTknAccount: new PublicKey('5UN6Wt4snG8H1mnJ4zosQ4SYQZ4aX3gvvzCAX1m7Jwyf'),
  //   strategyFarmTknAccount: new PublicKey('AAbbqErPaaBcEDonrUPf9SBTXZJAxBDtywRQdPt1K4TH'),
  //   strategyBorrowCreditAccount0: new PublicKey('EqasZueQveyRgbpn2q5LHnTJTChmnMARjXbNSPmN243a'),
  //   strategyBorrowCreditAccount1: new PublicKey('ABECTwu3S17AU4ySDrXfuVDJ98UGgk6VSmZQKhX3Y5yK'),

  //   strategyRewardsSwapTargetAccount: new PublicKey('Fx9sG8xMFxsuAYWteQvgb9CrkJJrZLbnDq5bc9jupYJx'),

  //   lendingPoolConfig: {
  //     programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
  //     marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //     marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
  //     marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

  //     "0": {
  //       tknMint: NATIVE_MINT, // wsol
  //       lendingPoolInfoAccount: new PublicKey("EnZC8MB6QLTxwN1LNqCXYC7XMpvXqitnYQPf5y5AcQRn"),
  //       lendingPoolTknAccount: new PublicKey("GiJwrxQW5NQWWAva4rnDMXwHxfrhyUzwMX5to1pmCCgF"),
  //       lendingPoolFeeAccount: new PublicKey("2BDZqoVKAX3PJKeZJytjk7oEpbUu3jvdgdi6tA8VusnY"),
  //       lendingPoolShareMint: new PublicKey("92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB"),
  //       lendingPoolShareAccount: new PublicKey("Hyi1jMgc9MMEZyaG9ziL2PvT7zbeRNKhb5K1kj9bxz4x"),
  //       lendingPoolCreditMint: new PublicKey("7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG"),
  //       lendingPoolCreditAccount: new PublicKey("WuPCgCuyLSXatdjyWqkGjCPSQFgKLwcfsNR9fDq3hVL"),
  //     },
  //     "1": {
  //       tknMint: new PublicKey("2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk"), // eth
  //       lendingPoolInfoAccount: new PublicKey("CKMQxUz1nkn3NS5B9AUD1uyWNL8iN2piG9LVt1RvWXzj"),
  //       lendingPoolTknAccount: new PublicKey("9MH38iiDX4Pk37U6TXLqz2783RspNhwBTYwBNHp8WUzP"),
  //       lendingPoolFeeAccount: new PublicKey("8UPe7Fcm2f1QEFQh2YNr1jg2vgQmj4CXhLYEWgStHd8B"),
  //       lendingPoolShareMint: new PublicKey("B8QXcUv5FFwyHH5V88g6PhYBc8fQvwSpza4C9PsiRpQD"),
  //       lendingPoolShareAccount: new PublicKey("C5X2Q2K2jQtwpuqHKnLVJ1ZsvL9BMRwddMgqaQ5UGNkC"),
  //       lendingPoolCreditMint: new PublicKey("BKKbCDggM83SPLFd1jRPu1ZsCv9nXkwZVne11N9FEs9w"),
  //       lendingPoolCreditAccount: new PublicKey("9A3KAmmv1VyqNqVGBM6T9b1dp9Ax9xxdeXEgedo8U7Gh"),
  //     }
  //   },
  //   ammInfo: {
  //     swapProgramId: Orca_Swap_ProgramId,
  //     swapPoolId: new PublicKey("EuK3xDa4rWuHeMQCBsHf1ETZNiEQb5C476oE9u9kp8Ji"),
  //     swapPoolAuthority: new PublicKey("DffrDbzPiswDJaiicBBo9CjqztKgFLrqXGwNJH4XQefZ"),
  //     lpMint: new PublicKey("71FymgN2ZUf7VvVTLE8jYEnjP3jSK1Frp2XT1nHs8Hob"),
  //     lpDecimals: 6,
  //     swapFeeAccount: new PublicKey("unxKgWEc71ZiHwMqZs3VLqjcjmZhfTZEg94ZLGvjdMP"),
  //     swapTknVault0: new PublicKey("5pUTGvN2AA2BEzBDU4CNDh3LHER15WS6J8oJf5XeZFD8"),
  //     swapTknVault1: new PublicKey("7F2cLdio3i6CCJaypj9VfNDPW2DwT3vkDmZJDEfmxu6A"),

  //     rewardsSwapPoolId: new PublicKey("2ZnVuidTHpi5WWKUwFXauYGhvdT9jRKYv5MDahtbwtYr"),
  //     rewardsSwapPoolAuthority: new PublicKey("2PH1quJj9MHQXATCmNZ6qQ2gZqM8R236DpKaz99ggVpm"),
  //     rewardsTargetlpMint: new PublicKey("2uVjAuRXavpM6h1scGQaxqb6HVaNRn6T2X7HHXTabz25"),
  //     rewardsSwapfeeAccount: new PublicKey("4Zc4kQZhRQeGztihvcGSWezJE1k44kKEgPCAkdeBfras"),
  //     rewardsSwapPoolRewardsVault: new PublicKey("AioST8HKQJRqjE1mknk4Rydc8wVADhdQwRJmAAYX1T6Z"),
  //     rewardsSwapPoolTargetVault: new PublicKey("73zdy95DynZP4exdpuXTDsexcrWbDJX9TFi2E6CDzXh4"),

  //     stakeProgramId: Orca_Stake_ProgramId,
  //     stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
  //     stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

  //     stakePoolFarmInfo: new PublicKey("3ARgavt1NhqLmJWj3wAJy6XBarG6pJbEKRv1wzzRbbaN"),
  //     stakePoolAuthority: new PublicKey("HXY2Vvj2XyqiPNXV3PhM9YYKgfjqzXUX4tUFRnvqihdY"),
  //     stakePoolFarmTknMint: new PublicKey("CGFTRh4jKLPbS9r4hZtbDfaRuC7qcA8rZpbLnVTzJBer"),
  //     stakePoolRewardsTknVault: new PublicKey("FYTTVMqWPzbnhTsukgiWmPiNJam4yLTxHM9mpzdan2zo"),
  //     stakePoolLpVault: new PublicKey("6ckhPnn6tCr88aq9SxhWaAA5G7izuXNKhVk1Xa62zhFD"),
  //   },
  // },

  // 'ETH-USDC': {
  //   protocolVersion: 2,
  //   protocolSubVersion: 1,

  //   programId: lyfOrcaProgramId,
  //   tknMint0: TOKENS.USDC.mintAddress,
  //   tknMint1: tokens.ethToken.mint,

  //   strategyAccount: new PublicKey('HCn6dGVrhZmmxkuMFcmG3vdNmMqL7Fz4L4h7kwNAUNto'),
  //   strategyAuthority: new PublicKey('9hBb9JFPajYh6GSfo9C7z97pTk36kqRVgaxEHBMFCT52'),
  //   strategyFarmInfo: new PublicKey('4PnmAjoBGEZDD4ouXh1vqywmMRf729imxNQ5Nce9sLXy'),
  //   strategyTknAccount0: new PublicKey('GpBzKyGhwKruNyRPNHdnqvQ4WDLVnR67GtavvcangL2p'),
  //   strategyTknAccount1: new PublicKey('F3KmAJTvyeazkYprqwkNisf8uVQGj9r7UxSyU7bEY2Lr'),
  //   strategyLpTknAccount: new PublicKey('7P9feDKXeNRUqCWRG1KnpBS6eX6divNdxjiWpGg5i9yQ'),
  //   strategyRewardTknAccount: new PublicKey('Dfmqo4g6igyrvFFfGGKnwYtsnCNYU9yVDkz6jaJHhQuZ'),
  //   strategyFarmTknAccount: new PublicKey('53pdXobn4yjhiGDb47Tw8x2g7VyhShY5WqzJ2wNYkTxg'),
  //   strategyBorrowCreditAccount0: new PublicKey('Dkkwzwh9Y8r3nJ47kbDmtXgbmfsP3ZLFj5SFw3iSPi2D'),
  //   strategyBorrowCreditAccount1: new PublicKey('A9kSsXXkWxHp5npHBbeh4LZz8VKtpiRcxEGWeaTry8iu'),

  //   strategyRewardsSwapTargetAccount: new PublicKey('GpBzKyGhwKruNyRPNHdnqvQ4WDLVnR67GtavvcangL2p'),

  //   lendingPoolConfig: {
  //     programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
  //     marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //     marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
  //     marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

  //     "0": {
  //       tknMint: TOKENS.USDC.mintAddress, // usdc
  //       lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
  //       lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
  //       lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
  //       lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
  //       lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
  //       lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
  //       lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
  //     },
  //     "1": {
  //       tknMint: new PublicKey("2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk"), // eth
  //       lendingPoolInfoAccount: new PublicKey("CKMQxUz1nkn3NS5B9AUD1uyWNL8iN2piG9LVt1RvWXzj"),
  //       lendingPoolTknAccount: new PublicKey("9MH38iiDX4Pk37U6TXLqz2783RspNhwBTYwBNHp8WUzP"),
  //       lendingPoolFeeAccount: new PublicKey("8UPe7Fcm2f1QEFQh2YNr1jg2vgQmj4CXhLYEWgStHd8B"),
  //       lendingPoolShareMint: new PublicKey("B8QXcUv5FFwyHH5V88g6PhYBc8fQvwSpza4C9PsiRpQD"),
  //       lendingPoolShareAccount: new PublicKey("C5X2Q2K2jQtwpuqHKnLVJ1ZsvL9BMRwddMgqaQ5UGNkC"),
  //       lendingPoolCreditMint: new PublicKey("BKKbCDggM83SPLFd1jRPu1ZsCv9nXkwZVne11N9FEs9w"),
  //       lendingPoolCreditAccount: new PublicKey("9A3KAmmv1VyqNqVGBM6T9b1dp9Ax9xxdeXEgedo8U7Gh"),
  //     }
  //   },

  //   ammInfo: {
  //     swapProgramId: Orca_Swap_ProgramId,
  //     swapPoolId: new PublicKey("FgZut2qVQEyPBibaTJbbX2PxaMZvT1vjDebiVaDp5BWP"),
  //     swapPoolAuthority: new PublicKey("4dfCZR32xXhoTgMRhnViNaTFwiKP9A34TDjHCR3xM5rg"),
  //     lpMint: new PublicKey("3e1W6Aqcbuk2DfHUwRiRcyzpyYRRjg6yhZZcyEARydUX"),
  //     lpDecimals: 6,
  //     swapFeeAccount: new PublicKey("DLWewB12jzGn4wXJmFCddWDeof1Ma4cZYNRv9CP5hTvX"),
  //     swapTknVault0: new PublicKey("JA98RXv2VdxQD8pRQq4dzJ1Bp4nH8nokCGmxvPWKJ3hx"),
  //     swapTknVault1: new PublicKey("H9h5yTBfCHcb4eRP87fXczzXgNaMzKihr7bf1sjw7iuZ"),

  //     rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
  //     rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
  //     rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
  //     rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
  //     rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
  //     rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

  //     stakeProgramId: Orca_Stake_ProgramId,
  //     stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
  //     stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

  //     stakePoolFarmInfo: new PublicKey("FpezTR76RRjgpBb9HhR6ap8BgQfkHyNMQSqJDcoXpjAb"),
  //     stakePoolAuthority: new PublicKey("DFTLJrgsn7cLNX9hbqiUwM8C1y6f7AfyvEmbsFSkjQNR"),
  //     stakePoolFarmTknMint: new PublicKey("HDP2AYFmvLz6sWpoSuNS62JjvW4HjMKp7doXucqpWN56"),
  //     stakePoolRewardsTknVault: new PublicKey("9MWJmWVAGQ9C9SxwWKidStAA8HjDHpnZ7KfKgVJdrNtj"),
  //     stakePoolLpVault: new PublicKey("6zoYTvgLd4UAhKSPwirEU9VNNNkpezwq8AM4jXW1Qop9"),
  //   },
  // },

  'ORCA-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'ORCA/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.ORCA.mintAddress,

    strategyAccount: new PublicKey('CcN9eP9wfUpbCncDBo4SvtDQkhcaqNcP8qdjtyAeDBNs'),
    strategyAuthority: new PublicKey('7kWVMoFnhJQRrR5ahz4f8K6iv1C7kVEaobBJibV2ApNz'),
    strategyFarmInfo: new PublicKey('CEU4UqNqxzxkxEbHbDKZqBX7UDDQBju32bDDhzTVQ7L8'),
    strategyTknAccount0: new PublicKey('5jnuSSu38seAkuX9kJ87VYowTiVu3okLFDxENMxgEjut'),
    strategyTknAccount1: new PublicKey('AamWrdSbTaVgMrtrH25QkeDumuGMVn5omrrWf9vNpaZZ'),
    strategyLpTknAccount: new PublicKey('5L75Y93BZECUSUMuaKLB3hmHqVE45gUuPdaKXVCaVHLt'),
    strategyRewardTknAccount: new PublicKey('AamWrdSbTaVgMrtrH25QkeDumuGMVn5omrrWf9vNpaZZ'),
    strategyFarmTknAccount: new PublicKey('3j2XvZdsZ16kseqAbvPKnCsozwTL8YL4MGXZ9nTWq1a7'),
    strategyBorrowCreditAccount0: new PublicKey('9bS51442yEXsGhW8fy4E3cifkrLJbLLbGUg3VqNzGAF5'),
    strategyBorrowCreditAccount1: new PublicKey('Az17UE9yb5VS78ezjZsf4x9Loo6UQhLU8DQNw57YGH2c'),

    strategyRewardsSwapTargetAccount: new PublicKey('5jnuSSu38seAkuX9kJ87VYowTiVu3okLFDxENMxgEjut'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: new PublicKey("orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE"), // orca
        lendingPoolInfoAccount: new PublicKey("9bo5JunUhp4XD7TDeeS9ARvWTYGBYtuQKUHGUb7RRvkf"),
        lendingPoolTknAccount: new PublicKey("F3EhkuRuZaYNY2bLTosjv6V7QXiZ8db9nXTZeLnmHC7V"),
        lendingPoolFeeAccount: new PublicKey("F3EhkuRuZaYNY2bLTosjv6V7QXiZ8db9nXTZeLnmHC7V"),
        lendingPoolShareMint: new PublicKey("DKoKBD7YheCGZjWp5CaHDPtheAcUveRSMvWkaivbNzWh"),
        lendingPoolShareAccount: new PublicKey("AMUE9EgiEiTP1YVBicwTVGtumBypR5thjTgbsXZM2PPG"),
        lendingPoolCreditMint: new PublicKey("CJNd1LZZxZr243dpNN9DtEavXn65kstrg251MPb8vmwW"),
        lendingPoolCreditAccount: new PublicKey("74m1zyzV8x9d8kZLEaVaNWRsnx8pH47tfX8cquot11ef"),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      swapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      lpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      swapTknVault0: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),
      swapTknVault1: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("9S1BsxbDNQXQccjFamVEGgxiYQHTeudvhEYwFr4oWeaf"),
      stakePoolAuthority: new PublicKey("66xaEjFoYfRcspc18oDj61mXDyznr9zam6tFNeqvs2jK"),
      stakePoolFarmTknMint: new PublicKey("Gc7W5U66iuHQcC1cQyeX9hxkPF2QUVJPTf1NWbW8fNrt"),
      stakePoolRewardsTknVault: new PublicKey("DEiqe2Ta9TRMRtWdBqiFV13dhVrqCeG8MMmVwywvXvJo"),
      stakePoolLpVault: new PublicKey("45BAAQCZYd2kP3Z3WvRwdtfUhvuW4FvpqVK4m8qrR5x1"),
    },
  },

  'ORCA-SOL': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'ORCA/SOL[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: NATIVE_MINT,
    tknMint1: TOKENS.ORCA.mintAddress,

    strategyAccount: new PublicKey('95KtcZZcJwJHC4owrVNKSLLkAWrDgB9MmbsUqtLBkV29'),
    strategyAuthority: new PublicKey('FZbwCGop7nsxHix6xrNV18mQjoqmPWx89aafsoiTVzN'),
    strategyFarmInfo: new PublicKey('3HbZFj77tRfEBMrwXUK5ygFBp8k4uvuLL5FxRhaNv5hq'),
    strategyTknAccount0: new PublicKey('9r3qSVuFyBi46aBHC35oMztFy8JWHzTxjXdenycefa2X'),
    strategyTknAccount1: new PublicKey('iesBHtuicwYboyi46wwmjDW5yhuYNqXAmpC53SwcXWv'),
    strategyLpTknAccount: new PublicKey('Fu8o2NjQTcw49bVNs2H5HssFKyuwsA2qmVUaaQtZA8a1'),
    strategyRewardTknAccount: new PublicKey('iesBHtuicwYboyi46wwmjDW5yhuYNqXAmpC53SwcXWv'),
    strategyFarmTknAccount: new PublicKey('4gzUQRdkKKzYndCpageJN1WUonWv2D8xJSNmLpRjsF5m'),
    strategyBorrowCreditAccount0: new PublicKey('HzvZnSL3o1XdR45u3FkfgLuJZb2e3dyG9VswsffzF3km'),
    strategyBorrowCreditAccount1: new PublicKey('6X3u47uyxan8DUDtfZw33pRvefHwohBwcMXdZWSn5VJa'),

    strategyRewardsSwapTargetAccount: new PublicKey('HzvZnSL3o1XdR45u3FkfgLuJZb2e3dyG9VswsffzF3km'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: NATIVE_MINT, // wsol
        lendingPoolInfoAccount: new PublicKey("EnZC8MB6QLTxwN1LNqCXYC7XMpvXqitnYQPf5y5AcQRn"),
        lendingPoolTknAccount: new PublicKey("GiJwrxQW5NQWWAva4rnDMXwHxfrhyUzwMX5to1pmCCgF"),
        lendingPoolFeeAccount: new PublicKey("2BDZqoVKAX3PJKeZJytjk7oEpbUu3jvdgdi6tA8VusnY"),
        lendingPoolShareMint: new PublicKey("92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB"),
        lendingPoolShareAccount: new PublicKey("Hyi1jMgc9MMEZyaG9ziL2PvT7zbeRNKhb5K1kj9bxz4x"),
        lendingPoolCreditMint: new PublicKey("7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG"),
        lendingPoolCreditAccount: new PublicKey("WuPCgCuyLSXatdjyWqkGjCPSQFgKLwcfsNR9fDq3hVL"),
      },
      "1": {
        tknMint: new PublicKey("orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE"), // orca
        lendingPoolInfoAccount: new PublicKey("9bo5JunUhp4XD7TDeeS9ARvWTYGBYtuQKUHGUb7RRvkf"),
        lendingPoolTknAccount: new PublicKey("F3EhkuRuZaYNY2bLTosjv6V7QXiZ8db9nXTZeLnmHC7V"),
        lendingPoolFeeAccount: new PublicKey("F3EhkuRuZaYNY2bLTosjv6V7QXiZ8db9nXTZeLnmHC7V"),
        lendingPoolShareMint: new PublicKey("DKoKBD7YheCGZjWp5CaHDPtheAcUveRSMvWkaivbNzWh"),
        lendingPoolShareAccount: new PublicKey("AMUE9EgiEiTP1YVBicwTVGtumBypR5thjTgbsXZM2PPG"),
        lendingPoolCreditMint: new PublicKey("CJNd1LZZxZr243dpNN9DtEavXn65kstrg251MPb8vmwW"),
        lendingPoolCreditAccount: new PublicKey("74m1zyzV8x9d8kZLEaVaNWRsnx8pH47tfX8cquot11ef"),
      }
    },
    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("2ZnVuidTHpi5WWKUwFXauYGhvdT9jRKYv5MDahtbwtYr"),
      swapPoolAuthority: new PublicKey("2PH1quJj9MHQXATCmNZ6qQ2gZqM8R236DpKaz99ggVpm"),
      lpMint: new PublicKey("2uVjAuRXavpM6h1scGQaxqb6HVaNRn6T2X7HHXTabz25"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("4Zc4kQZhRQeGztihvcGSWezJE1k44kKEgPCAkdeBfras"),
      swapTknVault0: new PublicKey("73zdy95DynZP4exdpuXTDsexcrWbDJX9TFi2E6CDzXh4"),
      swapTknVault1: new PublicKey("AioST8HKQJRqjE1mknk4Rydc8wVADhdQwRJmAAYX1T6Z"),

      rewardsSwapPoolId: new PublicKey("2ZnVuidTHpi5WWKUwFXauYGhvdT9jRKYv5MDahtbwtYr"),
      rewardsSwapPoolAuthority: new PublicKey("2PH1quJj9MHQXATCmNZ6qQ2gZqM8R236DpKaz99ggVpm"),
      rewardsTargetlpMint: new PublicKey("2uVjAuRXavpM6h1scGQaxqb6HVaNRn6T2X7HHXTabz25"),
      rewardsSwapfeeAccount: new PublicKey("4Zc4kQZhRQeGztihvcGSWezJE1k44kKEgPCAkdeBfras"),
      rewardsSwapPoolRewardsVault: new PublicKey("AioST8HKQJRqjE1mknk4Rydc8wVADhdQwRJmAAYX1T6Z"),
      rewardsSwapPoolTargetVault: new PublicKey("73zdy95DynZP4exdpuXTDsexcrWbDJX9TFi2E6CDzXh4"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("F6pi7SyXWx56fP96mYQ4Yfh4yZ7oGNtDjwSYHT5Mz7Ld"),
      stakePoolAuthority: new PublicKey("98RAHBKRTTC87nNwug1GEAnLVgouk9nRaa3u14jrp6Zz"),
      stakePoolFarmTknMint: new PublicKey("B5waaKnsmtqFawPspUwcuy1cRjAC7u2LrHSwxPSxK4sZ"),
      stakePoolRewardsTknVault: new PublicKey("CSbYA7Cd65Vis2oqX797zmnWmpgENmqrPdmPbTbRPykd"),
      stakePoolLpVault: new PublicKey("7N7zxoDMMV1sCDiVEzinTyQxS2GoN388QprMCQX38BeT")
    }
  },
  'ATLAS-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: 'ATLAS-USDC[Double-Dip]',
    orcaPoolId: 'ATLAS/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.ATLAS.mintAddress,

    strategyAccount: new PublicKey('8MSQNF5QYWtMepuVCCdUv28uAYp3hVsYbCSSD6KSm4TJ'),
    strategyAuthority: new PublicKey('5QupHQxKmpqzf1omkksiyxDzWKBvDxoZXCm295pFWexu'),
    strategyFarmInfo: new PublicKey('CmyrvsTodfcyxmq6aBos2mSbLAigAsxwLvCZhtLa6Rm3'),
    strategyTknAccount0: new PublicKey('6YJcKRm5ThsuCZe2xT4kDhuA7WLMGBU6G8pB7MsnFQRu'),
    strategyTknAccount1: new PublicKey('GADQDCoLRukNjktLYpvnQRgxXttD4rXY6LHNrD6FF82w'),
    strategyLpTknAccount: new PublicKey('681GFodkCjDwcNdp9GsZLUqs43FjUyiELypW5gyXFBpE'),
    strategyRewardTknAccount: new PublicKey('DAckSVLYKbYWqk4BgeJsZuvjp6SP1HSTrsWZof8mahb4'),
    strategyFarmTknAccount: new PublicKey('GWdJWf3fDW4Z1qsjHP1qkFvvhLSEU7N51z3RKJtBq4Zv'),
    strategyBorrowCreditAccount0: new PublicKey('GWUCJ8WZBjBYqignQV1hNf1UMY6VCGar4rMi9C2wD54M'),
    strategyBorrowCreditAccount1: new PublicKey('44MNecyCnigchaRYp6M6qxC1nyGQ4BetnciHomDKVdyC'),
    doubleDipStrategyFarmTknAccount: new PublicKey('DF2cBpn8sf4J9HELV3bPfLDH5SobRyzKkShXWvqpUqfD'),
    doubleDipStrategyRewardTknAccount: new PublicKey('GADQDCoLRukNjktLYpvnQRgxXttD4rXY6LHNrD6FF82w'),
    doubleDipStrategyFarmInfo: new PublicKey('8jK88Nu9UV71bd7mWgW4H8dxWXRaSrwnzj7BiK1xsC6s'),

    strategyRewardsSwapTargetAccount: new PublicKey('6YJcKRm5ThsuCZe2xT4kDhuA7WLMGBU6G8pB7MsnFQRu'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: new PublicKey("ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"), // atlas
        lendingPoolInfoAccount: new PublicKey("FnkmnUqazYmSm791rSTSXYbAzDzsuHJBgySgNZeCHGDJ"),
        lendingPoolTknAccount: new PublicKey("E5ovYitzudRyUy7AS4U52eFgrq1rjr773rRGpYax1nmD"),
        lendingPoolFeeAccount: new PublicKey("E5ovYitzudRyUy7AS4U52eFgrq1rjr773rRGpYax1nmD"),
        lendingPoolShareMint: new PublicKey("4mygt5bFQrbXH9gNg75j1KVTrKGhvcYiQjir6FJ8afYH"),
        lendingPoolShareAccount: new PublicKey("Eb4Ai2PXmRX3V9TX6awjNdBXZKGRyCgTmQu6Pni9NnTb"),
        lendingPoolCreditMint: new PublicKey("3nAgm2XrSi3RNDWz4wCvUWwQW3QQE7s5i7MxNz8r8mGZ"),
        lendingPoolCreditAccount: new PublicKey("3PwecBTLVt8zqKadSFDjeKH7Swzt1GxvU27urj66L89P"),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("3V5sjXj1mrWjjB1Xt6Xwp554QwHE5fppGSxbk4GzAtEW"),
      swapPoolAuthority: new PublicKey("8UYN675AJn5htWydDs724xqintBZ4XzsCWqMozUSDU8m"),
      lpMint: new PublicKey("FZ8x1LCRSPDeHBDoAc3Gc6Y7ETCynuHEr5q5YWV7uRCJ"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("CFN4DQ2p3qroX92pPNy3mov3Dw1aCNGLrU5AXHpHxbko"),
      swapTknVault0: new PublicKey("8YswVYsTi66umBF2Bnkh4LB2VWMKPssDpe54VAgiuJZQ"),
      swapTknVault1: new PublicKey("xotXsNCx4tBhnwhrajGTaVgKq1sfuMkeYHc77ZegCqE"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("G92aJeZBCFiECwrKSQsbobfykh6cNLCf5Pd3zkiLjGLe"),
      stakePoolAuthority: new PublicKey("8tn2JVYGM1JwCEY3QHJxjRjKsmVbvdcqM277GC3yTot6"),
      stakePoolFarmTknMint: new PublicKey("HFmY1ggCsCky1zJ1sfdkNR4zb3u5n38YNRdf4vsGu17t"),
      stakePoolRewardsTknVault: new PublicKey("7AxW2s5dqKphs9pjVzwNsVHqSznEyLkrtu3w61TQNvHd"),
      stakePoolLpVault: new PublicKey("AuZoiJ3Y4P55YrT7bZnhE6wCE5BVAn7rEYHjb7rHvFMF"),

      doubleDipPool: {
        rewardTknMint: TOKENS.ATLAS.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("DTP1xr4EzFf1YDu4CeWTtWVsCBzFPk4HDEsL3AzoR3kB"),
        doubleDipStakePoolAuthority: new PublicKey("6HDxNtWVFrgKdce3iaRGwRf9tLhFdPHfxJyzEo8TPrEo"),
        doubleDipStakePoolFarmTknMint: new PublicKey("894ptAFT7d3inPsWTniCGL2NZpJDiXGvFZFfuHXA1w8F"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("H6xDcxgbV4W9FhiR2VQECSxavSzJHnRnmPzoDWtTc2Qt"),
        doubleDipStakePoolFarmTknVault: new PublicKey("Bu3epZQvoSmUJtzAJWH8v91HFwbc9bRN6B9hrjGojFUW"),
      }
    },
  },
  'POLIS-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: 'POLIS-USDC[Double-Dip]',
    orcaPoolId: 'POLIS/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.POLIS.mintAddress,

    strategyAccount: new PublicKey('3MWcHetauZxm28G5dZ3PBNaXQVq6Dcp9rNfE59Tx9VFn'),
    strategyAuthority: new PublicKey('DKxoS1DzE6crymSrzjKoRBTPwinxx8QbgwdCuT3rn47x'),
    strategyFarmInfo: new PublicKey('351SpdX6mdTzK8voA6vppZ5LAfMsGSj4Re2VdDkHSAJ9'),
    strategyTknAccount0: new PublicKey('FeBJSSPLJnWx4Xcm12KxM4KVb5Bat225pSnz3FKn9u7U'),
    strategyTknAccount1: new PublicKey('5NkTj1krAGjg33H4Z4pen9oF8xo2FaaE6vp1QgENq71'),
    strategyLpTknAccount: new PublicKey('BB8y5Da9eiDRPF19JBe8k2DegT1oD4MWf8vMx6vvKr5J'),
    strategyRewardTknAccount: new PublicKey('99hivZZXz2obv2jqP2ufknQzTtNak9aFfGCMeEgAB15E'),
    strategyFarmTknAccount: new PublicKey('CW1HVHda4RZMVKYZYtwLRXir1AY9FNFvzPSyDnEtkJKK'),
    strategyBorrowCreditAccount0: new PublicKey('GhQ5zXFSPqUkkMh7h4PxzDbQTsfrsH1gbU4ECzGGaE74'),
    strategyBorrowCreditAccount1: new PublicKey('HTUUdDjNWEkGbQ5JSLinPLH5SWqVAfqJm5j2bodLhvGs'),
    doubleDipStrategyFarmTknAccount: new PublicKey('13gRHNa6gM3u9QCZeDWcDPjXEignvgQk79mw6K7mq47F'),
    doubleDipStrategyRewardTknAccount: new PublicKey('5NkTj1krAGjg33H4Z4pen9oF8xo2FaaE6vp1QgENq71'),
    doubleDipStrategyFarmInfo: new PublicKey('EnEGfgv2kso1hHUmiKVYdVGigXSbJx7kEyzqQyoMnH7p'),

    strategyRewardsSwapTargetAccount: new PublicKey('FeBJSSPLJnWx4Xcm12KxM4KVb5Bat225pSnz3FKn9u7U'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: new PublicKey("poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk"), // polis
        lendingPoolInfoAccount: new PublicKey("BWJkfNQnYt817V6sKxEJ3sFcivcXZgfKGCe8Z9f4LcVj"),
        lendingPoolTknAccount: new PublicKey("7Ad6djoPLzigyBnnWjoLh2gQ6Tbw2s6kAdsaVUBq6L8N"),
        lendingPoolFeeAccount: new PublicKey("7Ad6djoPLzigyBnnWjoLh2gQ6Tbw2s6kAdsaVUBq6L8N"),
        lendingPoolShareMint: new PublicKey("FenVvq6s6S3McD1BCm76Ktz1EvRNCB4qYKGFU76fB7Fj"),
        lendingPoolShareAccount: new PublicKey("GKTqMGVCgXJaDzjYfPdgMbVfnzCKDj6KqRpykauw19do"),
        lendingPoolCreditMint: new PublicKey("EkKFNt7PBRdWy8EpmZAbAZdvXZpSKvdwMfo8eotN1PEr"),
        lendingPoolCreditAccount: new PublicKey("FGKikDsnBPQ5m7jgbNNbHaR1gh1T8GYJ5sPYWoYdoE4p"),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("CdKPtCb5fBRaGFS4bJgytfReeHuFyhpe9YUyWHPnEWZG"),
      swapPoolAuthority: new PublicKey("8XB9V3VuHtPBzHqvxzcmpkpaoXNXjZMD8VBHC79SxcEL"),
      lpMint: new PublicKey("GteBdo9sqE7T41G8AJsaG9WHW48uXBwsLLznmu2TBdgy"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("3gZQ2YnrXbnRwJj5poffLirF7CwacatvtfGCNRFrbJdr"),
      swapTknVault0: new PublicKey("CLCj9b1vdPutrkvZS8ACTM5q42SXB2Q7khnMLVxDMGEK"),
      swapTknVault1: new PublicKey("EbXNEUiKxSU1vwwhrbVNVk3qX4o1yU3p75SQUUMfc1zH"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("5NkDw3LcFscf5WSxUiquNregP6RaP79Y2pN1jyUYepzc"),
      stakePoolAuthority: new PublicKey("3s5MDuUTfXEAKTbBvcCqAnShFMfdr8s8DoNwrfNBJyrM"),
      stakePoolFarmTknMint: new PublicKey("63JUKLnCAuNMPSPioEgbjjzp9Qk8qSEEM8eZqEtPqfLU"),
      stakePoolRewardsTknVault: new PublicKey("BsgUyVxojJCtA11JxJ8R7HorsdKogGf8U66rUouZkc7X"),
      stakePoolLpVault: new PublicKey("hHJ1H8aj2LoRTPXGVXda2ZWHbcDwyZew9dUMdD2zKAJ"),

      doubleDipPool: {
        rewardTknMint: TOKENS.POLIS.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("7h1zAHj2xzEw3eKfprYqG36aN5XwcZXBsYwM2haWQVzR"),
        doubleDipStakePoolAuthority: new PublicKey("F56GFg8TdADqmNfqrER21v6gP85eRtVVNjEPVMTd616r"),
        doubleDipStakePoolFarmTknMint: new PublicKey("FE1QJzi5RA5aKnTfSV3DAMN3z4uHUzSR5Z4drs9S5vB"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("G3FdVWQ8CqhLA7bVMRmDUxd3W7WhEqiqUz4fGDGwFD94"),
        doubleDipStakePoolFarmTknVault: new PublicKey("7mymkVgdjcqbDvyQENVnc5hvWLBKFb4G84bnu2eR9aug"),
      }
    },
  },
  // 'USDC-USDT': {
  //   protocolVersion: 2,
  //   protocolSubVersion: 1,
  //   alias: null,
  //   orcaPoolId: 'USDC/USDT[stable][aquafarm]',

  //   programId: lyfOrcaProgramId,
  //   tknMint0: tokens.usdtToken.mint,
  //   tknMint1: TOKENS.USDC.mintAddress,

  //   strategyAccount: new PublicKey('4RLv5uoyVpdcMeFxk971uQhdhWMTmPGr8dTv1sjLQ2e1'),
  //   strategyAuthority: new PublicKey('38FAeN1hruN2hubH1e61XjCUQP9JHT4TVGwQhErv3Cpc'),
  //   strategyFarmInfo: new PublicKey('4EZnSfH3Z6Tv8zuSbcj1TJwp2v6Ur9xuA2w6BY5ayfL8'),
  //   strategyTknAccount0: new PublicKey('43X4f9m1TrA1h7UGME4ByhHmzXM7cwe62KtwAJYwrbeX'),
  //   strategyTknAccount1: new PublicKey('9FC4jPJ5PFJhNhNmo6LVSZni9LA5qk49Fw5DSz7UdHpL'),
  //   strategyLpTknAccount: new PublicKey('DFwvEkvv99k85vL9DucEsr74nHyjyHTukN1Lw6eEnwGv'),
  //   strategyRewardTknAccount: new PublicKey('H7vYRxw7AFCWCmqNphvzU1Nj2bTNvbdWTA9cKDwfzVUc'),
  //   strategyFarmTknAccount: new PublicKey('AFo6iGLYdn15spq5oUU86ujYoP1caecwHk1B8Pxsw1kk'),
  //   strategyBorrowCreditAccount0: new PublicKey('E1caVXTzX2HKf6gBfkv5gyav6DEjF73thwnqMPnPG9S2'),
  //   strategyBorrowCreditAccount1: new PublicKey('39K4AzKqcPxK7pELE24ocySYR5qeBPuA3oxX2hN1La61'),

  //   strategyRewardsSwapTargetAccount: new PublicKey('9FC4jPJ5PFJhNhNmo6LVSZni9LA5qk49Fw5DSz7UdHpL'),

  //   lendingPoolConfig: {
  //     programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
  //     marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //     marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
  //     marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

  //     "0": {
  //       tknMint: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"), // usdt
  //       lendingPoolInfoAccount: new PublicKey("EyqWUeme2B1dhuwJvJVi2coYPcGWmWrakcpsSFeikrhb"),
  //       lendingPoolTknAccount: new PublicKey("Acx3Ky9pk8CyYftA9HYF31EbVhBDi21EqJsFtMW2XxXW"),
  //       lendingPoolFeeAccount: new PublicKey("7gAN5Y4hGAG2A9vyr9dURGosjmo4Rwiaqz4iKZGNenE1"),
  //       lendingPoolShareMint: new PublicKey("8TtsTZQ6mU4YSW5jw4sDjSDEG1CW8QLpK7C9g5TVgBvn"),
  //       lendingPoolShareAccount: new PublicKey("EfLgyXRGFi9MUCMgrsFBuAJ7pMPXBceKhD6x4PgdvLLc"),
  //       lendingPoolCreditMint: new PublicKey("CoheXVD8cAdVaKznfay22dBpfML5Fbz5g4j67syKgRg4"),
  //       lendingPoolCreditAccount: new PublicKey("EAQxDXsA6RXxWtA1PwZNnTnj2MapHBtMzvUmfuGPJCPX"),
  //     },
  //     "1": {
  //       tknMint: TOKENS.USDC.mintAddress, // usdc
  //       lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
  //       lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
  //       lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
  //       lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
  //       lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
  //       lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
  //       lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
  //     }
  //   },
  //   ammInfo: {
  //     swapProgramId: Orca_Swap_ProgramId,
  //     swapPoolId: new PublicKey("F13xvvx45jVGd84ynK3c8T89UejQVxjCLtmHfPmAXAHP"),
  //     swapPoolAuthority: new PublicKey("3cGHDS8uWhdxQj14vTmFtYHX3NMouPpE4o9MjQ43Bbf4"),
  //     lpMint: new PublicKey("H2uzgruPvonVpCRhwwdukcpXK8TG17swFNzYFr2rtPxy"),
  //     lpDecimals: 6,
  //     swapFeeAccount: new PublicKey("B4RNxMJGRzKFQyTq2Uwkmpyjtew13n7KtdqZy6qgENTu"),
  //     swapTknVault0: new PublicKey("AiwmnLy7xPT28dqZpkRm6i1ZGwELUCzCsuN92v4JkSeU"),
  //     swapTknVault1: new PublicKey("6uUn2okWk5v4x9Gc4n2LLGHtWoa9tmizHq1363dW7t9W"),

  //     rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
  //     rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
  //     rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
  //     rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
  //     rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
  //     rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

  //     stakeProgramId: Orca_Stake_ProgramId,
  //     stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
  //     stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

  //     stakePoolFarmInfo: new PublicKey("5psKJrxWnPmoAbCxk3An2CGh7wHAX2cWddf5vZuYbbVw"),
  //     stakePoolAuthority: new PublicKey("5YGvg6mfuvJtHdVWDXTs4sYy6GwQAUduK8qurDcL111S"),
  //     stakePoolFarmTknMint: new PublicKey("GjpXgKwn4VW4J2pZdS3dovM58hiXWLJtopTfqG83zY2f"),
  //     stakePoolRewardsTknVault: new PublicKey("AYbtHmuJxXpo91m988UdyTtzC6J72WvMAW7XkXqFhAbz"),
  //     stakePoolLpVault: new PublicKey("9hPRfmQmZYiL4ZtuvGBk5SjMzmFCQ2h9a4GKoM82BR84"),
  //   },
  // },

  'mSOL-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'mSOL/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.mSOL.mintAddress,

    strategyAccount: new PublicKey('FPhAbDNdMbEzn2ewhNCNGNg6J7yychvxuiS21xLyxiRD'),
    strategyAuthority: new PublicKey('CcpS3wpmm41FLL7W4rsYi2UfR1sn1JnTTMHfwMHeomH2'),
    strategyFarmInfo: new PublicKey('4npVdoBzzrco48QeBvS3X3wUCjy83LYfhz7giLY1CTey'),
    strategyTknAccount0: new PublicKey('D6oUnT5tdoGM6Vh7tHaZG59Y4pJaG8eqyPrMhvJydrvV'),
    strategyTknAccount1: new PublicKey('EnLyuzF3uuYCrBJhE8RWdzu146HazfwUxvpm3Fmw8mxh'),
    strategyLpTknAccount: new PublicKey('GJNf2vgsUziccpXwsjJrbStW1H6TdcaG5FSGAXH4Sppe'),
    strategyRewardTknAccount: new PublicKey('CGuuh9LDnp6o5pB3UR9crnfahm66REcemupyEQ7gQdCV'),
    strategyFarmTknAccount: new PublicKey('gCUkHwR1TyvAfnuezuVMu8Q1qYV1Div6Y6rvNK9WJpZ'),
    strategyBorrowCreditAccount0: new PublicKey('HuchZXe629ttdYzJyvqXLhQoqLP4gXGAEd45NKPPfS4A'),
    strategyBorrowCreditAccount1: new PublicKey('HvR2f1g8uQp4mQ5CnwrCdjS3iCs3tUuEv6tBLHQUtmLJ'),
    doubleDipStrategyFarmTknAccount: new PublicKey('E5pisEvzF875k4woTzQjUpxSvndb3JF4vyb5LQiddg2Y'),
    doubleDipStrategyRewardTknAccount: new PublicKey('FjDxzZMEz6qRzDZ9Jbc5wp2yaxUnnjM3dP7ZZ34MGPLk'),
    doubleDipStrategyFarmInfo: new PublicKey('BZ5ZwddtYcNEP7ZY7iEdF72CuSAMBcN5vy2bX63oG1tg'),

    strategyRewardsSwapTargetAccount: new PublicKey('D6oUnT5tdoGM6Vh7tHaZG59Y4pJaG8eqyPrMhvJydrvV'),
    strategyDoubleDipRewardsSwapTargetAccount: new PublicKey("EnLyuzF3uuYCrBJhE8RWdzu146HazfwUxvpm3Fmw8mxh"),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: TOKENS.mSOL.mintAddress,
        lendingPoolInfoAccount: new PublicKey('492Hr5QDQyrsLcyXqMZ7A5osjmqwtn4cdKNQLDBYBzvy'),
        lendingPoolTknAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolFeeAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolShareMint: new PublicKey('4mntRxKJWib1YTWNV4aLfszF6FeziBHdwnNAwGSfKKMX'),
        lendingPoolShareAccount: new PublicKey('EbWWhmDLKXDdq2guubVJCdSztuUaN6XhtwVMy9TMMwtV'),
        lendingPoolCreditMint: new PublicKey('Fdu3QfaQ9VL4GF85NrkpzhKRAJECv9cx7gchHca5MsRt'),
        lendingPoolCreditAccount: new PublicKey('HdTwUP1U3WQ1EnYPP8c8mx8sqHhXYQ9zwKVsLGxWi7W1'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("Hme4Jnqhdz2jAPUMnS7jGE5zv6Y1ynqrUEhmUAWkXmzn"),
      swapPoolAuthority: new PublicKey("9Z7E42k46kxnBjAh8YGXDw3rRGwwxQUBYM7Ccrmwg6ZP"),
      lpMint: new PublicKey("8PSfyiTVwPb6Rr2iZ8F3kNpbg65BCfJM9v8LfB916r44"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("3W3Skj2vQsNEMhGRQprFXQy3Q8ZbM6ojdgiDCokVPWno"),
      swapTknVault0: new PublicKey("7hFgNawzzmpDM8TTVCKm8jykBrym8C3TQdb8TDAfAVkD"),
      swapTknVault1: new PublicKey("GBa7G5f1FqAXEgByuHXsqsEdpyMjRgT9SNxZwmmnEJAY"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("EvtMzreDMq1U8ytV5fEmfoWNfPhrjZ87za835GuRvZCc"),
      stakePoolAuthority: new PublicKey("9czgZkSxLFtxmvWSb1PEHmUyBuNpAUxj9XAcHKikYnzt"),
      stakePoolFarmTknMint: new PublicKey("5r3vDsNTGXXb9cGQfqyNuYD2bjhRPymGJBfDmKosR9Ev"),
      stakePoolRewardsTknVault: new PublicKey("A1enLcj9XmuVeYCQScEruwnfAz7ksQhbuGFUgvgeS1a6"),
      stakePoolLpVault: new PublicKey("8F6NCo1PiakW7m3eeEZvdxsjXF5bkLD3QZsTxaNg9jvv"),

      doubleDipPool: {
        rewardTknMint: TOKENS.MNDE.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("5fhDMuGKRDPWVWXf7BBEwifRFrp6XwXctDQoG7UHGVt6"),
        doubleDipStakePoolAuthority: new PublicKey("FvXa954NiCqE2jAthxV5oVcuuPAJCggwYtAihYDRhVUw"),
        doubleDipStakePoolFarmTknMint: new PublicKey("9y3QYM5mcaB8tU7oXRzAQnzHVa75P8riDuPievLp64cY"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("XbkV9HZpLdv3CjMUfoq4t8nkxR6UguHb4oP8aAKBGV2"),
        doubleDipStakePoolFarmTknVault: new PublicKey("CdbgqE5B9oADrSAWc51Mgw6c3B6nvYJ4c431rftpoVqZ"),

        doubleDipRewardsSwapPool: {
          rewardsSwapPoolId: new PublicKey("vjHagYsgZwG9icyFLHu2xWHWdtiS5gfeNzRhDcPt5xq"),
          rewardsSwapPoolAuthority: new PublicKey("3HWcojnC1ruEMmsE92Ez1BoebdDXzYQa4USaeWX7eTuM"),
          rewardsTargetlpMint: new PublicKey("5PHS5w6hQwFNnLz1jJFe7TVTxSQ98cDYC3akmiAoFMXs"),
          rewardsSwapfeeAccount: new PublicKey("46mdANZ2DCA2sTFchvD7WwbffbLQa4jCFkkRL23WuYG8"),
          rewardsSwapPoolRewardsVault: new PublicKey("2LferrWvYWtHFfdkmixzt9g3aKa3yBNfgbRrP1CcWMMp"),
          rewardsSwapPoolTargetVault: new PublicKey("GimsuZjYqMXM6xK6S3e9JpGvX6jaMPuNeR6s2piDESmy"),
        }
      },
    },
  },

  'ORCA-mSOL': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'ORCA/mSOL[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.mSOL.mintAddress,
    tknMint1: TOKENS.ORCA.mintAddress,

    strategyAccount: new PublicKey('AhKRtJa8QNA1UMMhN82mjL4kZe9kMwLeixkkCuBoZwjq'),
    strategyAuthority: new PublicKey('Az8vouoyEg5nC3Cw8AeRUZ5ewkEnbNzkSsBK7FrK8ZkE'),
    strategyFarmInfo: new PublicKey('2RUqyHNXV5AP2cU8s26oRqHDeXyHJoQj5H6DKB3E3AA7'),
    strategyTknAccount0: new PublicKey('4LkTyGBWYW8SgvCW3VnswmXpQxJUJQw5wMdgCmPUofGM'),
    strategyTknAccount1: new PublicKey('D727fC4EdkgxgyKTdRvHASacstyG2Qsu769rERrzA9vv'),
    strategyLpTknAccount: new PublicKey('2xSNY4zHH19X61a1ti7gtYUt1koEnnw2q1V6spmzPTjR'),
    strategyRewardTknAccount: new PublicKey('D727fC4EdkgxgyKTdRvHASacstyG2Qsu769rERrzA9vv'),
    strategyFarmTknAccount: new PublicKey('3xfR9VxpbfgkqVX1kFDZfWvKuEkcAuLYDxW2mgxEcToB'),
    strategyBorrowCreditAccount0: new PublicKey('7NZGiU5mbS4TS2ZZvawzmaP1DbgRTvgJMFzP5x7xPigo'),
    strategyBorrowCreditAccount1: new PublicKey('9iHo49ZzkeGxvPrLWoRKKfpErBNcTQYYvX5R1uHri3GY'),
    doubleDipStrategyFarmTknAccount: new PublicKey('EDsSTbwHaUEHTvDMXTb4oLRvQiWHBNT2FpbEvTJTPuG3'),
    doubleDipStrategyRewardTknAccount: new PublicKey('85dFc25DSFEXHWPczGTRXLYHG7wu5yk4KMjWa9ofPTx1'),
    doubleDipStrategyFarmInfo: new PublicKey('Gc2k73sfPsApCdBUhSwMmyvA2CFPgRHxNVySpoSLC1hW'),

    strategyRewardsSwapTargetAccount: new PublicKey('4LkTyGBWYW8SgvCW3VnswmXpQxJUJQw5wMdgCmPUofGM'),
    strategyDoubleDipRewardsSwapTargetAccount: new PublicKey("4LkTyGBWYW8SgvCW3VnswmXpQxJUJQw5wMdgCmPUofGM"),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.mSOL.mintAddress,
        lendingPoolInfoAccount: new PublicKey('492Hr5QDQyrsLcyXqMZ7A5osjmqwtn4cdKNQLDBYBzvy'),
        lendingPoolTknAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolFeeAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolShareMint: new PublicKey('4mntRxKJWib1YTWNV4aLfszF6FeziBHdwnNAwGSfKKMX'),
        lendingPoolShareAccount: new PublicKey('EbWWhmDLKXDdq2guubVJCdSztuUaN6XhtwVMy9TMMwtV'),
        lendingPoolCreditMint: new PublicKey('Fdu3QfaQ9VL4GF85NrkpzhKRAJECv9cx7gchHca5MsRt'),
        lendingPoolCreditAccount: new PublicKey('HdTwUP1U3WQ1EnYPP8c8mx8sqHhXYQ9zwKVsLGxWi7W1'),
      },
      "1": {
        tknMint: TOKENS.ORCA.mintAddress,
        lendingPoolInfoAccount: new PublicKey("9bo5JunUhp4XD7TDeeS9ARvWTYGBYtuQKUHGUb7RRvkf"),
        lendingPoolTknAccount: new PublicKey("F3EhkuRuZaYNY2bLTosjv6V7QXiZ8db9nXTZeLnmHC7V"),
        lendingPoolFeeAccount: new PublicKey("F3EhkuRuZaYNY2bLTosjv6V7QXiZ8db9nXTZeLnmHC7V"),
        lendingPoolShareMint: new PublicKey("DKoKBD7YheCGZjWp5CaHDPtheAcUveRSMvWkaivbNzWh"),
        lendingPoolShareAccount: new PublicKey("AMUE9EgiEiTP1YVBicwTVGtumBypR5thjTgbsXZM2PPG"),
        lendingPoolCreditMint: new PublicKey("CJNd1LZZxZr243dpNN9DtEavXn65kstrg251MPb8vmwW"),
        lendingPoolCreditAccount: new PublicKey("74m1zyzV8x9d8kZLEaVaNWRsnx8pH47tfX8cquot11ef"),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("49tTgthTYLMPEqozZNyEQifqkGYxHqqDie9YxVczS3iB"),
      swapPoolAuthority: new PublicKey("9FQ9gDtS6uNr5SMPafuzkDit2rMftHfQuz5mg2X3TqHT"),
      lpMint: new PublicKey("CVapmQn7HaU1yMDW3q6oUV4hx6XoYv54T4zfGXkuJqkA"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("Hq9xxKdMavJd4teMZusF4PiGNGV3hxdcMZwAdngkHCg7"),
      swapTknVault0: new PublicKey("7MuvRUFT1wWiL7uJKdZqNwk9Fmz2HJ36bEArhDTnyFij"),
      swapTknVault1: new PublicKey("7hoYJc4aqttctANrNe75gscdmQD9HcXZED6AjdDdZMQ9"),

      rewardsSwapPoolId: new PublicKey("49tTgthTYLMPEqozZNyEQifqkGYxHqqDie9YxVczS3iB"),
      rewardsSwapPoolAuthority: new PublicKey("9FQ9gDtS6uNr5SMPafuzkDit2rMftHfQuz5mg2X3TqHT"),
      rewardsTargetlpMint: new PublicKey("CVapmQn7HaU1yMDW3q6oUV4hx6XoYv54T4zfGXkuJqkA"),
      rewardsSwapfeeAccount: new PublicKey("Hq9xxKdMavJd4teMZusF4PiGNGV3hxdcMZwAdngkHCg7"),
      rewardsSwapPoolRewardsVault: new PublicKey("7hoYJc4aqttctANrNe75gscdmQD9HcXZED6AjdDdZMQ9"),
      rewardsSwapPoolTargetVault: new PublicKey("7MuvRUFT1wWiL7uJKdZqNwk9Fmz2HJ36bEArhDTnyFij"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("7EVKT4iqfjiyzeVrafs23JrfhSoLd6XTanVuENNvisq7"),
      stakePoolAuthority: new PublicKey("7vPbZzcBZjs1eVDRGeVazNqoi3gSWoAHbjoDRUtF6Xr8"),
      stakePoolFarmTknMint: new PublicKey("3Duk5b6fLztPmS4ryV48FM1Q9WXUSMwz9jehAT4UtqpE"),
      stakePoolRewardsTknVault: new PublicKey("GgKGYf3k17Dmoe6QhQS2rhguXn2TsUs3TVdsZWB8qeHP"),
      stakePoolLpVault: new PublicKey("Eb449VDq3FFWbcaeip3NpbmZCy44Hg7DcrsHDvnxCYZg"),

      doubleDipPool: {
        rewardTknMint: TOKENS.MNDE.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("41ZYSekqDNtJ1BdGkTZVR1CJfBiFrud6HcT3HVUdSyWN"),
        doubleDipStakePoolAuthority: new PublicKey("5RZJ7uq4rYDbTiA64kmNPqtwYm9LzzCCsaiLFPxw7wbg"),
        doubleDipStakePoolFarmTknMint: new PublicKey("876yhw4J4GHyynNJUtARYEnWGaejhrWC7Hy3DAm1pZxi"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("DJLZ8xV7ZzEKFXtuA7TDUBGnzikHBXB9y9EpDyddcQdK"),
        doubleDipStakePoolFarmTknVault: new PublicKey("J6VvyYhRyCFb5wX17uHB4xxDsey6WYjhdCw78McmcXd6"),

        doubleDipRewardsSwapPool: {
          rewardsSwapPoolId: new PublicKey("vjHagYsgZwG9icyFLHu2xWHWdtiS5gfeNzRhDcPt5xq"),
          rewardsSwapPoolAuthority: new PublicKey("3HWcojnC1ruEMmsE92Ez1BoebdDXzYQa4USaeWX7eTuM"),
          rewardsTargetlpMint: new PublicKey("5PHS5w6hQwFNnLz1jJFe7TVTxSQ98cDYC3akmiAoFMXs"),
          rewardsSwapfeeAccount: new PublicKey("46mdANZ2DCA2sTFchvD7WwbffbLQa4jCFkkRL23WuYG8"),
          rewardsSwapPoolRewardsVault: new PublicKey("2LferrWvYWtHFfdkmixzt9g3aKa3yBNfgbRrP1CcWMMp"),
          rewardsSwapPoolTargetVault: new PublicKey("GimsuZjYqMXM6xK6S3e9JpGvX6jaMPuNeR6s2piDESmy"),
        }
      }
    },
  },

  'mSOL-USDT': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'mSOL/USDT[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDT.mintAddress,
    tknMint1: TOKENS.mSOL.mintAddress,

    strategyAccount: new PublicKey('AeH5HCGUM9sB4oiCHZ9ivHzoU3hdjbEYNbHsE23ELcCC'),
    strategyAuthority: new PublicKey('4oaQW1YmsaNsR5fUiNkp3mqc8SyGtygfUY47J5Z3rRii'),
    strategyFarmInfo: new PublicKey('8gRcrKJxxs6X6GbkaRapXcdG2vqmZSc5HKDPTRGSXtt5'),
    strategyTknAccount0: new PublicKey('98FEoJ6nS6J9SGqWg5t94YSzjh3fJJQxmtwn5PpZwnHA'),
    strategyTknAccount1: new PublicKey('BVNDMiA2Z5wxCSbTSPrCB4sgwdaN94p8XYHfrUM9w89c'),
    strategyLpTknAccount: new PublicKey('AM4avvcvNpPXWjvWryrKGGtcUNwDtuPB2KQVQJ35gE75'),
    strategyRewardTknAccount: new PublicKey('HomWTCEBpnxHk2J3jj6aTZ7Zg8SneYCfA6L9w7WCkQY3'),
    strategyFarmTknAccount: new PublicKey('64ASMEThXJHJckUjgsb6bD8S3vE3SWfCErhe4DYH3CEZ'),
    strategyBorrowCreditAccount0: new PublicKey('6Qxk5JXH46DAXDLV8hMPEs7SKSym5JfBZQ4a1HQnpykP'),
    strategyBorrowCreditAccount1: new PublicKey('KMJ4QuYduNvfUcLYuw5i1rCdwPiaMaEfHJaNzd6WEmP'),
    doubleDipStrategyFarmTknAccount: new PublicKey('AEH4iCGU3JXuvefrMxuzSnPyaUoLDvahvQZNpgZmhJpT'),
    doubleDipStrategyRewardTknAccount: new PublicKey('8JUgr4BhigrHLqdK1herX7sDqvztHSuidtX3wbrw7Ts7'),
    doubleDipStrategyFarmInfo: new PublicKey('AxYyHK4xNPK6hcUH8sqA28e9WbEa7gTorxW3QaSKKVat'),

    strategyRewardsSwapTargetAccount: new PublicKey('BVNDMiA2Z5wxCSbTSPrCB4sgwdaN94p8XYHfrUM9w89c'),
    strategyDoubleDipRewardsSwapTargetAccount: new PublicKey("BVNDMiA2Z5wxCSbTSPrCB4sgwdaN94p8XYHfrUM9w89c"),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDT.mintAddress,
        lendingPoolInfoAccount: new PublicKey("EyqWUeme2B1dhuwJvJVi2coYPcGWmWrakcpsSFeikrhb"),
        lendingPoolTknAccount: new PublicKey("Acx3Ky9pk8CyYftA9HYF31EbVhBDi21EqJsFtMW2XxXW"),
        lendingPoolFeeAccount: new PublicKey("7gAN5Y4hGAG2A9vyr9dURGosjmo4Rwiaqz4iKZGNenE1"),
        lendingPoolShareMint: new PublicKey("8TtsTZQ6mU4YSW5jw4sDjSDEG1CW8QLpK7C9g5TVgBvn"),
        lendingPoolShareAccount: new PublicKey("EfLgyXRGFi9MUCMgrsFBuAJ7pMPXBceKhD6x4PgdvLLc"),
        lendingPoolCreditMint: new PublicKey("CoheXVD8cAdVaKznfay22dBpfML5Fbz5g4j67syKgRg4"),
        lendingPoolCreditAccount: new PublicKey("EAQxDXsA6RXxWtA1PwZNnTnj2MapHBtMzvUmfuGPJCPX"),
      },
      "1": {
        tknMint: TOKENS.mSOL.mintAddress,
        lendingPoolInfoAccount: new PublicKey('492Hr5QDQyrsLcyXqMZ7A5osjmqwtn4cdKNQLDBYBzvy'),
        lendingPoolTknAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolFeeAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolShareMint: new PublicKey('4mntRxKJWib1YTWNV4aLfszF6FeziBHdwnNAwGSfKKMX'),
        lendingPoolShareAccount: new PublicKey('EbWWhmDLKXDdq2guubVJCdSztuUaN6XhtwVMy9TMMwtV'),
        lendingPoolCreditMint: new PublicKey('Fdu3QfaQ9VL4GF85NrkpzhKRAJECv9cx7gchHca5MsRt'),
        lendingPoolCreditAccount: new PublicKey('HdTwUP1U3WQ1EnYPP8c8mx8sqHhXYQ9zwKVsLGxWi7W1'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("Afofkb7JTc32rdpqiyc3RDmGF5s9N6W1ujcdYVfGZ5Je"),
      swapPoolAuthority: new PublicKey("8vrC1FAnW6hQMwJuU5waZdRrBbDJTULqjpdc4GjDtKR6"),
      lpMint: new PublicKey("9cMWe4UYRPGAUUsTkjShJWVM7bk8DUBgxtwwH8asFJoV"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("7GPvi21QbwMyBoXU5Zqf8VhnuEh7VH4A1SRPgHJ36eE7"),
      swapTknVault0: new PublicKey("J15KntYr6iout4ce2kcD2QEdkVbLN4EHHFLfCtke3f6Y"),
      swapTknVault1: new PublicKey("RTXKRxghfWJpE344UG7UhKnCwN2Gyv6KnNSTFDnaASF"),

      rewardsSwapPoolId: new PublicKey("49tTgthTYLMPEqozZNyEQifqkGYxHqqDie9YxVczS3iB"),
      rewardsSwapPoolAuthority: new PublicKey("9FQ9gDtS6uNr5SMPafuzkDit2rMftHfQuz5mg2X3TqHT"),
      rewardsTargetlpMint: new PublicKey("CVapmQn7HaU1yMDW3q6oUV4hx6XoYv54T4zfGXkuJqkA"),
      rewardsSwapfeeAccount: new PublicKey("Hq9xxKdMavJd4teMZusF4PiGNGV3hxdcMZwAdngkHCg7"),
      rewardsSwapPoolRewardsVault: new PublicKey("7hoYJc4aqttctANrNe75gscdmQD9HcXZED6AjdDdZMQ9"),
      rewardsSwapPoolTargetVault: new PublicKey("7MuvRUFT1wWiL7uJKdZqNwk9Fmz2HJ36bEArhDTnyFij"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("HULY26UFdfVkc2STTt1KREd57BwFV2md1tqdk253QyiK"),
      stakePoolAuthority: new PublicKey("BN7MreiaaoNabe5Kkkc8fnxUMV7TgLA5YLE4zFzyu5Ka"),
      stakePoolFarmTknMint: new PublicKey("Afvh7TWfcT1E9eEEWJk17fPjnqk36hreTJJK5g3s4fm8"),
      stakePoolRewardsTknVault: new PublicKey("5GgjcSEtXmZfK3emhyDgDPWM37YDMkX3M6FP7zG5D776"),
      stakePoolLpVault: new PublicKey("3N8ZQ4Vm2fXkjGc86kE4asmJdjzCmC6MRNHRmPRUkwDc"),

      doubleDipPool: {
        rewardTknMint: TOKENS.MNDE.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("FNV9pGMWTYSMq5dRhmjpRwHpDJKV6JD4HTKsqZndKvuY"),
        doubleDipStakePoolAuthority: new PublicKey("3vZS49qRXVP8oeYzehADXH8rbF5LHdkAGXny2gJjnoVj"),
        doubleDipStakePoolFarmTknMint: new PublicKey("7iKG16aukdXXw43MowbfrGqXhAoYe51iVR9u2Nf2dCEY"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("5jNTsageVTQx8acJWPF57yT1imphN3K4jtnaFrrgWGUC"),
        doubleDipStakePoolFarmTknVault: new PublicKey("HNGTVFUAyUwZnow75uhEDcqZFzqkF2nWzUbRWvvZUv8e"),

        doubleDipRewardsSwapPool: {
          rewardsSwapPoolId: new PublicKey("vjHagYsgZwG9icyFLHu2xWHWdtiS5gfeNzRhDcPt5xq"),
          rewardsSwapPoolAuthority: new PublicKey("3HWcojnC1ruEMmsE92Ez1BoebdDXzYQa4USaeWX7eTuM"),
          rewardsTargetlpMint: new PublicKey("5PHS5w6hQwFNnLz1jJFe7TVTxSQ98cDYC3akmiAoFMXs"),
          rewardsSwapfeeAccount: new PublicKey("46mdANZ2DCA2sTFchvD7WwbffbLQa4jCFkkRL23WuYG8"),
          rewardsSwapPoolRewardsVault: new PublicKey("2LferrWvYWtHFfdkmixzt9g3aKa3yBNfgbRrP1CcWMMp"),
          rewardsSwapPoolTargetVault: new PublicKey("GimsuZjYqMXM6xK6S3e9JpGvX6jaMPuNeR6s2piDESmy"),
        }
      },
    },
  },

  'BTC-mSOL': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'BTC/mSOL[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.mSOL.mintAddress,
    tknMint1: TOKENS.BTC.mintAddress,

    strategyAccount: new PublicKey('9zMQBWrGY4rxPrL8PSKD4FQoYzysA3a86p5nkpF8Ltmr'),
    strategyAuthority: new PublicKey('8LDEYXYpwDzHwayHHW8j9sj1Yb3tqF1Y2egyTip9Wxq9'),
    strategyFarmInfo: new PublicKey('FRCWQiZjmSAXwDs9rugpgAFksTZpYV8s93codVJejB5Q'),
    strategyTknAccount0: new PublicKey('9wofruqET6U4FJXLRcgAXTM5DsBXozALzUYG11UbkDKx'),
    strategyTknAccount1: new PublicKey('E1bXW1k6BHCw6ert3vLetWsijUcGWx5i3wsQPPBXFc6y'),
    strategyLpTknAccount: new PublicKey('5gsUu8ZrRih8e2zDyMbvCdFZxSVyikfnwH3cyR1LTyF3'),
    strategyRewardTknAccount: new PublicKey('JB2GGCVo7obJ1ZQpo2m5NTxdBKrp3NCixcLic9e3eS91'),
    strategyFarmTknAccount: new PublicKey('HJQBk1McSBmF56UnAT45nuze3Ksw2sTLJgbv46BH77qG'),
    strategyBorrowCreditAccount0: new PublicKey('4mh9wZYpRqcGsWQrPvht9snoDRZP9j1kresJLbLYdjrB'),
    strategyBorrowCreditAccount1: new PublicKey('Bp4kDmNofER7QdMJmgFzc6aQMXiDpPWDwU3EVYHLGAy2'),
    doubleDipStrategyFarmTknAccount: new PublicKey('HtZY3b7rsdBs8ACAaPr78VuFvp5yFSF1PotDiKC4m2WU'),
    doubleDipStrategyRewardTknAccount: new PublicKey('C5LVnC9t6Zpb1syBwpJv3VFFLPtoEcyFShXf51rGEeq7'),
    doubleDipStrategyFarmInfo: new PublicKey('3KXxqsc1aFVznHs9pUqKRBTvsP1jw5P7pQCjL4Yi2QCT'),

    strategyRewardsSwapTargetAccount: new PublicKey('9wofruqET6U4FJXLRcgAXTM5DsBXozALzUYG11UbkDKx'),
    strategyDoubleDipRewardsSwapTargetAccount: new PublicKey("9wofruqET6U4FJXLRcgAXTM5DsBXozALzUYG11UbkDKx"),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.mSOL.mintAddress,
        lendingPoolInfoAccount: new PublicKey('492Hr5QDQyrsLcyXqMZ7A5osjmqwtn4cdKNQLDBYBzvy'),
        lendingPoolTknAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolFeeAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolShareMint: new PublicKey('4mntRxKJWib1YTWNV4aLfszF6FeziBHdwnNAwGSfKKMX'),
        lendingPoolShareAccount: new PublicKey('EbWWhmDLKXDdq2guubVJCdSztuUaN6XhtwVMy9TMMwtV'),
        lendingPoolCreditMint: new PublicKey('Fdu3QfaQ9VL4GF85NrkpzhKRAJECv9cx7gchHca5MsRt'),
        lendingPoolCreditAccount: new PublicKey('HdTwUP1U3WQ1EnYPP8c8mx8sqHhXYQ9zwKVsLGxWi7W1'),
      },
      "1": {
        tknMint: TOKENS.BTC.mintAddress,
        lendingPoolInfoAccount: new PublicKey('DxAuEAxKYXsKMYG5Ma4TM8AsrAo7LQBSnbEGicU7i1ek'),
        lendingPoolTknAccount: new PublicKey('2MN34BxuLVrjZpKYKHmW1c6ZGeQs4aWQRrEvmrYfZdtG'),
        lendingPoolFeeAccount: new PublicKey('2MN34BxuLVrjZpKYKHmW1c6ZGeQs4aWQRrEvmrYfZdtG'),
        lendingPoolShareMint: new PublicKey('2G9iwy9zfLaXB2bFiqSA7YbKEvtAEXVmdvGTF28jQVgg'),
        lendingPoolShareAccount: new PublicKey('HGejymLhai1TDvRA4vBEbS5VRbKP1u74ZdzZcv8Y2o1M'),
        lendingPoolCreditMint: new PublicKey('6WzqPd81AqsCwbXp33A6ro87axfD9je32hn3JE4KsnGi'),
        lendingPoolCreditAccount: new PublicKey('E7HkZYeY8mqrtC45kusWiArqLNpGnV5Foioj6yEPHB1y'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("8DRw5wQE1pyg6RB1UwypGNFgb2Pzp2hpyDDNwo76Lcc8"),
      swapPoolAuthority: new PublicKey("3X1aLdyvcQNc8TvBMPiucMsRCnGMBnGsjJHpZEyCf3pn"),
      lpMint: new PublicKey("8nKJ4z9FSw6wrVZKASqBiS9DS1CiNsRnqwCCKVQjqdkB"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("AqiLHbUAy4UWWKGVVgbHsaUVCMg1zemNkgsYBPSirT92"),
      swapTknVault0: new PublicKey("EPoVJLhi9QtVPVo8n31M5k5Knvb48j8zbYyRrUbrHwC5"),
      swapTknVault1: new PublicKey("6D3sxC6yEe84FUnF5Kpbgx6gN57N9poJCKAtrCeCWdJo"),

      rewardsSwapPoolId: new PublicKey("49tTgthTYLMPEqozZNyEQifqkGYxHqqDie9YxVczS3iB"),
      rewardsSwapPoolAuthority: new PublicKey("9FQ9gDtS6uNr5SMPafuzkDit2rMftHfQuz5mg2X3TqHT"),
      rewardsTargetlpMint: new PublicKey("CVapmQn7HaU1yMDW3q6oUV4hx6XoYv54T4zfGXkuJqkA"),
      rewardsSwapfeeAccount: new PublicKey("Hq9xxKdMavJd4teMZusF4PiGNGV3hxdcMZwAdngkHCg7"),
      rewardsSwapPoolRewardsVault: new PublicKey("7hoYJc4aqttctANrNe75gscdmQD9HcXZED6AjdDdZMQ9"),
      rewardsSwapPoolTargetVault: new PublicKey("7MuvRUFT1wWiL7uJKdZqNwk9Fmz2HJ36bEArhDTnyFij"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("GBrpFtiTabs14mc4Hi1RX9YiQY7res6JxrVfMTADfcQV"),
      stakePoolAuthority: new PublicKey("8sVCTztvytajkdczYEZVkSmuoRLjnMezwpT46L5w4RWR"),
      stakePoolFarmTknMint: new PublicKey("DzpLz78wuwyFsQToin8iDv6YK6aBEymRqQq82swiFh7r"),
      stakePoolRewardsTknVault: new PublicKey("CNe5S831UP4YkumU7UsusTkf7uxJnAVdmPe6jhF51k4y"),
      stakePoolLpVault: new PublicKey("75gpvckCXk49zTUwG8QrzUSP4NpWh3JXdyELBrnAhimL"),

      doubleDipPool: {
        rewardTknMint: TOKENS.MNDE.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("Cn7QNyosNQ8DyKEeMDPmtg66R7vKMXigcQ561kTkFD8E"),
        doubleDipStakePoolAuthority: new PublicKey("9Lg5wBjcYDgY8S2ZAEqjtXAQ4UdHuw65aP1WmmWss4QX"),
        doubleDipStakePoolFarmTknMint: new PublicKey("6uA1ADUJbvwYJZpzUn9z9LuyKoRVngBKcQTKdXsSivA8"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("Ea3FYh9RMJxwsyu3xS7BesLMtpX32DURohiEigG2iJCx"),
        doubleDipStakePoolFarmTknVault: new PublicKey("DuyHVLzsqg6SZeFNbpUWfJf67kvAXPWUdUGJYWJK5vTu"),

        doubleDipRewardsSwapPool: {
          rewardsSwapPoolId: new PublicKey("vjHagYsgZwG9icyFLHu2xWHWdtiS5gfeNzRhDcPt5xq"),
          rewardsSwapPoolAuthority: new PublicKey("3HWcojnC1ruEMmsE92Ez1BoebdDXzYQa4USaeWX7eTuM"),
          rewardsTargetlpMint: new PublicKey("5PHS5w6hQwFNnLz1jJFe7TVTxSQ98cDYC3akmiAoFMXs"),
          rewardsSwapfeeAccount: new PublicKey("46mdANZ2DCA2sTFchvD7WwbffbLQa4jCFkkRL23WuYG8"),
          rewardsSwapPoolRewardsVault: new PublicKey("2LferrWvYWtHFfdkmixzt9g3aKa3yBNfgbRrP1CcWMMp"),
          rewardsSwapPoolTargetVault: new PublicKey("GimsuZjYqMXM6xK6S3e9JpGvX6jaMPuNeR6s2piDESmy"),
        }
      }
    },
  },

  'ETH-SOL': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'ETH/SOL[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: NATIVE_MINT,
    tknMint1: TOKENS.ETH.mintAddress,

    strategyAccount: new PublicKey('GPySRVcWB92MzeALTtWuXUMcGmCpegZ8y47CzC3qEGpU'),
    strategyAuthority: new PublicKey('85ujzoN4xuxFPaHsKUnRFHoQpE8dVpvCHU974YpcQkCW'),
    strategyFarmInfo: new PublicKey('BGTbTBi2E1aDDkm1A8y2D94A54fSEscGM9dVFtMAxGcu'),
    strategyTknAccount0: new PublicKey('Fx9sG8xMFxsuAYWteQvgb9CrkJJrZLbnDq5bc9jupYJx'),
    strategyTknAccount1: new PublicKey('HMRdi6KhJ9V8EuviUqbU72jnGYXEQDNAic7Ls1EJaYcA'),
    strategyLpTknAccount: new PublicKey('4cfbYCSpFFuTw5sjoprYujj8uWuH9vjRA7GrHgvuSZ4a'),
    strategyRewardTknAccount: new PublicKey('5UN6Wt4snG8H1mnJ4zosQ4SYQZ4aX3gvvzCAX1m7Jwyf'),
    strategyFarmTknAccount: new PublicKey('AAbbqErPaaBcEDonrUPf9SBTXZJAxBDtywRQdPt1K4TH'),
    strategyBorrowCreditAccount0: new PublicKey('EqasZueQveyRgbpn2q5LHnTJTChmnMARjXbNSPmN243a'),
    strategyBorrowCreditAccount1: new PublicKey('ABECTwu3S17AU4ySDrXfuVDJ98UGgk6VSmZQKhX3Y5yK'),

    strategyRewardsSwapTargetAccount: new PublicKey('Fx9sG8xMFxsuAYWteQvgb9CrkJJrZLbnDq5bc9jupYJx'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: NATIVE_MINT, // wsol
        lendingPoolInfoAccount: new PublicKey("EnZC8MB6QLTxwN1LNqCXYC7XMpvXqitnYQPf5y5AcQRn"),
        lendingPoolTknAccount: new PublicKey("GiJwrxQW5NQWWAva4rnDMXwHxfrhyUzwMX5to1pmCCgF"),
        lendingPoolFeeAccount: new PublicKey("2BDZqoVKAX3PJKeZJytjk7oEpbUu3jvdgdi6tA8VusnY"),
        lendingPoolShareMint: new PublicKey("92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB"),
        lendingPoolShareAccount: new PublicKey("Hyi1jMgc9MMEZyaG9ziL2PvT7zbeRNKhb5K1kj9bxz4x"),
        lendingPoolCreditMint: new PublicKey("7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG"),
        lendingPoolCreditAccount: new PublicKey("WuPCgCuyLSXatdjyWqkGjCPSQFgKLwcfsNR9fDq3hVL"),
      },
      "1": {
        tknMint: TOKENS.ETH.mintAddress, // eth
        lendingPoolInfoAccount: new PublicKey("CKMQxUz1nkn3NS5B9AUD1uyWNL8iN2piG9LVt1RvWXzj"),
        lendingPoolTknAccount: new PublicKey("9MH38iiDX4Pk37U6TXLqz2783RspNhwBTYwBNHp8WUzP"),
        lendingPoolFeeAccount: new PublicKey("8UPe7Fcm2f1QEFQh2YNr1jg2vgQmj4CXhLYEWgStHd8B"),
        lendingPoolShareMint: new PublicKey("B8QXcUv5FFwyHH5V88g6PhYBc8fQvwSpza4C9PsiRpQD"),
        lendingPoolShareAccount: new PublicKey("C5X2Q2K2jQtwpuqHKnLVJ1ZsvL9BMRwddMgqaQ5UGNkC"),
        lendingPoolCreditMint: new PublicKey("BKKbCDggM83SPLFd1jRPu1ZsCv9nXkwZVne11N9FEs9w"),
        lendingPoolCreditAccount: new PublicKey("9A3KAmmv1VyqNqVGBM6T9b1dp9Ax9xxdeXEgedo8U7Gh"),
      }
    },
    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("EuK3xDa4rWuHeMQCBsHf1ETZNiEQb5C476oE9u9kp8Ji"),
      swapPoolAuthority: new PublicKey("DffrDbzPiswDJaiicBBo9CjqztKgFLrqXGwNJH4XQefZ"),
      lpMint: new PublicKey("71FymgN2ZUf7VvVTLE8jYEnjP3jSK1Frp2XT1nHs8Hob"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("unxKgWEc71ZiHwMqZs3VLqjcjmZhfTZEg94ZLGvjdMP"),
      swapTknVault0: new PublicKey("5pUTGvN2AA2BEzBDU4CNDh3LHER15WS6J8oJf5XeZFD8"),
      swapTknVault1: new PublicKey("7F2cLdio3i6CCJaypj9VfNDPW2DwT3vkDmZJDEfmxu6A"),

      rewardsSwapPoolId: new PublicKey("2ZnVuidTHpi5WWKUwFXauYGhvdT9jRKYv5MDahtbwtYr"),
      rewardsSwapPoolAuthority: new PublicKey("2PH1quJj9MHQXATCmNZ6qQ2gZqM8R236DpKaz99ggVpm"),
      rewardsTargetlpMint: new PublicKey("2uVjAuRXavpM6h1scGQaxqb6HVaNRn6T2X7HHXTabz25"),
      rewardsSwapfeeAccount: new PublicKey("4Zc4kQZhRQeGztihvcGSWezJE1k44kKEgPCAkdeBfras"),
      rewardsSwapPoolRewardsVault: new PublicKey("AioST8HKQJRqjE1mknk4Rydc8wVADhdQwRJmAAYX1T6Z"),
      rewardsSwapPoolTargetVault: new PublicKey("73zdy95DynZP4exdpuXTDsexcrWbDJX9TFi2E6CDzXh4"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("3ARgavt1NhqLmJWj3wAJy6XBarG6pJbEKRv1wzzRbbaN"),
      stakePoolAuthority: new PublicKey("HXY2Vvj2XyqiPNXV3PhM9YYKgfjqzXUX4tUFRnvqihdY"),
      stakePoolFarmTknMint: new PublicKey("CGFTRh4jKLPbS9r4hZtbDfaRuC7qcA8rZpbLnVTzJBer"),
      stakePoolRewardsTknVault: new PublicKey("FYTTVMqWPzbnhTsukgiWmPiNJam4yLTxHM9mpzdan2zo"),
      stakePoolLpVault: new PublicKey("6ckhPnn6tCr88aq9SxhWaAA5G7izuXNKhVk1Xa62zhFD"),

      doubleDipPool: undefined

    },
  },

  'NINJA-SOL': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'NINJA/SOL[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: NATIVE_MINT,
    tknMint1: TOKENS.NINJA.mintAddress,

    strategyAccount: new PublicKey('2RQpqvSFPWrL5QYa2BkpqwkfQuDWqTQuYEWGJdikbZGo'),
    strategyAuthority: new PublicKey('G6pDSRWRnC9eeJbMVRSPdHeW6byNKt172K5KEeBemZGG'),
    strategyFarmInfo: new PublicKey('HWEijHM7Kb72Js4Z3GNw3X3cTprXUoNY64m8mJAvHJkh'),
    strategyTknAccount0: new PublicKey('9XMp4JXh1XmJJYuKvoCng7Gvzc1KbCL8WEdGTQ9roFKq'),
    strategyTknAccount1: new PublicKey('3vm3UmyMFoEonzL72RdAqqMFt1PUrrTno7S7R4b7yuyt'),
    strategyLpTknAccount: new PublicKey('CXwooNqgHcnU7QX5aHT9kxAqBf5ZN19fbScwcp9m7WGF'),
    strategyRewardTknAccount: new PublicKey('2gzdZNaJhV3DESBSZZigi9AdWaLc7LMyxm1JYDiKVH7J'),
    strategyFarmTknAccount: new PublicKey('EN1Vs7TyfRjSMn1NbkHRXjFwKkigAn9FJDvE7gQzgf5e'),
    strategyBorrowCreditAccount0: new PublicKey('ENbDHg8LNwoFEFLXeyq4gVPuZJihCytexK4EKxaNQAUt'),
    strategyBorrowCreditAccount1: new PublicKey('B72fJr6G4yTArHi8RdrCD4GitcLN9c6mkTwoCjM9unoo'),
    doubleDipStrategyFarmTknAccount: new PublicKey('8bqN3VxXzC4CHqTYx7oTuXtenrMqJSfYHbZh9Z5r5Z4g'),
    doubleDipStrategyRewardTknAccount: new PublicKey('3vm3UmyMFoEonzL72RdAqqMFt1PUrrTno7S7R4b7yuyt'),
    doubleDipStrategyFarmInfo: new PublicKey('9gEm3aNSqKrMYsti6LqcsvBhFc2ko16JqFWtpiLu47AT'),

    strategyRewardsSwapTargetAccount: new PublicKey('9XMp4JXh1XmJJYuKvoCng7Gvzc1KbCL8WEdGTQ9roFKq'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: NATIVE_MINT, // wsol
        lendingPoolInfoAccount: new PublicKey("EnZC8MB6QLTxwN1LNqCXYC7XMpvXqitnYQPf5y5AcQRn"),
        lendingPoolTknAccount: new PublicKey("GiJwrxQW5NQWWAva4rnDMXwHxfrhyUzwMX5to1pmCCgF"),
        lendingPoolFeeAccount: new PublicKey("2BDZqoVKAX3PJKeZJytjk7oEpbUu3jvdgdi6tA8VusnY"),
        lendingPoolShareMint: new PublicKey("92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB"),
        lendingPoolShareAccount: new PublicKey("Hyi1jMgc9MMEZyaG9ziL2PvT7zbeRNKhb5K1kj9bxz4x"),
        lendingPoolCreditMint: new PublicKey("7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG"),
        lendingPoolCreditAccount: new PublicKey("WuPCgCuyLSXatdjyWqkGjCPSQFgKLwcfsNR9fDq3hVL"),
      },
      "1": {
        tknMint: TOKENS.NINJA.mintAddress,
        lendingPoolInfoAccount: new PublicKey('2U3t27cfbUg9nkqPiLyijAFZs99NLvKGt3rjBdbueoKh'),
        lendingPoolTknAccount: new PublicKey('Ai5ZtdQtgTpEhbz1ZGriBf5X3ag8R83tfeWK6k6ropdx'),
        lendingPoolFeeAccount: new PublicKey('Ai5ZtdQtgTpEhbz1ZGriBf5X3ag8R83tfeWK6k6ropdx'),
        lendingPoolShareMint: new PublicKey('CHphcXpuc541joUE56Sgcvgx5kLqgGVAJmo6NJkGVbPp'),
        lendingPoolShareAccount: new PublicKey('2QnFwdQcqwsxCVeUbLLXz3CY76P9BxFZSANnMtCUtxKX'),
        lendingPoolCreditMint: new PublicKey('Qxvqqpwea4LZg6wekoZ24A3tDVQLjrwBakuT95P2auy'),
        lendingPoolCreditAccount: new PublicKey('f14uMWJLwj4WQRcFTdoHx2mHnGNcEYMR3meThy1Zswh'),
      }
    },
    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("3ECUtPokme1nimJfuAkMtcm7QYjDEfXRQzmGC16LuYnz"),
      swapPoolAuthority: new PublicKey("H8f9n2PfehUc73gRWSRTPXvqUhUHVywdAxcfEtYmmyAo"),
      lpMint: new PublicKey("4X1oYoFWYtLebk51zuh889r1WFLe8Z9qWApj87hQMfML"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("43ViAbUVujnYtJyzGP4AhabMYCbLsExenT3WKsZjqJ7N"),
      swapTknVault0: new PublicKey("9SxzphwrrDVDkwkyvmtag9NLgpjSkTw35cRwg9rLMYWk"),
      swapTknVault1: new PublicKey("6Y9VyEYHgxVahiixzphNh4HAywpab9zVoD4S8q1sfuL8"),

      rewardsSwapPoolId: new PublicKey("2ZnVuidTHpi5WWKUwFXauYGhvdT9jRKYv5MDahtbwtYr"),
      rewardsSwapPoolAuthority: new PublicKey("2PH1quJj9MHQXATCmNZ6qQ2gZqM8R236DpKaz99ggVpm"),
      rewardsTargetlpMint: new PublicKey("2uVjAuRXavpM6h1scGQaxqb6HVaNRn6T2X7HHXTabz25"),
      rewardsSwapfeeAccount: new PublicKey("4Zc4kQZhRQeGztihvcGSWezJE1k44kKEgPCAkdeBfras"),
      rewardsSwapPoolRewardsVault: new PublicKey("AioST8HKQJRqjE1mknk4Rydc8wVADhdQwRJmAAYX1T6Z"),
      rewardsSwapPoolTargetVault: new PublicKey("73zdy95DynZP4exdpuXTDsexcrWbDJX9TFi2E6CDzXh4"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("B8Q8e1hdCw6fhnSKmsMCrsDbvSNLZyzHjnPpwZKBkcSB"),
      stakePoolAuthority: new PublicKey("5WPjs6sHW8aKEVT21WzA32jTVqQUx1wNTm2QgnxmN1ZX"),
      stakePoolFarmTknMint: new PublicKey("7YyhptkxY81HPzFVfyCzA5UXxWdsNRD41ofLva3TuSpd"),
      stakePoolRewardsTknVault: new PublicKey("8cC2Mdi6ZACAVz5UK8i4ubgFa2W4PntuJGvVWpu6fqS4"),
      stakePoolLpVault: new PublicKey("HBEJRLaqqdJwVi9Co4DU7ZSvXPcszKRfr4eRZRNEBHGA"),

      doubleDipPool: {
        rewardTknMint: TOKENS.NINJA.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("HPeAGzDEhYUNm4z4aV2PTjVjbESnNg6jBy6LtFjFJzQj"),
        doubleDipStakePoolAuthority: new PublicKey("GpY4byhCA27aFnXMXpV7KbgkJhCvYFDwspMUc2cyyfkd"),
        doubleDipStakePoolFarmTknMint: new PublicKey("Db7mPGrZbswvFmJ7MgZsM6CFhnXHMnrUDqr2hrzmi7Re"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("14M38gT4aUcddyeDWFgAy9YWR5zizHpz5fbYMrLS1W7j"),
        doubleDipStakePoolFarmTknVault: new PublicKey("HyBmWzgKHWjfiUiBhAqojPrz9b9TZ5GYxigg7eSjKqze"),

        doubleDipRewardsSwapPool: undefined
      }
    },
  },

  'whETH-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'whETH/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.whETH.mintAddress,

    strategyAccount: new PublicKey('DVERYdhDZAM3vgXFRK4Ef1t4KzvcinHDTE6cYji1i81U'),
    strategyAuthority: new PublicKey('AHSNsJ5wb4NmNTyfiqzYGwJoNV8kwk3ubQtPbBh7U869'),
    strategyFarmInfo: new PublicKey('HLgcQTtmoczRtcd1zWiis4uNqhWgtMUmbxvYFgfgyjKq'),
    strategyTknAccount0: new PublicKey('mysmURG7i6c8q7YoWNWS6pUcP1EAqea3ajSzzCDrPha'),
    strategyTknAccount1: new PublicKey('7ac2gMM8joGZqEkhVufuDjaXPhkQe8oegAfZuyGT1oSR'),
    strategyLpTknAccount: new PublicKey('7SENfAD5Jfn86FWRSZsAfeWeoX6VkqZkUXHV95yiZwWY'),
    strategyRewardTknAccount: new PublicKey('GXKnRi6oX7qrmcpv4Z1s4CneEa9MGK4v3JUGpMmYARBM'),
    strategyFarmTknAccount: new PublicKey('EMV5RnB7HRmWY51xycX4EsAFrJ2NHStekpRb6jcgUjmN'),
    strategyBorrowCreditAccount0: new PublicKey('68QKhvDQ7JUSZvUDaiZaWgFBykrJbe7KrrKDxt1Aooqm'),
    strategyBorrowCreditAccount1: new PublicKey('A2FTWHREiJHsqVhJ62L2Ewy7Hs1ZBdMcBXMxXLSsFneG'),

    doubleDipStrategyFarmTknAccount: undefined,
    doubleDipStrategyRewardTknAccount: undefined,
    doubleDipStrategyFarmInfo: undefined,

    strategyRewardsSwapTargetAccount: new PublicKey('mysmURG7i6c8q7YoWNWS6pUcP1EAqea3ajSzzCDrPha'),
    strategyDoubleDipRewardsSwapTargetAccount: undefined,

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: TOKENS.whETH.mintAddress,
        lendingPoolInfoAccount: new PublicKey('EEokU6r9bBdTz1umHjGhkjgfikARsJzJBXhYxnTmN4Xk'),
        lendingPoolTknAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
        lendingPoolFeeAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
        lendingPoolShareMint: new PublicKey('Hk8b6i2C7PxFBPdd1TCrGssuZpCDEg4fh8yFuyHNJuJe'),
        lendingPoolShareAccount: new PublicKey('FNG4A4GWF1EsQVEjNrQMRT9Dr3H28TycQabtnsQF1MiD'),
        lendingPoolCreditMint: new PublicKey('7f7mU3tQvxD9t3f5ckhxcGSdwqoHHdWrJg43HXiUFWri'),
        lendingPoolCreditAccount: new PublicKey('7LvrwstXyshwVn7BPDgjR8Cndersy9GzbbGhyHwQcX3W'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("4reGGLbesqpAeAZdAJv9hhgA2tgj45oGcyRuEvhATdMm"),
      swapPoolAuthority: new PublicKey("8uLtzZ1iTLTCPsm3b4QttRmDXcFjhVHRuMS9VTVEwo7E"),
      lpMint: new PublicKey("7NPtjjAP7vhp4t5NCLyY4DY5rurvyc8cgZ2a2rYabRia"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("AVw52spXtzFh4bb5ghhpJaDbLx3XWuY85eQNDEo3X1yN"),
      swapTknVault0: new PublicKey("5HaG31FQS4McBVcHxVfwaKaWXE3VCGqvJ1ZDkTxs94cQ"),
      swapTknVault1: new PublicKey("9KpjcpKwhoFPbixvKDfcAhBQcVXk1CSBTGsJdzojDPRv"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("GdQyNtN9rQWzpcm7mQMNBiXyeKRjjQoobh2waVQq5QyP"),
      stakePoolAuthority: new PublicKey("GKjz16uLrWTMe9upsR1PhXs4CL4R6NCAAMEhTPbWaLcr"),
      stakePoolFarmTknMint: new PublicKey("B11Xp26xU2gzjToJEuGswvr6Jtidfh4GRUyCWzWMNdQZ"),
      stakePoolRewardsTknVault: new PublicKey("EAVw4je8KWozucNKMrJDnN1xX6Fv4CpmYsG23N3c3Kjz"),
      stakePoolLpVault: new PublicKey("FAgiNoPVnBDXaAytHwoZ36xRMt7h1QZiAmT6ikD5dA98"),

      doubleDipPool: undefined,
    },
  },

  'whETH-SOL': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'whETH/SOL[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: NATIVE_MINT,
    tknMint1: TOKENS.whETH.mintAddress,

    strategyAccount: new PublicKey('B3EfE4PAjfFSWZcKLCEe3zP86ehQwDGzDMME9STc1hGa'),
    strategyAuthority: new PublicKey('81pLz27orzWE38myQVv3h54xBks7aV6wYZH8o9AMK9Bp'),
    strategyFarmInfo: new PublicKey('FbRZ8JbJgCgLYZBYmMD8yQJraxNck4BXnUqetUwpH59S'),
    strategyTknAccount0: new PublicKey('82usCM8bKHZk8b81RH8hr3TmFbEihW2bCYXHYS9feqVB'),
    strategyTknAccount1: new PublicKey('DcFDuvH6ZpgDKWnHsh8QsR7F8dc2KHKJCfrUanyfmEeb'),
    strategyLpTknAccount: new PublicKey('DK8fPK3zUnGU4osSiHcVq4YnAVqNHGFx4ynmv2rm7Kht'),
    strategyRewardTknAccount: new PublicKey('6AyhzaoBCjge8JTvhSo9mt4F6P4nuPoo7kNdAAbQLFyd'),
    strategyFarmTknAccount: new PublicKey('AMRo5FfoHqkq65ffYNTQxxznRBRnNvn5LELiqdtDTFHT'),
    strategyBorrowCreditAccount0: new PublicKey('9G55YfjxM8Jmn59fLpW9hvegXrFPMhx8RKuBjPXEjcUr'),
    strategyBorrowCreditAccount1: new PublicKey('3kCKNdGdeu97XGXcTviEFPaJ5cpwEQUuHrLpD6j8Vgff'),

    doubleDipStrategyFarmTknAccount: undefined,
    doubleDipStrategyRewardTknAccount: undefined,
    doubleDipStrategyFarmInfo: undefined,

    strategyRewardsSwapTargetAccount: new PublicKey('82usCM8bKHZk8b81RH8hr3TmFbEihW2bCYXHYS9feqVB'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: NATIVE_MINT, // wsol
        lendingPoolInfoAccount: new PublicKey("EnZC8MB6QLTxwN1LNqCXYC7XMpvXqitnYQPf5y5AcQRn"),
        lendingPoolTknAccount: new PublicKey("GiJwrxQW5NQWWAva4rnDMXwHxfrhyUzwMX5to1pmCCgF"),
        lendingPoolFeeAccount: new PublicKey("2BDZqoVKAX3PJKeZJytjk7oEpbUu3jvdgdi6tA8VusnY"),
        lendingPoolShareMint: new PublicKey("92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB"),
        lendingPoolShareAccount: new PublicKey("Hyi1jMgc9MMEZyaG9ziL2PvT7zbeRNKhb5K1kj9bxz4x"),
        lendingPoolCreditMint: new PublicKey("7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG"),
        lendingPoolCreditAccount: new PublicKey("WuPCgCuyLSXatdjyWqkGjCPSQFgKLwcfsNR9fDq3hVL"),
      },
      "1": {
        tknMint: TOKENS.whETH.mintAddress,
        lendingPoolInfoAccount: new PublicKey('EEokU6r9bBdTz1umHjGhkjgfikARsJzJBXhYxnTmN4Xk'),
        lendingPoolTknAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
        lendingPoolFeeAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
        lendingPoolShareMint: new PublicKey('Hk8b6i2C7PxFBPdd1TCrGssuZpCDEg4fh8yFuyHNJuJe'),
        lendingPoolShareAccount: new PublicKey('FNG4A4GWF1EsQVEjNrQMRT9Dr3H28TycQabtnsQF1MiD'),
        lendingPoolCreditMint: new PublicKey('7f7mU3tQvxD9t3f5ckhxcGSdwqoHHdWrJg43HXiUFWri'),
        lendingPoolCreditAccount: new PublicKey('7LvrwstXyshwVn7BPDgjR8Cndersy9GzbbGhyHwQcX3W'),
      }
    },
    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("FcEro2uFpHcb7Z785CBs6q12KMJqUJKa8VTXPi4TTBMf"),
      swapPoolAuthority: new PublicKey("HMxZz8fv2uR9suzAPRbJGNB3wZL1eT3eKL3cpYWUbM8K"),
      lpMint: new PublicKey("7aYnrdmdCRodDy2Czn6keUquUhjF1jPEmfwZPh488z8U"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("YCVJDKdHNi1mhJtWz7QGbBRreMmw1soeipz7wZbQKEK"),
      swapTknVault0: new PublicKey("GR3g8Wej3jmv92hYM1t22kaXog2xjkGjQ7V1XzLd1efT"),
      swapTknVault1: new PublicKey("3uQytDKNd5H6XK8FhTei4wCUmj2eTbLTbiLAtWk2SmbA"),

      rewardsSwapPoolId: new PublicKey("2ZnVuidTHpi5WWKUwFXauYGhvdT9jRKYv5MDahtbwtYr"),
      rewardsSwapPoolAuthority: new PublicKey("2PH1quJj9MHQXATCmNZ6qQ2gZqM8R236DpKaz99ggVpm"),
      rewardsTargetlpMint: new PublicKey("2uVjAuRXavpM6h1scGQaxqb6HVaNRn6T2X7HHXTabz25"),
      rewardsSwapfeeAccount: new PublicKey("4Zc4kQZhRQeGztihvcGSWezJE1k44kKEgPCAkdeBfras"),
      rewardsSwapPoolRewardsVault: new PublicKey("AioST8HKQJRqjE1mknk4Rydc8wVADhdQwRJmAAYX1T6Z"),
      rewardsSwapPoolTargetVault: new PublicKey("73zdy95DynZP4exdpuXTDsexcrWbDJX9TFi2E6CDzXh4"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("BerS3SE5G6FqZER7L7G3BhUJBrZ7BpizmuQRH9LMEYQw"),
      stakePoolAuthority: new PublicKey("DnsJave9pHa4Q4p7pdyaCiHiYAD7vTUR1do5XQVSRCzr"),
      stakePoolFarmTknMint: new PublicKey("FkHQBBZGh5GS4GcXpcVksKYUUkLTNn6Yk1PCMxucR2AK"),
      stakePoolRewardsTknVault: new PublicKey("2kdi5HdZAdF7mfzaZtbog5Jo2VvzZe8V483qTCwGae4Z"),
      stakePoolLpVault: new PublicKey("H4PuQ5Ly11bYYHVyZ6dSFKARheKaryYyz991ctkFxBXU"),

      doubleDipPool: undefined
    },
  },

  'mSOL-whETH': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'mSOL/whETH[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.whETH.mintAddress,
    tknMint1: TOKENS.mSOL.mintAddress,

    strategyAccount: new PublicKey('Ff6XDLFQ8RAtMhFiPcJvFAsFSzKqkh9WtJjvWqmu6rvQ'),
    strategyAuthority: new PublicKey('3QEMUpzM4nKfdFavertbn1Z8JyCEsVMkdjGdu4ofCAAT'),
    strategyFarmInfo: new PublicKey('EQeV2V97QDKZ4XGwonLJ3EGQm5R8N1kMf2CjPb8yGSzx'),
    strategyTknAccount0: new PublicKey('FZF6LKYwHYoSBJU9HWFsBCZWwyCYfRkK61gNUwjDp3g5'),
    strategyTknAccount1: new PublicKey('DUtSEFn4egfqqVrrxKsKEeEGzqErpAUHHCPHvCwtvxFh'),
    strategyLpTknAccount: new PublicKey('8QgkvFbFZZMCVFUJoYLSF4JfAm7FpSxpiikigoCEC2zz'),
    strategyRewardTknAccount: new PublicKey('DDbfWWUFEFSbRKu1d7MAh6SFm65ZXW4WyHfGHV86H8eX'),
    strategyFarmTknAccount: new PublicKey('5wfEvo2bX3E3PiFr5jv1hui99veP9eRfQpR4HViVc8nn'),
    strategyBorrowCreditAccount0: new PublicKey('6o6d3JpCWQUHqFoi8XiKgKo2UbaRNvvz8NuDjNvbsA4K'),
    strategyBorrowCreditAccount1: new PublicKey('Cga5hLXfNnXEi18aGZdUZz4HggCGbSQcXbXQ5dVAMLKQ'),
    doubleDipStrategyFarmTknAccount: new PublicKey('FNRk9BMSmKbDFiWAZWvRQ36jsxhrGFPrV1MahskxdCdN'),
    doubleDipStrategyRewardTknAccount: new PublicKey('39jiGDnMHiwEUaHBUA2YHVTgSbh59Gp9DRGoBBqFmvKs'),
    doubleDipStrategyFarmInfo: new PublicKey('Azru2Zpy4JvT9XBypbCVuch3kpNaV6CZ64FJsTxANHoN'),

    strategyRewardsSwapTargetAccount: new PublicKey('DUtSEFn4egfqqVrrxKsKEeEGzqErpAUHHCPHvCwtvxFh'),
    strategyDoubleDipRewardsSwapTargetAccount: new PublicKey('DUtSEFn4egfqqVrrxKsKEeEGzqErpAUHHCPHvCwtvxFh'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.whETH.mintAddress,
        lendingPoolInfoAccount: new PublicKey('EEokU6r9bBdTz1umHjGhkjgfikARsJzJBXhYxnTmN4Xk'),
        lendingPoolTknAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
        lendingPoolFeeAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
        lendingPoolShareMint: new PublicKey('Hk8b6i2C7PxFBPdd1TCrGssuZpCDEg4fh8yFuyHNJuJe'),
        lendingPoolShareAccount: new PublicKey('FNG4A4GWF1EsQVEjNrQMRT9Dr3H28TycQabtnsQF1MiD'),
        lendingPoolCreditMint: new PublicKey('7f7mU3tQvxD9t3f5ckhxcGSdwqoHHdWrJg43HXiUFWri'),
        lendingPoolCreditAccount: new PublicKey('7LvrwstXyshwVn7BPDgjR8Cndersy9GzbbGhyHwQcX3W'),
      },
      "1": {
        tknMint: TOKENS.mSOL.mintAddress,
        lendingPoolInfoAccount: new PublicKey('492Hr5QDQyrsLcyXqMZ7A5osjmqwtn4cdKNQLDBYBzvy'),
        lendingPoolTknAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolFeeAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
        lendingPoolShareMint: new PublicKey('4mntRxKJWib1YTWNV4aLfszF6FeziBHdwnNAwGSfKKMX'),
        lendingPoolShareAccount: new PublicKey('EbWWhmDLKXDdq2guubVJCdSztuUaN6XhtwVMy9TMMwtV'),
        lendingPoolCreditMint: new PublicKey('Fdu3QfaQ9VL4GF85NrkpzhKRAJECv9cx7gchHca5MsRt'),
        lendingPoolCreditAccount: new PublicKey('HdTwUP1U3WQ1EnYPP8c8mx8sqHhXYQ9zwKVsLGxWi7W1'),
      }
    },
    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("A71DQffTzgxBSzXjPL3tmf8XXTNtS5mR2D78Y8rmV2hk"),
      swapPoolAuthority: new PublicKey("FPWpe7QEQnDMivnHksQW2uvcw9tvX1oxejKBX136WRkr"),
      lpMint: new PublicKey("5qoTq3qC4U7vFxo3iCzbXcaD1UEmDeCD63Dsuoct71oV"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("FSqUYVzF3XZzLcnj132eT6ed3bK95G1yG4MazcHZi99Q"),
      swapTknVault0: new PublicKey("DuBCBX3y2FjDWUn2ncK5EKQh229JiJ7HTCjYJhNC87K8"),
      swapTknVault1: new PublicKey("Fcp5u8bL3V24MXjA4noSfMpcEAP2vSj1WTaA1ZNxACZL"),

      rewardsSwapPoolId: new PublicKey("49tTgthTYLMPEqozZNyEQifqkGYxHqqDie9YxVczS3iB"),
      rewardsSwapPoolAuthority: new PublicKey("9FQ9gDtS6uNr5SMPafuzkDit2rMftHfQuz5mg2X3TqHT"),
      rewardsTargetlpMint: new PublicKey("CVapmQn7HaU1yMDW3q6oUV4hx6XoYv54T4zfGXkuJqkA"),
      rewardsSwapfeeAccount: new PublicKey("Hq9xxKdMavJd4teMZusF4PiGNGV3hxdcMZwAdngkHCg7"),
      rewardsSwapPoolRewardsVault: new PublicKey("7hoYJc4aqttctANrNe75gscdmQD9HcXZED6AjdDdZMQ9"),
      rewardsSwapPoolTargetVault: new PublicKey("7MuvRUFT1wWiL7uJKdZqNwk9Fmz2HJ36bEArhDTnyFij"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("D4Pmc82b9W1UDAqYNNNMGG7UYxBaZckf97AYExGbUK95"),
      stakePoolAuthority: new PublicKey("2BthDCb3r4X7CchJuC1exZHudpLUpkb2x6K7Rdz5E9wU"),
      stakePoolFarmTknMint: new PublicKey("58nifjPjF3CutGz2xMxvAMk7R9YgbVEc8Cstj4rCcs8j"),
      stakePoolRewardsTknVault: new PublicKey("HHVfVrJWqRr8cRtvAwbVQNeuWiwxAPN76yD486cbBN9q"),
      stakePoolLpVault: new PublicKey("DyYYtdJYdZLTgPqEn6VoTtok3uLt662qq8hCCZzztRz2"),

      doubleDipPool: {
        rewardTknMint: TOKENS.MNDE.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("D6oqo3F2KkJcePDoNZfbb8F7SPnRhP7WCC9FNktzVCDT"),
        doubleDipStakePoolAuthority: new PublicKey("8uJdo6ioHGaSrYeXLh7pNoHQ6yet4Rrz5kLxU4uMxvJZ"),
        doubleDipStakePoolFarmTknMint: new PublicKey("3kFeVJUxhQS7PE7vV8pt9bhTCQrUDqeGf6AU4sjkLzVt"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("9tPPnyMhScJLKFUd3jPQDwCpt4WueY3kACaDEkFozb12"),
        doubleDipStakePoolFarmTknVault: new PublicKey("7DbX1zsFyjdfX97d6yPdQgbqRdXzwK1wS46txw7Xqpms"),

        doubleDipRewardsSwapPool: {
          rewardsSwapPoolId: new PublicKey("vjHagYsgZwG9icyFLHu2xWHWdtiS5gfeNzRhDcPt5xq"),
          rewardsSwapPoolAuthority: new PublicKey("3HWcojnC1ruEMmsE92Ez1BoebdDXzYQa4USaeWX7eTuM"),
          rewardsTargetlpMint: new PublicKey("5PHS5w6hQwFNnLz1jJFe7TVTxSQ98cDYC3akmiAoFMXs"),
          rewardsSwapfeeAccount: new PublicKey("46mdANZ2DCA2sTFchvD7WwbffbLQa4jCFkkRL23WuYG8"),
          rewardsSwapPoolRewardsVault: new PublicKey("2LferrWvYWtHFfdkmixzt9g3aKa3yBNfgbRrP1CcWMMp"),
          rewardsSwapPoolTargetVault: new PublicKey("GimsuZjYqMXM6xK6S3e9JpGvX6jaMPuNeR6s2piDESmy"),
        }
      }
    },
  },

  'SBR-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'SBR/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.SBR.mintAddress,

    strategyAccount: new PublicKey('ATEaY6iE8yptadmPoNu8H5SngMx4PqEHHZVAAXBk1SdK'),
    strategyAuthority: new PublicKey('Dzam6fgLGBgqYGMEpc9Xdqcjr8CswHGGxxUuM6Ns36F5'),
    strategyFarmInfo: new PublicKey('7PcHfJWSv2Ee8mEpFHMdPcnrgvRVc5aMuDGACMjaJhzq'),
    strategyTknAccount0: new PublicKey('26g799UwGKnZJsNPjjAkiP35H3YBXK95HfdtZfxjJTrG'),
    strategyTknAccount1: new PublicKey('3LyfqsCD9PcuJzEieg3f7nR5yAG3YJHU7k8SuSyGWgK4'),
    strategyLpTknAccount: new PublicKey('3oXykdfjaaR52TZmCmMnVA9yCw7UrL4nh7ZPjniGCrxG'),
    strategyRewardTknAccount: new PublicKey('5W45TdSCMpmZdxWFTN3Uz5zf1YHU4LfXREUd3u9ciWgB'),
    strategyFarmTknAccount: new PublicKey('7Q9WCihwYd64A3mRDUaEjMFGnd15VZnoLcWG4ppJpZik'),
    strategyBorrowCreditAccount0: new PublicKey('D5dZ1HYrr47QXQWD6ttpRcDzL1j43jnMGvszJGk7Jw5i'),
    strategyBorrowCreditAccount1: new PublicKey('FQZrWECQKVAp8phHckGJ6hpduDbPcLaJxp264LbrueAv'),

    doubleDipStrategyFarmTknAccount: undefined,
    doubleDipStrategyRewardTknAccount: undefined,
    doubleDipStrategyFarmInfo: undefined,

    strategyRewardsSwapTargetAccount: new PublicKey('26g799UwGKnZJsNPjjAkiP35H3YBXK95HfdtZfxjJTrG'),
    strategyDoubleDipRewardsSwapTargetAccount: undefined,

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: TOKENS.SBR.mintAddress,
        lendingPoolInfoAccount: new PublicKey('6JZLr1xqoTtAgfAbENT43Vi8EUSUF3tpjH8UvyDKgDea'),
        lendingPoolTknAccount: new PublicKey('87WWEpoxgv7MyiBoxBhJr2oagssQvQZxrkNMw29grYvC'),
        lendingPoolFeeAccount: new PublicKey('87WWEpoxgv7MyiBoxBhJr2oagssQvQZxrkNMw29grYvC'),
        lendingPoolShareMint: new PublicKey('H69KjMFKL5PvKHrqDsvHU2TwbKorbuxWEZVD9uDS6rAu'),
        lendingPoolShareAccount: new PublicKey('4CpD8r9Dqk4R7msVF3tYDQ69hnbiP8RhjBUs93YCiSPJ'),
        lendingPoolCreditMint: new PublicKey('HYVJBnXQMe6BE8douWYMwb6Zn39K9RFYsCwnRtBHDU4X'),
        lendingPoolCreditAccount: new PublicKey('9RPCrT4f7fznw4Qmv4XW21MbjPHefKXSJnadq4E4cs2o'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("HiYggjP2fN53Jw46e5UuskqNP3HH98jceRxEgVoeRwNw"),
      swapPoolAuthority: new PublicKey("ATkEV1nEkdp7zgaGpzFCsJ5WAyejcJbxqzGhQpfcDW4S"),
      lpMint: new PublicKey("CS7fA5n4c2D82dUoHrYzS3gAqgqaoVSfgsr18kitp2xo"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("7S3KKuvcHfcKWBGLDwmoTgtB97JE8LHruP8jbmQkGfH"),
      swapTknVault0: new PublicKey("DEVLUv1uiUSukQoBdy9fDQyehi4N2Boojy8J2LQ8bK2E"),
      swapTknVault1: new PublicKey("DrJTQqNZqNCf2HDLpYg9zRCMRwnhZEVQuGjeaWtX6CA7"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("EWRNKpLc4Y8r6Aur9mo8GtBYatqfoML9A7bfEmDv2JD4"),
      stakePoolAuthority: new PublicKey("2TwjyaAJ6zyW5Dyz8E14YjtNwwtEaXFHLCBJ5RbKnbhM"),
      stakePoolFarmTknMint: new PublicKey("Cum6sRPGpWYQHZapekDtMhbZ1BQ2QkYv9PAwQjypxMVo"),
      stakePoolRewardsTknVault: new PublicKey("HTgzy9Gp6siFTi8JVzJpcwVsfiqEsQDnnSqsbrAaRx3U"),
      stakePoolLpVault: new PublicKey("5sbyvS96PHpBBLHdUhRyv5ovcEAbqXJFMHddYaVGdgyF"),

      doubleDipPool: undefined,
    },
  },

  'whETH-USDC-Strategy0': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'whETH/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.whETH.mintAddress,

    strategyAccount: new PublicKey('5232o9xF6fTPy6GSzo8M6GVSXGWd1yRAE85RmpxuEvY5'),
    strategyAuthority: new PublicKey('BBZtTaHXEZ2ZzZjnaEmsEKeWxWKeM1Gaf9Km3KbZjpf5'),
    strategyFarmInfo: new PublicKey('HcE3kdBVcwh1LMwmvPGmhYpTj7RqaKo6sag5GCcqJAvZ'),
    strategyTknAccount0: new PublicKey('8UeJoTjQskEPsrJgikmYrfqVxHxFai83Hc1LgG8PWQoY'),
    strategyTknAccount1: new PublicKey('73fPyyRM5LchRCofCe4xcKaWUtL2n2QtwrVLHWbtN4eF'),
    strategyLpTknAccount: new PublicKey('9yknxDkkeRDgbgfZ5VFsUpp3ifGfeVRWSrmDZ84HZdRc'),
    strategyRewardTknAccount: new PublicKey('AZ1jd9dJ7Ua1nAGKkFFhJVhGv1yEbzGYTjv52uyQkVm1'),
    strategyFarmTknAccount: new PublicKey('6hnEStrHBrHv937M5RkAstGsdEA5TLir516v1kNheXjB'),
    strategyBorrowCreditAccount0: new PublicKey('2yhsXqrsdN7mytuyARmVJ9o9899TgQrDuJPW9WWzKZ7g'),
    strategyBorrowCreditAccount1: new PublicKey('2B5BwYYL1q5aNUurFg2H3UzF9MQ7783GbioYaxDsFTxJ'),

    doubleDipStrategyFarmTknAccount: undefined,
    doubleDipStrategyRewardTknAccount: undefined,
    doubleDipStrategyFarmInfo: undefined,

    strategyRewardsSwapTargetAccount: new PublicKey('8UeJoTjQskEPsrJgikmYrfqVxHxFai83Hc1LgG8PWQoY'),
    strategyDoubleDipRewardsSwapTargetAccount: undefined,

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: TOKENS.whETH.mintAddress,
        lendingPoolInfoAccount: new PublicKey('EEokU6r9bBdTz1umHjGhkjgfikARsJzJBXhYxnTmN4Xk'),
        lendingPoolTknAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
        lendingPoolFeeAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
        lendingPoolShareMint: new PublicKey('Hk8b6i2C7PxFBPdd1TCrGssuZpCDEg4fh8yFuyHNJuJe'),
        lendingPoolShareAccount: new PublicKey('FNG4A4GWF1EsQVEjNrQMRT9Dr3H28TycQabtnsQF1MiD'),
        lendingPoolCreditMint: new PublicKey('7f7mU3tQvxD9t3f5ckhxcGSdwqoHHdWrJg43HXiUFWri'),
        lendingPoolCreditAccount: new PublicKey('7LvrwstXyshwVn7BPDgjR8Cndersy9GzbbGhyHwQcX3W'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("4reGGLbesqpAeAZdAJv9hhgA2tgj45oGcyRuEvhATdMm"),
      swapPoolAuthority: new PublicKey("8uLtzZ1iTLTCPsm3b4QttRmDXcFjhVHRuMS9VTVEwo7E"),
      lpMint: new PublicKey("7NPtjjAP7vhp4t5NCLyY4DY5rurvyc8cgZ2a2rYabRia"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("AVw52spXtzFh4bb5ghhpJaDbLx3XWuY85eQNDEo3X1yN"),
      swapTknVault0: new PublicKey("5HaG31FQS4McBVcHxVfwaKaWXE3VCGqvJ1ZDkTxs94cQ"),
      swapTknVault1: new PublicKey("9KpjcpKwhoFPbixvKDfcAhBQcVXk1CSBTGsJdzojDPRv"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("GdQyNtN9rQWzpcm7mQMNBiXyeKRjjQoobh2waVQq5QyP"),
      stakePoolAuthority: new PublicKey("GKjz16uLrWTMe9upsR1PhXs4CL4R6NCAAMEhTPbWaLcr"),
      stakePoolFarmTknMint: new PublicKey("B11Xp26xU2gzjToJEuGswvr6Jtidfh4GRUyCWzWMNdQZ"),
      stakePoolRewardsTknVault: new PublicKey("EAVw4je8KWozucNKMrJDnN1xX6Fv4CpmYsG23N3c3Kjz"),
      stakePoolLpVault: new PublicKey("FAgiNoPVnBDXaAytHwoZ36xRMt7h1QZiAmT6ikD5dA98"),
    },
  },

  'LIQ-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'LIQ/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.LIQ.mintAddress,

    strategyAccount: new PublicKey('3XiDRuCi6SNuwk9TZteEAMhLW93A4troTNqE3nbc3Lxt'),
    strategyAuthority: new PublicKey('9xQJ7zDs2cCziFpGQLPKEMuJysqy8NMyhZivv8Eig4cx'),
    strategyFarmInfo: new PublicKey('CMeM9YBgZRZZvnbADRicnoNHKcCcZQzGa1tZgR7yg5pT'),
    strategyTknAccount0: new PublicKey('4tqscT871zTuxwGthhPtfigibdnFhtprPr6LCeJi236E'),
    strategyTknAccount1: new PublicKey('BDuTiQcJn7a6PDfeVnpHSi5uQd8CqzKnBiWhArgf7Fbh'),
    strategyLpTknAccount: new PublicKey('ASBSytd2bRBuhDviEzCPV5as4i982vYn52EbjwS6nZGU'),
    strategyRewardTknAccount: new PublicKey('FMRpo6R6YzM9q1chRZivEhTRKJKtcaSS1KtJhkRxfNkg'),
    strategyFarmTknAccount: new PublicKey('6v3BYVsW64EmNhX184iiCp2fG6ZgA8GLnXxcXR1V9Vxx'),
    strategyBorrowCreditAccount0: new PublicKey('G7czUesjri89thqS7AT64miXh7UQ3XvKQgSrAoALCrEf'),
    strategyBorrowCreditAccount1: new PublicKey('AaVgqvBg44KuSRBYiaTrvHamTLTLpnTZe5LETgfDvN42'),
    doubleDipStrategyFarmTknAccount: new PublicKey('12c3KKQz3CMawFFAy62wAhz62wsLDPMVsgSrjqfHnQ7K'),
    doubleDipStrategyRewardTknAccount: new PublicKey('BDuTiQcJn7a6PDfeVnpHSi5uQd8CqzKnBiWhArgf7Fbh'),
    doubleDipStrategyFarmInfo: new PublicKey('F1z7L35ovMQ4hXdnxrpc3tmTXtK9XCa1YVtSNavaAdYv'),

    strategyRewardsSwapTargetAccount: new PublicKey('4tqscT871zTuxwGthhPtfigibdnFhtprPr6LCeJi236E'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: TOKENS.LIQ.mintAddress,
        lendingPoolInfoAccount: new PublicKey("24dy3YvNeRThzCCiAm7k4S8ZZXnpsC8sqQLzfYmfTuue"),
        lendingPoolTknAccount: new PublicKey("5UKqFFd9GrYnCT3dqZFq9qJjaroQpqtbAFGpu1ZyAkNa"),
        lendingPoolFeeAccount: new PublicKey("5UKqFFd9GrYnCT3dqZFq9qJjaroQpqtbAFGpu1ZyAkNa"),
        lendingPoolShareMint: new PublicKey("5CCvvqeoWnRtxTgEbhRckKrGMc4rmiiD9VL9BpHVo3pq"),
        lendingPoolShareAccount: new PublicKey("AsczgPTpW8A6wQZTtu6Z5pVi4uvJsQf9d1MRXE7c7YrS"),
        lendingPoolCreditMint: new PublicKey("3sd5YPZUVkAYGdsDRgHZF4F6GN6kPDr63gY2FwZvgjMx"),
        lendingPoolCreditAccount: new PublicKey("7iNXmECbQYq2cCrwbyZ9aJbVJ8uCRzPjjj1KeYktu6ut"),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("AXSeEafwPUGSamiZWH8m2PJtvpDVtrofxvycNwxiysdh"),
      swapPoolAuthority: new PublicKey("6Y5TnCwgifc8Z7QYo672nT9uNd2hcivVR1NT6oDkJx6P"),
      lpMint: new PublicKey("3PD9SZFwXKkXr4akLf4ofo37ZUMycwML89R2P3qxcbZG"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("FSVPcprrTkQLRtDACFEpa2rhEVx4kBvjPuQaxj572SaC"),
      swapTknVault0: new PublicKey("8YzLsZ1FtsruswkBogEaXwmRTf5PMuyVcfSZXRAdi8qA"),
      swapTknVault1: new PublicKey("CVspL8Tj5YdqntXJegNeDXHiBn3648QDNB7gex6D9MgY"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("z2WHNcBJTZqbK5wCuBPtswEq2614T6si1cJmog7vFAL"),
      stakePoolAuthority: new PublicKey("64KYDNevDqphJHSHb3snrBU3PBJzka7gsJwzYm85LuoB"),
      stakePoolFarmTknMint: new PublicKey("57vGdcMZLnbNr4TZ4hgrpGJZGR9vTPhu8L9bNKDrqxKT"),
      stakePoolRewardsTknVault: new PublicKey("7joYTvnVKiX1iQxJUhhz8UHip9182nraCZMiYhTh1npp"),
      stakePoolLpVault: new PublicKey("5XoWGiBuDYPMrihdJL125ByQ9zBGGxrE6LiqFW82Vv44"),

      doubleDipPool: {
        rewardTknMint: TOKENS.LIQ.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("AraZDjfmkqzDJ3CdbjjYbtpujUYivgTEKKM2TPf6hJ27"),
        doubleDipStakePoolAuthority: new PublicKey("9HoExME3pB4ZBksM5WnYu4n3gbibKs7Cvtf9zDvJNvJz"),
        doubleDipStakePoolFarmTknMint: new PublicKey("5rGtJDiJhD5Mx2fvdEYuLrCiWaMD9z3wpmJSxwGHmo4u"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("CSJNwzop5vJ2oCm7WT32AoqZMib15KDtygBu86nU92GZ"),
        doubleDipStakePoolFarmTknVault: new PublicKey("GhitCQ8VD9NBDM2yKnS5D5ZY2SWfVsmKhw7C6CAE9qrp"),
      }
    },
  },
  'COPE-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: 'COPE-USDC[Double-Dip]',
    orcaPoolId: 'COPE/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.COPE.mintAddress,

    strategyAccount: new PublicKey('DX3CgGpQRpha4AbRVAXviY33N1SNtiz9qXx3vABoeKAh'),
    strategyAuthority: new PublicKey('8ZXVcFZU6uhLis8C3wxCLbdYJhPXKc1yy4rG5vp8nQpe'),
    strategyFarmInfo: new PublicKey('FhUCXdtP6AFHTc9AumtgU7gWMy4CfZwjphatM4WE3dyf'),
    strategyTknAccount0: new PublicKey('HWWR1KCTeAEHr4ugJ3bEfgiVUidt4sP2h2bfjknakRdJ'),
    strategyTknAccount1: new PublicKey('CPfiDZBbQj7KSUFkKdfnSE2jTBUKbbE5DaNYW2D8omv2'),
    strategyLpTknAccount: new PublicKey('3xt4wqzhLNKrsNeimnXV9yZSayLU2jPkZAocdv49VK8q'),
    strategyRewardTknAccount: new PublicKey('2LQq3E3HzSc4jkUCMf5g6DAJNAk4bQqhPbNvx27CdLY4'),
    strategyFarmTknAccount: new PublicKey('FegMubKTDKe3KGY1RyvDXcX9BgqB7sj88DmrXWQwqWFa'),
    strategyBorrowCreditAccount0: new PublicKey('6BWWCVsFKgMmi3XU24ru6C3A8qAQyCga4ZyYgW6RVsUH'),
    strategyBorrowCreditAccount1: new PublicKey('4buhehyzFkPGRkjobyHk6XqxJeWThDUdJWNdXCnnezYB'),
    doubleDipStrategyFarmTknAccount: new PublicKey('3NirgwNjAXp7yVVqw9styUJDW4JnASJBLBAGbFqHEUym'),
    doubleDipStrategyRewardTknAccount: new PublicKey('CPfiDZBbQj7KSUFkKdfnSE2jTBUKbbE5DaNYW2D8omv2'),
    doubleDipStrategyFarmInfo: new PublicKey('GGKkdtHcYfr3swEjo1mMKvBBrdqoFAm3tTDYzPcdJZDV'),

    strategyRewardsSwapTargetAccount: new PublicKey('HWWR1KCTeAEHr4ugJ3bEfgiVUidt4sP2h2bfjknakRdJ'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: TOKENS.COPE.mintAddress,
        lendingPoolInfoAccount: new PublicKey('Hmde6PfS3wv2wi1rePBTFSjMqpugPpBFc8HLiYfHwsTB'),
        lendingPoolTknAccount: new PublicKey('BZwinxfYXhHgDc61AU9YFv7VkcuffVcQqBXXms8JAovX'),
        lendingPoolFeeAccount: new PublicKey('BZwinxfYXhHgDc61AU9YFv7VkcuffVcQqBXXms8JAovX'),
        lendingPoolShareMint: new PublicKey('GLvCYLcwQPr6CcJQKZSe2QoXj6tUiD2PxMPt9FJKSx7K'),
        lendingPoolShareAccount: new PublicKey('59RQbAq1QVSeLKvjDrokxrH86oq7tVF2rTW4ydBU3KB4'),
        lendingPoolCreditMint: new PublicKey('4HrgJueR9RHvmsyFfZcjtjg9Q7Q6ncrU1CGQqmeb9Y3a'),
        lendingPoolCreditAccount: new PublicKey('DtgHkAtvqx7uzvba1518c2CCpaU5jcsaZtiAydHvnFN8'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("DhGTKyT6RVkpvPxXAJodi4Z41RSvQZxV1f5eRvJ5bE4r"),
      swapPoolAuthority: new PublicKey("Hu8AWoRBa7ZaYQFdHQyRHeEZGB16Me86fA5vAZzjVUmv"),
      lpMint: new PublicKey("HsauTv9s52Zv12eaDuSp6y7BEm4e4BHEyAsbdjyyWzPK"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("JEGcxfGxWJpRkGtvA6J6kEgTBebDz6kxURoeB3SX8vaW"),
      swapTknVault0: new PublicKey("36VVz3eY8YmWBGskQVjvGGBfyUKHHCEDBgkFtzMpFqeU"),
      swapTknVault1: new PublicKey("6N3P3etaUYGeBs2C67ZQTDRqHsExNsfj85dDWPwHtQBS"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("xigyMM8txxzpvjRw3Z1tX9euUshtqeHucW6K3f81KNQ"),
      stakePoolAuthority: new PublicKey("EqB4uWL5FfnFWy9pzqnwrvZjyMrB69n2pCWHKDKBZCXL"),
      stakePoolFarmTknMint: new PublicKey("9SDpBrfqNxjXcCzpKWM6yUKdfky975VJBD6xcu5cKf5s"),
      stakePoolRewardsTknVault: new PublicKey("2X9JDiHm9pR6PeCSfTc7vfP215RioFfp19cMV4pjX5qA"),
      stakePoolLpVault: new PublicKey("Ef5MRbpZiVKLKZgHmA78oJWeifwsT6w3xJMR3MqrjWJj"),

      doubleDipPool: {
        rewardTknMint: TOKENS.COPE.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("HW21NT7v6ViM2Cs3S2tVgUnawACF8JRRwd2AA41a8HUh"),
        doubleDipStakePoolAuthority: new PublicKey("FsKx3r99yYoykwwQ25uYdX9HiRfTuSGE8F1uPvCuTBUo"),
        doubleDipStakePoolFarmTknMint: new PublicKey("AtcMEt9caZxpunQV99pxED2rhpQmaDykBreEqBsYU11v"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("FEorgcoXKQdJBExNn3RbSp1753cEk1kcmoBTWNzpcP9s"),
        doubleDipStakePoolFarmTknVault: new PublicKey("61yA94D79EPnh6N34NLXDkX14qgxfABRg8XQysxMwWpb"),
      }
    },
  },
  'PORT-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'PORT/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.PORT.mintAddress,

    strategyAccount: new PublicKey('EtGh9FHSBjzfvSYYPZAk8aBrX3raYbHryyJhon9hTXMQ'),
    strategyAuthority: new PublicKey('8EQEWCFPM5HSkiiznh6dpP8QiZEvyW7k4FwU5fpAt5Xj'),
    strategyFarmInfo: new PublicKey('9m4kTQfuXcJTUrLsWvVgh3dMnoShT9ZcsxriD2Y6aoNq'),
    strategyTknAccount0: new PublicKey('9TgcHJ9qBggd46LerCok8ZTr6C5GuNY4mPkY6iKd2Pr3'),
    strategyTknAccount1: new PublicKey('Bk8swibzbhd3cioe2qJ5E3EZszUhCVn5qQAbdsFynxWG'),
    strategyLpTknAccount: new PublicKey('GeJJPciLditsGVBvXziEHjRtaSKFJsmDWkx4cKMNuC3m'),
    strategyRewardTknAccount: new PublicKey('42kmwXnF5G3hBR52nFZtYqYrSRt6THRhkf2cTEH1z11L'),
    strategyFarmTknAccount: new PublicKey('DKaLs8hLkaP8rERmtyBd4xFpD5XuBpqTnWCT6nXUxky2'),
    strategyBorrowCreditAccount0: new PublicKey('9m9jtGvGpek2jegFD7mEtLn5eZPrFaCMdepKUznMFQxP'),
    strategyBorrowCreditAccount1: new PublicKey('7g6GVC1s6J7ibGuCHFoWj6rpoLLsY7SU65AnYMtL87gV'),
    doubleDipStrategyFarmTknAccount: new PublicKey('6RZjgTMrEcrPbfUDX5evWQMtrTW1ypnfMRtv1x4kshqu'),
    doubleDipStrategyRewardTknAccount: new PublicKey('Bk8swibzbhd3cioe2qJ5E3EZszUhCVn5qQAbdsFynxWG'),
    doubleDipStrategyFarmInfo: new PublicKey('7ecZdyfeUn9UwWduv8VBv4Thxn9zajuMppwcjvyajZTH'),

    strategyRewardsSwapTargetAccount: new PublicKey('9TgcHJ9qBggd46LerCok8ZTr6C5GuNY4mPkY6iKd2Pr3'),

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: TOKENS.PORT.mintAddress,
        lendingPoolInfoAccount: new PublicKey('7cTGVuwrxC1vv9uyug9cVu7Vp5AbqV6GvKedrxSQ4JNu'),
        lendingPoolTknAccount: new PublicKey('6BfUm64VY4SqxkFtesCgA43VuosanEPgPD7uDEJoAZY4'),
        lendingPoolFeeAccount: new PublicKey('6BfUm64VY4SqxkFtesCgA43VuosanEPgPD7uDEJoAZY4'),
        lendingPoolShareMint: new PublicKey('G8fYY6kJeHaGqdS9BZvveXjiwewGmqX91xjqG4wdbArv'),
        lendingPoolShareAccount: new PublicKey('H2QJ9eCTaX9f9SCJEpMG5dwENHY3zmb8Adneko9otaTq'),
        lendingPoolCreditMint: new PublicKey('HdBfZDA7MfnUNy8cpU5xav9Ci6nWfDzrNzkC2h7hrhhv'),
        lendingPoolCreditAccount: new PublicKey('4pYumgk2u8qDCvWFrvfxaepp9YFo4ZaqEw7okHCangep'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("4if9Gy7dvjU7XwunKxdnCcPsaT3yAHPXdz2XS1eo19LG"),
      swapPoolAuthority: new PublicKey("BshtCZRCHj2RZYC7u5sW3ioRJo9ZiYA4T5p8muFwrKnb"),
      lpMint: new PublicKey("F8gPSpwVHj8FdAJAYULDuZBxFEJut87hUbARYYx3471w"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("5JZXUbCfaSo3y9PYq47Hj5Yc6hVFa4j7MkDzBJfMSRSN"),
      swapTknVault0: new PublicKey("AvP1Db3SyUxLGMSc4nSXjJkjm1kAjiLjog7cup19eWa3"),
      swapTknVault1: new PublicKey("2wuSqR5z2Guft2yt57Hx7K6i1AYNoUi8fjxHUeAgaKXo"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("FpEb4eEqhnPBAA2RNvsSe8baCoev4mSNQjxKPGvx5Gjv"),
      stakePoolAuthority: new PublicKey("DzYWb4yzdge67MpXPWDvJcj1x6qA6s4RWzUhNiJd938C"),
      stakePoolFarmTknMint: new PublicKey("4CGxvZdwiZgVMLXiTdJHTkJRUTpTSJCtmtCRbSkAxerE"),
      stakePoolRewardsTknVault: new PublicKey("46gDMNrbpsNhUhdUwZsnKKtCRTJkfjRv5E23u8AFWmoQ"),
      stakePoolLpVault: new PublicKey("GhpzBsH2RgL3BDAgbBBJig5ozKLoDfTQFucoTHRQBbcM"),

      doubleDipPool: {
        rewardTknMint: TOKENS.PORT.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("C8k63XU8xzzvBpSraYWjHCNzvprjYKDadAML3MWSFbxW"),
        doubleDipStakePoolAuthority: new PublicKey("8Kzw42V4dzBB9PVkwiTNb6KZ3Mpytw8CKrr3cKpqjTLr"),
        doubleDipStakePoolFarmTknMint: new PublicKey("Zm2dmUuuBicmvHxGAnAzaohZR2Y86gXEV2WMfo8AoCa"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("J9SR9fPLeXy9UXiszFqP9nCoQWyj4Ynhzv4ngGJxkm5h"),
        doubleDipStakePoolFarmTknVault: new PublicKey("HZPdM9zq1NmtMECJSJr6sim1f4aLe4gixQ4m1XAhpP6a"),
      }
    },
  },
  'SAMO-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'SAMO/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.SAMO.mintAddress,

    strategyAccount: new PublicKey('5rGGUhPXwDyFGysKXNQgt7BKpp4diKvTQXj7cd2yXEBC'),
    strategyAuthority: new PublicKey('6zr7j575ntpQ2wGp2RZc2ny5QCDTqSUpayqdfcsQ5df1'),
    strategyFarmInfo: new PublicKey('Hbox8YFKJLmMEscJPSGUBLw67CM6sGhgmkCbQfbAyJ7Y'),
    strategyTknAccount0: new PublicKey('HvNL7n62tHntPAjmZDK4ENBsA7HucnBSe6cbzLdcUh9u'),
    strategyTknAccount1: new PublicKey('Ay15PAMeMftxtG9u6a2EtV3aK8YH2CKueA1srvsMK5Fq'),
    strategyLpTknAccount: new PublicKey('27N2dhxoSjGa94hRNz654EeunPBcRKKVm3zwZtehpVGd'),
    strategyRewardTknAccount: new PublicKey('B5xFgWyqp1DDq6ozwrMYLmfdNc3nfNsdk6VKmS6kSeob'),
    strategyFarmTknAccount: new PublicKey('9jHL86j8a1oSQ919tc1Mu3tQntQh9T8wGbvC2qfTUxfB'),
    strategyBorrowCreditAccount0: new PublicKey('6UiJQnPVnaiMdhKc59FX9NARNnUkryWccSkW6mKkKpLw'),
    strategyBorrowCreditAccount1: new PublicKey('dawhYuZjkDTrVcby5Q7E3Uyke3v7scy1uuaBbRdFeoZ'),
    doubleDipStrategyFarmTknAccount: new PublicKey('5TaSY4tLzeQqNrbY6UropCW2CJiyAMinzfKwbhnmP1La'),
    doubleDipStrategyRewardTknAccount: new PublicKey('Ay15PAMeMftxtG9u6a2EtV3aK8YH2CKueA1srvsMK5Fq'),
    doubleDipStrategyFarmInfo: new PublicKey('CQEiSSMpauNyJ9wRK7MHjLdqnHitvTmja6ZtAibQShmZ'),

    strategyRewardsSwapTargetAccount: new PublicKey('HvNL7n62tHntPAjmZDK4ENBsA7HucnBSe6cbzLdcUh9u'),
    strategyDoubleDipRewardsSwapTargetAccount: undefined,

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: TOKENS.SAMO.mintAddress,
        lendingPoolInfoAccount: new PublicKey('HJLkovTpxof1z9tVMuX1pWp1ePDx1zgmnGYfFMxFRAd'),
        lendingPoolTknAccount: new PublicKey('J198uwytk8CPejCyNM9TMPJcLPCky6pZwGwP3n1CUfto'),
        lendingPoolFeeAccount: new PublicKey('J198uwytk8CPejCyNM9TMPJcLPCky6pZwGwP3n1CUfto'),
        lendingPoolShareMint: new PublicKey('A9H3fAqkWmRnnFzXXzydZHzyLQdzK5o9dMejCL27tqq8'),
        lendingPoolShareAccount: new PublicKey('HP3sKy5xqLkoNnbuHRCPuFaQUtYskNnockBPcYo5PZut'),
        lendingPoolCreditMint: new PublicKey('E5ejPudazVxEdQUsS37g8yUn5HD22FBHsGEKWkGRDR3F'),
        lendingPoolCreditAccount: new PublicKey('23tLfFHXZR1tAimzVyEAdN7HWJWiqvjepaX5qBHkgQvT'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("Epvp7qMYAF21VVjacdB3VfKn6nnXQSF4rGYu8sD6Bkow"),
      swapPoolAuthority: new PublicKey("AB4rTE2JiKFhnfynUQCovbW75CUxT9LxcJX2SDTbY9gy"),
      lpMint: new PublicKey("6VK1ksrmYGMBWUUZfygGF8tHRGpNxQEWv8pfvzQHdyyc"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("9U8UF7d8kBvsS25XoZnjmVQ9vGkP4BUnHJgfc615BvG1"),
      swapTknVault0: new PublicKey("G7Gqjxk9EaJMeFfoFTSy9WfH8uurgQkbNQCREWAc56DZ"),
      swapTknVault1: new PublicKey("7jwHW4Lw3nVaSJXskN5pUoKU6YB9RBVfZtGBp3VbR43U"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("F5ZvDWRVpQP5A17RFogL4dE7gZ2Uda7ZqKUy3DWJDEFx"),
      stakePoolAuthority: new PublicKey("92oB7qcj7zCPmxmUPWfN3a8PUpyoKi7NGfR6JjjLMphp"),
      stakePoolFarmTknMint: new PublicKey("9voVuTq1S9bFZkF2Jo44HoVG63w2xDRT8eBzB23YbQud"),
      stakePoolRewardsTknVault: new PublicKey("F8vsyagqHVJPL6whBs5BCTdfAcESRBGfGZbjKtciYzUM"),
      stakePoolLpVault: new PublicKey("TuEvcp71fWQbRXZjW1JEKkYrNpAS4EpgibMvNeYar9j"),

      doubleDipPool: {
        rewardTknMint: TOKENS.SAMO.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("8VJT2SYGXgvQ8jYvh1Cq6mg83gkAVuTY3cHiULUy6Cit"),
        doubleDipStakePoolAuthority: new PublicKey("Cm3wcJtZEPYm9rm39LQNND7pxuL27539yLoMP7LcrLF7"),
        doubleDipStakePoolFarmTknMint: new PublicKey("EdfAy8jwnvU1z61UaFUjwoRPFgD3UkkPvnhEBZjzwhv8"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("2oQLWYCp6eaoF1aZfpwHhAbyD91FwyWssL3nrbTL4EP7"),
        doubleDipStakePoolFarmTknVault: new PublicKey("Be246fsrPT11xn9aqKt4TciTXwgwmMBKyosmgTr76Tbp"),
        doubleDipRewardsSwapPool: undefined
      }
    },
  },
  'ABR-USDC': {
    protocolVersion: 2,
    protocolSubVersion: 1,
    alias: null,
    orcaPoolId: 'ABR/USDC[aquafarm]',

    programId: lyfOrcaProgramId,
    tknMint0: TOKENS.USDC.mintAddress,
    tknMint1: TOKENS.ABR.mintAddress,

    strategyAccount: new PublicKey('9jiYtLh3fBKJHRRziqPYy9akZ1PBW9QejTmA4k1TqEAQ'),
    strategyAuthority: new PublicKey('EixXN3Sad5bkM8tqVu7vez6Herp8Gf9P5AqcZWtmjsuN'),
    strategyFarmInfo: new PublicKey('GT3qz82TAiMw3Cqo4FFw6DRuQ8jEf4P83PqN3isv23Wi'),
    strategyTknAccount0: new PublicKey('142zHiM4kLC9F2y8yaQYcDzdUaEqk4xDmat3mQSxbMab'),
    strategyTknAccount1: new PublicKey('3c2mwU3LeiMFBEyB45XQiGzHMMQ4GK6fkZ7aUniQ54Ch'),
    strategyLpTknAccount: new PublicKey('BZencsqABX4pddESXsGHX7FroUcsSvSLmtJJVMF8jVx9'),
    strategyRewardTknAccount: new PublicKey('E3pjNah6nJZ2QfTsJFd7e3gJHnyx8wW17HqS3RRKRQou'),
    strategyFarmTknAccount: new PublicKey('DNSvnsDvJUEbTMzv3r4bKYTPHUrsah7dhQ5CBMUJz7wY'),
    strategyBorrowCreditAccount0: new PublicKey('GL4ChKyeJb1rDsKpBkL63FqXcatqLuMkrJuZFqUsNfRA'),
    strategyBorrowCreditAccount1: new PublicKey('5ig8bfCsvmSLUprLzxBWFxTuYHRpb4gCPJmGtQpjzrsT'),
    doubleDipStrategyFarmTknAccount: new PublicKey('B6sAzhZPvmZibez4qSTQQCnoh2CzdtKsLumBbNpFKnqD'),
    doubleDipStrategyRewardTknAccount: new PublicKey('3c2mwU3LeiMFBEyB45XQiGzHMMQ4GK6fkZ7aUniQ54Ch'),
    doubleDipStrategyFarmInfo: new PublicKey('BinEw2MK32XkbzKMK2DNPbM4xxc6nQM7uJM9jVMjCpeF'),

    strategyRewardsSwapTargetAccount: new PublicKey('142zHiM4kLC9F2y8yaQYcDzdUaEqk4xDmat3mQSxbMab'),
    strategyDoubleDipRewardsSwapTargetAccount: undefined,

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: TOKENS.USDC.mintAddress, // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
      },
      "1": {
        tknMint: TOKENS.ABR.mintAddress,
        lendingPoolInfoAccount: new PublicKey('7iKEAvrGRqv4DW1v8qPGqijXeLwDtEzpQJpGsiFB7xvb'),
        lendingPoolTknAccount: new PublicKey('8TMXwxvfsks3JqgzeDoPjatNMqsUBdUjQSssvWTQbUaK'),
        lendingPoolFeeAccount: new PublicKey('8TMXwxvfsks3JqgzeDoPjatNMqsUBdUjQSssvWTQbUaK'),
        lendingPoolShareMint: new PublicKey('6yphfV68fCK1VXheNW4FDThyhU2rpDbFJgQMmB2aftYA'),
        lendingPoolShareAccount: new PublicKey('DxcbZLKM9a2wezBuKhgSCrbHZPwfEUNQv1RUoSzf3Vv4'),
        lendingPoolCreditMint: new PublicKey('D58Gfh9kGB3AAt4A6NY9XXRnbfYT33prxr7V9ZS6qnfp'),
        lendingPoolCreditAccount: new PublicKey('7uSmHk31Y6WxQ7ni9jEvVeW46i8fiEPhmRCT6S9VQcXF'),
      }
    },

    ammInfo: {
      swapProgramId: Orca_Swap_ProgramId,
      swapPoolId: new PublicKey("rxwsjytcEBvXpXrXBL1rpsjhoh78imBn8WbxjKmLRge"),
      swapPoolAuthority: new PublicKey("AcaxutE6Rh9vRxipTLdqinEdRK6R4ayUAAv2bZPh6UU9"),
      lpMint: new PublicKey("GMzPbaCuQmeMUm1opH3oSCgKUjVgJUW14myq99RVPGX5"),
      lpDecimals: 6,
      swapFeeAccount: new PublicKey("7pPJGwd8Vq7aYmHaocQpQSfTn3UWYGKUgFkFhpMmRdDF"),
      swapTknVault0: new PublicKey("8aTapFecZRZmC2bTeKr2voHFW2twNvbrh8nWYdXYQWkZ"),
      swapTknVault1: new PublicKey("6FRxhbY7bvSiDojPiqoidjTyDjxaUyCoPQk3ifEdfFbm"),

      rewardsSwapPoolId: new PublicKey("2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY"),
      rewardsSwapPoolAuthority: new PublicKey("3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob"),
      rewardsTargetlpMint: new PublicKey("n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx"),
      rewardsSwapfeeAccount: new PublicKey("7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN"),
      rewardsSwapPoolRewardsVault: new PublicKey("9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj"),
      rewardsSwapPoolTargetVault: new PublicKey("6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9"),

      stakeProgramId: Orca_Stake_ProgramId,
      stakeUserFarmInfoLayout: ORCA_USER_FARM_INFO_ACCOUNT_LAYOUT,
      stakePoolRewardsMint: TOKENS.ORCA.mintAddress,

      stakePoolFarmInfo: new PublicKey("PyzV3qSzbj98ArVpASj2LQg6zCq6zfAixqUtYDafnRU"),
      stakePoolAuthority: new PublicKey("25FYtidaLi2JfkMpbsdoYcjUgvTCzS6g3TGaGJNRoaBQ"),
      stakePoolFarmTknMint: new PublicKey("5uR5STASUmoGVHzqMeut98t26TfVkQqWU9f9dsv3NfJ6"),
      stakePoolRewardsTknVault: new PublicKey("76J8j7rAHepHd9FCL4FgA5AEfeFJL525R5poN4bvTmZv"),
      stakePoolLpVault: new PublicKey("BzqHvYdTCWUeUSdqjxLeGNDTXZss4ZBySqWfVskbMoGx"),

      doubleDipPool: {
        rewardTknMint: TOKENS.ABR.mintAddress,
        doubleDipStakePoolFarmInfo: new PublicKey("98htZRc2QNd8BS9GGHoxkySZ9BiL9MAgHLEQfxzXYKk6"),
        doubleDipStakePoolAuthority: new PublicKey("FNSAoH8GpTpD2iNTca5oU1gcaP6p16Rx6TSUyMZNJd6Y"),
        doubleDipStakePoolFarmTknMint: new PublicKey("7bp7psdaC3DVc86Hmdz5tAMEjgPjmCzgFEVALfqBwMmz"),
        doubleDipStakePoolRewardsTknVault: new PublicKey("sHSxDfPeiGksezjd7RguvBNMasajdWaWAWfBS2Fws56"),
        doubleDipStakePoolFarmTknVault: new PublicKey("eGjou3JXbgu71H36GQt6DpzBMYFrUiKwxcB9CxWoyrj"),
        doubleDipRewardsSwapPool: undefined
      }
    },
  },
};
