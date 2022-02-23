import { Provider, Program, Idl, web3, BN } from '@project-serum/anchor';

import raydiumIdl from '../../constants/farm/raydium/config';
import orcaIdl from '../../constants/farm/orca/config';
import { lyfRaydiumProgramId, RAYDIUM_FARM_CONFIG } from '../../constants/farm/raydium/info';
import { lyfOrcaProgramId, ORCA_FARM_CONFIG } from '../../constants/farm/orca/info';
import { PublicKey, SYSVAR_CLOCK_PUBKEY, Connection } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getTokenDecimals } from '../../utils/tools';
import { isString } from 'lodash';
import buildFarmTransactions from './farm';

const commitment: web3.Commitment = 'confirmed';

export class FranciumFarm {
  public configs = {};
  public programs = {};
  public connection: Connection;

  constructor(config: {
    connection: Connection
  }) {
    this.configs = {
      raydium: {
        idl: raydiumIdl,
        programId: lyfRaydiumProgramId,
        config: RAYDIUM_FARM_CONFIG
      },
      orca: {
        idl: orcaIdl,
        programId: lyfOrcaProgramId,
        config: ORCA_FARM_CONFIG
      }
    };
    this.connection = config.connection;
  }

  public async getFarmPoolsInfo(pools: any[]) {
    const strategyAccounts = pools.map(i => {
      const targetFarmInfo = this.getConfig(i.pair, i.lyfType || 'raydium');
      return targetFarmInfo.strategyAccount;
    });
    const res = await this.connection.getMultipleAccountsInfo(strategyAccounts, 'confirmed');
    const decodeResult = res.map((i, index) => {
      const poolItem = pools[index];
      const program = this.getProgram(poolItem.lyfType || 'raydium');
      const strategyInfo = program.coder.accounts.decode('StrategyState', i.data);
      const strategyAccount = strategyAccounts[index];
      return {
        id: `${poolItem.pair}[${poolItem.from}]`,
        priceKey: poolItem.alias || poolItem.pair,
        strategyAccount,
        token0: poolItem.token0,
        token1: poolItem.token1,
        lpDecimals: poolItem.lyfType === 'orca' ? 6 : getTokenDecimals(poolItem.token1),
        ...strategyInfo
      };
    });
    return decodeResult;
  }

  public getProgram(type = 'raydium') {
    if (this.programs[type]) {
      return this.programs[type] as Program;
    } else {
      // const wallet = getWallet();
      const { idl, programId } = this.configs[type];
      const program = new Program(idl as Idl, programId, new Provider(
        this.connection,
        null,
        {
          skipPreflight: true,
          commitment,
          preflightCommitment: commitment
        }
      ));
      this.programs[type] = program;
      return program;
    }
  }

  public getConfig(pair: string, type = 'raydium') {
    const { config } = this.configs[type];
    return config[pair];
  }

  public async getUserPositionsAll(userPublicKey: PublicKey | string) {
    let pubkey: any = userPublicKey;
    if (isString(userPublicKey)) {
      pubkey = new PublicKey(userPublicKey);
    }
    const orcaInfos = await this.getUserPositionsByProgram('orca', pubkey);
    const raydiumInfos = await this.getUserPositionsByProgram('raydium', pubkey);
    return {
      orca: orcaInfos,
      raydium: raydiumInfos
    };
  }

  public async getUserPositionsByProgram(programType: string, userPublicKey: PublicKey) {
    const program = this.getProgram(programType || 'raydium');
    const decodeResult: {
      publicKey: PublicKey;
      data: any;
    }[] = [];
    try {
      const infos = await this.connection.getProgramAccounts(
        program.programId,
        {
          filters: [
            { dataSize: program.account.userInfo.size + 1 },
            {
              memcmp: {
                offset: 8 + 1 + 8 + 32,
                bytes: userPublicKey.toBase58()
              }
            }
          ]
        }
      );
      infos.forEach((item, index) => {
        const userInfo = program.coder.accounts.decode('UserInfo', item.account.data);
        decodeResult.push({
          publicKey: item.pubkey,
          data: userInfo
        });
      });
    } catch (err) {

    }
    return decodeResult;
  }

  public async getUserPositions(pools: any[], userPublicKey: PublicKey) {
    // const strategyAccounts = pools.map(i => {
    //   const targetFarmInfo = this.getConfig(i.pair, i.lyfType || 'raydium');
    //   return targetFarmInfo.strategyAccount;
    // });

    const userInfoAccounts = await Promise.all(pools.map(async (i) => {
      const program = this.getProgram(i.lyfType || 'raydium');
      const targetFarmInfo = this.getConfig(i.pair, i.lyfType || 'raydium');
      const userInfoAddress = await program.account.userInfo.associatedAddress(
        userPublicKey,
        targetFarmInfo.strategyAccount
      );
      return userInfoAddress;
    }));
    const res = await this.connection.getMultipleAccountsInfo(userInfoAccounts, 'confirmed');
    const decodeResult = res.map((i, index) => {
      const program = this.getProgram(pools[index].lyfType || 'raydium');
      if (i) {
        const userInfo = program.coder.accounts.decode('UserInfo', i.data);
        return userInfo;
      }
      return null;
    });
    return decodeResult;
  }

  // generate instruction params
  // borrow
  public getBorrowParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey, type: string = 'raydium') {
    if (type === 'orca') {
      return this.getOrcaBorrowParams(config, userMainAccount, userInfoAccount);
    }
    return this.getRaydiumBorrowParams(config, userMainAccount, userInfoAccount);
  }

  private getRaydiumBorrowParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey) {
    return [
      {
        accounts: {
          userMainAccount: userMainAccount,
          userInfoAccount: userInfoAccount,
          strategyState: config.strategyAccount,
          strategyAuthority: config.strategyAuthority,
          strategyTknAccount0: config.strategyTknAccount0,
          strategyTknAccount1: config.strategyTknAccount1,
          lendingMarketAccount: config.lendingPoolConfig.marketInfoAccount,
          lendingMarketAuthorityInfo: config.lendingPoolConfig.marketAuthority,
          lendingPoolProgramId: config.lendingPoolConfig.programId,
          lendingPoolInfoAccount0: config.lendingPoolConfig["0"].lendingPoolInfoAccount,
          lendingPoolTknAccount0: config.lendingPoolConfig["0"].lendingPoolTknAccount,
          lendingPoolCreditAccount0: config.lendingPoolConfig["0"].lendingPoolCreditAccount,
          strategyCreditAccount0: config.strategyBorrowCreditAccount0,
          lendingPoolInfoAccount1: config.lendingPoolConfig["1"].lendingPoolInfoAccount,
          lendingPoolTknAccount1: config.lendingPoolConfig["1"].lendingPoolTknAccount,
          lendingPoolCreditAccount1: config.lendingPoolConfig["1"].lendingPoolCreditAccount,
          strategyCreditAccount1: config.strategyBorrowCreditAccount1,
          tokenProgramId: TOKEN_PROGRAM_ID,
          clock: SYSVAR_CLOCK_PUBKEY,
          ammId: config.raydiumInfo.ammId,
          ammOpenOrders: config.raydiumInfo.ammOpenOrders,
          ammTknAccount0: config.raydiumInfo.ammPcAccount,
          ammTknAccount1: config.raydiumInfo.ammCoinAccount,
          lpMintAccount: config.lpMint
        }
      }
    ];
  }

  private getOrcaBorrowParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey) {
    return [{
      accounts: {
        userMainAccount: userMainAccount,
        userInfoAccount: userInfoAccount,
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyTknAccount0: config.strategyTknAccount0,
        strategyTknAccount1: config.strategyTknAccount1,
        lendingMarketAccount: config.lendingPoolConfig.marketInfoAccount,
        lendingMarketAuthorityInfo: config.lendingPoolConfig.marketAuthority,
        lendingPoolProgramId: config.lendingPoolConfig.programId,
        lendingPoolInfoAccount0: config.lendingPoolConfig["0"].lendingPoolInfoAccount,
        lendingPoolTknAccount0: config.lendingPoolConfig["0"].lendingPoolTknAccount,
        lendingPoolCreditAccount0: config.lendingPoolConfig["0"].lendingPoolCreditAccount,
        strategyCreditAccount0: config.strategyBorrowCreditAccount0,
        lendingPoolInfoAccount1: config.lendingPoolConfig["1"].lendingPoolInfoAccount,
        lendingPoolTknAccount1: config.lendingPoolConfig["1"].lendingPoolTknAccount,
        lendingPoolCreditAccount1: config.lendingPoolConfig["1"].lendingPoolCreditAccount,
        strategyCreditAccount1: config.strategyBorrowCreditAccount1,
        tokenProgramId: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY,
        swapPoolId: config.ammInfo.swapPoolId,
        swapPoolTknAccount0: config.ammInfo.swapTknVault0,
        swapPoolTknAccount1: config.ammInfo.swapTknVault1,
        lpMint: config.ammInfo.lpMint
      }
    }];
  }

  // swap
  public getSwapParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey, type: string = 'raydium') {
    if (type === 'orca') {
      return this.getOrcaSwapParams(config, userMainAccount, userInfoAccount);
    }
    return this.getRaydiumSwapParams(config, userMainAccount, userInfoAccount);
  }

  private getRaydiumSwapParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey) {
    return [
      {
        direction: 0,
        amountIn: new BN(1),
        minAmountOut: new BN(0)
      },
      {
        accounts: {
          userMainAccount: userMainAccount,
          userInfo: userInfoAccount,
          strategyState: config.strategyAccount,
          strategyAuthority: config.strategyAuthority,
          strategyTknAccount0: config.strategyTknAccount0,
          strategyTknAccount1: config.strategyTknAccount1,
          strategyLpAccount: config.strategyLpAccount,
          tokenProgramId: TOKEN_PROGRAM_ID,
          raydiumAmmProgramId: config.raydiumInfo.raydiumProgramId,
          ammId: config.raydiumInfo.ammId,
          ammAuthority: config.raydiumInfo.ammAuthority,
          ammOpenOrders: config.raydiumInfo.ammOpenOrders,
          ammTargetOrders: config.raydiumInfo.ammTargetOrders,
          ammTknAccount0: config.raydiumInfo.ammPcAccount,
          ammTknAccount1: config.raydiumInfo.ammCoinAccount,
          lpMintAccount: config.lpMint,
          serumProgramId: config.raydiumInfo.serumProgramId,
          serumMarketId: config.raydiumInfo.serumMarketId,
          serumBids: config.raydiumInfo.serumBids,
          serumAsks: config.raydiumInfo.serumAsks,
          serumEventQueue: config.raydiumInfo.serumEventQueue,
          serumTknVault0: config.raydiumInfo.serumPCVault,
          serumTknVault1: config.raydiumInfo.serumCoinVault,
          serumVaultSinger: config.raydiumInfo.serumVaultSigner,
          clock: SYSVAR_CLOCK_PUBKEY
        }
      }
    ];
  }

  private getOrcaSwapParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey) {
    return [{
      accounts: {
        userMainAccount: userMainAccount,
        userInfo: userInfoAccount,
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyTknAccount0: config.strategyTknAccount0,
        strategyTknAccount1: config.strategyTknAccount1,
        strategyLpTknAccount: config.strategyLpTknAccount,
        tokenProgramId: TOKEN_PROGRAM_ID,
        ammProgramId: config.ammInfo.swapProgramId,
        swapPoolId: config.ammInfo.swapPoolId,
        swapPoolAuthority: config.ammInfo.swapPoolAuthority,
        swapPoolTknAccount0: config.ammInfo.swapTknVault0,
        swapPoolTknAccount1: config.ammInfo.swapTknVault1,
        lpMint: config.ammInfo.lpMint,
        swapPoolFeeTkn: config.ammInfo.swapFeeAccount
      }
    }];
  }

  // add liquidity
  public getLiquidityParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey, type: string = 'raydium') {
    if (type === 'orca') {
      return this.getOrcaLiquidityParams(config, userMainAccount, userInfoAccount);
    }
    return this.getRaydiumLiquidityParams(config, userMainAccount, userInfoAccount);
  }

  private getRaydiumLiquidityParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey) {
    return [
      {
        accounts: {
          userMainAccount: userMainAccount,
          userInfo: userInfoAccount,
          strategyState: config.strategyAccount,
          strategyAuthority: config.strategyAuthority,
          strategyTknAccount0: config.strategyTknAccount0,
          strategyTknAccount1: config.strategyTknAccount1,
          strategyLpAccount: config.strategyLpAccount,
          tokenProgramId: TOKEN_PROGRAM_ID,
          raydiumAmmProgramId: config.raydiumInfo.raydiumProgramId,
          ammId: config.raydiumInfo.ammId,
          ammAuthority: config.raydiumInfo.ammAuthority,
          ammOpenOrders: config.raydiumInfo.ammOpenOrders,
          ammTargetOrders: config.raydiumInfo.ammTargetOrders,
          ammTknAccount0: config.raydiumInfo.ammPcAccount,
          ammTknAccount1: config.raydiumInfo.ammCoinAccount,
          lpMintAccount: config.lpMint,
          serumMarketId: config.raydiumInfo.serumMarketId,
          // TODO: need replace ↓ when have rewards
          userRewardsTknAccount: config.strategyTknAccount0,
          strategyRewardsTknAccount: config.strategyTknAccount0,
          clock: SYSVAR_CLOCK_PUBKEY
        }
      }
    ];
  }

  private getOrcaLiquidityParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey) {
    return [{
      accounts: {
        userMainAccount: userMainAccount,
        userInfo: userInfoAccount,
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyTknAccount0: config.strategyTknAccount0,
        strategyTknAccount1: config.strategyTknAccount1,
        strategyLpTknAccount: config.strategyLpTknAccount,
        tokenProgramId: TOKEN_PROGRAM_ID,
        ammProgramId: config.ammInfo.swapProgramId,
        swapPoolId: config.ammInfo.swapPoolId,
        swapPoolAuthority: config.ammInfo.swapPoolAuthority,
        swapPoolTknAccount0: config.ammInfo.swapTknVault0,
        swapPoolTknAccount1: config.ammInfo.swapTknVault1,
        lpMint: config.ammInfo.lpMint,
        userFranciumRewardsTkn: config.strategyTknAccount0,
        strategyFranciumRewardsTkn: config.strategyTknAccount0,
        clock: SYSVAR_CLOCK_PUBKEY
      }
    }];
  }

  // stakeLp
  public getStakeLpParams(config: any, type: string = 'raydium') {
    if (type === 'orca') {
      return this.getOrcaStakeLpParams(config);
    }
    return this.getRaydiumStakeLpParams(config);
  }

  private getRaydiumStakeLpParams(config: any) {
    return [
      {
        accounts: {
          strategyState: config.strategyAccount,
          strategyAuthority: config.strategyAuthority,
          strategyLpAccount: config.strategyLpAccount,
          strategyRewardTknAccount: config.strategRewardAccount,
          strategyRewardTknAccountB: config.strategRewardAccountB,
          strategyFarmInfo: config.strategyFarmInfo,
          raydiumStakingProgramId: config.raydiumInfo.stakePoolProgramId,
          poolId: config.raydiumInfo.stakePoolId,
          poolAuthority: config.raydiumInfo.stakePoolAuthority,
          poolLpAccount: config.raydiumInfo.stakePoolLpAccount,
          poolRewardTknAccount: config.raydiumInfo.stakePoolRewardAccount,
          poolRewardTknAccountB: config.raydiumInfo.stakePoolRewardAccountB,
          tokenProgramId: TOKEN_PROGRAM_ID,
          clock: SYSVAR_CLOCK_PUBKEY
        }
      }
    ];
  }

  private getOrcaStakeLpParams(config: any) {
    return [{
      accounts: {
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyLpTknAccount: config.strategyLpTknAccount,
        stakeProgramId: config.ammInfo.stakeProgramId,
        stakePoolLpTknValut: config.ammInfo.stakePoolLpVault,
        stakeFarmTknMint: config.ammInfo.stakePoolFarmTknMint,
        strategyFarmTknAccount: config.strategyFarmTknAccount,
        stakePoolFarmInfo: config.ammInfo.stakePoolFarmInfo,
        strategyFarmInfo: config.strategyFarmInfo,
        stakePoolRewardTknVault: config.ammInfo.stakePoolRewardsTknVault,
        strategyRewardsTknAccount: config.strategyRewardTknAccount,
        stakePoolAuthority: config.ammInfo.stakePoolAuthority,
        tokenProgramId: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY
      }
    }];
  }

  public getOrcaDoubleDipStakeParams(config: any) {
    return [{
      accounts: {
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyFarmTknAccount: config.strategyFarmTknAccount,
        stakeProgramId: config.ammInfo.stakeProgramId,
        doubleDipStakePoolFarmTknValut: config.ammInfo.doubleDipPool.doubleDipStakePoolFarmTknVault,
        doubleDipStakeFarmTknMint: config.ammInfo.doubleDipPool.doubleDipStakePoolFarmTknMint,
        doubleDipStrategyFarmTknAccount: config.doubleDipStrategyFarmTknAccount,
        doubleDipStakePoolFarmInfo: config.ammInfo.doubleDipPool.doubleDipStakePoolFarmInfo,
        doubleDipStrategyFarmInfo: config.doubleDipStrategyFarmInfo,
        doubleDipStakePoolRewardTknVault: config.ammInfo.doubleDipPool.doubleDipStakePoolRewardsTknVault,
        doubleDipStrategyRewardsTknAccount: config.doubleDipStrategyRewardTknAccount,
        doubleDipStakePoolAuthority: config.ammInfo.doubleDipPool.doubleDipStakePoolAuthority,
        tokenProgramId: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY
      }
    }];
  }

  // unstakeLp - withdraw
  public getUnstakeLpParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey, type: string = 'raydium') {
    if (type === 'orca') {
      return this.getOrcaUnstakeLpParams(config, userMainAccount, userInfoAccount, type);
    }
    return this.getRaydiumUnstakeLpParams(config, userMainAccount, userInfoAccount, type);
  }

  private getRaydiumUnstakeLpParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey, type: string = 'raydium') {
    return [
      {
        accounts: {
          userMainAccount: userMainAccount,
          userInfo: userInfoAccount,
          strategyState: config.strategyAccount,
          strategyAuthority: config.strategyAuthority,
          strategyLpAccount: config.strategyLpAccount,
          strategyRewardTknAccount: config.strategRewardAccount,
          strategyRewardTknAccountB: config.strategRewardAccountB,
          strategyFarmInfo: config.strategyFarmInfo,
          raydiumStakingProgramId: config.raydiumInfo.stakePoolProgramId,
          poolId: config.raydiumInfo.stakePoolId,
          poolAuthority: config.raydiumInfo.stakePoolAuthority,
          poolLpAccount: config.raydiumInfo.stakePoolLpAccount,
          poolRewardTknAccount: config.raydiumInfo.stakePoolRewardAccount,
          poolRewardTknAccountB: config.raydiumInfo.stakePoolRewardAccountB,
          tokenProgramId: TOKEN_PROGRAM_ID,
          clock: SYSVAR_CLOCK_PUBKEY,
          lendingPoolInfoAccount0: config.lendingPoolConfig["0"].lendingPoolInfoAccount,
          lendingPoolInfoAccount1: config.lendingPoolConfig["1"].lendingPoolInfoAccount,
          // TODO: need replace ↓ when have rewards
          userRewardsTknAccount: config.strategyTknAccount0,
          strategyRewardsTknAccount: config.strategyTknAccount0
        }
      }
    ];
  }

  private getOrcaUnstakeLpParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey, type: string = 'raydium') {
    return [{
      accounts: {
        userMainAccount: userMainAccount,
        userInfo: userInfoAccount,
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyLpTknAccount: config.strategyLpTknAccount,
        strategyFarmTknAccount: config.strategyFarmTknAccount,
        strategyRewardsTknAccount: config.strategyRewardTknAccount,
        strategyFarmInfo: config.strategyFarmInfo,
        stakeProgramId: config.ammInfo.stakeProgramId,
        stakePoolLpTkn: config.ammInfo.stakePoolLpVault,
        stakeFarmTknMint: config.ammInfo.stakePoolFarmTknMint,
        stakePoolFarmInfo: config.ammInfo.stakePoolFarmInfo,
        stakePoolRewardTknVault: config.ammInfo.stakePoolRewardsTknVault,
        stakePoolAuthority: config.ammInfo.stakePoolAuthority,
        tokenProgramId: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY,
        lendingPoolInfoAccount0: config.lendingPoolConfig["0"].lendingPoolInfoAccount,
        lendingPoolInfoAccount1: config.lendingPoolConfig["1"].lendingPoolInfoAccount,
        userFranciumRewardsTknAccount: config.strategyLpTknAccount,
        strategyFranciumRewardsTknAccount: config.strategyLpTknAccount
      }
    }];
  }

  public getOrcaDoubleDipUnstakeParams(config: any) {
    return [{
      accounts: {
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyFarmTknAccount: config.strategyFarmTknAccount,
        stakeProgramId: config.ammInfo.stakeProgramId,
        doubleDipStakePoolFarmTknValut: config.ammInfo.doubleDipPool.doubleDipStakePoolFarmTknVault,
        doubleDipStakeFarmTknMint: config.ammInfo.doubleDipPool.doubleDipStakePoolFarmTknMint,
        doubleDipStrategyFarmTknAccount: config.doubleDipStrategyFarmTknAccount,
        doubleDipStakePoolFarmInfo: config.ammInfo.doubleDipPool.doubleDipStakePoolFarmInfo,
        doubleDipStrategyFarmInfo: config.doubleDipStrategyFarmInfo,
        doubleDipStakePoolRewardTknVault: config.ammInfo.doubleDipPool.doubleDipStakePoolRewardsTknVault,
        doubleDipStrategyRewardsTknAccount: config.doubleDipStrategyRewardTknAccount,
        doubleDipStakePoolAuthority: config.ammInfo.doubleDipPool.doubleDipStakePoolAuthority,
        tokenProgramId: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY
      }
    }];
  }

  // remove liquidity - withdraw
  public getRemoveLiquidityParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey, type: string = 'raydium') {
    if (type === 'orca') {
      return this.getOrcaRemoveLiquidityParams(config, userMainAccount, userInfoAccount, type);
    }
    return this.getRaydiumRemoveLiquidityParams(config, userMainAccount, userInfoAccount, type);
  }

  private getRaydiumRemoveLiquidityParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey, type: string = 'raydium') {
    return [
      {
        accounts: {
          userMainAccount: userMainAccount,
          userInfo: userInfoAccount,
          strategyState: config.strategyAccount,
          strategyAuthority: config.strategyAuthority,
          strategyTknAccount0: config.strategyTknAccount0,
          strategyTknAccount1: config.strategyTknAccount1,
          strategyLpAccount: config.strategyLpAccount,
          tokenProgramId: TOKEN_PROGRAM_ID,
          raydiumAmmProgramId: config.raydiumInfo.raydiumProgramId,
          ammId: config.raydiumInfo.ammId,
          ammAuthority: config.raydiumInfo.ammAuthority,
          ammOpenOrders: config.raydiumInfo.ammOpenOrders,
          ammTargetOrders: config.raydiumInfo.ammTargetOrders,
          ammTknAccount0: config.raydiumInfo.ammPcAccount,
          ammTknAccount1: config.raydiumInfo.ammCoinAccount,
          lpMintAccount: config.lpMint,
          ammWithdrawQueue: config.raydiumInfo.poolWithdrawQueue,
          ammPoolTempLpAccount: config.raydiumInfo.poolTempLpTokenAccount,
          serumProgramId: config.raydiumInfo.serumProgramId,
          serumMarketId: config.raydiumInfo.serumMarketId,
          serumTknVault1: config.raydiumInfo.serumCoinVault,
          serumTknVault0: config.raydiumInfo.serumPCVault,
          serumVaultSinger: config.raydiumInfo.serumVaultSigner
        },
        remainingAccounts: [
          {pubkey: config.raydiumInfo.serumEventQueue, isSigner:false, isWritable: true},
          {pubkey: config.raydiumInfo.serumBids, isSigner:false, isWritable: true},
          {pubkey: config.raydiumInfo.serumAsks, isSigner:false, isWritable: true},
        ]
      }
    ];
  }

  private getOrcaRemoveLiquidityParams(config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey, type: string = 'raydium') {
    return [{
      accounts: {
        userMainAccount: userMainAccount,
        userInfo: userInfoAccount,
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyTknAccount0: config.strategyTknAccount0,
        strategyTknAccount1: config.strategyTknAccount1,
        strategyLpTknAccount: config.strategyLpTknAccount,
        tokenProgramId: TOKEN_PROGRAM_ID,
        ammProgramId: config.ammInfo.swapProgramId,
        swapPoolId: config.ammInfo.swapPoolId,
        swapPoolAuthority: config.ammInfo.swapPoolAuthority,
        swapPoolTkn0: config.ammInfo.swapTknVault0,
        swapPoolTkn1: config.ammInfo.swapTknVault1,
        swapPoolFeeTkn: config.ammInfo.swapFeeAccount,
        lpMint: config.ammInfo.lpMint
      }
    }];
  }

  // swap and withdraw - withdraw
  public getSwapAndWithdrawParams(
    config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey,
    userTokenAccount0: PublicKey, userTokenAccount1: PublicKey, type: string = 'raydium'
  ) {
    if (type === 'orca') {
      return this.getOrcaSwapAndWithdrawParams(
        config, userMainAccount, userInfoAccount,
        userTokenAccount0, userTokenAccount1
      );
    }
    return this.getRaydiumSwapAndWithdrawParams(
      config, userMainAccount, userInfoAccount,
      userTokenAccount0, userTokenAccount1
    );
  }

  private getRaydiumSwapAndWithdrawParams(
    config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey,
    userTokenAccount0: PublicKey, userTokenAccount1: PublicKey, type: string = 'raydium'
  ) {
    return [
      {
        accounts: {
          userMainAccount: userMainAccount,
          userInfo: userInfoAccount,
          userTknAccount0: userTokenAccount0,
          userTknAccount1: userTokenAccount1,
          strategyState: config.strategyAccount,
          strategyAuthority: config.strategyAuthority,
          strategyTknAccount0: config.strategyTknAccount0,
          strategyTknAccount1: config.strategyTknAccount1,
          strategyLpAccount: config.strategyLpAccount,
          tokenProgramId: TOKEN_PROGRAM_ID,
          raydiumAmmProgramId: config.raydiumInfo.raydiumProgramId,
          ammId: config.raydiumInfo.ammId,
          ammAuthority: config.raydiumInfo.ammAuthority,
          ammOpenOrders: config.raydiumInfo.ammOpenOrders,
          ammTargetOrders: config.raydiumInfo.ammTargetOrders,
          ammTknAccount1: config.raydiumInfo.ammCoinAccount,
          ammTknAccount0: config.raydiumInfo.ammPcAccount,
          lpMintAccount: config.lpMint,
          serumProgramId: config.raydiumInfo.serumProgramId,
          serumMarketId: config.raydiumInfo.serumMarketId,
          serumBids: config.raydiumInfo.serumBids,
          serumAsks: config.raydiumInfo.serumAsks,
          serumEventQueue: config.raydiumInfo.serumEventQueue,
          serumTknVault1: config.raydiumInfo.serumCoinVault,
          serumTknVault0: config.raydiumInfo.serumPCVault,
          serumVaultSinger: config.raydiumInfo.serumVaultSigner
        }
      }
    ];
  }

  private getOrcaSwapAndWithdrawParams(
    config: any, userMainAccount: PublicKey, userInfoAccount: PublicKey,
    userTokenAccount0: PublicKey, userTokenAccount1: PublicKey, type: string = 'raydium'
  ) {
    return [{
      accounts: {
        userMainAccount: userMainAccount,
        userInfo: userInfoAccount,
        userTknAccount0: userTokenAccount0,
        userTknAccount1: userTokenAccount1,
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyTknAccount0: config.strategyTknAccount0,
        strategyTknAccount1: config.strategyTknAccount1,
        strategyLpTknAccount: config.strategyLpTknAccount,
        tokenProgramId: TOKEN_PROGRAM_ID,
        ammProgramId: config.ammInfo.swapProgramId,
        swapPoolId: config.ammInfo.swapPoolId,
        swapPoolAuthority: config.ammInfo.swapPoolAuthority,
        swapPoolTkn0: config.ammInfo.swapTknVault0,
        swapPoolTkn1: config.ammInfo.swapTknVault1,
        swapPoolFeeTkn: config.ammInfo.swapFeeAccount,
        lpMint: config.ammInfo.lpMint
      }
    }];
  }

  // repay - withdraw
  public getRepayParams(config: any, userMainAccount: PublicKey, type: string = 'raydium') {
    if (type === 'orca') {
      return this.getOrcaRepayParams(config, userMainAccount);
    }
    return this.getRaydiumRepayParams(config, userMainAccount);
  }

  private getRaydiumRepayParams(config: any, userMainAccount: PublicKey) {
    return [
      {
        accounts: {
          userMainAccount: userMainAccount,
          strategyState: config.strategyAccount,
          strategyAuthority: config.strategyAuthority,
          strategyTknAccount0: config.strategyTknAccount0,
          strategyTknAccount1: config.strategyTknAccount1,
          lendingMarketAccount: config.lendingPoolConfig.marketInfoAccount,
          lendingMarketAuthorityInfo: config.lendingPoolConfig.marketAuthority,
          lendingPoolProgramId: config.lendingPoolConfig.programId,
          lendingPoolInfoAccount0: config.lendingPoolConfig["0"].lendingPoolInfoAccount,
          lendingPoolTknAccount0: config.lendingPoolConfig["0"].lendingPoolTknAccount,
          lendingPoolCreditMint0: config.lendingPoolConfig["0"].lendingPoolCreditMint,
          lendingPoolCreditAccount0: config.lendingPoolConfig["0"].lendingPoolCreditAccount,
          strategyCreditAccount0: config.strategyBorrowCreditAccount0,
          lendingPoolInfoAccount1: config.lendingPoolConfig["1"].lendingPoolInfoAccount,
          lendingPoolTknAccount1: config.lendingPoolConfig["1"].lendingPoolTknAccount,
          lendingPoolCreditMint1: config.lendingPoolConfig["1"].lendingPoolCreditMint,
          lendingPoolCreditAccount1: config.lendingPoolConfig["1"].lendingPoolCreditAccount,
          strategyCreditAccount1: config.strategyBorrowCreditAccount1,
          tokenProgramId: TOKEN_PROGRAM_ID,
          clock: SYSVAR_CLOCK_PUBKEY
        }
      }
    ];
  }

  private getOrcaRepayParams(config: any, userMainAccount: PublicKey) {
    return [{
      accounts: {
        userMainAccount: userMainAccount,
        strategyState: config.strategyAccount,
        strategyAuthority: config.strategyAuthority,
        strategyTknAccount0: config.strategyTknAccount0,
        strategyTknAccount1: config.strategyTknAccount1,
        lendingMarketAccount: config.lendingPoolConfig.marketInfoAccount,
        lendingMarketAuthorityInfo: config.lendingPoolConfig.marketAuthority,
        lendingPoolProgramId: config.lendingPoolConfig.programId,
        lendingPoolInfoAccount0: config.lendingPoolConfig["0"].lendingPoolInfoAccount,
        lendingPoolTknAccount0: config.lendingPoolConfig["0"].lendingPoolTknAccount,
        lendingPoolCreditMint0: config.lendingPoolConfig["0"].lendingPoolCreditMint,
        lendingPoolCreditAccount0: config.lendingPoolConfig["0"].lendingPoolCreditAccount,
        strategyCreditAccount0: config.strategyBorrowCreditAccount0,
        lendingPoolInfoAccount1: config.lendingPoolConfig["1"].lendingPoolInfoAccount,
        lendingPoolTknAccount1: config.lendingPoolConfig["1"].lendingPoolTknAccount,
        lendingPoolCreditMint1: config.lendingPoolConfig["1"].lendingPoolCreditMint,
        lendingPoolCreditAccount1: config.lendingPoolConfig["1"].lendingPoolCreditAccount,
        strategyCreditAccount1: config.strategyBorrowCreditAccount1,
        tokenProgramId: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY
      }
    }];
  }
}