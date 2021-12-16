import { Connection, PublicKey } from '@solana/web3.js';
import * as BN from 'bn.js';
import BigNumber from "bignumber.js";
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
    const utilization = totalAmount.gtn(0) ?
      new BigNumber(borrowedAmount.toString()).dividedBy(totalAmount.toString()).toNumber() : 0;

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