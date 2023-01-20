import { ComputeBudgetProgram, Connection, PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, Transaction } from "@solana/web3.js";
import { createAssociatedTokenAccount, getParsedTokenAccounts } from "../../utils/trx/token";
import FranciumAutoVaults from ".";
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { findUserPositionInfoPDA } from "./utils";
import { LendingInfo, MarketInfo } from "../../constants/auto/raydium";
import { BN } from "@project-serum/anchor";
import { isNativeMint } from "../../utils/tools";

export default async function depositAuto(
  connection: Connection,
  pair: string,
  lyfType: string,
  userPublicKey: PublicKey,
  hub: FranciumAutoVaults,
  configs: {
    amount0: BN;
    amount1?: BN;
    userPositionPublicKey?: PublicKey
  }
) {

  const program = hub.getProgram(lyfType);
  const pubkeyConfig = hub.getConfig(pair, lyfType);

  const trx0 = new Transaction();
  const trx1 = new Transaction();
  const trx2 = new Transaction();
  const trx3 = new Transaction();
  const trx4 = new Transaction();
  let userPositionInfo = configs?.userPositionPublicKey;
  const parsedTokenAccounts = await getParsedTokenAccounts(connection, userPublicKey);
  let userTknAccount0 = parsedTokenAccounts[pubkeyConfig.tknMint0]?.tokenAccountAddress;
  let userTknAccount1 = parsedTokenAccounts[pubkeyConfig.tknMint1]?.tokenAccountAddress;

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
      userTknAccount0 = (await createAssociatedTokenAccount(new PublicKey(pubkeyConfig.tknMint0), userPublicKey, trx0)).toBase58();
    }
    if (!userTknAccount1) {
      userTknAccount1 = (await createAssociatedTokenAccount(new PublicKey(pubkeyConfig.tknMint1), userPublicKey, trx0)).toBase58();
    }

    if (!userPositionInfo) {
      const nonce = new BN(Math.trunc(Date.now() / 1000));
      const poolInfoAccount = new PublicKey(pubkeyConfig.poolInfoAccount);

      const [user, bump] = await findUserPositionInfoPDA(
        poolInfoAccount,
        userPublicKey,
        nonce
      );
      userPositionInfo = user;
      const ix = await program.methods
        .initUserPosition(
          nonce,
        ).accounts(
          {
            userMainAccount: userPublicKey,
            marketInfo: new PublicKey(MarketInfo.MarketInfoAccount),
            poolInfo: poolInfoAccount,
            userPositionInfo: userPositionInfo,
            systemProgram: SystemProgram.programId,
          }
        ).instruction();
      trx0.add(ix);
    }
  }

  await buildAccounts();

  const additionalComputeBudgetInstruction = ComputeBudgetProgram.setComputeUnitLimit({
    units: 800000
  });

  // deposit
  const depositIx = await program.methods
    .preDeposit(
      configs.amount0,
      configs.amount1 || new BN(0)
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
        poolLpAccount: new PublicKey(pubkeyConfig.poolLpAccount),
        tokenProgramId: TOKEN_PROGRAM_ID,
        // lendingProgramId: new PublicKey(LendingInfo.programId),
        // lendingMarket: new PublicKey(LendingInfo.marketInfoAccount),
        // lendingPoolInfoAccount0: new PublicKey(pubkeyConfig["lendingPool0"]["lendingPoolInfoAccount"]),
        // lendingPoolInfoAccount1:new PublicKey(pubkeyConfig["lendingPool1"]["lendingPoolInfoAccount"]),
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

  trx1.add(additionalComputeBudgetInstruction, depositIx);

  async function buildNewInvest() {
    const ix0 = await program.methods.userBorrow().accounts(
      {
        userMainAccount: userPublicKey,
        userPositionInfo: userPositionInfo,
        poolInfo: new PublicKey(pubkeyConfig.poolInfoAccount),
        poolAuthority: new PublicKey(pubkeyConfig.poolAuthority),
        userTokenAccount0: userTknAccount0,
        userTokenAccount1: userTknAccount1,
        poolTokenAccount0: new PublicKey(pubkeyConfig.poolTknAccount0),
        poolTokenAccount1: new PublicKey(pubkeyConfig.poolTknAccount1),

        poolCreditAccount0: new PublicKey(pubkeyConfig.poolBorrowingCreditTokenAccount0),
        poolCreditAccount1: new PublicKey(pubkeyConfig.poolBorrowingCreditTokenAccount1),

        tokenProgramId: TOKEN_PROGRAM_ID,

        lendingProgramId: new PublicKey(LendingInfo.programId),
        lendingMarket: new PublicKey(LendingInfo.marketInfoAccount),
        lendingMarketAuthority: new PublicKey(LendingInfo.marketAuthority),
        lendingPoolInfoAccount0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolInfoAccount),
        lendingPoolTknAccount0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolTknAccount),
        lendingPoolCreditAccount0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolCreditAccount),
        lendingPoolInfoAccount1: new PublicKey(pubkeyConfig.lendingPool1.lendingPoolInfoAccount),
        lendingPoolTknAccount1: new PublicKey(pubkeyConfig.lendingPool1.lendingPoolTknAccount),
        lendingPoolCreditAccount1: new PublicKey(pubkeyConfig.lendingPool1.lendingPoolCreditAccount),
        systemClock: SYSVAR_CLOCK_PUBKEY,
      }
    ).instruction();

    const ix1 = await program.methods.userAddLiquidity().accounts(
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
        // lendingProgramId: new PublicKey(LendingInfo.programId),
        // lendingMarket: new PublicKey(LendingInfo.marketInfoAccount),
        // lendingPoolInfoAccount0: new PublicKey(pubkeyConfig["lendingPool0"]["lendingPoolInfoAccount"]),
        // lendingPoolInfoAccount1:new PublicKey(pubkeyConfig["lendingPool1"]["lendingPoolInfoAccount"]),
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

    const ix2 = await program.methods.finishDeposit().accounts(
      {
        userMainAccount:  userPublicKey,
        userPositionInfo: userPositionInfo,
        poolInfo: new PublicKey(pubkeyConfig.poolInfoAccount),
        poolAuthority: new PublicKey(pubkeyConfig.poolAuthority),
        poolTokenAccount0: new PublicKey(pubkeyConfig.poolTknAccount0),
        poolTokenAccount1: new PublicKey(pubkeyConfig.poolTknAccount1),
        poolLpAccount: new PublicKey(pubkeyConfig.poolLpAccount),
        poolRewardsTokenAccount: new PublicKey(pubkeyConfig.poolRewardsTokenAccount),
        poolRewardsTokenAccountB: new PublicKey(pubkeyConfig.poolRewardsTokenAccountB),
        poolFarmInfo: new PublicKey(pubkeyConfig.poolFarmInfo),
        tokenProgramId: TOKEN_PROGRAM_ID,
        lendingProgramId: new PublicKey(LendingInfo.programId),
        lendingMarket: new PublicKey(LendingInfo.marketInfoAccount),
        lendingPoolInfoAccount0: new PublicKey(pubkeyConfig.lendingPool0.lendingPoolInfoAccount),
        lendingPoolInfoAccount1:new PublicKey(pubkeyConfig.lendingPool1.lendingPoolInfoAccount),
        stakingProgramId: new PublicKey(pubkeyConfig.stakePoolProgramId),
        stakingPoolId: new PublicKey(pubkeyConfig.stakePoolId),
        stakingPoolAuthority: new PublicKey(pubkeyConfig.stakePoolAuthority),
        stakingPoolLpAccount: new PublicKey(pubkeyConfig.stakePoolLpAccount),
        stakingPoolRewardsTknAccount: new PublicKey(pubkeyConfig.stakePoolRewardAccount),
        stakingPoolRewardsTknAccountB: new PublicKey(pubkeyConfig.stakePoolRewardAccountB),
        systemClock: SYSVAR_CLOCK_PUBKEY,
        ammId: new PublicKey(pubkeyConfig.ammId),
        ammOpenOrders: new PublicKey(pubkeyConfig.ammOpenOrders),
        ammTknAccount0: new PublicKey(pubkeyConfig.ammPcAccount),
        ammTknAccount1: new PublicKey(pubkeyConfig.ammCoinAccount),
        lpMintAccount: new PublicKey(pubkeyConfig.lpMint),
      }
    ).instruction();

    trx2.add(additionalComputeBudgetInstruction, ix0);
    trx3.add(ix1);
    trx4.add(ix2);
  }

  await buildNewInvest();

  return [trx0, trx1, trx2, trx3, trx4];
}