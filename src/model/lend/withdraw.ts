import { Connection, Keypair, PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, Transaction, TransactionInstruction } from "@solana/web3.js";
import { lendingPools, LendInfoItem } from '../../constants/lend/pools';
import { lendRewardInfo, LendRewardInfo } from '../../constants/lend/rewards';
import * as BufferLayout from 'buffer-layout';
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { isNativeMint } from '../../utils/tools';
import { createAssociatedTokenAccount, getParsedTokenAccounts } from '../../utils/trx/token';
import { closeAccount, initializeAccount } from "@project-serum/serum/lib/token-instructions";
import { ACCOUNT_LAYOUT } from "../../constants/price/layout";
import { loadLendRewardUserInfo } from "./utils";

export async function withdraw(
  connection: Connection,
  rewardAmount: number,
  tokenAmount: number,
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
        lamports: rentExemptLamports,
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

  if (!userTokenAccount) {
    const pk = await createAssociatedTokenAccount(targetLendInfo.tokenMint, userPublicKey, trx);
    userTokenAccount = pk.toBase58();
  }

  let userCollateralTokenAccount = userParsedAccount[collateraTokenMint.toBase58()]?.tokenAccountAddress;
  if (!userCollateralTokenAccount) {
    const pk = await createAssociatedTokenAccount(collateraTokenMint, userPublicKey, trx);
    userCollateralTokenAccount = pk.toBase58();
  }

  if (hasRewards) {
    // userCollateralTokenAccount is equal to rewards: farmingPoolStakeTknMint
    await unstakeReward(connection, rewardAmount, pool, userPublicKey, trx, {
      userCollateralTokenAccount
    });
  }

  const keys = [
    { pubkey: new PublicKey(userCollateralTokenAccount), isSigner: false, isWritable: true},
    { pubkey: new PublicKey(userTokenAccount), isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.lendingPoolInfoAccount, isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.lendingPoolShareMint, isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.lendingPoolTknAccount, isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.marketInfoAccount, isSigner: false, isWritable: true},
    { pubkey: targetLendInfo.lendingMarketAuthority, isSigner: false, isWritable: true},
    { pubkey: userPublicKey, isSigner: true, isWritable: true},
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false},
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}
  ];

  const commandDataLayout = BufferLayout.struct([
    BufferLayout.u8('instruction'),
    BufferLayout.nu64('tkn_amount')
  ]);

  let data = Buffer.alloc(1024);
  const encodeLength = commandDataLayout.encode(
    {
      instruction: 5, // InitSavingMarket instruction
      tkn_amount: rewardAmount + tokenAmount
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

  const signers = newAccount ? [newAccount] : null;

  return {
    trx,
    signers
  };
}

export async function unstakeReward(
  connection: Connection,
  amount: number,
  pool: string,
  userPublicKey: PublicKey,
  trx?: Transaction,
  configs?: {
    userCollateralTokenAccount?: string | PublicKey
  }
) {
  const targetLendInfo: LendRewardInfo = lendRewardInfo[pool];
  if (!targetLendInfo) {
    throw new Error(`no LEND Reward info for ${pool}`);
  }
  const userParsedAccount = await getParsedTokenAccounts(connection, userPublicKey);

  // stake token account
  let userStakeTokenAccount;
  if (configs?.userCollateralTokenAccount) {
    userStakeTokenAccount = configs?.userCollateralTokenAccount;
  } else {
    let userStakeTokenAccount = userParsedAccount[targetLendInfo.farmingPoolStakeTknMint.toBase58()]?.tokenAccountAddress;
    if (!userStakeTokenAccount) {
      const pk = await createAssociatedTokenAccount(targetLendInfo.farmingPoolStakeTknMint, userPublicKey, trx);
      userStakeTokenAccount = pk.toBase58();
    }
  }

  let userRewardsAccount = userParsedAccount[targetLendInfo.farmingPoolRewardsTknMint.toBase58()]?.tokenAccountAddress;
  if (!userRewardsAccount) {
    const pk = await createAssociatedTokenAccount(targetLendInfo.farmingPoolRewardsTknMint, userPublicKey, trx);
    userRewardsAccount = pk.toBase58();
  }

  const userRewardsAccountB = userRewardsAccount;

  const [userFarmInfoPublicKey, nonce] = await PublicKey.findProgramAddress([
    userPublicKey.toBuffer(),
    targetLendInfo.farmingPoolAccount.toBuffer(),
    new PublicKey(userStakeTokenAccount).toBuffer()
  ], targetLendInfo.programId);

  const userInfo = await loadLendRewardUserInfo(
    connection,
    userFarmInfoPublicKey,
    targetLendInfo.programId
  );
  // console.log(userInfo);

  let realAmount = amount;
  if (amount > userInfo?.staked_amount) {
    realAmount = (userInfo?.staked_amount || 0);
  }

  const keys = [
    {pubkey: userPublicKey, isWritable: true, isSigner: true},
    {pubkey: userFarmInfoPublicKey, isWritable: true, isSigner: false},
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
      instruction: 4,
      amount: realAmount
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
