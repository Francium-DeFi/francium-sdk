# Francium SDK

Javascript sdk of Francium lending pools and farming pools. [Learn more about Francium.](https://docs.francium.io/)

[NPM package](https://www.npmjs.com/package/francium-sdk)

## Farm

### Get User Farm Positions
```javascript
import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';

const fr = new FranciumSDK({
  connection: new Connection('https://free.rpcpool.com')
});

// Will fetch the LP price info on chain and return equity value.
fr.getUserFormattedFarmPosition(new PublicKey('23fxxxxxxxxxxxxxxxxxxx'))
  .then(result => {
    console.log(result);
    // [{
    //   id: 'ORCA-USDC[Orca Aquafarm]',
    //   lpAmount: BN,
    //   lpShares: BN,
    //   lpDecimals: 6,
    //   userInfoPublicKey: PublicKey,
    //   borrowed: [{
    //     symbol: 'USDC',
    //     amount: BN
    //   }],
    //   totalPositionValue: 10,
    //   debtValue: 6,
    //   equityValue: 4
    // }]
  });

// Only return the amount.
fr.getUserFarmPosition(new PublicKey('23fxxxxxxxxxxxxxxxxxxx'))
  .then(result => {
    console.log(result);
    // [{
    //   id: 'ORCA-USDC[Orca Aquafarm]',
    //   lpAmount: BN,
    //   lpShares: BN,
    //   lpDecimals: 6,
    //   userInfoPublicKey: PublicKey,
    //   borrowed: [{
    //     symbol: 'USDC',
    //     amount: BN
    //   }]
    // }]
  });
```

### Get Farm Transactions
```javascript
import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';
const fr = new FranciumSDK({
  connection: new Connection('https://free.rpcpool.com')
});

async function farm() {
  // supply 1 USDC, borrow 1 USDC
  const trxs = await fr.getFarmTransactions(
    'SHDW-USDC',
    'orca',
    new PublicKey('23xxxxxxx'),
    {
      depositPcAmount: new BN(1000000),
      depositCoinAmount: new BN(0),
      borrowPcAmount: new BN(1000000),
      borrowCoinAmount: new BN(0),
      // Needed when adjust
      currentUserInfoAccount?: PublicKey
    }
  );

  // sign and send trxs
  await fr.sendMultipleTransactions(trxs, wallet);
}
```

### Get Farm Versioned Transactions
```javascript
async function oneTxfarm() {
  // supply 1 USDC, borrow 1 USDC
  const versionedTrx = await fr.getOneFarmTransaction(
    'RAY-USDC',
    'raydium',
    new PublicKey('23xxxxxxx'),
    {
      depositPcAmount: new BN(1000000),
      depositCoinAmount: new BN(0),
      borrowPcAmount: new BN(1000000),
      borrowCoinAmount: new BN(0),
      // Needed when adjust
      currentUserInfoAccount?: PublicKey
    }
  );

  // If there is Keypair
  versionedTrx.sign([payer]);
  fr.connection.sendTransaction(versionedTrx);

  // if the wallet supports Versioned Transaction
  await fr.sendVersionedTransaction(versionedTrx, wallet);
}
```
### getRepayTransactions
```
import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';
const fr = new FranciumSDK({
  connection: new Connection('https://free.rpcpool.com')
});

async function getRepayTransactions() {
  const trxs = await fr.getRepayTransactions(
    'SHDW-USDC',
    'orca',
    new PublicKey('23xxxxxxx'),
    configs: {
      amount0: BN;
      amount1: BN;
      // userPosition.userInfoPublicKey
      currentUserInfoAccount: PublicKey;
    }
  );

  // sign and send trxs
  await fr.sendMultipleTransactions(trxs, wallet);
```

### Get Close Position Transactions
```javascript
import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';
const fr = new FranciumSDK({
  connection: new Connection('https://free.rpcpool.com')
});

async function close() {
  // supply 1 USDC, borrow 1 USDC
  const trxs = await fr.getClosePositionTransactions(
    'SHDW-USDC',
    'orca',
    new PublicKey('23xxxxxxx'),
    {
      // 0: swap to PC token
      // 1: swap to Coin Token
      // 2: minimize trading 
      withdrawType: 2,

      // userPosition.lpShares
      lpShares: BN,

      // userPosition.userInfoPublicKey
      currentUserInfoAccount: PublicKey 
    }
  );

  // sign and send trxs
  await fr.sendMultipleTransactions(trxs, wallet);
}

```
### Get Farm Close Versioned Transactions
```javascript
async function oneTxClose() {
  // supply 1 USDC, borrow 1 USDC
  const versionedTrx = await fr.getOneFarmClosedTransaction(
    'RAY-USDC',
    'raydium',
    new PublicKey('23xxxxxxx'),
    {
      // 0: swap to PC token
      // 1: swap to Coin Token
      // 2: minimize trading 
      withdrawType: 2,

      // userPosition.lpShares
      lpShares: BN,

      // userPosition.userInfoPublicKey
      currentUserInfoAccount: PublicKey 
    }
  );

  // If there is Keypair
  versionedTrx.sign([payer]);
  fr.connection.sendTransaction(versionedTrx);

  // if the wallet supports Versioned Transaction
  await fr.sendVersionedTransaction(versionedTrx, wallet);
}
```
### Get Pool Info
```javascript
async function getInfo() {
  const farmPool = await fr.getFarmPoolTVL();
  const lendingPool = await fr.getLendingPoolTVL();
}

```

### Get Farm LP Info
```javascript
fr.getFarmLPPriceInfo();
```

### PDN Rebalance
```js
import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';
const fr = new FranciumSDK({
  connection: new Connection('https://free.rpcpool.com')
});

async function rebalance() {
  await fr.sendRebalanceTransactions(
    new PublicKey('23xxxxxxx'),
    targetPosition.userInfoPublicKey.toBase58(), // the userInfoPublicKey string of the target positio, which could be accessible from fr.getUserFarmPosition
    wallet,
  );
}

// get rebalance Info
async function getRebalanceInfo() {
  const rebalanceInfo = await fr.getRebalanceInfo(
    new PublicKey('23xxxxxxx'),
    targetPosition.userInfoPublicKey.toBase58(), // the userInfoPublicKey string of the target positio, which could be accessible from fr.getUserFarmPosition
  );
  console.log('rebalanceInfo: ', rebalanceInfo);
}

```


## Lend

### Get Lending Transaction
```javascript
import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';
const fr = new FranciumSDK({
  connection: new Connection('https://free.rpcpool.com')
});

async function deposit() {
  const { trx, signers }  = await fr.getLendingDepositTransaction('USDC', new BN(1000000), new PublicKey('23fxxxxxxxxxxxxxxxxxxx'));
  const { txid, response } = await fr.sendSingleTransaction(trx, wallet, signers);
  console.log(txid, response);
}

async function withdraw() {
  // You can get this value by getUserLendingPosition method
  const rewardAmount = 1002232;
  const tokenAmount = 0;
  const { trx, signers }  = await fr.getLendWithdrawTransaction('USDC', rewardAmount, tokenAmount, new PublicKey('23fxxxxxxxxxxxxxxxxxxx'));
  const { txid, response } = await fr.sendSingleTransaction(trx, wallet, signers);
  console.log(txid, response);
}
```

### Get Lending Transaction V0
```javascript
async function depositV0() {
  const {trx, signers} = await sdk.getLendingDepositTransactionV0(
  'USDC', new BN('1000000'), new PublicKey('23xxxxxxx'));
  const { txid, response } = await sdk.sendVersionedTransaction(trx, wallet, signers);
}

async function withdrawV0() {
  const rewardAmount = 1002232;
  const tokenAmount = 0;
  const {trx, signers} = await sdk.getLendingWithdrawTransactionV0(
  'USDC', rewardAmount, tokenAmount,  new PublicKey('23xxxxxxx'));
  const { txid, response } = await sdk.sendVersionedTransaction(trx, wallet, signers);
}
```

### Get User Lending Pool

user lending position, the `totalAmount` is the token amount.

```javascript
fr.getUserLendingPosition(new PublicKey('23fxxxxxxxxxxxxxxxxxxx'))
  .then((res) => {
    console.log(res);
      // [
      //   {   
      //     balancePosition: 0,
      //     pool: "USDC",
      //     rewardPosition: 41354540149,
      //     scale: 6,
      //     totalAmount: 50386.25041249344,
      //     totalPosition: 41354540149,
      //   }
      // ]
  })
```

### Get Pool Info
```javascript
fr.getLendingPoolInfo()
  .then((res) => {
    console.log(res);
    // [
    //   {
    //     pool: 'USDC',
    //     scale: 6,
    //     avaliableAmount: BN,
    //     borrowedAmount: BN,
    //     totalAmount: BN,
    //     utilization: 0.9,
    //     totalShareMintSupply: BN,
    //     apr: 8.36,
    //     apy: 8.72,
    //   }
    // ]
  });
```


add this to your webpack configuration
```
node: {
  fs: "empty",
  net: "empty",
  tls: "empty",
}
```