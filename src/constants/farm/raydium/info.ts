import { PublicKey } from "@solana/web3.js";
import { struct } from 'buffer-layout';
import { publicKey, u64 } from '@project-serum/borsh';

export const STAKE_PROGRAM_ID_V5 = new PublicKey('9KEPoZmtHUrBbhWN1v1KWLMkkvwY6WLtAVUCPRtRjP4z')
export const SERUM_PROGRAM_ID_V3 = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin')
export const LIQUIDITY_POOL_PROGRAM_ID_V4 = new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8')
export const lyfRaydiumProgramId = new PublicKey("2nAAsYdXF3eTQzaeUQS3fr4o782dDg8L28mX39Wr5j8N");

export const USER_STAKE_INFO_ACCOUNT_LAYOUT = struct([
  u64('state'),
  publicKey('poolId'),
  publicKey('stakerOwner'),
  u64('depositBalance'),
  u64('rewardDebt')
]);

export const USER_STAKE_INFO_ACCOUNT_LAYOUT_V4 = struct([
  u64('state'),
  publicKey('poolId'),
  publicKey('stakerOwner'),
  u64('depositBalance'),
  u64('rewardDebt'),
  u64('rewardDebtB')
]);

export const lyfPubkeyConfig = {
  // 'RAY-USDC': {
  //   programId: lyfRaydiumProgramId,
  //   tknMint0: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  //   tknMint1: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   lpMint: new PublicKey("FbC6K13MzHvN42bXrtGaWsvZY9fxrackRSZcBGfjPc7m"),
  //   rewardMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   rewardMintB: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   strategyBorrowCreditMint0: new PublicKey('CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E'),
  //   strategyBorrowCreditMint1: new PublicKey('GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR'),

  //   strategyAccount: new PublicKey('9AcpsMj8q1rqkCtw9NP5hEumzgGnL31EMpXZT2BPUfng'),
  //   strategyAuthority: new PublicKey('4wQQvg2NmtuxyjCy8Uszj4Fny8sUwaUXy4DFQydJhiDo'),
  //   strategyFarmInfo: new PublicKey('9pDgptKTE1ZYXgh78NTdMAc9vhwzKJoCjC29CJqVhfBS'),
  //   strategyTknAccount0: new PublicKey('EqSCzhRmYjB64PxRq5bQ3Pq9VH5CuKHdLe8HKZCEHGVA'),
  //   strategyTknAccount1: new PublicKey('8iZd1bBcYZjPuJCkw74Yrc2JcS5RhAzLxfowN8aHse6z'),
  //   strategyLpAccount: new PublicKey('Es5E5VdmsQYD7g4U7anAsBbKMxwNNai82SDyWDGU5dn5'),
  //   strategRewardAccount: new PublicKey('8iZd1bBcYZjPuJCkw74Yrc2JcS5RhAzLxfowN8aHse6z'),
  //   strategRewardAccountB: new PublicKey('8iZd1bBcYZjPuJCkw74Yrc2JcS5RhAzLxfowN8aHse6z'),
  //   strategyBorrowCreditAccount0: new PublicKey('4fNpe228dA3UcfBrGoKwQkCnPHk4XzaButg8dJdmoBWw'),
  //   strategyBorrowCreditAccount1: new PublicKey('CeJaztNgyfwsNBs3oV895uL3ZnP4T86f66aSkVmmswWY'),

  //   stakeUserFarmInfoLayout: USER_STAKE_INFO_ACCOUNT_LAYOUT,

  //   lendingPoolConfig: {
  //     programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
  //     marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //     marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
  //     marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

  //     0: {
  //       tknMint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // usdc
  //       lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
  //       lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
  //       lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
  //       lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
  //       lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
  //       lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
  //       lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
  //       strategyCreditAccounts: [
  //         new PublicKey("GWnKzyvCJcQXvSwmj9msHUrCEv73XkbkF3csoHjwSDQL")
  //       ]
  //     },
  //     1: {
  //       tknMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"), // ray
  //       lendingPoolInfoAccount: new PublicKey("ENZ7vdrvNGdAfVa8DoGpT2GrfoSFUtWKRoesf2dvqpuq"),
  //       lendingPoolTknAccount: new PublicKey("BUK8XbZeEqVULYRxGp4Va2R1BRqrYzXDrCVnWt6B7TZf"),
  //       lendingPoolFeeAccount: new PublicKey("C2HJD7r6NYCCVoXPPExxYEQ73LZJ3qmb5H13GnwMZfwa"),
  //       lendingPoolShareMint: new PublicKey("5uZERkJVyhCABEdocEssPZyMXYa8GJpLhngi95yXr9jc"),
  //       lendingPoolShareAccount: new PublicKey("GrVpvHCRkTHESGwyaj4gtNLn95NAdkBSnZbKusoFumup"),
  //       lendingPoolCreditMint: new PublicKey("GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR"),
  //       lendingPoolCreditAccount: new PublicKey("6EZzqDqfTfdoFF4KD1gmki3btEHfULK4SjNcuJMTEDUt")
  //     }
  //   },

  //   raydiumInfo: {
  //     raydiumProgramId: LIQUIDITY_POOL_PROGRAM_ID_V4,
  //     ammId: new PublicKey('6UmmUiYoBjSrhakAobJw8BvkmJtDVxaeBtbt7rxWo1mg'),
  //     ammAuthority: new PublicKey('5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'),
  //     ammOpenOrders: new PublicKey('J8u8nTHYtvudyqwLrXZboziN95LpaHFHpd97Jm5vtbkW'),
  //     ammTargetOrders: new PublicKey('3cji8XW5uhtsA757vELVFAeJpskyHwbnTSceMFY5GjVT'),

  //     ammCoinAccount: new PublicKey('FdmKUE4UMiJYFK5ogCngHzShuVKrFXBamPWcewDr31th'),
  //     ammPcAccount: new PublicKey('Eqrhxd7bDUCH3MepKmdVkgwazXRzY6iHhEoBpY7yAohk'),
  //     poolWithdrawQueue: new PublicKey('ERiPLHrxvjsoMuaWDWSTLdCMzRkQSo8SkLBLYEmSokyr'),
  //     poolTempLpTokenAccount: new PublicKey('D1V5GMf3N26owUFcbz2qR5N4G81qPKQvS2Vc4SM73XGB'),
  //     serumProgramId: SERUM_PROGRAM_ID_V3,
  //     serumMarketId: new PublicKey('2xiv8A5xrJ7RnGdxXB42uFEkYHJjszEhaJyKKt4WaLep'),
  //     serumBids: new PublicKey('Hf84mYadE1VqSvVWAvCWc9wqLXak4RwXiPb4A91EAUn5'),
  //     serumAsks: new PublicKey('DC1HsWWRCXVg3wk2NndS5LTbce3axwUwUZH1RgnV4oDN'),
  //     serumEventQueue: new PublicKey('H9dZt8kvz1Fe5FyRisb77KcYTaN8LEbuVAfJSnAaEABz'),
  //     serumCoinVault: new PublicKey('GGcdamvNDYFhAXr93DWyJ8QmwawUHLCyRqWL3KngtLRa'),
  //     serumPCVault: new PublicKey('22jHt5WmosAykp3LPGSAKgY45p7VGh4DFWSwp21SWBVe'),
  //     serumVaultSigner: new PublicKey('FmhXe9uG6zun49p222xt3nG1rBAkWvzVz7dxERQ6ouGw'),

  //     stakePoolProgramId: STAKE_PROGRAM_ID,
  //     stakePoolId: new PublicKey('CHYrUBX2RKX8iBg7gYTkccoGNBzP44LdaazMHCLcdEgS'),
  //     stakePoolAuthority: new PublicKey('5KQFnDd33J5NaMC9hQ64P5XzaaSz8Pt7NBCkZFYn1po'),
  //     stakePoolLpAccount: new PublicKey('BNnXLFGva3K8ACruAc1gaP49NCbLkyE6xWhGV4G2HLrs'),
  //     stakePoolRewardAccount: new PublicKey('DpRueBHHhrQNvrjZX7CwGitJDJ8eZc3AHcyFMG4LqCQR'),
  //     stakePoolRewardAccountB: new PublicKey('DpRueBHHhrQNvrjZX7CwGitJDJ8eZc3AHcyFMG4LqCQR')
  //   }
  // },

  // 'RAY-USDT': {
  //   programId: lyfRaydiumProgramId,
  //   tknMint0: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
  //   tknMint1: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   lpMint: new PublicKey("C3sT1R3nsw4AVdepvLTLKr5Gvszr7jufyBWUCvy4TUvT"),
  //   rewardMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   rewardMintB: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   strategyBorrowCreditMint0: new PublicKey('CoheXVD8cAdVaKznfay22dBpfML5Fbz5g4j67syKgRg4'),
  //   strategyBorrowCreditMint1: new PublicKey('GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR'),

  //   strategyAccount: new PublicKey('5ShBNHXC9DdqMMEWTFzexs8d6vKCYuHFw34gq9YK35c3'),
  //   strategyAuthority: new PublicKey('6LfRzuiTDcto2C7EJg423goHynNFswdfbri9gjHh4mWE'),
  //   strategyFarmInfo: new PublicKey('3xwbRCx5Zex1FwEDXjioeQ6kk2XcM1uTw67tdE2WhsnD'),
  //   strategyTknAccount0: new PublicKey('8XsRpCVJP19dtizBP9F5t4kGtg8h1rpdsYvyWKJCVVYY'),
  //   strategyTknAccount1: new PublicKey('CEdiqB4KEE8WVsp4vyhDkgq7HWPds64Be9jSpocN36Sa'),
  //   strategyLpAccount: new PublicKey('3yxGJisoYe2pgsUzfYoXnEs8Nwgr9dhrBq32C7oSrrrH'),
  //   strategRewardAccount: new PublicKey('CEdiqB4KEE8WVsp4vyhDkgq7HWPds64Be9jSpocN36Sa'),
  //   strategRewardAccountB: new PublicKey('CEdiqB4KEE8WVsp4vyhDkgq7HWPds64Be9jSpocN36Sa'),
  //   strategyBorrowCreditAccount0: new PublicKey('4npVB2cMX16D5aV56atXFsitvgwadqZAMvcjT7bAaAWr'),
  //   strategyBorrowCreditAccount1: new PublicKey('AzKYaZYtazkPN6eaFvPCv89R5MEz9iXcR91TeyX6TZNY'),

  //   stakeUserFarmInfoLayout: USER_STAKE_INFO_ACCOUNT_LAYOUT,

  //   lendingPoolConfig: {
  //     programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
  //     marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //     marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
  //     marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

  //     0: {
  //       tknMint: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"), // usdt
  //       lendingPoolInfoAccount: new PublicKey("EyqWUeme2B1dhuwJvJVi2coYPcGWmWrakcpsSFeikrhb"),
  //       lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
  //       lendingPoolTknAccount: new PublicKey("Acx3Ky9pk8CyYftA9HYF31EbVhBDi21EqJsFtMW2XxXW"),
  //       lendingPoolFeeAccount: new PublicKey("7gAN5Y4hGAG2A9vyr9dURGosjmo4Rwiaqz4iKZGNenE1"),
  //       lendingPoolShareMint: new PublicKey("8TtsTZQ6mU4YSW5jw4sDjSDEG1CW8QLpK7C9g5TVgBvn"),
  //       lendingPoolShareAccount: new PublicKey("EfLgyXRGFi9MUCMgrsFBuAJ7pMPXBceKhD6x4PgdvLLc"),
  //       lendingPoolCreditMint: new PublicKey("CoheXVD8cAdVaKznfay22dBpfML5Fbz5g4j67syKgRg4"),
  //       lendingPoolCreditAccount: new PublicKey("EAQxDXsA6RXxWtA1PwZNnTnj2MapHBtMzvUmfuGPJCPX")
  //     },
  //     1: {
  //       tknMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"), // ray
  //       lendingPoolInfoAccount: new PublicKey("ENZ7vdrvNGdAfVa8DoGpT2GrfoSFUtWKRoesf2dvqpuq"),
  //       lendingPoolTknAccount: new PublicKey("BUK8XbZeEqVULYRxGp4Va2R1BRqrYzXDrCVnWt6B7TZf"),
  //       lendingPoolFeeAccount: new PublicKey("C2HJD7r6NYCCVoXPPExxYEQ73LZJ3qmb5H13GnwMZfwa"),
  //       lendingPoolShareMint: new PublicKey("5uZERkJVyhCABEdocEssPZyMXYa8GJpLhngi95yXr9jc"),
  //       lendingPoolShareAccount: new PublicKey("GrVpvHCRkTHESGwyaj4gtNLn95NAdkBSnZbKusoFumup"),
  //       lendingPoolCreditMint: new PublicKey("GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR"),
  //       lendingPoolCreditAccount: new PublicKey("6EZzqDqfTfdoFF4KD1gmki3btEHfULK4SjNcuJMTEDUt")
  //     }
  //   },
  //   raydiumInfo: {
  //     raydiumProgramId: LIQUIDITY_POOL_PROGRAM_ID_V4,
  //     ammId: new PublicKey('DVa7Qmb5ct9RCpaU7UTpSaf3GVMYz17vNVU67XpdCRut'),
  //     ammAuthority: new PublicKey('5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'),
  //     ammOpenOrders: new PublicKey('7UF3m8hDGZ6bNnHzaT2YHrhp7A7n9qFfBj6QEpHPv5S8'),
  //     ammTargetOrders: new PublicKey('3K2uLkKwVVPvZuMhcQAPLF8hw95somMeNwJS7vgWYrsJ'),

  //     ammCoinAccount: new PublicKey('3wqhzSB9avepM9xMteiZnbJw75zmTBDVmPFLTQAGcSMN'),
  //     ammPcAccount: new PublicKey('5GtSbKJEPaoumrDzNj4kGkgZtfDyUceKaHrPziazALC1'),
  //     poolWithdrawQueue: new PublicKey('8VuvrSWfQP8vdbuMAP9AkfgLxU9hbRR6BmTJ8Gfas9aK'),
  //     poolTempLpTokenAccount: new PublicKey('FBzqDD1cBgkZ1h6tiZNFpkh4sZyg6AG8K5P9DSuJoS5F'),
  //     serumProgramId: SERUM_PROGRAM_ID_V3,
  //     serumMarketId: new PublicKey('teE55QrL4a4QSfydR9dnHF97jgCfptpuigbb53Lo95g'),
  //     serumBids: new PublicKey('AvKStCiY8LTp3oDFrMkiHHxxhxk4sQUWnGVcetm4kRpy'),
  //     serumAsks: new PublicKey('Hj9kckvMX96mQokfMBzNCYEYMLEBYKQ9WwSc1GxasW11'),
  //     serumEventQueue: new PublicKey('58KcficuUqPDcMittSddhT8LzsPJoH46YP4uURoMo5EB'),
  //     serumCoinVault: new PublicKey('2kVNVEgHicvfwiyhT2T51YiQGMPFWLMSp8qXc1hHzkpU'),
  //     serumPCVault: new PublicKey('5AXZV7XfR7Ctr6yjQ9m9dbgycKeUXWnWqHwBTZT6mqC7'),
  //     serumVaultSigner: new PublicKey('HzWpBN6ucpsA9wcfmhLAFYqEUmHjE9n2cGHwunG5avpL'),

  //     stakePoolProgramId: STAKE_PROGRAM_ID,
  //     stakePoolId: new PublicKey('AvbVWpBi2e4C9HPmZgShGdPoNydG4Yw8GJvG9HUcLgce'),
  //     stakePoolAuthority: new PublicKey('8JYVFy3pYsPSpPRsqf43KSJFnJzn83nnRLQgG88XKB8q'),
  //     stakePoolLpAccount: new PublicKey('4u4AnMBHXehdpP5tbD6qzB5Q4iZmvKKR5aUr2gavG7aw'),
  //     stakePoolRewardAccount: new PublicKey('HCHNuGzkqSnw9TbwpPv1gTnoqnqYepcojHw9DAToBrUj'),
  //     stakePoolRewardAccountB: new PublicKey('HCHNuGzkqSnw9TbwpPv1gTnoqnqYepcojHw9DAToBrUj')
  //   }
  // },

  // 'RAY-SRM': {
  //   programId: lyfRaydiumProgramId,
  //   tknMint0: new PublicKey("SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt"),
  //   tknMint1: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   lpMint: new PublicKey("7P5Thr9Egi2rvMmEuQkLn8x8e8Qro7u2U7yLD2tU2Hbe"),
  //   rewardMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   rewardMintB: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   strategyBorrowCreditMint0: new PublicKey('DqKuxgMxLPDCXtoQzLG1p85S2i3tP3EaeUVDAw7P8Nt4'),
  //   strategyBorrowCreditMint1: new PublicKey('GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR'),

  //   strategyAccount: new PublicKey('Dxs5pAPwZH42NvMa8Kgi9PchwUHYWwPb9GtZCsEFC2ed'),
  //   strategyAuthority: new PublicKey('3DTEew5qLwDk5VVYrscXohcbyx5pk4t99MxuMqmC1x6Z'),
  //   strategyFarmInfo: new PublicKey('7MLzntQJRe34WY7Ji3RraLx4fPc9k2CpatzYJtYn9meV'),
  //   strategyTknAccount0: new PublicKey('7fu3PSHTgQ3NygKKYH64miPH3A9jk3LtxCAbgy2GzB8q'),
  //   strategyTknAccount1: new PublicKey('HomjYBF4VBjLP2rjyaZP92qA3aG9FvYgaRLYt6th59bM'),
  //   strategyLpAccount: new PublicKey('GtRehrwTdKvizPKiy3ykFNgGzjkg5HhYAJPfGZXUsvdB'),
  //   strategRewardAccount: new PublicKey('HomjYBF4VBjLP2rjyaZP92qA3aG9FvYgaRLYt6th59bM'),
  //   strategRewardAccountB: new PublicKey('HomjYBF4VBjLP2rjyaZP92qA3aG9FvYgaRLYt6th59bM'),
  //   strategyBorrowCreditAccount0: new PublicKey('DUsHuyUoo72QHn5Hg4aSANmTCihsBRN482HT6LiHTqhs'),
  //   strategyBorrowCreditAccount1: new PublicKey('B8vvx1Zs1MjDps6vq6KSDKhfSxmE8iDeKVjpVFoxfQWX'),

  //   stakeUserFarmInfoLayout: USER_STAKE_INFO_ACCOUNT_LAYOUT,

  //   lendingPoolConfig: {
  //     programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
  //     marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //     marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
  //     marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

  //     0: {
  //       lendingPoolInfoAccount: new PublicKey("B1zB1EuTjnFPLdwySeBYhzeAf3h9buWLbDoG7AHcUTMF"),
  //       lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
  //       lendingPoolTknAccount: new PublicKey("FLQtBThLEVvhXdKqq2CREL8sFt8jAFS8szm4HaMYqmJk"),
  //       lendingPoolFeeAccount: new PublicKey("FdSBYwMEfy21H3k64cvYdir3mxzmnZotiYUsC5iPPoxM"),
  //       lendingPoolShareMint: new PublicKey("6CZhCFwA7hbqDEoVUQdFpHaCGQU7fSSwhaJWdG4DmsQ6"),
  //       lendingPoolShareAccount: new PublicKey("C3EjtH3hVuLrU3j1y5ArMFRbAhxFf5hXNfk3b9SU91qN"),
  //       lendingPoolCreditMint: new PublicKey("DqKuxgMxLPDCXtoQzLG1p85S2i3tP3EaeUVDAw7P8Nt4"),
  //       lendingPoolCreditAccount: new PublicKey("Ednqn9Zo5HpDX2DRmCWu6x46ZXnHNmTmrq9G8hrTuBnz")
  //     },
  //     1: {
  //       lendingPoolInfoAccount: new PublicKey("ENZ7vdrvNGdAfVa8DoGpT2GrfoSFUtWKRoesf2dvqpuq"),
  //       lendingPoolTknAccount: new PublicKey("BUK8XbZeEqVULYRxGp4Va2R1BRqrYzXDrCVnWt6B7TZf"),
  //       lendingPoolFeeAccount: new PublicKey("C2HJD7r6NYCCVoXPPExxYEQ73LZJ3qmb5H13GnwMZfwa"),
  //       lendingPoolShareMint: new PublicKey("5uZERkJVyhCABEdocEssPZyMXYa8GJpLhngi95yXr9jc"),
  //       lendingPoolShareAccount: new PublicKey("GrVpvHCRkTHESGwyaj4gtNLn95NAdkBSnZbKusoFumup"),
  //       lendingPoolCreditMint: new PublicKey("GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR"),
  //       lendingPoolCreditAccount: new PublicKey("6EZzqDqfTfdoFF4KD1gmki3btEHfULK4SjNcuJMTEDUt")
  //     }
  //   },
  //   raydiumInfo: {
  //     raydiumProgramId: LIQUIDITY_POOL_PROGRAM_ID_V4,
  //     ammId: new PublicKey('GaqgfieVmnmY4ZsZHHA6L5RSVzCGL3sKx4UgHBaYNy8m'),
  //     ammAuthority: new PublicKey('5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'),
  //     ammOpenOrders: new PublicKey('7XWbMpdyGM5Aesaedh6V653wPYpEswA864sBvodGgWDp'),
  //     ammTargetOrders: new PublicKey('9u8bbHv7DnEbVRXmptz3LxrJsryY1xHqGvXLpgm9s5Ng'),

  //     ammCoinAccount: new PublicKey('3FqQ8p72N85USJStyttaohu1EBsTsEZQ9tVqwcPWcuSz'),
  //     ammPcAccount: new PublicKey('384kWWf2Km56EReGvmtCKVo1BBmmt2SwiEizjhwpCmrN'),
  //     poolWithdrawQueue: new PublicKey('58z15NsT3JJyfywFbdYzn2GVeDDC444WHyUrssZ5tCm7'),
  //     poolTempLpTokenAccount: new PublicKey('8jqpuijsM2ne5dkwLyjQxa9oCbYEjM6bE1uBaFXmC3TE'),
  //     serumProgramId: SERUM_PROGRAM_ID_V3,
  //     serumMarketId: new PublicKey('Cm4MmknScg7qbKqytb1mM92xgDxv3TNXos4tKbBqTDy7'),
  //     serumBids: new PublicKey('G65a5G6xHpc9zV8tGhVSKJtz7AcAJ8Q3hbMqnDJQgMkz'),
  //     serumAsks: new PublicKey('7bKEjcZEqVAWsiRGDnxXvTnNwhZLt2SH6cHi5hpcg5de'),
  //     serumEventQueue: new PublicKey('4afBYfMNsNpLQxFFt72atZsSF4erfU28XvugpX6ugvr1'),
  //     serumCoinVault: new PublicKey('5QDTh4Bpz4wruWMfayMSjUxRgDvMzvS2ifkarhYtjS1B'),
  //     serumPCVault: new PublicKey('76CofnHCvo5wEKtxNWfLa2jLDz4quwwSHFMne6BWWqx'),
  //     serumVaultSigner: new PublicKey('AorjCaSV1L6NGcaFZXEyUrmbSqY3GdB3YXbQnrh85v6F'),

  //     stakePoolProgramId: STAKE_PROGRAM_ID,
  //     stakePoolId: new PublicKey('5DFbcYNLLy5SJiBpCCDzNSs7cWCsUbYnCkLXzcPQiKnR'),
  //     stakePoolAuthority: new PublicKey('DdFXxCbn5vpxPRaGmurmefCTTSUa5XZ9Kh6Noc4bvrU9'),
  //     stakePoolLpAccount: new PublicKey('792c58UHPPuLJcYZ6nawcD5F5NQXGbBos9ZGczTrLSdb'),
  //     stakePoolRewardAccount: new PublicKey('5ihtMmeTAx3kdf459Yt3bqos5zDe4WBBcSZSB6ooNxLt'),
  //     stakePoolRewardAccountB: new PublicKey('5ihtMmeTAx3kdf459Yt3bqos5zDe4WBBcSZSB6ooNxLt')
  //   }
  // },

  // 'RAY-ETH': {
  //   programId: lyfRaydiumProgramId,
  //   tknMint0: new PublicKey("2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk"),
  //   tknMint1: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   lpMint: new PublicKey("mjQH33MqZv5aKAbKHi8dG3g3qXeRQqq1GFcXceZkNSr"),
  //   rewardMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   rewardMintB: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   strategyBorrowCreditMint0: new PublicKey('BKKbCDggM83SPLFd1jRPu1ZsCv9nXkwZVne11N9FEs9w'),
  //   strategyBorrowCreditMint1: new PublicKey('GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR'),

  //   strategyAccount: new PublicKey('3wM65R2w5fcMgePmpD4GU6zGGT6XHS36cNcLfZjtQEbD'),
  //   strategyAuthority: new PublicKey('9GdEdyZgTcmBzh9rGfWjCrrhF2VLByPN2uhsuf8BiAKk'),
  //   strategyFarmInfo: new PublicKey('7ZsVQVWzsWYpLJWpnPSbmqLRqdAmcxzZkzkQffHnKDYW'),
  //   strategyTknAccount0: new PublicKey('7D5EzXznEht2tHe6BYemnLzCVxweSMCw2WJgPCpD8uuu'),
  //   strategyTknAccount1: new PublicKey('7cWTrY5MppAUhxgaxFwgi3CvJJLkVpN8Lyx4nuLJP8rf'),
  //   strategyLpAccount: new PublicKey('CUxija4mmWR5zNwpvMJ2rfWvk1Sr4EWPqvnmhWcXiwrw'),
  //   strategRewardAccount: new PublicKey('7cWTrY5MppAUhxgaxFwgi3CvJJLkVpN8Lyx4nuLJP8rf'),
  //   strategRewardAccountB: new PublicKey('7cWTrY5MppAUhxgaxFwgi3CvJJLkVpN8Lyx4nuLJP8rf'),
  //   strategyBorrowCreditAccount0: new PublicKey('DZgvYhY69tK1V7gcbuthQtATpnbQamZtvPuToqjoZSW4'),
  //   strategyBorrowCreditAccount1: new PublicKey('3zTwSkG9eg5PLWLRb8UrQrKouuLqyytgCZGk1Q5LxT4m'),

  //   stakeUserFarmInfoLayout: USER_STAKE_INFO_ACCOUNT_LAYOUT,

  //   lendingPoolConfig: {
  //     programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
  //     marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //     marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
  //     marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

  //     0: {
  //       lendingPoolInfoAccount: new PublicKey("CKMQxUz1nkn3NS5B9AUD1uyWNL8iN2piG9LVt1RvWXzj"),
  //       lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
  //       lendingPoolTknAccount: new PublicKey("9MH38iiDX4Pk37U6TXLqz2783RspNhwBTYwBNHp8WUzP"),
  //       lendingPoolFeeAccount: new PublicKey("8UPe7Fcm2f1QEFQh2YNr1jg2vgQmj4CXhLYEWgStHd8B"),
  //       lendingPoolShareMint: new PublicKey("B8QXcUv5FFwyHH5V88g6PhYBc8fQvwSpza4C9PsiRpQD"),
  //       lendingPoolShareAccount: new PublicKey("C5X2Q2K2jQtwpuqHKnLVJ1ZsvL9BMRwddMgqaQ5UGNkC"),
  //       lendingPoolCreditMint: new PublicKey("BKKbCDggM83SPLFd1jRPu1ZsCv9nXkwZVne11N9FEs9w"),
  //       lendingPoolCreditAccount: new PublicKey("9A3KAmmv1VyqNqVGBM6T9b1dp9Ax9xxdeXEgedo8U7Gh")
  //     },
  //     1: {
  //       lendingPoolInfoAccount: new PublicKey("ENZ7vdrvNGdAfVa8DoGpT2GrfoSFUtWKRoesf2dvqpuq"),
  //       lendingPoolTknAccount: new PublicKey("BUK8XbZeEqVULYRxGp4Va2R1BRqrYzXDrCVnWt6B7TZf"),
  //       lendingPoolFeeAccount: new PublicKey("C2HJD7r6NYCCVoXPPExxYEQ73LZJ3qmb5H13GnwMZfwa"),
  //       lendingPoolShareMint: new PublicKey("5uZERkJVyhCABEdocEssPZyMXYa8GJpLhngi95yXr9jc"),
  //       lendingPoolShareAccount: new PublicKey("GrVpvHCRkTHESGwyaj4gtNLn95NAdkBSnZbKusoFumup"),
  //       lendingPoolCreditMint: new PublicKey("GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR"),
  //       lendingPoolCreditAccount: new PublicKey("6EZzqDqfTfdoFF4KD1gmki3btEHfULK4SjNcuJMTEDUt")
  //     }
  //   },
  //   raydiumInfo: {
  //     raydiumProgramId: LIQUIDITY_POOL_PROGRAM_ID_V4,
  //     ammId: new PublicKey('8iQFhWyceGREsWnLM8NkG9GC8DvZunGZyMzuyUScgkMK'),
  //     ammAuthority: new PublicKey('5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'),
  //     ammOpenOrders: new PublicKey('7iztHknuo7FAXVrrpAjsHBEEjRTaNH4b3hecVApQnSwN'),
  //     ammTargetOrders: new PublicKey('JChSqhn6yyEWqD95t8UR5DaZZtEZ1RGGjdwgMc8S6UUt'),

  //     ammCoinAccount: new PublicKey('G3Szi8fUqxfZjZoNx17kQbxeMTyXt2ieRvju4f3eJt9j'),
  //     ammPcAccount: new PublicKey('7MgaPPNa7ySdu5XV7ik29Xoav4qcDk4wznXZ2Muq9MnT'),
  //     poolWithdrawQueue: new PublicKey('C9aijsE3tLbVyYaXXHi45qneDL5jfyN8befuJh8zzpou'),
  //     poolTempLpTokenAccount: new PublicKey('3CDnyBsNnexdvfvo6ASde5Q4e72jzMQFHRRkSQr49vEG'),
  //     serumProgramId: SERUM_PROGRAM_ID_V3,
  //     serumMarketId: new PublicKey('6jx6aoNFbmorwyncVP5V5ESKfuFc9oUYebob1iF6tgN4'),
  //     serumBids: new PublicKey('Hdvh4ZGL9MkiQApNqfZtdmd4jM6Sz8e9akCUuxxkYhb8'),
  //     serumAsks: new PublicKey('7vWmTv9Mh8XbAxcduEqed2dLtro4N7hFroqch6mMxYKM'),
  //     serumEventQueue: new PublicKey('EgcugBBSwM2FxqLQx5S6zAiU9x9qRS8qMVRMDFFU4Zty'),
  //     serumCoinVault: new PublicKey('EVVtYo4AeCbmn2dYS1UnhtfjpzCXCcN26G1HmuHwMo7w'),
  //     serumPCVault: new PublicKey('6ZT6KwvjLnJLpFdVfiRD9ifVUo4gv4MUie7VvPTuk69v'),
  //     serumVaultSigner: new PublicKey('HXbRDLcX2FyqWJY95apnsTgBoRHyp7SWYXcMYod6EBrQ'),

  //     stakePoolProgramId: STAKE_PROGRAM_ID,
  //     stakePoolId: new PublicKey('B6fbnZZ7sbKHR18ffEDD5Nncgp54iKN1GbCgjTRdqhS1'),
  //     stakePoolAuthority: new PublicKey('6amoZ7YBbsz3uUUbkeEH4vDTNwjvgjxTiu6nGi9z1JGe'),
  //     stakePoolLpAccount: new PublicKey('BjAfXpHTHz2kipraNddS6WwQvGGtbvyobn7MxLEEYfrH'),
  //     stakePoolRewardAccount: new PublicKey('7YfTgYQFGEJ4kb8jCF8cBrrUwEFskLin3EbvE1crqiQh'),
  //     stakePoolRewardAccountB: new PublicKey('7YfTgYQFGEJ4kb8jCF8cBrrUwEFskLin3EbvE1crqiQh')
  //   }
  // },

  // 'RAY-SOL': {
  //   programId: lyfRaydiumProgramId,
  //   tknMint0: NATIVE_MINT,
  //   tknMint1: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   lpMint: new PublicKey("89ZKE4aoyfLBe2RuV6jM3JGNhaV18Nxh8eNtjRcndBip"),
  //   rewardMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   rewardMintB: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
  //   strategyBorrowCreditMint0: new PublicKey('7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG'),
  //   strategyBorrowCreditMint1: new PublicKey('GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR'),

  //   strategyAccount: new PublicKey('CdGmR4ZsFeKc9uQ9PubgmdstDM9Yny6UwnhgiRLpBGF5'),
  //   strategyAuthority: new PublicKey('HPbHhWB4Bcv8rW9tFVnP45NzP8ccPMfzBgfjBDSHiH8J'),
  //   strategyFarmInfo: new PublicKey('9fvS6hfd7dqQ9MXuoKjbMAP1GsiY3KgnmdL8JDdj7XHq'),
  //   strategyTknAccount0: new PublicKey('HxGebtQbMHVWXnvDG62J4YJENXtPBrdkWtS5CefYETTD'),
  //   strategyTknAccount1: new PublicKey('4mGFaFF4mAekF4z951KykfLfNifb9w78XSyht4id2vew'),
  //   strategyLpAccount: new PublicKey('GpBWcYsaLL3SqfHTH6EnpTCBphSo8oyJsG1H5UGPtSGc'),
  //   strategRewardAccount: new PublicKey('4mGFaFF4mAekF4z951KykfLfNifb9w78XSyht4id2vew'),
  //   strategRewardAccountB: new PublicKey('4mGFaFF4mAekF4z951KykfLfNifb9w78XSyht4id2vew'),
  //   strategyBorrowCreditAccount0: new PublicKey('4zkctPV1xHvKP7rfzv8NwkyWuDJNudJnmKBNvyUubdd4'),
  //   strategyBorrowCreditAccount1: new PublicKey('F5wQQSvfE4mfvJ8padaVVBw6mKdn882KZzF145iutAFT'),

  //   stakeUserFarmInfoLayout: USER_STAKE_INFO_ACCOUNT_LAYOUT,

  //   lendingPoolConfig: {
  //     programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
  //     marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //     marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
  //     marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

  //     0: {
  //       lendingPoolInfoAccount: new PublicKey("EnZC8MB6QLTxwN1LNqCXYC7XMpvXqitnYQPf5y5AcQRn"),
  //       lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
  //       lendingPoolTknAccount: new PublicKey("GiJwrxQW5NQWWAva4rnDMXwHxfrhyUzwMX5to1pmCCgF"),
  //       lendingPoolFeeAccount: new PublicKey("2BDZqoVKAX3PJKeZJytjk7oEpbUu3jvdgdi6tA8VusnY"),
  //       lendingPoolShareMint: new PublicKey("92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB"),
  //       lendingPoolShareAccount: new PublicKey("Hyi1jMgc9MMEZyaG9ziL2PvT7zbeRNKhb5K1kj9bxz4x"),
  //       lendingPoolCreditMint: new PublicKey("7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG"),
  //       lendingPoolCreditAccount: new PublicKey("WuPCgCuyLSXatdjyWqkGjCPSQFgKLwcfsNR9fDq3hVL")
  //     },
  //     1: {
  //       lendingPoolInfoAccount: new PublicKey("ENZ7vdrvNGdAfVa8DoGpT2GrfoSFUtWKRoesf2dvqpuq"),
  //       lendingPoolTknAccount: new PublicKey("BUK8XbZeEqVULYRxGp4Va2R1BRqrYzXDrCVnWt6B7TZf"),
  //       lendingPoolFeeAccount: new PublicKey("C2HJD7r6NYCCVoXPPExxYEQ73LZJ3qmb5H13GnwMZfwa"),
  //       lendingPoolShareMint: new PublicKey("5uZERkJVyhCABEdocEssPZyMXYa8GJpLhngi95yXr9jc"),
  //       lendingPoolShareAccount: new PublicKey("GrVpvHCRkTHESGwyaj4gtNLn95NAdkBSnZbKusoFumup"),
  //       lendingPoolCreditMint: new PublicKey("GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR"),
  //       lendingPoolCreditAccount: new PublicKey("6EZzqDqfTfdoFF4KD1gmki3btEHfULK4SjNcuJMTEDUt")
  //     }
  //   },
  //   raydiumInfo: {
  //     raydiumProgramId: LIQUIDITY_POOL_PROGRAM_ID_V4,
  //     ammId: new PublicKey('AVs9TA4nWDzfPJE9gGVNJMVhcQy3V9PGazuz33BfG2RA'),
  //     ammAuthority: new PublicKey('5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'),
  //     ammOpenOrders: new PublicKey('6Su6Ea97dBxecd5W92KcVvv6SzCurE2BXGgFe9LNGMpE'),
  //     ammTargetOrders: new PublicKey('5hATcCfvhVwAjNExvrg8rRkXmYyksHhVajWLa46iRsmE'),

  //     ammCoinAccount: new PublicKey('Em6rHi68trYgBFyJ5261A2nhwuQWfLcirgzZZYoRcrkX'),
  //     ammPcAccount: new PublicKey('3mEFzHsJyu2Cpjrz6zPmTzP7uoLFj9SbbecGVzzkL1mJ'),
  //     poolWithdrawQueue: new PublicKey('FSHqX232PHE4ev9Dpdzrg9h2Tn1byChnX4tuoPUyjjdV'),
  //     poolTempLpTokenAccount: new PublicKey('87CCkBfthmyqwPuCDwFmyqKWJfjYqPFhm5btkNyoALYZ'),
  //     serumProgramId: SERUM_PROGRAM_ID_V3,
  //     serumMarketId: new PublicKey('C6tp2RVZnxBPFbnAsfTjis8BN9tycESAT4SgDQgbbrsA'),
  //     serumBids: new PublicKey('C1nEbACFaHMUiKAUsXVYPWZsuxunJeBkqXHPFr8QgSj9'),
  //     serumAsks: new PublicKey('4DNBdnTw6wmrK4NmdSTTxs1kEz47yjqLGuoqsMeHvkMF'),
  //     serumEventQueue: new PublicKey('4HGvdannxvmAhszVVig9auH6HsqVH17qoavDiNcnm9nj'),
  //     serumCoinVault: new PublicKey('6U6U59zmFWrPSzm9sLX7kVkaK78Kz7XJYkrhP1DjF3uF'),
  //     serumPCVault: new PublicKey('4YEx21yeUAZxUL9Fs7YU9Gm3u45GWoPFs8vcJiHga2eQ'),
  //     serumVaultSigner: new PublicKey('7SdieGqwPJo5rMmSQM9JmntSEMoimM4dQn7NkGbNFcrd'),

  //     stakePoolProgramId: STAKE_PROGRAM_ID,
  //     stakePoolId: new PublicKey('HUDr9BDaAGqi37xbQHzxCyXvfMCKPTPNF8g9c9bPu1Fu'),
  //     stakePoolAuthority: new PublicKey('9VbmvaaPeNAke2MAL3h2Fw82VubH1tBCzwBzaWybGKiG'),
  //     stakePoolLpAccount: new PublicKey('A4xQv2BQPB1WxsjiCC7tcMH7zUq255uCBkevFj8qSCyJ'),
  //     stakePoolRewardAccount: new PublicKey('6zA5RAQYgazm4dniS8AigjGFtRi4xneqjL7ehrSqCmhr'),
  //     stakePoolRewardAccountB: new PublicKey('6zA5RAQYgazm4dniS8AigjGFtRi4xneqjL7ehrSqCmhr')
  //   }
  // },

  'ATLAS-USDC': {
    programId: lyfRaydiumProgramId,
    tknMint0: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    tknMint1: new PublicKey("ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"),
    lpMint: new PublicKey("9shGU9f1EsxAbiR567MYZ78WUiS6ZNCYbHe53WUULQ7n"),
    rewardMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
    rewardMintB: new PublicKey("9shGU9f1EsxAbiR567MYZ78WUiS6ZNCYbHe53WUULQ7n"),

    strategyBorrowCreditMint0: new PublicKey('CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E'),
    strategyBorrowCreditMint1: new PublicKey('3nAgm2XrSi3RNDWz4wCvUWwQW3QQE7s5i7MxNz8r8mGZ'),

    strategyAccount: new PublicKey('6yFKnVfzFwus73zms4XcGAsrWT6qowaiYyAWTiLHZ3e4'),
    strategyAuthority: new PublicKey('tuhwncAHHh21ENeQwrbWMdoTi92AswM34fGK5eYQRGi'),
    strategyFarmInfo: new PublicKey('AFin3LBuheAnVZsaCgpQFZDy1PfME3LNB2Ho1anWhGoR'),
    strategyTknAccount0: new PublicKey('H4bTG8EEqBjEMqBiiuYC8yf8LDwMyS5jf3J6XxiAfBMQ'),
    strategyTknAccount1: new PublicKey('6J5nkw5kVTDmPVLnQqHSzfeSaSv5bwp89475MDYBCEhZ'),
    strategyLpAccount: new PublicKey('BCxuErEvftUMCrbETKUkbPNbpNJFx8fNJdcm4V2KZkW2'),
    strategRewardAccount: new PublicKey('BBySKA7rkq2JNjuZkJUrRHMWX3Ycups9XfXexrpcZgdX'),
    strategRewardAccountB: new PublicKey('6J5nkw5kVTDmPVLnQqHSzfeSaSv5bwp89475MDYBCEhZ'),
    strategyBorrowCreditAccount0: new PublicKey('3PLeXQy9U1vuBb7xgBDnE3DhUSMHMqvhwbg2HvQcmrtH'),
    strategyBorrowCreditAccount1: new PublicKey('FDXmN9SkJzFdM17SFnVsiAkHM8SbMVACrmBdTf5hW9JZ'),

    stakeUserFarmInfoLayout: USER_STAKE_INFO_ACCOUNT_LAYOUT_V4,

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
        strategyCreditAccounts: [
          new PublicKey("GWnKzyvCJcQXvSwmj9msHUrCEv73XkbkF3csoHjwSDQL")
        ]
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
    raydiumInfo: {
      raydiumProgramId: LIQUIDITY_POOL_PROGRAM_ID_V4,
      ammId: new PublicKey('2bnZ1edbvK3CK3LTNZ5jH9anvXYCmzPR4W2HQ6Ngsv5K'),
      ammAuthority: new PublicKey('5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'),
      ammOpenOrders: new PublicKey('EzYB1U93e8E1KGJdUzmnwgNBFMP9E1XAuyosmiPGLAvD'),
      ammTargetOrders: new PublicKey('DVxJDo3E9zfGgvSkC2DYS5fsv5AyXA7gXpcs1fHFrP3y'),
      lpDecimals: 8,
      ammCoinAccount: new PublicKey('FpFV46UVvRtcrRvYtKYgJpJtP1tZkvssjhrLUfoj8Cvo'),
      ammPcAccount: new PublicKey('GzwX68f1ZF4dKnAJ58RdET8sPvvnYktbDEHmjoGw7Umk'),
      poolWithdrawQueue: new PublicKey('26SuCukyzbYo5kzeufaSoMjRPStAwqfVzTXb4QGynTit'),
      poolTempLpTokenAccount: new PublicKey('HcoA8ucDBjEUVMjvURaS9CZgdEUbq8jRieGabq48mCL8'),
      serumProgramId: SERUM_PROGRAM_ID_V3,
      serumMarketId: new PublicKey('Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K'),
      serumBids: new PublicKey('2UabAccF1AFPcNqv9D46JgyGnErnaYAJuCwyaT5dCkHc'),
      serumAsks: new PublicKey('9umNLTbks7S51TEB8XF4jeCxwyq3qmdHrFDMFB8cT1gv'),
      serumEventQueue: new PublicKey('EYU32k5waRUxF521k2KFSuhEj11HQvg4MbQ9tFXuixLi'),
      serumCoinVault: new PublicKey('22a8dDQwHmmnW4M4WuSXHC9NdQAufZ2V8at3EtPzBqFj'),
      serumPCVault: new PublicKey('5Wu76Qx7EoiR79zVVV49cZDYZ5csZaKFiHKYtCjF9FNU'),
      serumVaultSigner: new PublicKey('FiyZW6n5VE64Yubn2PUFAxbmB2FZXhYce74LzJUhqSZg'),

      stakePoolProgramId: STAKE_PROGRAM_ID_V5,
      stakePoolId: new PublicKey('93wRz2LeQ3TJoair827VTng62MjCzYDgJjG9Q5GmQ3Pd'),
      stakePoolAuthority: new PublicKey('4yrRmmckKKGsPbCSFFupGqZrJhAFxQ4hN2DMC9Bh2pHo'),
      stakePoolLpAccount: new PublicKey('HmE21hdD32ZjDnR5DvuNz7uS5q4bWbqf8jV2shx8kXmA'),
      stakePoolRewardAccount: new PublicKey('9iQsupP7JagNLkp1bvdWWGVkzsLFfHUwDbh9KZPoXbw5'),
      stakePoolRewardAccountB: new PublicKey('5oQU1hU6qggyT4CU2AMPcWTcZdSRZeQBy7How5WuEp7A'),
    },
  },

  'POLIS-USDC': {
    programId: lyfRaydiumProgramId,
    tknMint0: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    tknMint1: new PublicKey("poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk"),
    lpMint: new PublicKey("8MbKSBpyXs8fVneKgt71jfHrn5SWtX8n4wMLpiVfF9So"),
    rewardMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
    rewardMintB: new PublicKey("poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk"),

    strategyBorrowCreditMint0: new PublicKey('CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E'),
    strategyBorrowCreditMint1: new PublicKey('EkKFNt7PBRdWy8EpmZAbAZdvXZpSKvdwMfo8eotN1PEr'),

    strategyAccount: new PublicKey('DYreSy9eYRJYBR49PtDYsCHLHeU6TZKjCQT7unReKMY3'),
    strategyAuthority: new PublicKey('467dAKUvGbwvpNyRgcU8hvV7KHvcoZtWwkkmfma8VvEA'),
    strategyFarmInfo: new PublicKey('3HS3vn5C3YqkUJmi4ipwQRSsCxj59SP6y77SSpEzhVQG'),
    strategyTknAccount0: new PublicKey('BNpdoPVKNvFp73KpUynZUy3SDriqyaKU2FZQhUzYqKEa'),
    strategyTknAccount1: new PublicKey('BqRsjrJvAUohEs7geuKJ8hXyUZbrBYM1cuDdQZSAE7Cn'),
    strategyLpAccount: new PublicKey('J8cYbDLpByi15ZPXyKHCkzY6oZAcM5mVjx1gyvLeB7xq'),
    strategRewardAccount: new PublicKey('4YqePNRwYSzwdTMbaPB1rGkqQVDS38gHo3L6nEQJZ7pM'),
    strategRewardAccountB: new PublicKey('BqRsjrJvAUohEs7geuKJ8hXyUZbrBYM1cuDdQZSAE7Cn'),
    strategyBorrowCreditAccount0: new PublicKey('767ida3bzKCNUBXKvdu86ojWe7QR98URxSZJMv6uKX4e'),
    strategyBorrowCreditAccount1: new PublicKey('FWGyDubY1jwECaRu3487sqB6mpBSjr3gndE6bFNz4nWf'),

    stakeUserFarmInfoLayout: USER_STAKE_INFO_ACCOUNT_LAYOUT_V4,

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
        strategyCreditAccounts: [
          new PublicKey("GWnKzyvCJcQXvSwmj9msHUrCEv73XkbkF3csoHjwSDQL")
        ]
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
    raydiumInfo: {
      raydiumProgramId: LIQUIDITY_POOL_PROGRAM_ID_V4,
      ammId: new PublicKey('9xyCzsHi1wUWva7t5Z8eAvZDRmUCVhRrbaFfm3VbU4Mf'),
      ammAuthority: new PublicKey('5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'),
      ammOpenOrders: new PublicKey('12A4SGay36i2cSwA4JSdvg7rWSmCz8JzhsoDqMM8Yns7'),
      ammTargetOrders: new PublicKey('6bszsB6zxw2YowrEm26XYhh57HKQEVMRx5YMvPSSVQNh'),
      lpDecimals: 8,
      ammCoinAccount: new PublicKey('7HgvC7GdmUt7kMivdLMovLStW25avFsW9GDXgNr525Uy'),
      ammPcAccount: new PublicKey('9FknRLGpWBqYg7fXQaBDyWWdu1v2RwUM6zRV6CiPjWBD'),
      poolWithdrawQueue: new PublicKey('6uN62R1i31QVoy9cmQAeDrfLccMZDjQ2gmwv2D4iBTJT'),
      poolTempLpTokenAccount: new PublicKey('FJV66MrqZW8VYGmTuAupstwYtqfF6ULLPP9voYtnc8DS'),
      serumProgramId: SERUM_PROGRAM_ID_V3,
      serumMarketId: new PublicKey('HxFLKUAmAMLz1jtT3hbvCMELwH5H9tpM2QugP8sKyfhW'),
      serumBids: new PublicKey('Bc5wovapX1tRjZfyZVpsGH73Gq5LGN4ANsj8kaEhfY7c'),
      serumAsks: new PublicKey('4EHg2ANFFEKLFkpLxgiyinJ1UDWsG2p8rVoAjFfjMDKc'),
      serumEventQueue: new PublicKey('qeQC4u5vpo5QMC17V5UMkQfK67vu3DHtBYVT1hFSGCK'),
      serumCoinVault: new PublicKey('5XQ7xYE3ujVA21HGbvFGVG4pLgqVHSfR9anz2EfmZ3nA'),
      serumPCVault: new PublicKey('ArUDWPwzGQFfa7t7nSdkp1Dj6tYA3icXEq8K7goz9WoG'),
      serumVaultSigner: new PublicKey('FHX9fPAUVA1MxPme28f4eeVH81QVRHDWofa2V6FUJaiR'),

      stakePoolProgramId: STAKE_PROGRAM_ID_V5,
      stakePoolId: new PublicKey('7qcihXTsRW5wS5BgK7iuD84W43ECByoJP45R3hu2r6mF'),
      stakePoolAuthority: new PublicKey('3MAzzKcBPJ2ykDHX1CBHzUJafy41FaTaLymg8z6SgX2Q'),
      stakePoolLpAccount: new PublicKey('FwLD6rHMwm5H6edDPuGjxdBMk3u38frsnytTkPmVZVP3'),
      stakePoolRewardAccount: new PublicKey('AWQr1eX2RZiMadfeEpgPEQJBJq88f7dPLK3nqriKCPJp'),
      stakePoolRewardAccountB: new PublicKey('DfofnRgWFPHVaxaLGSdXvFGhr4TRwjdwQQvgkjNNkJfZ'),
    },
  },
  'GRAPE-USDC': {
    programId: lyfRaydiumProgramId,
    tknMint0: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    tknMint1: new PublicKey("8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA"),
    lpMint: new PublicKey("A8ZYmnZ1vwxUa4wpJVUaJgegsuTEz5TKy5CiJXffvmpt"),
    rewardMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
    rewardMintB: new PublicKey("8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA"),

    strategyBorrowCreditMint0: new PublicKey('CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E'),
    strategyBorrowCreditMint1: new PublicKey('39AmuFZrF46JxZuuzwWAGhe677d23tCmTt3gCBY4tsjb'),

    strategyAccount: new PublicKey('Cz7HnSMc1u81Gyke6tfVNVz8xBz7xW4NHobSBtUFUkBi'),
    strategyAuthority: new PublicKey('GHTtd6QhiTdhwM7uzCdLUvwHW7QE7wXZYrxVQUtM2aGd'),
    strategyFarmInfo: new PublicKey('BP9XjLs3GeRR2nBaDFA1nwE9ddbvVPnwSMdvk1QJ3i2L'),
    strategyTknAccount0: new PublicKey('zAwWGhCYSwW1339wvyRAyambYrz8FwDHYzRAeRWuXTM'),
    strategyTknAccount1: new PublicKey('5mPRjHfhQo7s1GKppqKcSuCMhtMY2615bDhxMpUNVxH1'),
    strategyLpAccount: new PublicKey('AW37AwthG94VC3o3ZrkiEVyEYCK1bXPZrDb3yzVfc5Sf'),
    strategRewardAccount: new PublicKey('6NFcaYkeibkCAcVTrDogUP2t5nrpc2a8PHSNmMbctK7G'),
    strategRewardAccountB: new PublicKey('5mPRjHfhQo7s1GKppqKcSuCMhtMY2615bDhxMpUNVxH1'),
    strategyBorrowCreditAccount0: new PublicKey('AgNfKw6VTexGAqv9aZduhXUniaHqoznNxTLN3AQzKL2w'),
    strategyBorrowCreditAccount1: new PublicKey('9sc3ifwgZ2KoRQHRAZbCWw9vmA4p1m3dh2FknbETWBRP'),

    stakeUserFarmInfoLayout: USER_STAKE_INFO_ACCOUNT_LAYOUT_V4,

    lendingPoolConfig: {
      programId: new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj"),
      marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
      marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
      marketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),

      "0": {
        tknMint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // usdc
        lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
        lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
        lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
        lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
        lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
        lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
        lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB"),
        strategyCreditAccounts: [
          new PublicKey("GWnKzyvCJcQXvSwmj9msHUrCEv73XkbkF3csoHjwSDQL")
        ]
      },
      "1": {
        tknMint: new PublicKey("8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA"), // grape
        lendingPoolInfoAccount: new PublicKey("G8MGSKf12Kuf1S2w35XwQs7vjiGtxRcgNsLAhBiLeKGb"),
        lendingPoolTknAccount: new PublicKey("HNwBYkGp32m7ptkgvzAj9GEWDpdZoPWiJ66nuonEMsSN"),
        lendingPoolFeeAccount: new PublicKey("HNwBYkGp32m7ptkgvzAj9GEWDpdZoPWiJ66nuonEMsSN"),
        lendingPoolShareMint: new PublicKey("GdphBDVjiUx7MFYsHRd1WL1nu4mmyohZHg9vi5hscJJj"),
        lendingPoolShareAccount: new PublicKey("BLcWDikfY1UffEdm14jmsZ2jiV7wTJNNPxoa4Ci8C3mg"),
        lendingPoolCreditMint: new PublicKey("39AmuFZrF46JxZuuzwWAGhe677d23tCmTt3gCBY4tsjb"),
        lendingPoolCreditAccount: new PublicKey("4MVCD592juy3jw3GAHPSWPCk1zP17izXAsTCGsttz92t"),
      }
    },

    raydiumInfo: {
      raydiumProgramId: LIQUIDITY_POOL_PROGRAM_ID_V4,
      ammId: new PublicKey('vVXfY15WdPsCmLvbiP4hWWECPFeAvPTuPNq3Q4BXfhy'),
      ammAuthority: new PublicKey('5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'),
      ammOpenOrders: new PublicKey('A7RFkvmDFN4Qev8XgGAqSr5W75sNhhtCY3ZcGHZiDDo1'),
      ammTargetOrders: new PublicKey('HRiPQyFJfzF7WgC4g2cFbxuKgqn1vKVRjTCuZTNGim36'),

      ammCoinAccount: new PublicKey('BKqBnj1TLpW4UEBbZn6aVoPLLBHDB6NTEL5nFNRqX7e7'),
      ammPcAccount: new PublicKey('AN7XxHrrcFL7629WySWVA2Tq9inczxkbE6YqgZ31rDnG'),
      poolWithdrawQueue: new PublicKey('29WgH1suwTnhL4JUwDMUQQpUzypet8PHEh8jQpZtiDBK'),
      poolTempLpTokenAccount: new PublicKey('3XCGBJpfHV5VYkz92nqzRtHahTiHXjYzVs4PargSpYwS'),
      serumProgramId: SERUM_PROGRAM_ID_V3,
      serumMarketId: new PublicKey('72aW3Sgp1hMTXUiCq8aJ39DX2Jr7sZgumAvdLrLuCMLe'),
      serumBids: new PublicKey('F3PQsAGiFf8fSySjUGgP3NQdAGSnioAThncyfd26GKZ3'),
      serumAsks: new PublicKey('6KyB4XprAw7Mgp1YMMsxRGx8T59Y5Lcu6s1FcwFrXy3i'),
      serumEventQueue: new PublicKey('Due4ZmGX2u7an9DPMvk3uX3sXYgngRatP1XmwzEgk1tT'),
      serumCoinVault: new PublicKey('8FMjC6yopBVYTXcYSGdFgoh6AFpwTdkJAGXxBeoV8xSq'),
      serumPCVault: new PublicKey('5vgxuCqMn7DUt6Le6EGhdMzZjPQrtD1x4TD9zGw3mPte'),
      serumVaultSigner: new PublicKey('FCZkJzztVTx6qKVec25jA3m4XjeGBH1iukGdDqDBHPvG'),

      stakePoolProgramId: STAKE_PROGRAM_ID_V5,
      stakePoolId: new PublicKey('8GBa1cK1NxevoxiRNK6YW9tWuo2xftcA3as9Cu4nhFL7'),
      stakePoolAuthority: new PublicKey('Gab4kPHmj5Hqn1KWEDsKt6Ta8jPtpc53oCPULszMNtyj'),
      stakePoolLpAccount: new PublicKey('eoVzVdFEkKPKY3djJ47RZjvNr5oujYY25uxXwNvrsfg'),
      stakePoolRewardAccount: new PublicKey('AYoDAc5ndfts4Aw6vzH7XUB2GsXamj72aunzBcBCnz2f'),
      stakePoolRewardAccountB: new PublicKey('5i2qZN5UH4UyF3t6HNeC1bXeXhWBZy1pwpCjLDG7AdJJ'),
    },
  },
};
