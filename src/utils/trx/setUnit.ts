import { ComputeBudgetProgram } from '@solana/web3.js';

export default ComputeBudgetProgram.setComputeUnitLimit({
  units: 400000
});