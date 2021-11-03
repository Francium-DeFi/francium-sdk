import { NATIVE_MINT } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import * as BufferLayout from 'buffer-layout';
import { publicKey } from '@project-serum/borsh';

export const lendProgramId = new PublicKey("FC81tbGt6JWRXidaWYFXxGnTk4VgobhJHATvTRVMqgWj");

export const LendingPoolLayout: typeof BufferLayout.Structure = BufferLayout.struct(
  [
    BufferLayout.u8("version"),
    BufferLayout.nu64("last_update_slot"),
    BufferLayout.u8('last_update_stale'),
    publicKey("lending_market"),
    publicKey("liquidity_mint_pubkey"),
    BufferLayout.u8('liquidity_mint_decimals'),
    publicKey('liquidity_supply_pubkey'),
    publicKey('liquidity_fee_receiver'),
    BufferLayout.blob(36, "oracle"),
    BufferLayout.nu64('liquidity_available_amount'),
    BufferLayout.blob(16, "liquidity_borrowed_amount_wads"),
    BufferLayout.blob(16, "liquidity_cumulative_borrow_rate_wads"),
    BufferLayout.blob(8, "liquidity_market_price"),
    BufferLayout.blob(32, "share_mint_pubkey"),
    BufferLayout.blob(8, "share_mint_total_supply"),
    BufferLayout.blob(32, "share_supply_pubkey"),
    BufferLayout.blob(32, "credit_mint_pubkey"),
    BufferLayout.blob(8, "credit_mint_total_supply"),
    BufferLayout.blob(32, "credit_supply_pubkey"),
    BufferLayout.blob(128, "padding")
  ]
);

export interface LendInfoItem {
  programId: PublicKey;
  tokenMint: PublicKey;
  marketInfoAccount: PublicKey;
  marketOwner: PublicKey;
  lendingPoolInfoAccount: PublicKey;
  lendingMarketAuthority: PublicKey;
  lendingPoolTknAccount: PublicKey;
  lendingPoolFeeAccount: PublicKey;
  lendingPoolShareMint: PublicKey;
  lendingPoolShareAccount: PublicKey;
  lendingPoolCreditMint: PublicKey;
  lendingPoolCreditAccount: PublicKey;
}

export const lendingPools: {
  [x: string]: LendInfoItem
} = {
  USDC: {
    programId: lendProgramId,
    tokenMint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // usdc
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey("Hx6LbkMHe69DYawhPyVNs8Apa6tyfogfzQV6a7XkwBUU"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey("CFp9kt8z3Epb1QSiEp3xA44KbSwuJxhFR3wQoerFqYS9"),
    lendingPoolFeeAccount: new PublicKey("CugsLyJk1Jghc7LkgvnFuUwshJhz1FE9mpkF7Z4acAMU"),
    lendingPoolShareMint: new PublicKey("62fDf5daUJ9jBz8Xtj6Bmw1bh1DvHn8AG4L9hMmxCzpu"),
    lendingPoolShareAccount: new PublicKey("Gyc1V1xbA9NjzuURE662ATw6W4AdhwvsL26yUnSGhbkz"),
    lendingPoolCreditMint: new PublicKey("CZ2s85dnuAVyGbRWBNauHZwj9oTV2i9xTvFwc1Cedr7E"),
    lendingPoolCreditAccount: new PublicKey("Bd71jEvypKFs8N5gByyhD2149tSqLy4PVAzFFShCTJTB")
  },
  PAI: {
    programId: lendProgramId,
    tokenMint: new PublicKey("Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS"), // pai
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey("EzofB5BK23PHDfEAThk5oJANb9FWTXzezrafiTDzcBBA"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey("4Kvd1ULAy45k2EQt1pdePa82UBz9tW6N1rLJWb3EAJgQ"),
    lendingPoolFeeAccount: new PublicKey("sKmPL3zkAf7777bhXnMaSfTU1jg1keNHNPz38wBTNd5"),
    lendingPoolShareMint: new PublicKey("HDvD8a4VWbkHNG7hb4CBumNhn41DyKL51qVYBNH73o23"),
    lendingPoolShareAccount: new PublicKey("9tk9XwzJt1J2DoNcBtBmGMsnbnwvMUAoJF1pjdcfJe2E"),
    lendingPoolCreditMint: new PublicKey("HkMze549cFMdLMRDsJyfH8n6EE5jjTuVZr9re4WRYuk9"),
    lendingPoolCreditAccount: new PublicKey("7h8YziEXSZgyzqDb5c6PP3uUztQR7hQHwqyWWe9BTqY3")
  },
  RAY: {
    programId: lendProgramId,
    tokenMint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"), // ray
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey("ENZ7vdrvNGdAfVa8DoGpT2GrfoSFUtWKRoesf2dvqpuq"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey("BUK8XbZeEqVULYRxGp4Va2R1BRqrYzXDrCVnWt6B7TZf"),
    lendingPoolFeeAccount: new PublicKey("C2HJD7r6NYCCVoXPPExxYEQ73LZJ3qmb5H13GnwMZfwa"),
    lendingPoolShareMint: new PublicKey("5uZERkJVyhCABEdocEssPZyMXYa8GJpLhngi95yXr9jc"),
    lendingPoolShareAccount: new PublicKey("GrVpvHCRkTHESGwyaj4gtNLn95NAdkBSnZbKusoFumup"),
    lendingPoolCreditMint: new PublicKey("GZqhoJhN1bz5Frq9GCaUSJ2nimnizXzHwsH12Qgh4YmR"),
    lendingPoolCreditAccount: new PublicKey("6EZzqDqfTfdoFF4KD1gmki3btEHfULK4SjNcuJMTEDUt")
  },
  USDT: {
    programId: lendProgramId,
    tokenMint: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"), // usdt
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey("EyqWUeme2B1dhuwJvJVi2coYPcGWmWrakcpsSFeikrhb"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey("Acx3Ky9pk8CyYftA9HYF31EbVhBDi21EqJsFtMW2XxXW"),
    lendingPoolFeeAccount: new PublicKey("7gAN5Y4hGAG2A9vyr9dURGosjmo4Rwiaqz4iKZGNenE1"),
    lendingPoolShareMint: new PublicKey("8TtsTZQ6mU4YSW5jw4sDjSDEG1CW8QLpK7C9g5TVgBvn"),
    lendingPoolShareAccount: new PublicKey("EfLgyXRGFi9MUCMgrsFBuAJ7pMPXBceKhD6x4PgdvLLc"),
    lendingPoolCreditMint: new PublicKey("CoheXVD8cAdVaKznfay22dBpfML5Fbz5g4j67syKgRg4"),
    lendingPoolCreditAccount: new PublicKey("EAQxDXsA6RXxWtA1PwZNnTnj2MapHBtMzvUmfuGPJCPX")
  },
  SRM: {
    programId: lendProgramId,
    tokenMint: new PublicKey("SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt"), // srm
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey("B1zB1EuTjnFPLdwySeBYhzeAf3h9buWLbDoG7AHcUTMF"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey("FLQtBThLEVvhXdKqq2CREL8sFt8jAFS8szm4HaMYqmJk"),
    lendingPoolFeeAccount: new PublicKey("FdSBYwMEfy21H3k64cvYdir3mxzmnZotiYUsC5iPPoxM"),
    lendingPoolShareMint: new PublicKey("6CZhCFwA7hbqDEoVUQdFpHaCGQU7fSSwhaJWdG4DmsQ6"),
    lendingPoolShareAccount: new PublicKey("C3EjtH3hVuLrU3j1y5ArMFRbAhxFf5hXNfk3b9SU91qN"),
    lendingPoolCreditMint: new PublicKey("DqKuxgMxLPDCXtoQzLG1p85S2i3tP3EaeUVDAw7P8Nt4"),
    lendingPoolCreditAccount: new PublicKey("Ednqn9Zo5HpDX2DRmCWu6x46ZXnHNmTmrq9G8hrTuBnz")
  },
  ETH: {
    programId: lendProgramId,
    tokenMint: new PublicKey("2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk"), // eth
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey("CKMQxUz1nkn3NS5B9AUD1uyWNL8iN2piG9LVt1RvWXzj"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey("9MH38iiDX4Pk37U6TXLqz2783RspNhwBTYwBNHp8WUzP"),
    lendingPoolFeeAccount: new PublicKey("8UPe7Fcm2f1QEFQh2YNr1jg2vgQmj4CXhLYEWgStHd8B"),
    lendingPoolShareMint: new PublicKey("B8QXcUv5FFwyHH5V88g6PhYBc8fQvwSpza4C9PsiRpQD"),
    lendingPoolShareAccount: new PublicKey("C5X2Q2K2jQtwpuqHKnLVJ1ZsvL9BMRwddMgqaQ5UGNkC"),
    lendingPoolCreditMint: new PublicKey("BKKbCDggM83SPLFd1jRPu1ZsCv9nXkwZVne11N9FEs9w"),
    lendingPoolCreditAccount: new PublicKey("9A3KAmmv1VyqNqVGBM6T9b1dp9Ax9xxdeXEgedo8U7Gh")
  },
  SOL: {
    programId: lendProgramId,
    tokenMint: NATIVE_MINT, // wsol
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey("EnZC8MB6QLTxwN1LNqCXYC7XMpvXqitnYQPf5y5AcQRn"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey("GiJwrxQW5NQWWAva4rnDMXwHxfrhyUzwMX5to1pmCCgF"),
    lendingPoolFeeAccount: new PublicKey("2BDZqoVKAX3PJKeZJytjk7oEpbUu3jvdgdi6tA8VusnY"),
    lendingPoolShareMint: new PublicKey("92Zst3rEoJsyZUW2yNc2811GtkBwFrm3tqgxMTtFWuSB"),
    lendingPoolShareAccount: new PublicKey("Hyi1jMgc9MMEZyaG9ziL2PvT7zbeRNKhb5K1kj9bxz4x"),
    lendingPoolCreditMint: new PublicKey("7x61NrCzeekHwgW5Nk4afMg2sxjMK6RyMkx8tCzzX4qG"),
    lendingPoolCreditAccount: new PublicKey("WuPCgCuyLSXatdjyWqkGjCPSQFgKLwcfsNR9fDq3hVL")
  },
  ORCA: {
    programId: lendProgramId,
    tokenMint: new PublicKey("orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE"), // orca
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey("9bo5JunUhp4XD7TDeeS9ARvWTYGBYtuQKUHGUb7RRvkf"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey("F3EhkuRuZaYNY2bLTosjv6V7QXiZ8db9nXTZeLnmHC7V"),
    lendingPoolFeeAccount: new PublicKey("F3EhkuRuZaYNY2bLTosjv6V7QXiZ8db9nXTZeLnmHC7V"),
    lendingPoolShareMint: new PublicKey("DKoKBD7YheCGZjWp5CaHDPtheAcUveRSMvWkaivbNzWh"),
    lendingPoolShareAccount: new PublicKey("AMUE9EgiEiTP1YVBicwTVGtumBypR5thjTgbsXZM2PPG"),
    lendingPoolCreditMint: new PublicKey("CJNd1LZZxZr243dpNN9DtEavXn65kstrg251MPb8vmwW"),
    lendingPoolCreditAccount: new PublicKey("74m1zyzV8x9d8kZLEaVaNWRsnx8pH47tfX8cquot11ef")
  },
  mSOL: {
    programId: lendProgramId,
    tokenMint: new PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('492Hr5QDQyrsLcyXqMZ7A5osjmqwtn4cdKNQLDBYBzvy'),
    lendingPoolTknAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
    lendingPoolFeeAccount: new PublicKey('ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1'),
    lendingPoolShareMint: new PublicKey('4mntRxKJWib1YTWNV4aLfszF6FeziBHdwnNAwGSfKKMX'),
    lendingPoolShareAccount: new PublicKey('EbWWhmDLKXDdq2guubVJCdSztuUaN6XhtwVMy9TMMwtV'),
    lendingPoolCreditMint: new PublicKey('Fdu3QfaQ9VL4GF85NrkpzhKRAJECv9cx7gchHca5MsRt'),
    lendingPoolCreditAccount: new PublicKey('HdTwUP1U3WQ1EnYPP8c8mx8sqHhXYQ9zwKVsLGxWi7W1'),
  },
  BTC: {
    programId: lendProgramId,
    tokenMint: new PublicKey("9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E"),
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('DxAuEAxKYXsKMYG5Ma4TM8AsrAo7LQBSnbEGicU7i1ek'),
    lendingPoolTknAccount: new PublicKey('2MN34BxuLVrjZpKYKHmW1c6ZGeQs4aWQRrEvmrYfZdtG'),
    lendingPoolFeeAccount: new PublicKey('2MN34BxuLVrjZpKYKHmW1c6ZGeQs4aWQRrEvmrYfZdtG'),
    lendingPoolShareMint: new PublicKey('2G9iwy9zfLaXB2bFiqSA7YbKEvtAEXVmdvGTF28jQVgg'),
    lendingPoolShareAccount: new PublicKey('HGejymLhai1TDvRA4vBEbS5VRbKP1u74ZdzZcv8Y2o1M'),
    lendingPoolCreditMint: new PublicKey('6WzqPd81AqsCwbXp33A6ro87axfD9je32hn3JE4KsnGi'),
    lendingPoolCreditAccount: new PublicKey('E7HkZYeY8mqrtC45kusWiArqLNpGnV5Foioj6yEPHB1y'),
  },
  whETH: {
    programId: lendProgramId,
    tokenMint: new PublicKey("7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"),
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('EEokU6r9bBdTz1umHjGhkjgfikARsJzJBXhYxnTmN4Xk'),
    lendingPoolTknAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
    lendingPoolFeeAccount: new PublicKey('9Mq6KEyW1nF24TcGrdLLfnK2pE5VdMxbY2SZtcP84R5X'),
    lendingPoolShareMint: new PublicKey('Hk8b6i2C7PxFBPdd1TCrGssuZpCDEg4fh8yFuyHNJuJe'),
    lendingPoolShareAccount: new PublicKey('FNG4A4GWF1EsQVEjNrQMRT9Dr3H28TycQabtnsQF1MiD'),
    lendingPoolCreditMint: new PublicKey('7f7mU3tQvxD9t3f5ckhxcGSdwqoHHdWrJg43HXiUFWri'),
    lendingPoolCreditAccount: new PublicKey('7LvrwstXyshwVn7BPDgjR8Cndersy9GzbbGhyHwQcX3W'),
  }
};

export const lendingPoolList = [
  {
    pool: 'USDC',
    scale: 6
  },
  {
    pool: 'USDT',
    scale: 6
  },
  {
    pool: 'SOL',
    scale: 9
  },
  {
    pool: 'mSOL',
    scale: 9
  },
  {
    pool: 'BTC',
    scale: 6
  },
  {
    pool: 'ETH',
    scale: 6
  },
  {
    pool: 'ORCA',
    scale: 6
  },
  {
    pool: 'whETH',
    scale: 8
  }
]