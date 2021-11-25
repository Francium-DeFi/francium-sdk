import { Connection, PublicKey } from '@solana/web3.js';
import * as BN from 'bn.js';
import { LendingPoolLayout, lendingPools } from '../../constants/lend/pools';

export async function getLendingPoolInfo(
  connection: Connection, pools: { pool: string, scale?: number }[] = []
) {
  const lendingPoolPublicKeyList = pools.map(i => {
    const info = lendingPools[i.pool];
    return info?.lendingPoolInfoAccount;
  });

  const accountInfos = await connection.getMultipleAccountsInfo(lendingPoolPublicKeyList);
  const formatResults = accountInfos.map((accountInfo, index) => {
    const buf = Buffer.from(accountInfo.data);
    const decodeData = LendingPoolLayout.decode(buf);
    const avaliableAmount = new BN(decodeData.liquidity_available_amount);
    const borrowedAmount = new BN(decodeData.liquidity_borrowed_amount_wads, 'le').div(new BN(10).pow(new BN(18)));
    const totalShareMintSupply = new BN(decodeData.share_mint_total_supply, 'le');
    const totalAmount = avaliableAmount.add(borrowedAmount);
    const utilization = totalAmount.gtn(0) ? borrowedAmount.div(totalAmount).toNumber() : 0;

    // let borrowingRate = 0 + 0.25 * utilization;
    // if (utilization > 0.6 && utilization < 0.9) {
    //   borrowingRate = 0.15 + 0.25 * (utilization - 0.6);
    // } else if (utilization >= 0.9) {
    //   borrowingRate = 0.225 + 13 * (utilization - 0.9);
    // }

    // const apr = borrowingRate * 100 * lpBorrowedAmount / totalAmount;

    return {
      pool: pools[index].pool,
      scale: pools[index].scale || 6,
      avaliableAmount,
      borrowedAmount,
      totalAmount,
      utilization,
      totalShareMintSupply
    };
  });

  return formatResults;
}