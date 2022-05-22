import axios from 'axios';
import { forEach } from 'lodash';
import tokenList from '../../constants/price';

export async function getTokenPrice() {
  const priceMap = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
    params: {
      ids: tokenList.map(i => i.id).join(','),
      vs_currencies: 'usd'
    }
  });

  const res: {
    [x: string]: number
  } = {
    USDC: 1,
    USDT: 1,
    wUST: 1,
  };

  try {
    forEach(priceMap.data, (value, key) => {
      const price = value.usd;
      const targetItem = tokenList.find(i => i.id === key);
      res[targetItem.token] = price;
    });
    res.whETH = res.ETH;
  } catch (err) {

  }

  return res;
}
