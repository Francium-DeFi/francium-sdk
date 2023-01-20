import { AUTO_RAYDIUM_EXTRA_CONFIG, AUTO_RAYDIUM_FARM_CONFIG, FRANCIUM_AUTO_VAULTS_PROGRAM_ID } from '../../constants/auto/raydium';
import raydiumIdl from '../../constants/auto/idl';
import { Connection, PublicKey } from '@solana/web3.js';
import { Idl, Program, AnchorProvider, BN } from '@project-serum/anchor';
import { NATIVE_MINT } from '@solana/spl-token';
import { find, forEach, isString, sortBy } from 'lodash';
import BigNumber from 'bignumber.js';
import { getAmountByDecimals } from '../../utils/math';
import { getTokenDecimals } from '../../utils/tools';

const commitment = 'confirmed';

export default class FranciumAutoVaults {
  public configs: any = {};
  public programs = {};
  public connection: Connection;
  public allPoolList: any[] = [];

  constructor(config: {
    connection: Connection
  }) {

    const allPoolList = [];
    forEach(AUTO_RAYDIUM_FARM_CONFIG, (value, id) => {
      allPoolList.push({
        type: 'raydium',
        id,
        pair: value.pair,
        config: value,
        extra: AUTO_RAYDIUM_EXTRA_CONFIG[id]
      });
    });

    this.configs = {
      raydium: {
        idl: raydiumIdl,
        programId: FRANCIUM_AUTO_VAULTS_PROGRAM_ID,
        config: AUTO_RAYDIUM_FARM_CONFIG,
      },
      orca: {
        idl: raydiumIdl,
        programId: FRANCIUM_AUTO_VAULTS_PROGRAM_ID,
        config: {}
      }
    };
    this.allPoolList = allPoolList;
    this.connection = config.connection;
  }

  public getProgram(type = 'raydium') {
    if (this.programs[type]) {
      return this.programs[type] as Program;
    } else {
      // const wallet = getWallet();
      const { idl, programId } = this.configs[type];
      const program = new Program(idl as Idl, programId, new AnchorProvider(
        this.connection,
        {
          publicKey: NATIVE_MINT,
          signAllTransactions: (trxs) => {
            return Promise.resolve(trxs);
          },
          signTransaction: (trxs) => {
            return Promise.resolve(trxs);
          },
        },
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
    // const orcaInfos = await this.getUserPositionsByProgram('orca', pubkey);
    const raydiumInfos = await this.getUserPositionsByProgram('raydium', pubkey);
    return {
      orca: [],
      raydium: raydiumInfos
    };
  }

  public async getFarmPoolsInfo() {
    const pools = this.allPoolList;
    const poolAccounts = pools.map(i => {
      return new PublicKey(i.config.poolInfoAccount);
    });
    const res = await this.connection.getMultipleAccountsInfo(poolAccounts, 'confirmed');
    const decodeResult = res.map((i, index) => {
      const poolItem = pools[index];
      const program = this.getProgram(poolItem.type || 'raydium');
      const strategyInfo = program.coder.accounts.decode('PoolInfo', i.data);
      return {
        ...poolItem,
        poolInfo: strategyInfo
      };
    });
    return decodeResult;
  }

  public async getUserFarmPosition(userPublicKey?: PublicKey) {
    const farmInfo = await this.getFarmPoolsInfo();

    const formattedPoolInfo = farmInfo.map(i => {
      const { lpDecimals, depositToken } = i.extra;
      const [token1, token0] = i.pair.split('-');
      return {
        ...i,
        formatter: this.formatUserAutoPosition(i.poolInfo, null, {
          token0,
          token1,
          lpDecimals,
          depositToken
        })
      };
    });

    if (!userPublicKey) {
      return {
        user: [],
        pool: formattedPoolInfo
      };
    }
    const infos = await this.getUserPositionsAll(userPublicKey);
    const raydiumInfos = infos.raydium;
    const orcaInfos = infos.orca;

    const formattedUserInfos = [...raydiumInfos, ...orcaInfos].map(i => {
      const poolInfoAccount: PublicKey = i.data.poolInfo;
      const targetPool = find(farmInfo, target => {
        return target.config.poolInfoAccount === poolInfoAccount.toBase58();
      });

      let formatter = {};

      if (targetPool) {
        const { lpDecimals, depositToken } = targetPool.extra;
        const [token1, token0] = targetPool.pair.split('-');
        formatter = this.formatUserAutoPosition(targetPool?.poolInfo, i.data, {
          token0,
          token1,
          lpDecimals,
          depositToken
        });
      }

      return {
        ...(targetPool || {}),
        userInfo: i.data,
        userInfoPublicKey: i.publicKey,
        formatter
      };
    });

    return {
      pool: formattedPoolInfo,
      user: formattedUserInfos
    };
  }

  public formatUserAutoPosition(poolInfo: any, userInfo: any, config: {
    token0: string;
    token1: string;
    lpDecimals: number;
    depositToken?: string;
  }) {

    let pool = {};
    let user = {};

    if (poolInfo) {
      const decimals0 = getTokenDecimals(config.token0);
      const decimals1 = getTokenDecimals(config.token1);

      const totalLP = getAmountByDecimals(poolInfo?.lpAmount, config.lpDecimals);
      const totalShares = new BigNumber(poolInfo?.totalShares.toString());
      const totalBorrow0 = getAmountByDecimals(poolInfo?.borrowed0.add(poolInfo?.pendingRepay0), decimals0);
      const totalBorrow1 = getAmountByDecimals(poolInfo?.borrowed1.add(poolInfo?.pendingRepay1), decimals1);
      const totalToken0 = getAmountByDecimals(poolInfo?.tknAmount0, decimals0);
      const totalToken1 = getAmountByDecimals(poolInfo?.tknAmount1, decimals1);

      const capacity = getAmountByDecimals(poolInfo?.capacity, decimals0);
      const withdrawalFee = poolInfo?.withdrawFeeBps / 10000;
      const managementFee = poolInfo?.managementFeeBps / 10000;
      const rewardsFee = poolInfo?.rewardsFeeBps / 10000;
      const limitPerTx = getAmountByDecimals(poolInfo?.limitPerTx, decimals0);

      pool = {
        totalLP,
        totalShares: poolInfo?.totalShares,
        totalBorrow0,
        totalBorrow1,
        totalToken0,
        totalToken1,
        capacity,
        withdrawalFee,
        managementFee,
        rewardsFee,
        limitPerTx
      };

      if (userInfo) {
        const userShares = new BigNumber(userInfo?.shareAmount.toString());
        const userPercent = userShares.dividedBy(totalShares).toNumber();
        const userDeposit0 = getAmountByDecimals(userInfo?.principal0, decimals0);
        const userDeposit1 = getAmountByDecimals(userInfo?.principal1, decimals1);

        const userLPAmount = totalLP * userPercent;
        const userBorrow0 = totalBorrow0 * userPercent;
        const userBorrow1 = totalBorrow1 * userPercent;

        const positionState = userInfo.positionAdjustState;

        let state = '';
        let stateInfo = {};

        if (positionState.adjustType.idle !== undefined) {
          state = 'idle';
        } else if (positionState.adjustType.deposit !== undefined) {
          state = 'deposit';
          const depositInfo = {
            tkn0: positionState.state.data[0],
            tkn1: positionState.state.data[1]
          };
          stateInfo = depositInfo;
        } else if (positionState.adjustType.withdraw !== undefined) {
          state = 'withdraw';
          const withdrawInfo = {
            lpAmount: positionState.state.data[0],
          };
          stateInfo = withdrawInfo;
        }

        user = {
          userShares: userInfo?.shareAmount,
          userPercent,
          userLPAmount,
          userBorrow0,
          userBorrow1,
          userDeposit0,
          userDeposit1,
          userToken0: totalToken0 * userPercent,
          userToken1: totalToken1 * userPercent,
          state,
          stateInfo
        };
      }
    }
    return {
      pool,
      user
    };
  }

  public async getUserPositionsByProgram(programType: string, userPublicKey: PublicKey) {
    const program = this.getProgram(programType || 'raydium');
    if (!program) {
      return [];
    }
    const decodeResult: {
      publicKey: PublicKey;
      data: any;
    }[] = [];
    const infos = await this.connection.getProgramAccounts(
      program.programId,
      {
        filters: [
          { dataSize: 236 },
          {
            memcmp: {
              offset: 8 + 1 + 8 + 1,
              bytes: userPublicKey.toBase58()
            }
          }
        ]
      }
    );
    infos.forEach((item, index) => {
      try {
        const userInfo = program.coder.accounts.decode('UserPositionInfo', item.account.data);
        decodeResult.push({
          publicKey: item.pubkey,
          data: userInfo,
        });
      } catch (err) {

      }
    });
    return sortBy(decodeResult, i => - i.data.nonce.toNumber());
  }
}