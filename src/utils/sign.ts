import { Connection, Keypair, PublicKey, Transaction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import * as base58 from 'bs58';
import { SnowflakeSafeWalletName } from '@snowflake-so/wallet-adapter-snowflake';
import { StrikeWalletName } from '@solana/wallet-adapter-strike';

export async function send2TransactionsListOneByOneWithErrorCatch(
  trxs: Transaction[], connection: Connection, wallet: any,
  onTrxSended?: (index: number, txid: string) => void,
  onTrxConfirmed?: (index: number, txid: string, stateInfo?: { state: string, msg: string, total?: number }) => void,
  beforeSign?: (trx: Transaction, index: number) => void
) {
  const { blockhash } = await connection.getRecentBlockhash();
  trxs.forEach((trx, index) => {
    trx.recentBlockhash = blockhash;
    trx.feePayer = wallet.publicKey;
    if (beforeSign) {
      beforeSign(trx, index);
    }
  });

  console.log('------ start sign ------', trxs);
  const signed = await wallet.signAllTransactions(trxs);
  // const signed = await wallet.signAllTransactions(trxs);
  console.info('----- Sign end -----');

  const stateInfos: { state: string, msg: string, total: number }[] = [];

  for (let index = 0; index < signed.length; index++) {
    const signedTrx = signed[index];
    const txid = await connection.sendRawTransaction(signedTrx.serialize(), {
      skipPreflight: true,
      preflightCommitment: 'confirmed'
    });
    console.info('----- Send Trx -----', txid);
    if (onTrxSended) {
      onTrxSended(index, txid);
    }

    const stateInfo = {
      state: 'success',
      msg: '',
      signature: base58.encode(signedTrx.signature),
      total: signed.length
    };
    try {
      const confirmResponse = await connection.confirmTransaction(txid, 'confirmed');
      if (confirmResponse?.value?.err) {
        stateInfo.state = 'error';
        // console.log(confirmResponse.value.err);
        // {
        //   "InstructionError": [
        //     0,
        //     {
        //       "Custom": 162
        //     }
        //   ]
        // }
        stateInfo.msg = 'Transaction Error';
      }
    } catch (err) {
      // catch and continue
      console.info('----- Confirm Timeout -----', err);
      stateInfo.state = 'timeout';
      stateInfo.msg = `Transaction was not confirmed in 30 seconds. Bots 🤖️ will help complete unfinished transactions. You could retry manually either.`;
    } finally {
      stateInfos.push(stateInfo);
    }

    console.log('confirmResponse', stateInfo);
    if (onTrxConfirmed) {
      onTrxConfirmed(index, txid, stateInfo);
    }
  }
  return stateInfos;
}


export async function sendWalletTransaction(
  trx: Transaction, connection: Connection, wallet: any, signers?: Keypair[]
) {
  const { blockhash } = await connection.getRecentBlockhash();
  trx.recentBlockhash = blockhash;
  trx.feePayer = wallet.publicKey;
  if (wallet.name !== StrikeWalletName && signers && signers.length) {
    trx.partialSign(...signers);
  }

  console.log('start signed', trx);
  if (wallet.name === SnowflakeSafeWalletName) {
    wallet.setProposalName('Sign transaction | Proposal');
    // console.log('signers :>> ', signers, signers[0].publicKey.toBase58());
    wallet.setSigners(signers);
  }
  const signed = await wallet.signTransaction(trx);
  if (wallet.name === StrikeWalletName) {
    signed.partialSign(...signers);
  }
  console.log('start send');
  const txid = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: true,
    preflightCommitment: 'confirmed'
  });
  console.log('start confirm', txid);
  const r = await connection.confirmTransaction(txid, 'confirmed');
  console.log('trx confirmed', r, txid);
  return { txid, response: r };
}

export async function sendVersionedTransaction(
  trx: VersionedTransaction, connection: Connection, wallet: any,
  signers?: Keypair[]
) {
  if (signers) {
    trx.sign(signers);
  }
  const signed = await wallet.signTransaction(trx);
  const txid = await connection.sendTransaction(signed, {
    skipPreflight: true,
    preflightCommitment: 'confirmed'
  });
  console.log('start confirm', txid);
  const r = await connection.confirmTransaction(txid, 'confirmed');
  console.log('trx confirmed', r, txid);
  return { txid, response: r };
}

export async function buildVersionedTransaction(
  trxs: Transaction[], connection: Connection, lookupTableAddress: PublicKey, userPublicKey: PublicKey) {
  const trx = new Transaction();
  trxs.forEach(tx => {
    trx.add(...tx.instructions);
  });
  const lookupTableAccount = await connection.getAddressLookupTable(lookupTableAddress)
    .then((res) => res.value);
  const blockhash = await connection.getLatestBlockhash()
    .then((res) => res.blockhash);

  const messageV0 = new TransactionMessage({
    payerKey: userPublicKey,
    recentBlockhash: blockhash,
    instructions: trx.instructions,
  }).compileToV0Message([lookupTableAccount]);

  const transactionV0 = new VersionedTransaction(messageV0);
  return transactionV0;
}