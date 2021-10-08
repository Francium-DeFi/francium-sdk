import { TOKENS } from "../constants/tokens";

export function getTokenDecimals (token: string) {
  if (token === 'SOL') {
    return 9;
  }
  return TOKENS[token]?.decimals || 6;
}