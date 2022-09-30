export default {
  "version": "0.1.0",
  "name": "lyf_raydium",
  "instructions": [
    {
      "name": "initializeStrategy",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
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
          "name": "strategyFeeAccount",
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
          "name": "ammIdRewards",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammIdRewardsB",
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
      "name": "initializeUserWithNonce",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
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
      "args": [
        {
          "name": "nonce",
          "type": "u32"
        },
        {
          "name": "bumpSeed",
          "type": "u8"
        }
      ]
    },
    {
      "name": "closeEmptyAccount",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userInfoAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setPositionStopLoss",
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
          "name": "stopLossType",
          "type": "u8"
        },
        {
          "name": "stopLossRatio",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setPositionRangeStop",
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
          "name": "rangeStopType",
          "type": "u8"
        },
        {
          "name": "priceRange0",
          "type": "u128"
        },
        {
          "name": "priceRange1",
          "type": "u128"
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
      "name": "transferLp",
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
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userFrcRewardsTknAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyFrcRewardsTknAccount",
          "isMut": false,
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
            "defined": "TransferLpParam"
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
      "name": "swapLimit",
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
          "name": "swapLimit",
          "type": "u64"
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
      "docs": [
        "add liquidity"
      ],
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
        },
        {
          "name": "serumEventQueue",
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
      "name": "unstakeLpWithType",
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
            "defined": "WithdrawParam"
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
      "name": "removeLiquidityLimit",
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
      "args": [
        {
          "name": "limit",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swapForWithdrawLimit",
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
          "name": "swapLimit",
          "type": "u64"
        },
        {
          "name": "withdrawType",
          "type": "u8"
        }
      ]
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
      "name": "userRepay",
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
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "param",
          "type": {
            "defined": "UserRepayParam"
          }
        }
      ]
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
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategyRewardsTknAccount",
          "isMut": false,
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
      "name": "liquidateRepayAndGetLp",
      "accounts": [
        {
          "name": "liquidator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidatorLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidatorTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidatorTknAccount1",
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
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapRewardsToTarget",
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
          "name": "direction",
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
      "docs": [
        "add rewards to liquidity"
      ],
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
        },
        {
          "name": "serumEventQueue",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "adminUpdateRewardsAmmId",
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
          "name": "rewardsAmmId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardsAmmIdB",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "adminUpdateStakeInfo",
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
      "args": []
    },
    {
      "name": "adminUpdateMaxLeverage",
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
        }
      ],
      "args": [
        {
          "name": "newLeverage",
          "type": "u8"
        }
      ]
    },
    {
      "name": "adminUpdateLiquidateLine",
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
        }
      ],
      "args": [
        {
          "name": "newLiquidateLine",
          "type": "u8"
        }
      ]
    },
    {
      "name": "adminUpdateCompoundRewardsRate",
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
        }
      ],
      "args": [
        {
          "name": "compoundRewardsRate",
          "type": "u8"
        }
      ]
    },
    {
      "name": "adminRepayBadDebts",
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
          "name": "adminTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminTknAccount1",
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
        }
      ],
      "args": [
        {
          "name": "tknRepay0",
          "type": "u64"
        },
        {
          "name": "tknRepay1",
          "type": "u64"
        }
      ]
    },
    {
      "name": "adminBurnBorrowCredit",
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
          "name": "creditMint0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "strategyCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creditMint1",
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
            "name": "feeAccount",
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
            "name": "ammIdForRewards",
            "type": "publicKey"
          },
          {
            "name": "ammIdForRewardsB",
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
            "name": "padding0",
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
            "name": "stopPositionType",
            "type": "u8"
          },
          {
            "name": "priceRange0",
            "type": "u128"
          },
          {
            "name": "priceRange1",
            "type": "u128"
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                23
              ]
            }
          },
          {
            "name": "accountNonce",
            "type": "u32"
          },
          {
            "name": "isEmpty",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
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
      "name": "PositionStopParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "liquidateType",
            "type": "u8"
          },
          {
            "name": "stopLossType",
            "type": "u8"
          },
          {
            "name": "stopLossRatio",
            "type": "u8"
          },
          {
            "name": "takeProfitType",
            "type": "u8"
          },
          {
            "name": "takeProfitRatio",
            "type": "u16"
          },
          {
            "name": "rangeStopType",
            "type": "u8"
          },
          {
            "name": "priceRange0",
            "type": "u128"
          },
          {
            "name": "priceRange1",
            "type": "u128"
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
      "name": "TransferLpParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lpAmount",
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
      "name": "WithdrawParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "withdrawType",
            "type": "u8"
          },
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
      "name": "UserRepayParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "repaySide",
            "type": "u8"
          },
          {
            "name": "repayAmount",
            "type": "u64"
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
      "code": 6000,
      "name": "MathOverflow",
      "msg": "Math Overflow"
    },
    {
      "code": 6001,
      "name": "InvalidInstruction",
      "msg": "Invalid Instruction"
    },
    {
      "code": 6002,
      "name": "InvalidProgramAddress",
      "msg": "Invalid program derivated address or nonce"
    },
    {
      "code": 6003,
      "name": "InvalidProtocolVersion",
      "msg": "Invalid Protocol Version"
    },
    {
      "code": 6004,
      "name": "InvalidData",
      "msg": "Invalid data"
    },
    {
      "code": 6005,
      "name": "AlreadyInUse",
      "msg": "Already in use"
    },
    {
      "code": 6006,
      "name": "InvalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 6007,
      "name": "InsufficientBalance",
      "msg": "Insufficient balance"
    },
    {
      "code": 6008,
      "name": "UnexpectedError",
      "msg": "UnexpectedError"
    },
    {
      "code": 6009,
      "name": "InvalidStrategyAccount",
      "msg": "Invalid Strategy Account"
    },
    {
      "code": 6010,
      "name": "InvalidStrategyAuthority",
      "msg": "Invalid Strategy Authority"
    },
    {
      "code": 6011,
      "name": "InvalidUserInfoAccount",
      "msg": "Invalid UserInfo Account"
    },
    {
      "code": 6012,
      "name": "InvalidTokenAccount",
      "msg": "Invalid Token Account"
    },
    {
      "code": 6013,
      "name": "InvalidTokenAccountOwner",
      "msg": "Invalid Token Account Owner"
    },
    {
      "code": 6014,
      "name": "InvalidStrategyState",
      "msg": "Invalid Strategy state"
    },
    {
      "code": 6015,
      "name": "InvalidLendingPool",
      "msg": "Invalid lending pool"
    },
    {
      "code": 6016,
      "name": "UnsupportedFeature",
      "msg": "Unsupported Feature"
    },
    {
      "code": 6017,
      "name": "NeedAdminPermission",
      "msg": "Need Admin Permission"
    },
    {
      "code": 6018,
      "name": "AlreadyInLiquidationOrWithdraw",
      "msg": "Already in liquidation or withdraw"
    },
    {
      "code": 6019,
      "name": "InvalidLiquidator",
      "msg": "Invalid Liquidator"
    },
    {
      "code": 6020,
      "name": "InvalidBorrowAmount",
      "msg": "Invalid Borrow Amount"
    },
    {
      "code": 6021,
      "name": "AmountTooLarge",
      "msg": "Amount Too Large"
    },
    {
      "code": 6022,
      "name": "CurrentSlotTooOld",
      "msg": "Current Slot Too Old"
    },
    {
      "code": 6023,
      "name": "AccountNotEmpty",
      "msg": "Account Not Empty"
    },
    {
      "code": 6024,
      "name": "LeverageTooHigh",
      "msg": "Leverage Too High"
    }
  ]
};