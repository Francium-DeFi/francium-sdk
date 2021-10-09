import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { lendingPools, lendingPoolList } from "../../constants/lend/pools";
import { find } from 'lodash';

export async function getLendingPoolBalance(connection: Connection, userPublicKey: PublicKey) {
  const userTokenAccounts = await connection.getParsedTokenAccountsByOwner(userPublicKey, {
    programId: TOKEN_PROGRAM_ID
  }, 'confirmed');

  const result = {};

  lendingPoolList.forEach(i => {
    const info = lendingPools[i.pool];
    const mint = info.lendingPoolShareMint;
    const account = find(userTokenAccounts.value, (accountInfo) => {
      const parsedInfo = accountInfo.account.data.parsed.info;
      const mintAddress = parsedInfo.mint;
      if (mintAddress === mint.toBase58()) {
        return true;
      }
      return false;
    });
    if (account) {
      result[i.pool] = {
        amount: Number(account.account.data.parsed.info.tokenAmount.amount),
        scale: i.scale
      }
    }
  });
  return result;
}