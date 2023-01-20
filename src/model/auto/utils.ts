import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { FRANCIUM_AUTO_VAULTS_PROGRAM_ID } from "../../constants/auto/raydium";

const USER_INFO_SEED = "user_info_seed";

export async function findUserPositionInfoPDA(poolInfoAccount: PublicKey, owner: PublicKey, nonce: BN) {
  console.log(nonce);
  
  return await PublicKey.findProgramAddress(
    [
      Buffer.from(USER_INFO_SEED),
      poolInfoAccount.toBuffer(),
      owner.toBuffer(),
      nonce.toArrayLike(Buffer, "le", 8)
    ],
    FRANCIUM_AUTO_VAULTS_PROGRAM_ID
  );
}