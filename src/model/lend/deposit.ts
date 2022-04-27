import { Connection, Keypair, PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as BufferLayout from 'buffer-layout';
import { closeAccount, initializeAccount } from "@project-serum/serum/lib/token-instructions";
import { createAssociatedTokenAccount, getParsedTokenAccounts } from '../../utils/trx/token';
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { isNativeMint } from '../../utils/tools';
import { lendingPools, LendInfoItem } from '../../constants/lend/pools';
import { lendRewardInfo, LendRewardInfo } from '../../constants/lend/rewards';
import { findUserLendRewardAddress, loadLendRewardUserInfo } from "./utils";
import { ACCOUNT_LAYOUT } from "../../constants/price/layout";

const SYSTEM_PROGRAM_ID = SystemProgram.programId;

export async function deposit(
  connection: Connection,
  amount: number,
  pool: string,
  userPublicKey: PublicKey,
  configs?: {
    noRewards?: boolean
  }) {
  const targetLendInfo: LendInfoItem = lendingPools[pool];
  if (!targetLendInfo) {
    throw new Error(`no LEND info for ${pool}`);
  }
  const hasRewards = !configs?.noRewards;
  const collateraTokenMint = targetLendInfo.lendingPoolShareMint;
  const trx = new Transaction();

  const userParsedAccount = await getParsedTokenAccounts(connection, userPublicKey);
  let userTokenAccount = userParsedAccount[targetLendInfo.tokenMint.toBase58()]?.tokenAccountAddress;

  let newAccount: Keypair;

  // update lending pool info
  const updateLendingIx0 = new TransactionInstruction({
    keys: [
      {
        pubkey: targetLendInfo.marketInfoAccount,
        isWritable: true,
        isSigner: false
      },
      {
        pubkey: targetLendInfo.lendingPoolInfoAccount,
        isWritable: true,
        isSigner: false
      },
      {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isWritable: false,
        isSigner: false
      }
    ],
    programId: targetLendInfo.programId,
    data: Buffer.alloc(1, 12)
  });

  trx.add(updateLendingIx0);

  // WSOL
  if (isNativeMint(targetLendInfo.tokenMint)) {
    const rentExemptLamports =  await connection.getMinimumBalanceForRentExemption(ACCOUNT_LAYOUT.span);
    newAccount = Keypair.generate();
    trx.add(
      SystemProgram.createAccount({
        fromPubkey: userPublicKey,
        newAccountPubkey: newAccount.publicKey,
        lamports: amount + rentExemptLamports,
        space: ACCOUNT_LAYOUT.span,
        programId: TOKEN_PROGRAM_ID
      })
    );
    trx.add(
      initializeAccount({
        account: newAccount.publicKey,
        mint: NATIVE_MINT,
        owner: userPublicKey
      })
    );

    userTokenAccount = newAccount.publicKey.toBase58();
  }

  let userCollateralTokenAccount = userParsedAccount[collateraTokenMint.toBase58()]?.tokenAccountAddress;
  if (!userCollateralTokenAccount) {
    const pk = await createAssociatedTokenAccount(collateraTokenMint, userPublicKey, trx);
    userCollateralTokenAccount = pk.toBase58();
  }

  const keys = [
    { pubkey: userTokenAccount, isSigner: false, isWritable: true},
    { pubkey: userCollateralTokenAccount, isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.lendingPoolInfoAccount, isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.lendingPoolTknAccount, isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.lendingPoolShareMint, isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.marketInfoAccount, isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.lendingMarketAuthority, isSigner: false, isWritable: true},
    { pubkey: userPublicKey, isSigner: true, isWritable: true},
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false},
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}
  ];

  const commandDataLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    BufferLayout.nu64('tkn_amount')
  ]);

  let data = Buffer.alloc(1024);

  const encodeLength = commandDataLayout.encode(
    {
      instruction: 4, // InitSavingMarket instruction
      tkn_amount: amount
    },
    data
  );
  data = data.slice(0, encodeLength);

  trx.add(new TransactionInstruction({
    keys,
    programId: targetLendInfo.programId,
    data
  }));

  // WSOL
  if (isNativeMint(targetLendInfo.tokenMint)) {
    trx.add(
      closeAccount({
        source: newAccount.publicKey,
        destination: userPublicKey,
        owner: userPublicKey
      })
    );
  }

  if (hasRewards) {
    await lendWithReward(connection, 0, pool, userPublicKey, trx);
  }

  const signers = newAccount ? [newAccount] : null;

  // return send2TransactionsOneByOne(trx, lendRewardTrx, connection, wallet);
  return {
    trx,
    signers
  };
}

export async function lendWithReward(
  connection: Connection,
  amount: number,
  pool: string,
  userPublicKey: PublicKey,
  trx?: Transaction
) {
  const targetLendInfo: LendRewardInfo = lendRewardInfo[pool];
  if (!targetLendInfo) {
    throw new Error(`no LEND info for ${pool}`);
  }

  const userParsedAccount = await getParsedTokenAccounts(connection, userPublicKey);

  // stake token account
  // will check in lend.ts dont need to create here
  let userStakeTokenAccount = userParsedAccount[targetLendInfo.farmingPoolStakeTknMint.toBase58()]?.tokenAccountAddress;
  if (!userStakeTokenAccount) {
    const pk = await createAssociatedTokenAccount(targetLendInfo.farmingPoolStakeTknMint, userPublicKey);
    userStakeTokenAccount = pk.toBase58();
  }

  let userRewardsAccount = userParsedAccount[targetLendInfo.farmingPoolRewardsTknMint.toBase58()]?.tokenAccountAddress;
  if (!userRewardsAccount) {
    const pk = await createAssociatedTokenAccount(targetLendInfo.farmingPoolRewardsTknMint, userPublicKey, trx);
    userRewardsAccount = pk.toBase58();
  }

  // accountB for other reward, not now
  let userRewardsAccountB = userRewardsAccount;
  // if accountb not equal a
  if (targetLendInfo.farmingPoolRewardsTknMintB.toBase58() !== targetLendInfo.farmingPoolRewardsTknMint.toBase58()) {
    userRewardsAccountB = userParsedAccount[targetLendInfo.farmingPoolRewardsTknMintB.toBase58()]?.tokenAccountAddress;
    if (!userRewardsAccountB) {
      const pk = await createAssociatedTokenAccount(targetLendInfo.farmingPoolRewardsTknMintB, userPublicKey, trx);
      userRewardsAccountB = pk.toBase58();
    }
  }


  const userFarmInfoPublicKey = await findUserLendRewardAddress(
    userPublicKey,
    new PublicKey(userStakeTokenAccount),
    targetLendInfo.farmingPoolAccount,
    targetLendInfo.programId
  );

  try {
    await loadLendRewardUserInfo(connection, userFarmInfoPublicKey, targetLendInfo.programId);
  } catch (err) {
    // console.log('loadUserInfo Error', err);
    // if not exist, create
    const infokeys = [
      {pubkey: userPublicKey, isWritable: true, isSigner: true},
      {pubkey: userFarmInfoPublicKey, isWritable: true, isSigner: false},
      {pubkey: targetLendInfo.farmingPoolAccount, isWritable: true, isSigner: false},
      {pubkey: new PublicKey(userStakeTokenAccount), isWritable: true, isSigner: false},
      {pubkey: new PublicKey(userRewardsAccount), isWritable: true, isSigner: false},
      {pubkey: new PublicKey(userRewardsAccountB), isWritable: true, isSigner: false},
      {pubkey: SYSTEM_PROGRAM_ID, isWritable: false, isSigner: false},
      {pubkey: SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false}
    ];
    const infoCommandDataLayout = BufferLayout.struct([
      BufferLayout.u8('instruction')
    ]);
    let infodata = Buffer.alloc(1024);
    const encodeLength = infoCommandDataLayout.encode(
      {
        instruction: 1
      },
      infodata
    );
    infodata = infodata.slice(0, encodeLength);
    trx.add(new TransactionInstruction({
      keys: infokeys,
      programId: targetLendInfo.programId,
      data: infodata
    }));
  }

  const keys = [
    {pubkey: userPublicKey, isWritable: true, isSigner: true},
    {pubkey: userFarmInfoPublicKey , isWritable: true, isSigner: false},
    {pubkey: new PublicKey(userStakeTokenAccount), isWritable: true, isSigner: false},
    {pubkey: new PublicKey(userRewardsAccount), isWritable: true, isSigner: false},
    {pubkey: new PublicKey(userRewardsAccountB), isWritable: true, isSigner: false},
    {pubkey: targetLendInfo.farmingPoolAccount, isWritable: true, isSigner: false},
    {pubkey: targetLendInfo.farmingPoolAuthority, isWritable: true, isSigner: false},
    {pubkey: targetLendInfo.farmingPoolStakeTknAccount, isWritable: true, isSigner: false},
    {pubkey: targetLendInfo.farmingPoolRewardsTknAccount, isWritable: true, isSigner: false},
    {pubkey: targetLendInfo.farmingPoolRewardsTknAccountB, isWritable: true, isSigner: false},
    {pubkey: TOKEN_PROGRAM_ID, isWritable: false, isSigner: false},
    {pubkey: SYSVAR_CLOCK_PUBKEY, isWritable: false, isSigner: false}
  ];

  const commandDataLayout = BufferLayout.struct([
    BufferLayout.u8('instruction'),
    BufferLayout.nu64('amount')
  ]);

  let data = Buffer.alloc(1024);
  const encodeLength = commandDataLayout.encode(
    {
      instruction: 3,
      amount
    },
    data
  );
  data = data.slice(0, encodeLength);

  trx.add(new TransactionInstruction({
    keys,
    programId: targetLendInfo.programId,
    data
  }));

  return trx;
}
