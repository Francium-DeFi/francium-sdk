import { BN } from "@project-serum/anchor";
import { ComputeBudgetProgram, Connection, PublicKey, SYSVAR_CLOCK_PUBKEY, Transaction } from "@solana/web3.js";
import { createAssociatedTokenAccount, getParsedTokenAccounts } from "../../utils/trx/token";
import FranciumAutoVaults from ".";
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { LendingInfo } from "../../constants/auto/raydium";
import { isNativeMint } from "../../utils/tools";

export default async function withdrawAuto(
  connection: Connection,
  pair: string,
  lyfType: string,
  userPublicKey: PublicKey,
  hub: FranciumAutoVaults,
  configs: {
    shareAmount: BN;
    userPositionPublicKey: PublicKey
  }
) {
  const program = hub.getProgram(lyfType);
  const pubkeyConfig = hub.getConfig(pair, lyfType);
  const trx1 = new Transaction();
  const trx2 = new Transaction();
  const trx3 = new Transaction();
  const userPositionInfo = configs?.userPositionPublicKey;
  const parsedTokenAccounts = await getParsedTokenAccounts(connection, userPublicKey);
  let userTknAccount0 = parsedTokenAccounts[pubkeyConfig.tknMint0]?.tokenAccountAddress;
  let userTknAccount1 = parsedTokenAccounts[pubkeyConfig.tknMint1]?.tokenAccountAddress;

  const additionalComputeBudgetInstruction = ComputeBudgetProgram.setComputeUnitLimit({
    units: 800000
  });

  async function buildAccounts() {
    // -------- FORMAT THE TOKENADDRESS, because getParsedTokenAccounts method NATIVE_MINT is SOL Balance
    if (isNativeMint(new PublicKey(pubkeyConfig.tknMint0))) {
      userTknAccount0 = parsedTokenAccounts[NATIVE_MINT.toBase58()]?.tokenAccountAddress;
    } else if (isNativeMint(new PublicKey(pubkeyConfig.tknMint1))) {
      userTknAccount1 = parsedTokenAccounts[NATIVE_MINT.toBase58()]?.tokenAccountAddress;
    } else {
      // not include SOL
    }
    // -------- FORMAT THE TOKENADDRESS END
    if (!userTknAccount0) {
      userTknAccount0 = (await createAssociatedTokenAccount(new PublicKey(pubkeyConfig.tknMint0), userPublicKey, trx1)).toBase58();
    }
    if (!userTknAccount1) {
      userTknAccount1 = (await createAssociatedTokenAccount(new PublicKey(pubkeyConfig.tknMint1), userPublicKey, trx1)).toBase58();
    }
  }

  await buildAccounts();

  const ix0 = await program.methods
    .preWithdraw(
      configs.shareAmount,
    ).accounts(
      {
        userMainAccount: userPublicKey,
        userPositionInfo: userPositionInfo,
        poolInfo: new PublicKey(pubkeyConfig.poolInfoAccount),
        poolAuthority: new PublicKey(pubkeyConfig.poolAuthority),
        userTokenAccount0: userTknAccount0,
        userTokenAccount1: userTknAccount1,
        poolTokenAccount0: new PublicKey(pubkeyConfig.poolTknAccount0),
        poolTokenAccount1: new PublicKey(pubkeyConfig.poolTknAccount1),
        tokenProgramId: TOKEN_PROGRAM_ID,
        lendingProgramId: new PublicKey(LendingInfo.programId),
        lendingMarket: new PublicKey(LendingInfo.marketInfoAccount),
        lendingPoolInfoAccount0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolInfoAccount),
        lendingPoolInfoAccount1: new PublicKey(pubkeyConfig.lendingPool1.lendingPoolInfoAccount),
        ammId: new PublicKey(pubkeyConfig.ammId),
        ammOpenOrders: new PublicKey(pubkeyConfig.ammOpenOrders),
        ammTknAccount0: new PublicKey(pubkeyConfig.ammPcAccount),
        ammTknAccount1: new PublicKey(pubkeyConfig.ammCoinAccount),
        lpMintAccount: new PublicKey(pubkeyConfig.lpMint),
      }
    ).instruction();

  const ix1 = await program.methods
    .userUnStakeLp().accounts(
      {
        userMainAccount: userPublicKey,
        userPositionInfo: userPositionInfo,
        poolInfo: new PublicKey(pubkeyConfig.poolInfoAccount),
        poolAuthority: new PublicKey(pubkeyConfig.poolAuthority),
        userTokenAccount0: userTknAccount0,
        userTokenAccount1: userTknAccount1,
        poolTokenAccount0: new PublicKey(pubkeyConfig.poolTknAccount0),
        poolTokenAccount1: new PublicKey(pubkeyConfig.poolTknAccount1),
        poolLpAccount: new PublicKey(pubkeyConfig.poolLpAccount),
        poolRewardTknAccount: new PublicKey(pubkeyConfig.poolRewardsTokenAccount),
        poolRewardTknAccountB: new PublicKey(pubkeyConfig.poolRewardsTokenAccountB),
        poolFarmInfo: new PublicKey(pubkeyConfig.poolFarmInfo),
        tokenProgramId: TOKEN_PROGRAM_ID,
        stakingProgramId: new PublicKey(pubkeyConfig.stakePoolProgramId),
        stakingPoolId: new PublicKey(pubkeyConfig.stakePoolId),
        stakingPoolAuthority: new PublicKey(pubkeyConfig.stakePoolAuthority),
        stakingPoolLpAccount: new PublicKey(pubkeyConfig.stakePoolLpAccount),
        stakingPoolRewardsTknAccount: new PublicKey(pubkeyConfig.stakePoolRewardAccount),
        stakingPoolRewardsTknAccountB: new PublicKey(pubkeyConfig.stakePoolRewardAccountB),
        systemClock: SYSVAR_CLOCK_PUBKEY,
      }
    ).instruction();

  const ix2 = await program.methods
    .userSwapAndWithdraw().accounts(
      {
        userMainAccount: userPublicKey,
        userPositionInfo: userPositionInfo,
        poolInfo: new PublicKey(pubkeyConfig.poolInfoAccount),
        poolAuthority: new PublicKey(pubkeyConfig.poolAuthority),
        userTokenAccount0: userTknAccount0,
        userTokenAccount1: userTknAccount1,
        poolTokenAccount0: new PublicKey(pubkeyConfig.poolTknAccount0),
        poolTokenAccount1: new PublicKey(pubkeyConfig.poolTknAccount1),
        poolLpAccount: new PublicKey(pubkeyConfig.poolLpAccount),
        tokenProgramId: TOKEN_PROGRAM_ID,
        lendingProgramId: new PublicKey(LendingInfo.programId),
        lendingMarket: new PublicKey(LendingInfo.marketInfoAccount),
        lendingPoolInfoAccount0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolInfoAccount),
        lendingPoolInfoAccount1: new PublicKey(pubkeyConfig.lendingPool1.lendingPoolInfoAccount),
        ammProgramId: new PublicKey(pubkeyConfig.raydiumProgramId),
        ammId: new PublicKey(pubkeyConfig.ammId),
        ammAuthority: new PublicKey(pubkeyConfig.ammAuthority),
        ammOpenOrders: new PublicKey(pubkeyConfig.ammOpenOrders),
        ammTargetOrders: new PublicKey(pubkeyConfig.ammTargetOrders),
        ammTknAccount0: new PublicKey(pubkeyConfig.ammPcAccount),
        ammTknAccount1: new PublicKey(pubkeyConfig.ammCoinAccount),
        lpMintAccount: new PublicKey(pubkeyConfig.lpMint),
        ammWithdrawQueue: new PublicKey(pubkeyConfig.poolWithdrawQueue),
        ammPoolTempLpAccount: new PublicKey(pubkeyConfig.poolTempLpTokenAccount),
        serumProgramId: new PublicKey(pubkeyConfig.serumProgramId),
        serumMarketId: new PublicKey(pubkeyConfig.serumMarketId),
        serumTknVault1: new PublicKey(pubkeyConfig.serumCoinVault),
        serumTknVault0: new PublicKey(pubkeyConfig.serumPCVault),
        serumVaultSinger: new PublicKey(pubkeyConfig.serumVaultSigner),
        serumEventQ: new PublicKey(pubkeyConfig.serumEventQueue),
        serumBid: new PublicKey(pubkeyConfig.serumBids),
        serumAsk: new PublicKey(pubkeyConfig.serumAsks),
      }
    ).instruction();

  const ix3 = await program.methods
    .repay().accounts({
      userMainAccount: userPublicKey,
      poolInfo: new PublicKey(pubkeyConfig.poolInfoAccount),
      poolAuthority: new PublicKey(pubkeyConfig.poolAuthority),
      poolTokenAccount0: new PublicKey(pubkeyConfig.poolTknAccount0),
      poolTokenAccount1: new PublicKey(pubkeyConfig.poolTknAccount1),

      poolCreditAccount0: new PublicKey(pubkeyConfig.poolBorrowingCreditTokenAccount0),
      poolCreditAccount1: new PublicKey(pubkeyConfig.poolBorrowingCreditTokenAccount1),


      lendingProgramId: new PublicKey(LendingInfo.programId),
      lendingMarket: new PublicKey(LendingInfo.marketInfoAccount),
      lendingMarketAuthority: new PublicKey(LendingInfo.marketAuthority),
      lendingPoolInfoAccount0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolInfoAccount),
      lendingPoolTknAccount0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolTknAccount),
      lendingPoolCreditMint0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolCreditMint),
      lendingPoolCreditAccount0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolCreditAccount),
      lendingPoolInfoAccount1: new PublicKey(pubkeyConfig.lendingPool1.lendingPoolInfoAccount),
      lendingPoolTknAccount1: new PublicKey(pubkeyConfig.lendingPool1.lendingPoolTknAccount),
      lendingPoolCreditMint1: new PublicKey(pubkeyConfig.lendingPool1.lendingPoolCreditMint),
      lendingPoolCreditAccount1: new PublicKey(pubkeyConfig.lendingPool1.lendingPoolCreditAccount),

      tokenProgramId: TOKEN_PROGRAM_ID,
      systemClock: SYSVAR_CLOCK_PUBKEY,
    }).instruction();

  const closeIx = await program.methods
    .closeEmptyAccount()
    .accounts(
      {
        userMainAccount: userPublicKey,
        userPositionInfo: userPositionInfo,
      }
    ).instruction();

  trx1.add(ix0, ix1);
  trx2.add(additionalComputeBudgetInstruction, ix2);
  trx3.add(ix3, closeIx);

  return [trx1, trx2, trx3];
}