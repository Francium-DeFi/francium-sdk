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


add this to your webpack configuration
```
node: {
  fs: "empty",
  net: "empty",
  tls: "empty",
}
```