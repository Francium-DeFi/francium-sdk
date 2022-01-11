import { Connection, Transaction } from "@solana/web3.js";

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
    }

    console.log('confirmResponse', stateInfo);
    if (onTrxConfirmed) {
      onTrxConfirmed(index, txid, stateInfo);
    }
  }
}
