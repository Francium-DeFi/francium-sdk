import { struct, u8, u64, u128 } from '@project-serum/borsh';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import * as BN from 'bn.js';
import * as BufferLayout from 'buffer-layout';
import BigNumber from 'bignumber.js';

const referrerId = '82z4r6cZ11zxuxh7vtVYECgLDbmdh3VfiorEyxjMi9gq';
const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

export enum INSTRUCTION {
  STAKE = 1,
  UNSTAKE = 2,
}

export const MAINNET_PROGRAM_ADDRESSES = {
  solidoProgramId: new PublicKey('CrX7kMhLC3cSsXJdT7JDgqrRVWGnUpX3gfEfxxU2NVLi'),
  solidoInstanceId: new PublicKey('49Yi1TKkNyYjPAFdR9LBvoHcUjuPX4Df5T5yv39w2XTn'),
  stSolMintAddress: new PublicKey('7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj'),
  reserveAccount: new PublicKey('3Kwv3pEAuoe4WevPB4rgMBTZndGDb53XT7qwQKnvHPfX'),
  mintAuthority: new PublicKey('8kRRsKezwXS21beVDcAoTmih1XbyFnEAMXXiGXz6J3Jz')
};

export default function mintStSol(
  userPublicKey: PublicKey, userTokenAccount: PublicKey, amount: BN
) {
  const dataLayout = struct([u8('instruction'), u64('amount')]);
  const data = Buffer.alloc(dataLayout.span);

  dataLayout.encode(
    {
      instruction: INSTRUCTION.STAKE,
      amount,
    },
    data,
  );

  const keys = [
    { pubkey: MAINNET_PROGRAM_ADDRESSES.solidoInstanceId, isSigner: false, isWritable: true },
    { pubkey: userPublicKey, isSigner: true, isWritable: true },
    { pubkey: userTokenAccount, isSigner: false, isWritable: true },
    { pubkey: MAINNET_PROGRAM_ADDRESSES.stSolMintAddress, isSigner: false, isWritable: true },
    { pubkey: MAINNET_PROGRAM_ADDRESSES.reserveAccount, isSigner: false, isWritable: true },
    { pubkey: MAINNET_PROGRAM_ADDRESSES.mintAuthority, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
  ];

  return new TransactionInstruction({
    keys,
    programId: MAINNET_PROGRAM_ADDRESSES.solidoProgramId,
    data,
  });
}

export function addReferral(userPublicKey: PublicKey) {
  return new TransactionInstruction({
    programId: MEMO_PROGRAM_ID,
    data: Buffer.from(JSON.stringify({
      referrer: referrerId
    })),
    keys: [{ isSigner: true, isWritable: false, pubkey: userPublicKey }],
  });
}

export async function getStSolExchangeRate(connection: Connection) {
  const InfoLayout: typeof BufferLayout.Structure = BufferLayout.struct([
    u8('lido_version'),
    u128('manager1'),
    u128('manager2'),
    u128('st_sol_mint1'),
    u128('st_sol_mint2'),
    u64('computed_in_epoch'),
    u64('st_sol_supply'),
    u64('sol_balance')
  ]);

  const accountInfo = await connection.getAccountInfo(MAINNET_PROGRAM_ADDRESSES.solidoInstanceId);
  const buf = Buffer.from(accountInfo.data);
  const decodeData = InfoLayout.decode(buf);

  return new BigNumber(decodeData.st_sol_supply.toString()).dividedBy(new BigNumber(decodeData.sol_balance.toString())).toNumber();
}