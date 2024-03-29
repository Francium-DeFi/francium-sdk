import {
  Connection, PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY,
  Transaction, TransactionInstruction
} from '@solana/web3.js';
import { createAssociatedTokenAccount, getParsedTokenAccounts } from '../../utils/trx/token';
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token';

import * as BN from 'bn.js';
import { isNativeMint } from '../../utils/tools';
import { FranciumFarm } from '.';
import additionalComputeBudgetInstruction from '../../utils/trx/setUnit';

const SYSTEM_PROGRAM_ID = SystemProgram.programId;

export interface AmountConfig {
  tokenAmount0: BN;
  tokenAmount1: BN;
  borrow0: BN;
  borrow1: BN;
  stopLoss: number;
  currentUserInfoAccount?: PublicKey;
  noNonce?: boolean;
  rangeStopType?: number;
  priceRange0?: BN;
  priceRange1?: BN;
}

export async function getRangeInstruction(
  pair: string,
  lyfType: string,
  userPublicKey: PublicKey,
  userInfoPublicKey: PublicKey,
  lyfHub: FranciumFarm,
  props: {
    priceRange0: BN;
    priceRange1: BN;
    rangeStopType: number;
  }) {
  const program = lyfHub.getProgram(lyfType);
  const targetFarmInfo = lyfHub.getConfig(pair, lyfType);
  const { priceRange0, priceRange1, rangeStopType } = props;
  const ins = program.instruction.setPositionRangeStop(
    rangeStopType || 2,
    priceRange0,
    priceRange1,
    {
      accounts: {
        userMainAccount: userPublicKey,
        userInfoAccount: userInfoPublicKey,
        strategyState: targetFarmInfo.strategyAccount,
      },
    }
  );
  return ins;
}

export default async function buildFarmTransactions(
  connection: Connection,
  pair: string,
  lyfType: string,
  userPublicKey: PublicKey,
  farm: FranciumFarm,
  configs: {
    amount0: BN;
    amount1: BN;
    borrow0: BN;
    borrow1: BN;
    stopLoss: number;
    currentUserInfoAccount?: PublicKey;
    useLookupTable?: boolean;
    rangeStopType?: number;
    priceRange0?: BN;
    priceRange1?: BN;
    onGetAccounts?: (accounts: {
      userInfoAccount: PublicKey;
    }) => void
  }
) {
  if (configs?.useLookupTable) {
    return stakeWithLeverageOneTx(
      connection,
      pair,
      lyfType,
      userPublicKey,
      configs
    );
  }

  return stakeWithLeverage(
    connection,
    pair,
    lyfType,
    userPublicKey,
    configs
  );

  async function stakeWithLeverage(
    connection: Connection,
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    configs: {
      amount0: BN;
      amount1: BN;
      borrow0: BN;
      borrow1: BN;
      stopLoss: number;
      currentUserInfoAccount?: PublicKey;
      rangeStopType?: number;
      priceRange0?: BN;
      priceRange1?: BN;
    }) {

    const {
      amount0, amount1, borrow0, borrow1, stopLoss, currentUserInfoAccount
    } = configs;

    const { trxPre, trx: trx1, currentUserInfoAccount: preUserInfoAccount } = await investAndBorrow(
      connection,
      pair,
      lyfType || 'raydium',
      userPublicKey,
      {
        tokenAmount0: amount0,
        tokenAmount1: amount1,
        borrow0,
        borrow1,
        stopLoss,
        currentUserInfoAccount
      }
    );

    const trx2 = await swapAndAddLiquidity(connection, pair, lyfType || 'raydium', userPublicKey, {
      currentUserInfoAccount: preUserInfoAccount
    });
    const trx3 = await stakeLP(connection, pair, lyfType || 'raydium');

    // if (trxPre.instructions.length) {
    //   return await send2TransactionsListOneByOneWithErrorCatch(
    //     [trxPre, trx1, trx2, trx3], connection, wallet,
    //     configs?.onTrxSended, configs.onTrxConfirmed
    //   );
    // } else {
    //   return await send2TransactionsListOneByOneWithErrorCatch(
    //     [trx1, trx2, trx3], connection, wallet,
    //     configs?.onTrxSended, configs.onTrxConfirmed
    //   );
    // }

    if (trxPre.instructions.length) {
      return [trxPre, trx1, trx2, trx3];
    } else {
      return [trx1, trx2, trx3];
    }
  }

  async function stakeWithLeverageOneTx(
    connection: Connection,
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    configs: {
      amount0: BN;
      amount1: BN;
      borrow0: BN;
      borrow1: BN;
      stopLoss: number;
      currentUserInfoAccount?: PublicKey;
      rangeStopType?: number;
      priceRange0?: BN;
      priceRange1?: BN;
      onGetAccounts?: (accounts: {
        userInfoAccount: PublicKey;
      }) => void
    }) {

    const {
      amount0, amount1, borrow0, borrow1, stopLoss, currentUserInfoAccount, onGetAccounts
    } = configs;

    const { trxPre, trx: trx1, currentUserInfoAccount: preUserInfoAccount } = await investAndBorrow(
      connection,
      pair,
      lyfType || 'raydium',
      userPublicKey,
      {
        tokenAmount0: amount0,
        tokenAmount1: amount1,
        borrow0,
        borrow1,
        stopLoss,
        currentUserInfoAccount
      },
      true
    );

    if (onGetAccounts) {
      onGetAccounts({
        userInfoAccount: preUserInfoAccount
      });
    }

    const trx2 = await swapAndAddLiquidity(connection, pair, lyfType || 'raydium', userPublicKey, {
      currentUserInfoAccount: preUserInfoAccount
    });
    const trx3 = await stakeLP(connection, pair, lyfType || 'raydium');

    const [add1, ...trx1Ins] = trx1.instructions;
    const [add2, ...trx2Ins] = trx2.instructions;
    const [add3, ...trx3Ins] = trx3.instructions;

    const trx = new Transaction();

    if (trxPre.instructions.length) {
      trx.add(...trxPre.instructions, ...trx1Ins, ...trx2Ins, ...trx3Ins);
    } else {
      trx.add(...trx1Ins, ...trx2Ins, ...trx3Ins);
    }

    return [trx];
  }

  async function investAndBorrow(
    connection: Connection,
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    configs: AmountConfig,
    useOracle?: boolean
  ) {
    const {
      stopLoss,
      borrow0,
      borrow1,
      tokenAmount0,
      tokenAmount1,
      currentUserInfoAccount,
      noNonce,
      rangeStopType, priceRange0, priceRange1
    } = configs;

    // create accounts if need
    const trxPre = new Transaction();
    const trx = new Transaction();
    trx.add(additionalComputeBudgetInstruction);
    const targetFarmInfo = farm.getConfig(pair, lyfType);

    if (!targetFarmInfo) {
      throw new Error(`no farm info for ${pair}`);
    }

    const parsedTokenAccounts = await getParsedTokenAccounts(connection, userPublicKey);
    let userTknAccount0 = parsedTokenAccounts[targetFarmInfo.tknMint0]?.tokenAccountAddress;
    let userTknAccount1 = parsedTokenAccounts[targetFarmInfo.tknMint1]?.tokenAccountAddress;

    // -------- FORMAT THE TOKENADDRESS, because getParsedTokenAccounts method NATIVE_MINT is SOL Balance
    if (isNativeMint(targetFarmInfo.tknMint0)) {
      userTknAccount0 = parsedTokenAccounts[NATIVE_MINT.toBase58()]?.tokenAccountAddress;
    } else if (isNativeMint(targetFarmInfo.tknMint1)) {
      userTknAccount1 = parsedTokenAccounts[NATIVE_MINT.toBase58()]?.tokenAccountAddress;
    } else {
      // not include SOL 
    }
    // -------- FORMAT THE TOKENADDRESS END

    if (!userTknAccount0) {
      userTknAccount0 = (await createAssociatedTokenAccount(targetFarmInfo.tknMint0, userPublicKey, trxPre)).toBase58();
    }
    if (!userTknAccount1) {
      userTknAccount1 = (await createAssociatedTokenAccount(targetFarmInfo.tknMint1, userPublicKey, trxPre)).toBase58();
    }

    const program = farm.getProgram(lyfType);
    const strategyAccount = targetFarmInfo.strategyAccount;

    let userInfoAccount = currentUserInfoAccount;

    async function initUserInfoByNonce(nonce: number) {
      const nonceLeBytes = Buffer.from([0, 0, 0, 0]);
      nonceLeBytes.writeUInt32LE(nonce);
      userInfoAccount = await program.account.userInfo.associatedAddress(
        userPublicKey, strategyAccount, nonceLeBytes
      );
      const [pda, bump] = await PublicKey.findProgramAddress(
        [
          Buffer.from([97, 110, 99, 104, 111, 114]),
          userPublicKey.toBuffer(),
          targetFarmInfo.strategyAccount.toBuffer(),
          nonceLeBytes
        ],
        program.programId
      );

      const initInstruction = await program.instruction.initializeUserWithNonce(
        nonce,
        bump,
        {
          accounts: {
            userMainAccount: userPublicKey,
            userInfoAccount: userInfoAccount,
            strategyState: targetFarmInfo.strategyAccount,
            systemProgram: SYSTEM_PROGRAM_ID,
            clock: SYSVAR_CLOCK_PUBKEY
          }
        }
      );

      return initInstruction;
    }

    async function initUserInfoWithoutNonce() {
      userInfoAccount = await program.account.userInfo.associated(userPublicKey, strategyAccount) as PublicKey;
      const initInstruction = await program.instruction.initializeUser(
        {
          accounts: {
            userMainAccount: userPublicKey,
            userInfoAccount: userInfoAccount,
            strategyState: targetFarmInfo.strategyAccount,
            systemProgram: SYSTEM_PROGRAM_ID,
            clock: SYSVAR_CLOCK_PUBKEY
          }
        }
      );
      return initInstruction;
    }

    // new Farm Position
    if (!currentUserInfoAccount) {
      if (noNonce) {
        const initInstruction = await initUserInfoWithoutNonce();
        trxPre.add(initInstruction);
      } else {
        const initInstruction = await initUserInfoByNonce(Math.trunc(Date.now() / 1000));
        trxPre.add(initInstruction);
      }
    }

    // let newAccount: Keypair;
    // WSOL
    // if (isNativeMint(targetFarmInfo.tknMint0) || isNativeMint(targetFarmInfo.tknMint1)) {
    //   const rentExemptLamports =  await connection.getMinimumBalanceForRentExemption(ACCOUNT_LAYOUT.span);
    //   // console.log('start new keypair');
    //   newAccount = Keypair.generate();
    //   // console.log('Keypair', newAccount.publicKey.toBase58());
    //   trx.add(
    //     SystemProgram.createAccount({
    //       fromPubkey: userPublicKey,
    //       newAccountPubkey: newAccount.publicKey,
    //       lamports: (isNativeMint(targetFarmInfo.tknMint0) ? tokenAmount0 : tokenAmount1) + rentExemptLamports,
    //       space: ACCOUNT_LAYOUT.span,
    //       programId: TOKEN_PROGRAM_ID
    //     })
    //   );
    //   trx.add(
    //     initializeAccount({
    //       account: newAccount.publicKey,
    //       mint: NATIVE_MINT,
    //       owner: userPublicKey
    //     })
    //   );
    //   if (isNativeMint(targetFarmInfo.tknMint0)) {
    //     userTknAccount0 = newAccount.publicKey.toBase58();
    //   } else {
    //     userTknAccount1 = newAccount.publicKey.toBase58();
    //   }
    // }

    function transferToWSOL(amount: BN, WSOLAccount: PublicKey, userPublicKey: PublicKey) {
      const ins1 = SystemProgram.transfer(
        {
          fromPubkey: userPublicKey,
          /** Account that will receive transferred lamports */
          toPubkey: WSOLAccount,
          /** Amount of lamports to transfer */
          lamports: Number(amount.toString())
        }
      );
      // update WSOL amount
      const ins2 = new TransactionInstruction({
        keys: [
          { pubkey: WSOLAccount, isSigner: false, isWritable: true }
        ],
        programId: TOKEN_PROGRAM_ID,
        data: Buffer.from([17]),
      });
      return [ins1, ins2];
    }

    // range stop loss
    if (rangeStopType && priceRange0 && priceRange1) {
      const rangeIns = await getRangeInstruction(
        pair,
        lyfType,
        userPublicKey,
        userInfoAccount,
        farm,
        {
          priceRange0,
          priceRange1,
          rangeStopType
        }
      );
      trx.add(rangeIns);
    }
    // if need transfer sol, transfer sol to wsol
    if (isNativeMint(targetFarmInfo.tknMint0)) {
      if (tokenAmount0.gtn(0)) {
        const instructions = transferToWSOL(tokenAmount0, new PublicKey(userTknAccount0), userPublicKey);
        trx.add(...instructions);
      }
    } else if (isNativeMint(targetFarmInfo.tknMint1)) {
      if (tokenAmount1.gtn(0)) {
        const instructions = transferToWSOL(tokenAmount1, new PublicKey(userTknAccount1), userPublicKey);
        trx.add(...instructions);
      }
    } else {
      // not include SOL 
    }

    const transferInstruction = await program.instruction.transfer({
      stopLoss,
      amount0: new BN(tokenAmount0),
      amount1: new BN(tokenAmount1)
    }, {
      accounts: {
        userMainAccount: userPublicKey,
        userInfoAccount: userInfoAccount,
        userTknAccount0: userTknAccount0,
        userTknAccount1: userTknAccount1,
        strategyState: targetFarmInfo.strategyAccount,
        strategyAuthority: targetFarmInfo.strategyAuthority,
        strategyTknAccount0: targetFarmInfo.strategyTknAccount0,
        strategyTknAccount1: targetFarmInfo.strategyTknAccount1,
        tokenProgramId: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY
      }
    });

    const borrowInsList = [];
    if (useOracle) {
      // use `borrowWithOracleInfo`
      console.log('useOracle');
      const borrowAccounts = farm.getBorrowParamsWithOrcale(targetFarmInfo, userPublicKey, userInfoAccount, lyfType);
      console.log(borrowAccounts);
      const borrowInstruction = await program.instruction.borrowWithOracleInfo(
        {
          borrow0: new BN(borrow0),
          borrow1: new BN(borrow1)
        },
        borrowAccounts[0]
      );
      borrowInsList.push(borrowInstruction);

    } else {
      const borrowAccounts = farm.getBorrowParams(targetFarmInfo, userPublicKey, userInfoAccount, lyfType);
      if (borrow0.gtn(0)) {
        const borrowInstruction0 = await program.instruction.borrow(
          {
            borrow0: new BN(borrow0),
            borrow1: new BN(0)
          },
          borrowAccounts[0]
        );
        borrowInsList.push(borrowInstruction0);
      }

      if (borrow1.gtn(0)) {
        const borrowInstruction1 = await program.instruction.borrow(
          {
            borrow0: new BN(0),
            borrow1: new BN(borrow1)
          },
          borrowAccounts[0]
        );
        borrowInsList.push(borrowInstruction1);
      }
    }

    trx.add(transferInstruction);

    if (borrowInsList.length) {
      trx.add(...borrowInsList);
    }

    // WSOL
    // if (isNativeMint(targetFarmInfo.tknMint0) || isNativeMint(targetFarmInfo.tknMint1)) {
    //   trx.add(
    //     closeAccount({
    //       source: newAccount.publicKey,
    //       destination: userPublicKey,
    //       owner: userPublicKey
    //     })
    //   );
    //   if (borrowInsList.length) {
    //     trxSol.add(...borrowInsList);
    //   }
    // } else {
    //   if (borrowInsList.length) {
    //     trx.add(...borrowInsList);
    //   }
    // }

    return {
      trxPre,
      trx,
      currentUserInfoAccount: userInfoAccount
    };
  }

  async function swapAndAddLiquidity(
    connection: Connection,
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    configs: {
      currentUserInfoAccount: PublicKey
    }
    // amountIn: number,
    // minAmountOut: number
  ) {
    const trx = new Transaction();
    trx.add(additionalComputeBudgetInstruction);
    const targetFarmInfo = farm.getConfig(pair, lyfType);
    if (!targetFarmInfo) {
      throw new Error(`no farm info for ${pair}`);
    }

    // stable swap
    if (lyfType === 'orca' && targetFarmInfo.protocolSubVersion === 2) {
      const program = farm.getProgram(lyfType);
      const userInfoAccount = configs.currentUserInfoAccount;

      const liquidityParams = farm.getLiquidityParams(targetFarmInfo, userPublicKey, userInfoAccount, lyfType);
      const addLiquidityInstruction = program.instruction.addLiquidity(liquidityParams[0]);
      const singleSideInstruction = program.instruction.addLiquiditySigleSide(liquidityParams[0]);
      trx.add(addLiquidityInstruction, singleSideInstruction);
    } else {
      const program = farm.getProgram(lyfType);
      const userInfoAccount = configs.currentUserInfoAccount;

      const swapParams = farm.getSwapParams(targetFarmInfo, userPublicKey, userInfoAccount, lyfType);
      const swapInstruction = program.instruction.swap(...swapParams as any);

      const liquidityParams = farm.getLiquidityParams(targetFarmInfo, userPublicKey, userInfoAccount, lyfType);
      const addLiquidityInstruction = await program.instruction.addLiquidity(liquidityParams[0]);
      trx.add(swapInstruction, addLiquidityInstruction);
    }
    return trx;
  }

  async function stakeLP(
    connection: Connection,
    pair: string,
    lyfType: string
  ) {
    const trx = new Transaction();
    trx.add(additionalComputeBudgetInstruction);
    const targetFarmInfo = farm.getConfig(pair, lyfType);
    if (!targetFarmInfo) {
      throw new Error(`no farm info for ${pair}`);
    }

    // const userPublicKey = wallet.publicKey;
    const program = farm.getProgram(lyfType);
    const stakeLpParams = farm.getStakeLpParams(targetFarmInfo, lyfType);
    const stakeLPInstruction = program.instruction.stakeLp(stakeLpParams[0]);
    trx.add(stakeLPInstruction);

    // is Double Dip Pool
    if (targetFarmInfo?.ammInfo?.doubleDipPool) {
      const doubleDipParams = farm.getOrcaDoubleDipStakeParams(targetFarmInfo);
      const doubleDipInstruction = program.instruction.doubleDipStakeFarmTkn(doubleDipParams[0]);
      trx.add(doubleDipInstruction);
    }
    return trx;
  }

}

