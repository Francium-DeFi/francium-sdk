import { ASSOCIATED_TOKEN_PROGRAM_ID, NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKENS } from "../constants/tokens";

export function getTokenDecimals (token: string) {
  if (token === 'SOL') {
    return 9;
  }
  return TOKENS[token]?.decimals || 6;
}

export function getTokenMintAddress(token: string) {
  return TOKENS[token]?.mintAddress;
}

export async function findAssociatedTokenAddress(walletAddress: PublicKey, tokenMintAddress: PublicKey) {
  const [publicKey] = await PublicKey.findProgramAddress(
    [walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  return publicKey;
}

export async function splitMultipleAccountsInfo(connection: Connection, accountList: PublicKey[]) {
  // getMultipleAccountsInfo MAX is 100;
  const MAX = 100;
  const info = [];
  const totalSplit = Math.ceil(accountList.length / 100);
  for (let index = 0; index < totalSplit; index++) {
    const accounts = accountList.slice(index * MAX, (index + 1) * MAX);
    const multipleInfo = await connection.getMultipleAccountsInfo(accounts, 'confirmed');
    info.push(...multipleInfo);
  }
  return info;
}

export function isNativeMint (publicKey: PublicKey) {
  if (!publicKey) {
    return false;
  }
  if (publicKey.toBase58() === NATIVE_MINT.toBase58()) {
    return true;
  }
  return false;
}