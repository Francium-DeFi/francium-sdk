import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, Transaction, TransactionInstruction, SYSVAR_RENT_PUBKEY, SystemProgram, Connection } from "@solana/web3.js";
import { findAssociatedTokenAddress } from "../tools";

export async function createAssociatedTokenAccount(
  tokenMintAddress: PublicKey,
  owner: PublicKey,
  transaction?: Transaction
) {
  const associatedTokenAddress = await findAssociatedTokenAddress(owner, tokenMintAddress);

  if (transaction) {
    const keys = [
      {
        pubkey: owner,
        isSigner: true,
        isWritable: true
      },
      {
        pubkey: associatedTokenAddress,
        isSigner: false,
        isWritable: true
      },
      {
        pubkey: owner,
        isSigner: false,
        isWritable: false
      },
      {
        pubkey: tokenMintAddress,
        isSigner: false,
        isWritable: false
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false
      },
      {
        pubkey: TOKEN_PROGRAM_ID,
        isSigner: false,
        isWritable: false
      },
      {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false
      }
    ];

    transaction.add(
      new TransactionInstruction({
        keys,
        programId: ASSOCIATED_TOKEN_PROGRAM_ID,
        data: Buffer.from([])
      })
    );
  }

  return associatedTokenAddress;
}

export async function getParsedTokenAccounts(connection: Connection, userPublicKey: PublicKey) {
  if (userPublicKey) {
    const r = await connection.getParsedTokenAccountsByOwner(userPublicKey, {
      programId: TOKEN_PROGRAM_ID
    }, 'confirmed');
    const tokenAccounts = {};
    r.value.forEach(tokenAccountInfo => {
      const tokenAccountAddress = tokenAccountInfo.pubkey.toBase58();
      const parsedInfo = tokenAccountInfo.account.data.parsed.info;
      const mintAddress = parsedInfo.mint;
      tokenAccounts[mintAddress] = {
        tokenAccountAddress
      };
    });

    return tokenAccounts;
  }
}