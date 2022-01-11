import { Connection, PublicKey, SYSVAR_CLOCK_PUBKEY, Transaction, TransactionInstruction } from "@solana/web3.js";
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BN } from "@project-serum/anchor";
import { createAssociatedTokenAccount, getParsedTokenAccounts } from '../../utils/trx/token';
import { closeAccount } from "@project-serum/serum/lib/token-instructions";
import { isNativeMint } from '../../utils/tools';
import { FranciumFarm } from '.';
import BigNumber from "bignumber.js";


export default async function buildWithdrawTransactions(
  connection: Connection,
  pair: string,
  lyfType: string,
  userPublicKey: PublicKey,
  farm: FranciumFarm,
  configs: {
    lpShares: BigNumber,
    withdrawType: number,
    currentUserInfoAccount: PublicKey;
  }
) {

  return withdrawLP(
    connection,
    pair,
    lyfType,
    userPublicKey,
    configs.lpShares,
    {
      withdrawType: configs.withdrawType,
      currentUserInfoAccount: configs.currentUserInfoAccount
    }
  );

  async function unstakeLP(
    connection: Connection,
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    lpShares: BigNumber,
    withdrawType: number,
    configs: {
      currentUserInfoAccount: PublicKey;
    }
  ) {
    const trx = new Transaction();
    const targetFarmInfo = farm.getConfig(pair, lyfType);
    if (!targetFarmInfo) {
      throw new Error(`no farm info for ${pair}`);
    }
  
    const program = farm.getProgram(lyfType);
    let userInfoAccount = configs.currentUserInfoAccount;
  
    // --- update lending pool info ---
    const updateLendingIx0 = new TransactionInstruction({
      keys: [
        {
          pubkey: targetFarmInfo.lendingPoolConfig.marketInfoAccount,
          isWritable: true,
          isSigner: false
        },
        {
          pubkey: targetFarmInfo.lendingPoolConfig["0"].lendingPoolInfoAccount,
          isWritable: true,
          isSigner: false
        },
        {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isWritable: false,
          isSigner: false
        }
      ],
      programId: targetFarmInfo.lendingPoolConfig.programId,
      data: Buffer.alloc(1, 12)
    });
  
    const updateLendingIx1 = new TransactionInstruction({
      keys: [
        {
          pubkey: targetFarmInfo.lendingPoolConfig.marketInfoAccount,
          isWritable: true,
          isSigner: false
        },
        {
          pubkey: targetFarmInfo.lendingPoolConfig["1"].lendingPoolInfoAccount,
          isWritable: true,
          isSigner: false
        },
        {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isWritable: false,
          isSigner: false
        }
      ],
      programId: targetFarmInfo.lendingPoolConfig.programId,
      data: Buffer.alloc(1, 12)
    });
  
    trx.add(updateLendingIx0, updateLendingIx1);
    // --- update lending pool info end ---
  
  
    if (!userInfoAccount) {
      userInfoAccount = await program.account.userInfo.associatedAddress(
        userPublicKey, targetFarmInfo.strategyAccount
      );
    }
  
    if (targetFarmInfo?.ammInfo?.doubleDipPool) {
      const doubleDipParams = farm.getOrcaDoubleDipUnstakeParams(targetFarmInfo);
      const doubleDipInstruction = program.instruction.doubleDipUnstakeFarmTkn(new BN(lpShares.toFixed(0)), doubleDipParams[0]);
      trx.add(doubleDipInstruction);
    }
  
    const upstakeLpParams = farm.getUnstakeLpParams(targetFarmInfo, userPublicKey, userInfoAccount, lyfType);
    const unstakeInstruction = program.instruction.unstakeLpWithType(
      {
        withdrawType,
        sharesAmount: new BN(lpShares.toFixed(0))
      },
      upstakeLpParams[0]
    );
    trx.add(unstakeInstruction);
    return trx;
  }
  
  async function swapAndWithdraw(
    connection: Connection,
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    withdrawType: number,
    configs: {
      currentUserInfoAccount: PublicKey;
    }
  ) {
    // create accounts if need
    const trxPre = new Transaction();
    const trx = new Transaction();
  
    const targetFarmInfo = farm.getConfig(pair, lyfType);
    if (!targetFarmInfo) {
      throw new Error(`no farm info for ${pair}`);
    }
    const program = farm.getProgram(lyfType);
  
    let userInfoAccount = configs.currentUserInfoAccount;
  
    if (!userInfoAccount) {
      userInfoAccount = await program.account.userInfo.associatedAddress(
        userPublicKey, targetFarmInfo.strategyAccount
      );
    }
  
    const parsedTokenAccounts = await getParsedTokenAccounts(connection, userPublicKey);
    let userTknAccount0 = parsedTokenAccounts[targetFarmInfo.tknMint0]?.tokenAccountAddress;
    let userTknAccount1 = parsedTokenAccounts[targetFarmInfo.tknMint1]?.tokenAccountAddress;
  
    // -------- FORMAT THE TOKENADDRESS, because getParsedTokenAccounts method NATIVE_MINT is SOL Balance
    if (isNativeMint(targetFarmInfo.tknMint0)) {
      userTknAccount0 = parsedTokenAccounts[NATIVE_MINT.toBase58()].tokenAccountAddress;
    } else if (isNativeMint(targetFarmInfo.tknMint1)) {
      userTknAccount1 = parsedTokenAccounts[NATIVE_MINT.toBase58()].tokenAccountAddress;
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
  
  
  
    const removeLiquidityParams = farm.getRemoveLiquidityParams(
      targetFarmInfo, userPublicKey, userInfoAccount, lyfType
    );
    const removeLiquidityInstruction = program.instruction.removeLiquidity(removeLiquidityParams[0]);
    trx.add(removeLiquidityInstruction);
  
    // stable
    if (lyfType === 'orca' && targetFarmInfo.protocolSubVersion === 2) {
      const ix1 = await program.instruction.beforeStableWithdraw(
        {
          withdrawType
        },
        {
          accounts: {
            userMainAccount: userPublicKey,
            userInfoAccount: userInfoAccount,
            strategyState: targetFarmInfo.strategyAccount,
            tokenProgramId: TOKEN_PROGRAM_ID,
            ammProgramId: targetFarmInfo.ammInfo.swapProgramId,
            swapPoolId: targetFarmInfo.ammInfo.swapPoolId,
            swapPoolAuthority: targetFarmInfo.ammInfo.swapPoolAuthority,
            swapPoolTkn0: targetFarmInfo.ammInfo.swapTknVault0,
            swapPoolTkn1: targetFarmInfo.ammInfo.swapTknVault1,
            swapPoolFeeTkn: targetFarmInfo.ammInfo.swapFeeAccount,
            lpMint: targetFarmInfo.ammInfo.lpMint
          }
        }
      );
  
      const swapAndWithdrawParams = farm.getSwapAndWithdrawParams(
        targetFarmInfo, userPublicKey, userInfoAccount,
        new PublicKey(userTknAccount0), new PublicKey(userTknAccount1), lyfType
      );
  
      const ix2 = await program.instruction.stableSwap(
        {
          withdrawType
        },
        ...swapAndWithdrawParams
      );
  
      const ix3 = await program.instruction.stableWithdraw({
        accounts: {
          userMainAccount: userPublicKey,
          userInfo: userInfoAccount,
          userTknAccount0: userTknAccount0,
          userTknAccount1: userTknAccount1,
          strategyState: targetFarmInfo.strategyAccount,
          strategyAuthority: targetFarmInfo.strategyAuthority,
          strategyTknAccount0: targetFarmInfo.strategyTknAccount0,
          strategyTknAccount1: targetFarmInfo.strategyTknAccount1,
          strategyLpTknAccount: targetFarmInfo.strategyLpTknAccount,
          tokenProgramId: TOKEN_PROGRAM_ID,
        }
      });
  
      trx.add(ix1, ix2, ix3);
  
      // Close WSOL Account
      if (isNativeMint(targetFarmInfo.tknMint0)) {
        trx.add(
          closeAccount({
            source: userTknAccount0,
            destination: userPublicKey,
            owner: userPublicKey
          })
        );
      } else if (isNativeMint(targetFarmInfo.tknMint1)) {
        trx.add(
          closeAccount({
            source: userTknAccount1,
            destination: userPublicKey,
            owner: userPublicKey
          })
        );
      }
  
    } else {
      const swapAndWithdrawParams = farm.getSwapAndWithdrawParams(
        targetFarmInfo, userPublicKey, userInfoAccount,
        new PublicKey(userTknAccount0), new PublicKey(userTknAccount1), lyfType
      );
      const swapAndWithdrawInstruction = await program.instruction.swapAndWithdraw(
        {
          withdrawType
        },
        ...swapAndWithdrawParams
      );
  
      const closeEmptyInstruction = await program.instruction.closeEmptyAccount({
        accounts: {
          userMainAccount: userPublicKey,
          userInfoAccount: userInfoAccount
        }
      });
  
      trx.add(swapAndWithdrawInstruction);
      trx.add(closeEmptyInstruction);
  
      // Close WSOL Account
      if (isNativeMint(targetFarmInfo.tknMint0)) {
        trx.add(
          closeAccount({
            source: userTknAccount0,
            destination: userPublicKey,
            owner: userPublicKey
          })
        );
      } else if (isNativeMint(targetFarmInfo.tknMint1)) {
        trx.add(
          closeAccount({
            source: userTknAccount1,
            destination: userPublicKey,
            owner: userPublicKey
          })
        );
      }
    }
  
    return {
      trx,
      trxPre
    };
  }
  
  async function autoRepay(
    connection: Connection,
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey
  ) {
    const trx = new Transaction();
    const targetFarmInfo = farm.getConfig(pair, lyfType);
    if (!targetFarmInfo) {
      throw new Error(`no farm info for ${pair}`);
    }
  
    const program = farm.getProgram(lyfType);

    const repayParams = farm.getRepayParams(targetFarmInfo, userPublicKey, lyfType);
    const repayBorrowedCoinInstruction = program.instruction.repayBorrowedCoin(repayParams[0]);
    const repayBorrowedPcInstruction = program.instruction.repayBorrowedPc(repayParams[0]);
  
    trx.add(repayBorrowedCoinInstruction, repayBorrowedPcInstruction);
  
    return trx;
  }
  
  async function withdrawLP(
    connection: Connection,
    pair: string,
    lyfType: string,
    userPublicKey: PublicKey,
    lpShares: BigNumber,
    configs: {
      withdrawType: number,
      currentUserInfoAccount: PublicKey
    }) {
    const trx1 = await unstakeLP(connection, pair, lyfType, userPublicKey, lpShares, configs.withdrawType, {
      currentUserInfoAccount: configs.currentUserInfoAccount
    });
    const { trx: trx2, trxPre } = await swapAndWithdraw(connection, pair, lyfType, userPublicKey, configs.withdrawType, {
      currentUserInfoAccount: configs.currentUserInfoAccount
    });
    const trx3 = await autoRepay(connection, pair, lyfType, userPublicKey);
  
    if (trxPre.instructions.length) {
      return [trxPre, trx1, trx2, trx3];
    }
    return [trx1, trx2, trx3];
  }
}


