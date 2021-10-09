import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { TOKENS } from "../constants/tokens";

export function getTokenDecimals (token: string) {
  if (token === 'SOL') {
    return 9;
  }
  return TOKENS[token]?.decimals || 6;
}

export async function findAssociatedTokenAddress(walletAddress: PublicKey, tokenMintAddress: PublicKey) {
  const [publicKey] = await PublicKey.findProgramAddress(
    [walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  return publicKey;
}