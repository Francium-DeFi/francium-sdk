import { PublicKey } from "@solana/web3.js";
import { lyfRaydiumProgramId } from "../../constants/farm/raydium/info";

const ORACLE_INFO_SEED_0  = "oracle-info-seed-0";
const ORACLE_INFO_SEED_1  = "oracle-info-seed-1";

export function findOracleAccountPDA(poolAccount: PublicKey): [PublicKey, number, PublicKey, number] {
  const [address0, bump0] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(ORACLE_INFO_SEED_0),
      poolAccount.toBuffer()
    ],
    lyfRaydiumProgramId
  );

  const [address1, bump1] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(ORACLE_INFO_SEED_1),
      poolAccount.toBuffer()
    ],
    lyfRaydiumProgramId
  );

  return [address0, bump0, address1, bump1];
}