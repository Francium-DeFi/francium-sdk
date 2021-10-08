import { filter } from 'lodash';
import allPools from './pools';

export const activePools = [
  'MEDIA-USDC[Raydium Fusion Pool]',
  'COPE-USDC[Raydium Fusion Pool]',
  'ALEPH-USDC[Raydium Fusion Pool]',
  'TULIP-USDC[Raydium Fusion Pool]',
  'SNY-USDC[Raydium Fusion Pool]',
  'SLRS-USDC[Raydium Fusion Pool]',
  'MNGO-USDC[Raydium Fusion Pool]',
  'LIKE-USDC[Raydium Fusion Pool]',
  'ATLAS-USDC[Raydium Fusion Pool]',
  'POLIS-USDC[Raydium Fusion Pool]',
  'GRAPE-USDC[Raydium Fusion Pool]',
  
  'ATLAS-USDC[Orca Double-Dip]',
  'POLIS-USDC[Orca Double-Dip]',

  'ORCA-USDC[Orca Aquafarm]',
  'ORCA-SOL[Orca Aquafarm]',
  'SOL-USDC[Orca Aquafarm]'
]

export const farmPools = filter(allPools, i => {
  const poolKey = `${i.pair}[${i.from}]`;
  return activePools.includes(poolKey);
});
