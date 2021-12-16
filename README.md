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
    //   lpDecimals: 6,
    //   borrowed: [{
    //     symbol: 'USDC',
    //     amount: BN
    //   }]
    // }]
  });
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