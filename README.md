# Francium SDK

## Farm

### Get User Farm Positions
```javascript
import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';

const fr = new FranciumSDK({
  connection: new Connection('https://free.rpcpool.com')
});
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
  const trxs = fr.getFarmTransactions(
    'SHDW-USDC',
    'orca',
    new PublicKey('23xxxxxxx'),
    {
      depositPcAmount: new BN(1000000),
      depositCoinAmount: new BN(0),
      borrowPcAmount: new BN(1000000),
      borrowCoinAmount: new BN(0)
    }
  );

  // sign and send trxs
  await fr.sendMultipleTransactions(trxs, wallet);
}

```
### Get Close Position Transactions
```javascript
import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';
const fr = new FranciumSDK({
  connection: new Connection('https://free.rpcpool.com')
});

async function farm() {
  // supply 1 USDC, borrow 1 USDC
  const trxs = fr.getClosePositionTransactions(
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

### Get Pool Info
```javascript
async function getInfo() {
  const farmPool = await fr.getFarmPoolTVL();
  const lendingPool = await fr.getLendingPoolTVL();
}

```

## Lend
### Get User Lending Pool

user lending position, the `totalAmount` is the token amount.

```javascript
fr.getUserLendingPosition(new PublicKey('23fxxxxxxxxxxxxxxxxxxx'))
  .then((res) => {
    console.log(res);
    // [
    //   {
    //     pool: 'USDC',
    //     scale: 6,
    //     totalAmount: 0.100434
    //   },
    //   {
    //     pool: 'SOL',
    //     scale: 9,
    //     totalAmount: 0.100434
    //   },
    //   {
    //     pool: 'ORCA',
    //     scale: 6,
    //     totalAmount: 0.100434
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