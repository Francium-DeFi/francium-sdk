import { BN } from "@project-serum/anchor";
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey, SYSVAR_CLOCK_PUBKEY, Transaction, TransactionInstruction } from "@solana/web3.js";
import { isNativeMint, transferToWSOL } from "../../utils/tools";
import { FranciumFarm } from ".";
import { createAssociatedTokenAccount, getParsedTokenAccounts } from "../../utils/trx/token";

// if SOL
export async function buildRepayTransactions(
  connection: Connection,
  pair: string,
  lyfType: string,
  userPublicKey: PublicKey,
  farm: FranciumFarm,
  configs: {
    amount0: BN;
    amount1: BN;
    currentUserInfoAccount: PublicKey;
  }
) {
  const trx = new Transaction();
  const targetFarmInfo = farm.getConfig(pair, lyfType);
  const program = farm.getProgram(lyfType);

  // let userInfoAddress = await program.account.userInfo.associatedAddress(
  //     userMainAccount.publicKey,
  //     targetFarmInfo.strategyAccount,
  // )

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
    userTknAccount0 = (await createAssociatedTokenAccount(targetFarmInfo.tknMint0, userPublicKey, trx)).toBase58();
  }
  if (!userTknAccount1) {
    userTknAccount1 = (await createAssociatedTokenAccount(targetFarmInfo.tknMint1, userPublicKey, trx)).toBase58();
  }


  const ix_lending_update_0 = new TransactionInstruction({
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
      },
    ],
    programId: targetFarmInfo.lendingPoolConfig.programId,
    data: Buffer.alloc(1, 12),
  });

  const ix_lending_update_1 = new TransactionInstruction({
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
      },
    ],
    programId: targetFarmInfo.lendingPoolConfig.programId,
    data: Buffer.alloc(1, 12),
  });

  trx.add(ix_lending_update_0, ix_lending_update_1);

  if (configs.amount0.gtn(0)) {
    if (isNativeMint(targetFarmInfo.tknMint0)) {
      const instructions = transferToWSOL(configs.amount0, new PublicKey(userTknAccount0), userPublicKey);
      trx.add(...instructions);
    }
    const ix_user_repay0 = await program.instruction.userRepay(
      {
        repaySide: 0, // 0: repay tkn_0, 1: repay tkn_1
        repayAmount: configs.amount0
      },
      {
        accounts: {
          userMainAccount: userPublicKey,
          userInfoAccount: configs.currentUserInfoAccount,
          userTknAccount0: userTknAccount0,
          userTknAccount1: userTknAccount1,
          strategyState: targetFarmInfo.strategyAccount,
          strategyTknAccount0: targetFarmInfo.strategyTknAccount0,
          strategyTknAccount1: targetFarmInfo.strategyTknAccount1,
          lendingPoolInfoAccount0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolInfoAccount,
          lendingPoolInfoAccount1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolInfoAccount,
          tokenProgramId: TOKEN_PROGRAM_ID
        }
      }
    );
    trx.add(ix_user_repay0);
  }

  if (configs.amount1.gtn(0)) {
    if (isNativeMint(targetFarmInfo.tknMint1)) {
      const instructions = transferToWSOL(configs.amount1, new PublicKey(userTknAccount1), userPublicKey);
      trx.add(...instructions);
    }
    const ix_user_repay1 = await program.instruction.userRepay(
      {
        repaySide: 1, // 0: repay tkn_0, 1: repay tkn_1
        repayAmount: configs.amount1
      },
      {
        accounts: {
          userMainAccount: userPublicKey,
          userInfoAccount: configs.currentUserInfoAccount,
          userTknAccount0: userTknAccount0,
          userTknAccount1: userTknAccount1,
          strategyState: targetFarmInfo.strategyAccount,
          strategyTknAccount0: targetFarmInfo.strategyTknAccount0,
          strategyTknAccount1: targetFarmInfo.strategyTknAccount1,
          lendingPoolInfoAccount0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolInfoAccount,
          lendingPoolInfoAccount1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolInfoAccount,
          tokenProgramId: TOKEN_PROGRAM_ID
        }
      }
    );
    trx.add(ix_user_repay1);
  }

  const ix_repay_borrowed_coin = program.instruction.repayBorrowedCoin(
    {
      accounts: {
        userMainAccount: userPublicKey,
        strategyState: targetFarmInfo.strategyAccount,
        strategyAuthority: targetFarmInfo.strategyAuthority,
        strategyTknAccount0: targetFarmInfo.strategyTknAccount0,
        strategyTknAccount1: targetFarmInfo.strategyTknAccount1,
        lendingMarketAccount: targetFarmInfo.lendingPoolConfig.marketInfoAccount,
        lendingMarketAuthorityInfo: targetFarmInfo.lendingPoolConfig.marketAuthority,
        lendingPoolProgramId: targetFarmInfo.lendingPoolConfig.programId,
        lendingPoolInfoAccount0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolInfoAccount,
        lendingPoolTknAccount0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolTknAccount,
        lendingPoolCreditMint0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolCreditMint,
        lendingPoolCreditAccount0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolCreditAccount,
        strategyCreditAccount0: targetFarmInfo.strategyBorrowCreditAccount0,
        lendingPoolInfoAccount1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolInfoAccount,
        lendingPoolTknAccount1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolTknAccount,
        lendingPoolCreditMint1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolCreditMint,
        lendingPoolCreditAccount1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolCreditAccount,
        strategyCreditAccount1: targetFarmInfo.strategyBorrowCreditAccount1,
        tokenProgramId: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY,
      }
    }
  );

  const ix_repay_borrowed_pc = program.instruction.repayBorrowedPc(
    {
      accounts: {
        userMainAccount: userPublicKey,
        strategyState: targetFarmInfo.strategyAccount,
        strategyAuthority: targetFarmInfo.strategyAuthority,
        strategyTknAccount0: targetFarmInfo.strategyTknAccount0,
        strategyTknAccount1: targetFarmInfo.strategyTknAccount1,
        lendingMarketAccount: targetFarmInfo.lendingPoolConfig.marketInfoAccount,
        lendingMarketAuthorityInfo: targetFarmInfo.lendingPoolConfig.marketAuthority,
        lendingPoolProgramId: targetFarmInfo.lendingPoolConfig.programId,
        lendingPoolInfoAccount0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolInfoAccount,
        lendingPoolTknAccount0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolTknAccount,
        lendingPoolCreditMint0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolCreditMint,
        lendingPoolCreditAccount0: targetFarmInfo.lendingPoolConfig["0"].lendingPoolCreditAccount,
        strategyCreditAccount0: targetFarmInfo.strategyBorrowCreditAccount0,
        lendingPoolInfoAccount1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolInfoAccount,
        lendingPoolTknAccount1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolTknAccount,
        lendingPoolCreditMint1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolCreditMint,
        lendingPoolCreditAccount1: targetFarmInfo.lendingPoolConfig["1"].lendingPoolCreditAccount,
        strategyCreditAccount1: targetFarmInfo.strategyBorrowCreditAccount1,
        tokenProgramId: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY,
      }
    }
  );

  trx.add(ix_repay_borrowed_coin, ix_repay_borrowed_pc);
  return trx;
}