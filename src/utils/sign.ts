import { Connection, Keypair, Transaction } from "@solana/web3.js";

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
  console.info('----- Sign end -----');

  const stateInfos: {state: string, msg: string, total: number}[] = [];

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
      stateInfo.msg = err?.toString();
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
  if (signers && signers.length) {
    trx.partialSign(...signers);
  }
  console.log('start signed', trx);
  const signed = await wallet.signTransaction(trx);
  console.log('start send');
  const txid = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: true,
    preflightCommitment: 'confirmed'
  });
  console.log('start confirm', txid);
  const r = await connection.confirmTransaction(txid, 'finalized');
  console.log('trx confirmed', r, txid);
  return { txid, response: r };
}