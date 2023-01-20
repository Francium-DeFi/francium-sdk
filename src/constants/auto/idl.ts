export default {
  "version": "0.1.0",
  "name": "auto_vault",
  "instructions": [
    {
      "name": "initMarket",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "version",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initRaydiumPool",
      "accounts": [
        {
          "name": "marketOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTknAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTknAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "borrowingCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingPoolInfoAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "borrowingCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakePoolId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolNonce",
          "type": "u64"
        },
        {
          "name": "authorityBump",
          "type": "u8"
        },
        {
          "name": "stakeProgramVersion",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setRaydiumPoolTargetLeverage",
      "accounts": [
        {
          "name": "marketOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "targetLeverage",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setRaydiumPoolDeltaRateThreshold",
      "accounts": [
        {
          "name": "marketOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "deltaRateThreshold",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setPoolCapacity",
      "accounts": [
        {
          "name": "marketOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "capacity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setLimitPerTx",
      "accounts": [
        {
          "name": "marketOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "limitPerTx",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setRaydiumRewardsInfo",
      "accounts": [
        {
          "name": "marketOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
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
          "name": "ammIdForRewards",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammIdForRewardsB",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initUserPosition",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u64"
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
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "preDeposit",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
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
        },
        {
          "name": "serumEventQ",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumBid",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumAsk",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tkn0",
          "type": "u64"
        },
        {
          "name": "tkn1",
          "type": "u64"
        }
      ]
    },
    {
      "name": "userBorrow",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
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
          "name": "systemClock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "userAddLiquidity",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
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
        },
        {
          "name": "serumEventQ",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumBid",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumAsk",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "finishDeposit",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardsTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolFarmInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
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
          "name": "stakingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingPoolId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPoolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingPoolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPoolRewardsTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPoolRewardsTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemClock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "preWithdraw",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
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
          "name": "ammId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shareAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "userUnStakeLp",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
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
          "name": "poolFarmInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingPoolId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPoolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingPoolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPoolRewardsTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPoolRewardsTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemClock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "userSwapAndWithdraw",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
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
        },
        {
          "name": "serumEventQ",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumBid",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumAsk",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buildNewInvest",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
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
          "name": "ammId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemClock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buildReBalance",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
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
          "name": "ammId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemClock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buildReLeverage",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
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
          "name": "ammId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount0",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammTknAccount1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMintAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemClock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "manageLpInFarms",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardsTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolFarmInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingPoolId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPoolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingPoolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPoolRewardsTknAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPoolRewardsTknAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemClock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "manageTokensAndLiquidity",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolLpAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
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
        },
        {
          "name": "serumEventQ",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumBid",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumAsk",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "repay",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCreditAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
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
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemClock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapRewardsToBaseToken",
      "accounts": [
        {
          "name": "userMainAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolRewardsTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
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
        },
        {
          "name": "serumEventQ",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumBid",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumAsk",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "direction",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "MarketInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "market version"
            ],
            "type": "u8"
          },
          {
            "name": "owner",
            "docs": [
              "the owner of market, who can setup the market's parameters"
            ],
            "type": "publicKey"
          },
          {
            "name": "feeReceiver",
            "docs": [
              "the token owner who can receive fees generated by this market"
            ],
            "type": "publicKey"
          },
          {
            "name": "reserved",
            "docs": [
              "reserved accounts"
            ],
            "type": {
              "array": [
                "publicKey",
                2
              ]
            }
          }
        ]
      }
    },
    {
      "name": "PoolInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "the bump seed to derive this account"
            ],
            "type": "u8"
          },
          {
            "name": "nonce",
            "docs": [
              "the random nonce to derive this account"
            ],
            "type": "u64"
          },
          {
            "name": "authorityBump",
            "docs": [
              "The bump seed to derive authority account"
            ],
            "type": "u8"
          },
          {
            "name": "lastUpdateTime",
            "docs": [
              "Last update time"
            ],
            "type": "u64"
          },
          {
            "name": "totalShares",
            "docs": [
              "total shares of this pool"
            ],
            "type": "u64"
          },
          {
            "name": "tknAmount0",
            "docs": [
              "token_0 amount left in the pool"
            ],
            "type": "u64"
          },
          {
            "name": "tknAmount1",
            "docs": [
              "token_1 amount left in the pool"
            ],
            "type": "u64"
          },
          {
            "name": "borrowed0",
            "docs": [
              "borrowed token_0"
            ],
            "type": "u64"
          },
          {
            "name": "borrowed1",
            "docs": [
              "borrowed token_1"
            ],
            "type": "u64"
          },
          {
            "name": "lpAmount",
            "docs": [
              "lp token amount"
            ],
            "type": "u64"
          },
          {
            "name": "accumulatedBorrowRate0",
            "type": "u128"
          },
          {
            "name": "accumulatedBorrowRate1",
            "type": "u128"
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
            "name": "estimateNetValue",
            "docs": [
              "estimate net value"
            ],
            "type": "u64"
          },
          {
            "name": "longOrShortExposure",
            "docs": [
              "position"
            ],
            "type": {
              "defined": "LongOrShortExposure"
            }
          },
          {
            "name": "targetLeverage",
            "type": "u16"
          },
          {
            "name": "deltaRateThreshold",
            "type": "u16"
          },
          {
            "name": "reBalanceCondition2",
            "type": "u16"
          },
          {
            "name": "withdrawFeeBps",
            "type": "u16"
          },
          {
            "name": "rewardsFeeBps",
            "type": "u16"
          },
          {
            "name": "managementFeeBps",
            "type": "u16"
          },
          {
            "name": "neutralSide",
            "docs": [
              "neutral side",
              "0: keep the pool is neutral for token_0, minimize the token_1 exposure",
              "1: keep the pool is neutral for token_1, minimize the token_0 exposure"
            ],
            "type": "u8"
          },
          {
            "name": "positionAdjustState",
            "docs": [
              "AdjustState"
            ],
            "type": {
              "defined": "PoolAdjustState"
            }
          },
          {
            "name": "lendingPoolArr",
            "docs": [
              "Lending Pool"
            ],
            "type": {
              "array": [
                {
                  "defined": "LendingPoolWrapper"
                },
                2
              ]
            }
          },
          {
            "name": "rewardsInfoArr",
            "docs": [
              "pool rewards info"
            ],
            "type": {
              "array": [
                {
                  "defined": "PoolRewardsInfo"
                },
                2
              ]
            }
          },
          {
            "name": "basedVault",
            "docs": [
              "based vault info"
            ],
            "type": {
              "defined": "VaultInfo"
            }
          },
          {
            "name": "accumulatedWithdrawFee0",
            "docs": [
              "withdraw fee charged while withdraw in pricing token"
            ],
            "type": "u64"
          },
          {
            "name": "accumulatedWithdrawFee1",
            "type": "u64"
          },
          {
            "name": "accumulatedFarmRewardsFee0",
            "docs": [
              "rewards fee is charged while swap rewards tokens to base tokens, and charged with the base token"
            ],
            "type": "u64"
          },
          {
            "name": "accumulatedFarmRewardsFee1",
            "type": "u64"
          },
          {
            "name": "accumulatedManageFee",
            "docs": [
              "manage fee charged with lp token"
            ],
            "type": "u64"
          },
          {
            "name": "capacity",
            "type": "u64"
          },
          {
            "name": "limitPerTx",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UserPositionInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "the bump seed to derive this account"
            ],
            "type": "u8"
          },
          {
            "name": "nonce",
            "docs": [
              "the random nonce to derive this account"
            ],
            "type": "u64"
          },
          {
            "name": "authorityBump",
            "docs": [
              "The bump seed to derive authority account"
            ],
            "type": "u8"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "poolInfo",
            "type": "publicKey"
          },
          {
            "name": "principalLiquidity",
            "docs": [
              "user's principle"
            ],
            "type": "u64"
          },
          {
            "name": "shareAmount",
            "docs": [
              "user's share in the pool"
            ],
            "type": "u64"
          },
          {
            "name": "principal0",
            "docs": [
              "user's principle0/1"
            ],
            "type": "u64"
          },
          {
            "name": "principal1",
            "type": "u64"
          },
          {
            "name": "positionAdjustState",
            "docs": [
              "user position adjust state"
            ],
            "type": {
              "defined": "UserAdjustState"
            }
          },
          {
            "name": "rewardsInfoArr",
            "docs": [
              "user rewards info"
            ],
            "type": {
              "array": [
                {
                  "defined": "UserRewardsInfo"
                },
                2
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "DepositParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instruction",
            "type": "u8"
          },
          {
            "name": "amount",
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
            "name": "instruction",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "WithdrawParam2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instruction",
            "type": "u8"
          },
          {
            "name": "amount",
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
            "name": "instruction",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "RepayParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instruction",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "RaydiumDepositLpV4Param",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instruction",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "RaydiumWithdrawLpV4Param",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instruction",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PositionInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "coinPrice",
            "type": "u128"
          },
          {
            "name": "lpPrice",
            "type": "u128"
          },
          {
            "name": "totalShares",
            "type": "u64"
          },
          {
            "name": "netValue",
            "type": "u64"
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
            "name": "lpAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "direction",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OrcaVaultInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ammPoolId",
            "docs": [
              "amm pool for token_0 and token_1"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenAccount0",
            "docs": [
              "token account 0 of this vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenAccount1",
            "docs": [
              "token account 1 of this vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "lpTokenAccount",
            "docs": [
              "lp token account of this vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "stakePoolIdA",
            "type": "publicKey"
          },
          {
            "name": "rewardsTokenAccountA",
            "type": "publicKey"
          },
          {
            "name": "stakePoolIdB",
            "type": "publicKey"
          },
          {
            "name": "rewardsTokenAccountB",
            "type": "publicKey"
          },
          {
            "name": "ammPoolIdForRewardsA",
            "type": "publicKey"
          },
          {
            "name": "ammPoolIdForRewardsB",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "RaydiumVaultInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeProgramVersion",
            "docs": [
              "stake program version, 3 or 5",
              "Raydium's initial farms using version 3",
              "Raydium's fusion farms useing version 5"
            ],
            "type": "u8"
          },
          {
            "name": "ammPoolId",
            "docs": [
              "amm liquidity pool id"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenAccount0",
            "docs": [
              "token account 0 of this vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenAccount1",
            "docs": [
              "token account 1 of this vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "lpTokenAccount",
            "docs": [
              "lp token account of this vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "stakePoolId",
            "docs": [
              "stake pool id"
            ],
            "type": "publicKey"
          },
          {
            "name": "rewardsTokenAccountA",
            "docs": [
              "rewards token account for rewards a"
            ],
            "type": "publicKey"
          },
          {
            "name": "rewardsTokenAccountB",
            "docs": [
              "rewards token account for rewards b"
            ],
            "type": "publicKey"
          },
          {
            "name": "ammPoolIdForRewardsA",
            "docs": [
              "amm pool for swapping rewards_a to base token"
            ],
            "type": "publicKey"
          },
          {
            "name": "ammPoolIdForRewardsB",
            "docs": [
              "amm pool for swapping rewards_b to base token"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "VaultInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultType",
            "type": {
              "defined": "VaultType"
            }
          },
          {
            "name": "rawData",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "LendingPoolWrapper",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "poolId",
            "type": "publicKey"
          },
          {
            "name": "creditTokenAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "LongOrShortExposure",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "longOrShortType",
            "type": {
              "defined": "LongOrShortType"
            }
          },
          {
            "name": "exposure",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "AdjustState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "step",
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
            "name": "repay0",
            "type": "u64"
          },
          {
            "name": "repay1",
            "type": "u64"
          },
          {
            "name": "lpAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PoolAdjustState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adjustType",
            "type": {
              "defined": "PoolAdjustType"
            }
          },
          {
            "name": "state",
            "type": {
              "defined": "AdjustState"
            }
          }
        ]
      }
    },
    {
      "name": "WithdrawPositionInfo",
      "type": {
        "kind": "struct",
        "fields": [
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
            "name": "pendingWithdrawTkn0",
            "type": "u64"
          },
          {
            "name": "pendingWithdrawTkn1",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UserWithdraw",
      "docs": [
        "Withdraw liquidity from the pool",
        "step0: initial state",
        "step1: unStake from farming pool",
        "step2: withdraw lp tokens to underlying tokens",
        "step3: repay two tokens",
        "step4: swap and return tokens to user"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "step",
            "type": "u8"
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
            "name": "pendingWithdrawTkn0",
            "type": "u64"
          },
          {
            "name": "pendingWithdrawTkn1",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UserDeposit",
      "docs": [
        "UserDeposit liquidity to the pool",
        "step0: initial state",
        "step1: borrow tokens from lending pool",
        "step2: add tokens to lp",
        "step3: stake lp to farm"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "step",
            "type": "u8"
          },
          {
            "name": "principal0",
            "type": "u64"
          },
          {
            "name": "principal1",
            "type": "u64"
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
            "name": "lpAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UserAdjustStateData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "step",
            "type": "u8"
          },
          {
            "name": "data",
            "type": {
              "array": [
                "u64",
                7
              ]
            }
          }
        ]
      }
    },
    {
      "name": "UserAdjustState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adjustType",
            "type": {
              "defined": "UserAdjustType"
            }
          },
          {
            "name": "state",
            "type": {
              "defined": "UserAdjustStateData"
            }
          }
        ]
      }
    },
    {
      "name": "PoolRewardsInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isEnable",
            "docs": [
              "is_enable"
            ],
            "type": "bool"
          },
          {
            "name": "rewardsTokenMint",
            "docs": [
              "rewards token mint of the pool"
            ],
            "type": "publicKey"
          },
          {
            "name": "rewardsTokenVault",
            "docs": [
              "rewards token account of the pool"
            ],
            "type": "publicKey"
          },
          {
            "name": "startTime",
            "docs": [
              "rewards start time"
            ],
            "type": "u64"
          },
          {
            "name": "endTime",
            "docs": [
              "rewards end time"
            ],
            "type": "u64"
          },
          {
            "name": "rewardsPerSecond",
            "docs": [
              "rewards allocated per second"
            ],
            "type": "u64"
          },
          {
            "name": "pendingAllocatedRewards",
            "docs": [
              "pending rewards to allocate"
            ],
            "type": "u64"
          },
          {
            "name": "accumulatedRewardsPerShare",
            "docs": [
              "accumulated rewards accumulated per working token",
              "This value has a multiplier 10^9"
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "UserRewardsInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rewardsDebt",
            "type": "u64"
          },
          {
            "name": "accumulatedRewards",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VaultType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "RaydiumVault"
          },
          {
            "name": "OrcaVault"
          }
        ]
      }
    },
    {
      "name": "LongOrShortType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Neutral"
          },
          {
            "name": "Long"
          },
          {
            "name": "Short"
          }
        ]
      }
    },
    {
      "name": "PoolAdjustType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Idle"
          },
          {
            "name": "BuildNewInvest"
          },
          {
            "name": "ReBalanceLong"
          },
          {
            "name": "ReBalanceShort"
          },
          {
            "name": "IncreaseLeverage"
          },
          {
            "name": "DecreaseLeverage"
          }
        ]
      }
    },
    {
      "name": "UserAdjustType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Idle"
          },
          {
            "name": "Withdraw"
          },
          {
            "name": "Deposit"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "ReBalance",
      "fields": [
        {
          "name": "signer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "poolInfo",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "adjustState",
          "type": {
            "defined": "PoolAdjustState"
          },
          "index": false
        }
      ]
    },
    {
      "name": "AdjustEvent",
      "fields": [
        {
          "name": "signer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "poolInfo",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "adjustType",
          "type": "u64",
          "index": false
        },
        {
          "name": "positionInfo",
          "type": {
            "defined": "PositionInfo"
          },
          "index": false
        },
        {
          "name": "swapInfo",
          "type": {
            "defined": "SwapInfo"
          },
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidProtocol",
      "msg": "Invalid Protocol"
    },
    {
      "code": 6001,
      "name": "MathOverflow",
      "msg": "MathOverflow"
    },
    {
      "code": 6002,
      "name": "InvalidOperation",
      "msg": "InvalidOperation"
    },
    {
      "code": 6003,
      "name": "InvalidTokenAccount",
      "msg": "InvalidTokenAccount"
    },
    {
      "code": 6004,
      "name": "InvalidAccount",
      "msg": "InvalidAccount"
    },
    {
      "code": 6005,
      "name": "InvalidValue",
      "msg": "InvalidValue"
    },
    {
      "code": 6006,
      "name": "UnSupportedVaultType",
      "msg": "UnSupportedVaultType"
    },
    {
      "code": 6007,
      "name": "WorkingParamInvalid",
      "msg": "Working parameters invalid"
    },
    {
      "code": 6008,
      "name": "TimeInvalid",
      "msg": "Time Invalid"
    },
    {
      "code": 6009,
      "name": "RewardsTooSmall",
      "msg": "RewardsTooSmall"
    },
    {
      "code": 6010,
      "name": "NotReachLockupExpiration",
      "msg": "NotReachLockupExpiration"
    },
    {
      "code": 6011,
      "name": "NotReachLiquidateLine",
      "msg": "NotReachLiquidateLine"
    },
    {
      "code": 6012,
      "name": "NotReachStopLossLine",
      "msg": "NotReachStopLossLine"
    },
    {
      "code": 6013,
      "name": "NotReachRangeStopPrice",
      "msg": "NotReachRangeStopPrice"
    },
    {
      "code": 6014,
      "name": "LessThanCurrentExpiration",
      "msg": "LessThanCurrentExpiration"
    },
    {
      "code": 6015,
      "name": "InvalidAuthorityAccount",
      "msg": "InvalidAuthorityAccount"
    },
    {
      "code": 6016,
      "name": "InsufficientAmount",
      "msg": "InsufficientAmount"
    },
    {
      "code": 6017,
      "name": "InsufficientRemainingAccounts",
      "msg": "InsufficientRemainingAccounts"
    },
    {
      "code": 6018,
      "name": "DebtUnRepay",
      "msg": "DebtUnRepay"
    },
    {
      "code": 6019,
      "name": "BorrowTooMuch",
      "msg": "BorrowTooMuch"
    },
    {
      "code": 6020,
      "name": "OutOfCapacityLimit",
      "msg": "OutOfCapacityLimit"
    },
    {
      "code": 6021,
      "name": "InvalidAdjustState",
      "msg": "InvalidAdjustState"
    },
    {
      "code": 6022,
      "name": "WithdrawDuringReBalance",
      "msg": "WithdrawDuringReBalance"
    },
    {
      "code": 6023,
      "name": "DepositTooMuch",
      "msg": "DepositTooMuch"
    }
  ]
};