export default {
  "version": "0.0.0",
  "name": "lyf_raydium",
  "instructions": [
    {
      "name": "initializeStrategy",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammPoolReserve0",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammPoolReserve1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakePoolId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakePoolTkn",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "version",
          "type": {
            "defined": "ProtocolVerison"
          }
        }
      ]
    },
    {
      "name": "setPlatformRewardsTkn",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyFranciumRewardsMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyFranciumRewardsTkn",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updatePlatformRewards",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyFranciumRewardsMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyFranciumRewardsTkn",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminFranciumRewardsTkn",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rewardsPerSlot",
          "type": "u64"
        },
        {
          "name": "rewardsStartSlot",
          "type": "u64"
        },
        {
          "name": "rewardsEndSlot",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeUser",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userInfoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setUserPostion",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userInfoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": {
            "defined": "SetUserPositionParam"
          }
        }
      ]
    },
    {
      "name": "transfer",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userInfoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": {
            "defined": "TransferForInvestParam"
          }
        }
      ]
    },
    {
      "name": "borrow",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userInfoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthorityInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": {
            "defined": "BorrowParam"
          }
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumMarketId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumBids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumAsks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumEventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumTknVault0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumTknVault1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumVaultSinger",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": {
            "defined": "SwapParam"
          }
        }
      ]
    },
    {
      "name": "addLiquidity",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumMarketId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardsTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyRewardsTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stakeLp",
      "accounts": [
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyRewardTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyRewardTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyFarmInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "raydiumStakingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unstakeLp",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyRewardTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyRewardTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyFarmInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "raydiumStakingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardsTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyRewardsTknAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": {
            "defined": "UnstakeLpParam"
          }
        }
      ]
    },
    {
      "name": "removeLiquidity",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammWithdrawQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPoolTempLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumMarketId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumTknVault1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumTknVault0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumVaultSinger",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapAndWithdraw",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumMarketId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumBids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumAsks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumEventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumTknVault1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumTknVault0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumVaultSinger",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": {
            "defined": "SwapAndWithdrawParam"
          }
        }
      ]
    },
    {
      "name": "repayBorrowedPc",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthorityInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditMint0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditMint1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "repayBorrowedCoin",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthorityInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditMint0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditMint1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "liquidateUnstakeLp",
      "accounts": [
        {
          "name": "liquidator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "liquidatorLpTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyRewardTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyRewardTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyFarmInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "raydiumStakingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardsTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyRewardsTknAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidateType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "swapRewards",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumMarketId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumBids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumAsks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumEventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumTknVault0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumTknVault1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumVaultSinger",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addRewardsToLiquidity",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumMarketId",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "StrategyState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "protocolVersion",
            "type": "u8"
          },
          {
            "name": "protocolSubVersion",
            "type": "u8"
          },
          {
            "name": "lastUpdateSlot",
            "type": "u64"
          },
          {
            "name": "totalLp",
            "type": "u64"
          },
          {
            "name": "totalShares",
            "type": "u64"
          },
          {
            "name": "totalBorrowed0",
            "type": "u64"
          },
          {
            "name": "totalBorrowed1",
            "type": "u64"
          },
          {
            "name": "pendingTkn0",
            "type": "u64"
          },
          {
            "name": "pendingTkn1",
            "type": "u64"
          },
          {
            "name": "pendingWithdrawLp",
            "type": "u64"
          },
          {
            "name": "pendingRepay0",
            "type": "u64"
          },
          {
            "name": "pendingRepay1",
            "type": "u64"
          },
          {
            "name": "cumulatedBorrowRate0",
            "type": "u128"
          },
          {
            "name": "cumulatedBorrowRate1",
            "type": "u128"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "authorityNonce",
            "type": "u8"
          },
          {
            "name": "tokenProgramId",
            "type": "publicKey"
          },
          {
            "name": "tknAccount0",
            "type": "publicKey"
          },
          {
            "name": "tknAccount1",
            "type": "publicKey"
          },
          {
            "name": "lpAccount",
            "type": "publicKey"
          },
          {
            "name": "rewardAccount",
            "type": "publicKey"
          },
          {
            "name": "rewardAccountB",
            "type": "publicKey"
          },
          {
            "name": "lendingProgramId",
            "type": "publicKey"
          },
          {
            "name": "lendingPool0",
            "type": "publicKey"
          },
          {
            "name": "strategyLendingCreditAccount0",
            "type": "publicKey"
          },
          {
            "name": "lendingPool1",
            "type": "publicKey"
          },
          {
            "name": "strategyLendingCreditAccount1",
            "type": "publicKey"
          },
          {
            "name": "platformRewardsEnable",
            "type": "u8"
          },
          {
            "name": "rewardsStartSlot",
            "type": "u64"
          },
          {
            "name": "rewardsEndSlot",
            "type": "u64"
          },
          {
            "name": "rewardsPerSlot",
            "type": "u64"
          },
          {
            "name": "platformRewardsTknMint",
            "type": "publicKey"
          },
          {
            "name": "platformRewardsTknAccount",
            "type": "publicKey"
          },
          {
            "name": "accumulatedRewardsPerShare",
            "type": "u128"
          },
          {
            "name": "maxLeverage",
            "type": "u8"
          },
          {
            "name": "liquidateLine",
            "type": "u8"
          },
          {
            "name": "compoundRewardsRate",
            "type": "u8"
          },
          {
            "name": "ammProgramId",
            "type": "publicKey"
          },
          {
            "name": "ammId",
            "type": "publicKey"
          },
          {
            "name": "ammTknAccount0",
            "type": "publicKey"
          },
          {
            "name": "ammTknAccount1",
            "type": "publicKey"
          },
          {
            "name": "stakeProgramId",
            "type": "publicKey"
          },
          {
            "name": "stakePoolId",
            "type": "publicKey"
          },
          {
            "name": "stakePoolTkn",
            "type": "publicKey"
          },
          {
            "name": "padding0",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "UserInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "lastUpdateSlot",
            "type": "u64"
          },
          {
            "name": "strategyStateAccount",
            "type": "publicKey"
          },
          {
            "name": "userMainAccount",
            "type": "publicKey"
          },
          {
            "name": "accountNonce",
            "type": "u8"
          },
          {
            "name": "pendingInvestFlag",
            "type": "u8"
          },
          {
            "name": "stopLoss",
            "type": "u8"
          },
          {
            "name": "tkn0",
            "type": "u64"
          },
          {
            "name": "tkn1",
            "type": "u64"
          },
          {
            "name": "borrowed0",
            "type": "u64"
          },
          {
            "name": "borrowed1",
            "type": "u64"
          },
          {
            "name": "principle0",
            "type": "u64"
          },
          {
            "name": "principle1",
            "type": "u64"
          },
          {
            "name": "investedLp",
            "type": "u64"
          },
          {
            "name": "lpShares",
            "type": "u64"
          },
          {
            "name": "pendingWithdrawLp",
            "type": "u64"
          },
          {
            "name": "pendingRepay0",
            "type": "u64"
          },
          {
            "name": "pendingRepay1",
            "type": "u64"
          },
          {
            "name": "cumulatedBorrowRate0",
            "type": "u128"
          },
          {
            "name": "cumulatedBorrowRate1",
            "type": "u128"
          },
          {
            "name": "platformRewardsDebt",
            "type": "u128"
          },
          {
            "name": "pendingWithdrawFlag",
            "type": "u8"
          },
          {
            "name": "takeProfitLine",
            "type": "u16"
          },
          {
            "name": "padding0",
            "type": {
              "array": [
                "u8",
                29
              ]
            }
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ProtocolVerison",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "protocolVersion",
            "type": "u8"
          },
          {
            "name": "subVersion",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "SetUserPositionParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stopLoss",
            "type": "u8"
          },
          {
            "name": "takeProfitLine",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "TransferForInvestParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stopLoss",
            "type": "u8"
          },
          {
            "name": "amount0",
            "type": "u64"
          },
          {
            "name": "amount1",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BorrowParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "borrow0",
            "type": "u64"
          },
          {
            "name": "borrow1",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "direction",
            "type": "u8"
          },
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "minAmountOut",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UnstakeLpParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sharesAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapAndWithdrawParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "withdrawType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RaydiumError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InvalidVersion"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 300,
      "name": "MathOverflow",
      "msg": "Math Overflow"
    },
    {
      "code": 301,
      "name": "InvalidInstruction",
      "msg": "Invalid Instruction"
    },
    {
      "code": 302,
      "name": "InvalidProgramAddress",
      "msg": "Invalid program derivated address or nonce"
    },
    {
      "code": 303,
      "name": "InvalidProtocolVersion",
      "msg": "Invalid Protocol Version"
    },
    {
      "code": 304,
      "name": "InvalidData",
      "msg": "Invalid data"
    },
    {
      "code": 305,
      "name": "AlreadyInUse",
      "msg": "Already in use"
    },
    {
      "code": 306,
      "name": "InvalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 307,
      "name": "InsufficientBalance",
      "msg": "Insufficient balance"
    },
    {
      "code": 308,
      "name": "UnexpectedError",
      "msg": "UnexpectedError"
    },
    {
      "code": 309,
      "name": "InvalidStrategyAccount",
      "msg": "Invalid Strategy Account"
    },
    {
      "code": 310,
      "name": "InvalidStrategyAuthority",
      "msg": "Invalid Strategy Authority"
    },
    {
      "code": 311,
      "name": "InvalidUserInfoAccount",
      "msg": "Invalid UserInfo Account"
    },
    {
      "code": 312,
      "name": "InvalidTokenAccount",
      "msg": "Invalid Token Account"
    },
    {
      "code": 313,
      "name": "InvalidTokenAccountOwner",
      "msg": "Invalid Token Account Owner"
    },
    {
      "code": 314,
      "name": "InvalidStrategyState",
      "msg": "Invalid Strategy state"
    },
    {
      "code": 315,
      "name": "InvalidLendingPool",
      "msg": "Invalid lending pool"
    },
    {
      "code": 316,
      "name": "UnsupportedFeature",
      "msg": "Unsupported Feature"
    },
    {
      "code": 317,
      "name": "NeedAdminPermission",
      "msg": "Need Admin Permission"
    },
    {
      "code": 318,
      "name": "AlreadyInLiquidationOrWithdraw",
      "msg": "Already in liquidation or withdraw"
    },
    {
      "code": 319,
      "name": "InvalidLiquidator",
      "msg": "Invalid Liquidator"
    },
    {
      "code": 320,
      "name": "InvalidBorrowAmount",
      "msg": "Invalid Borrow Amount"
    },
    {
      "code": 321,
      "name": "AmountTooLarge",
      "msg": "Amount Too Large"
    }
  ]
}
