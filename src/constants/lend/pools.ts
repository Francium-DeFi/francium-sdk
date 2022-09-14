import { NATIVE_MINT } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import * as BufferLayout from 'buffer-layout';
import { publicKey } from '@project-serum/borsh';
import { TOKENS } from "../tokens";

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
    BufferLayout.u8("threshold_1"),
    BufferLayout.u8("threshold_2"),
    BufferLayout.u8("base_1"),
    BufferLayout.u16("factor_1"),
    BufferLayout.u8("base_2"),
    BufferLayout.u16("factor_2"),
    BufferLayout.u8("base_3"),
    BufferLayout.u16("factor_3"),
    BufferLayout.u8("interest_reverse_rate"),
    BufferLayout.nu64('accumulated_interest_reverse'),
    BufferLayout.blob(108, "padding"),
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
  },
  weSUSHI: {
    programId: lendProgramId,
    tokenMint: TOKENS.weSUSHI.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('2oTEVdMpSRsamFeNYzqn3wifsPHRomA8TShgbTnDtTgN'),
    lendingPoolTknAccount: new PublicKey('4VAyWCoRbW5YXiV5Rz7pZy7miYBJLjfZYsykDuTnWyqj'),
    lendingPoolFeeAccount: new PublicKey('4VAyWCoRbW5YXiV5Rz7pZy7miYBJLjfZYsykDuTnWyqj'),
    lendingPoolShareMint: new PublicKey('EEhiV55jAt5JDpeH3GF4VGrStiPn5gCeWmqffyTp9B4E'),
    lendingPoolShareAccount: new PublicKey('5SDoskkCcV8NBJcP97g9CS7BEGLqXT5q2F6Ve2W3VN71'),
    lendingPoolCreditMint: new PublicKey('E2ocWnUUuBpUDLRSxB5VdUqr635DMPiWuV4PYDtiyGbi'),
    lendingPoolCreditAccount: new PublicKey('L9idBQvg4SKzdtHPgZijpJGkDT4WVbhnA7KmTVPT477'),
  },
  weUNI: {
    programId: lendProgramId,
    tokenMint: TOKENS.weUNI.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('H4uTQ8CCFJYVQYZ8c2bH7hHGrrok6k4pWDhk5NQt9KR8'),
    lendingPoolTknAccount: new PublicKey('E3fN9Wqesn2NbYGPjybFo5HTMpcyLPnWNHovQpQqqw8G'),
    lendingPoolFeeAccount: new PublicKey('E3fN9Wqesn2NbYGPjybFo5HTMpcyLPnWNHovQpQqqw8G'),
    lendingPoolShareMint: new PublicKey('CGj7e1g4ojW1RhSocF8AKWxHFaqCQjK8kBsbHqNB4BxP'),
    lendingPoolShareAccount: new PublicKey('8BtR6Dzg4fLmLv4ZZdX1x22WYiPHvp8AtvRFgSMQwxdw'),
    lendingPoolCreditMint: new PublicKey('74WmdEZG9rjvcAX2yczd5h54QeXnq62sVNLMz1DU2Abh'),
    lendingPoolCreditAccount: new PublicKey('8kLAk9EiLV6qePNEtjnDLyWbRsySgMPSTihdWAEEv9H9'),
  },
  SAMO: {
    programId: lendProgramId,
    tokenMint: TOKENS.SAMO.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('HJLkovTpxof1z9tVMuX1pWp1ePDx1zgmnGYfFMxFRAd'),
    lendingPoolTknAccount: new PublicKey('J198uwytk8CPejCyNM9TMPJcLPCky6pZwGwP3n1CUfto'),
    lendingPoolFeeAccount: new PublicKey('J198uwytk8CPejCyNM9TMPJcLPCky6pZwGwP3n1CUfto'),
    lendingPoolShareMint: new PublicKey('A9H3fAqkWmRnnFzXXzydZHzyLQdzK5o9dMejCL27tqq8'),
    lendingPoolShareAccount: new PublicKey('HP3sKy5xqLkoNnbuHRCPuFaQUtYskNnockBPcYo5PZut'),
    lendingPoolCreditMint: new PublicKey('E5ejPudazVxEdQUsS37g8yUn5HD22FBHsGEKWkGRDR3F'),
    lendingPoolCreditAccount: new PublicKey('23tLfFHXZR1tAimzVyEAdN7HWJWiqvjepaX5qBHkgQvT'),
  },
  POLIS: {
    programId: lendProgramId,
    tokenMint: TOKENS.POLIS.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey("BWJkfNQnYt817V6sKxEJ3sFcivcXZgfKGCe8Z9f4LcVj"),
    lendingPoolTknAccount: new PublicKey("7Ad6djoPLzigyBnnWjoLh2gQ6Tbw2s6kAdsaVUBq6L8N"),
    lendingPoolFeeAccount: new PublicKey("7Ad6djoPLzigyBnnWjoLh2gQ6Tbw2s6kAdsaVUBq6L8N"),
    lendingPoolShareMint: new PublicKey("FenVvq6s6S3McD1BCm76Ktz1EvRNCB4qYKGFU76fB7Fj"),
    lendingPoolShareAccount: new PublicKey("GKTqMGVCgXJaDzjYfPdgMbVfnzCKDj6KqRpykauw19do"),
    lendingPoolCreditMint: new PublicKey("EkKFNt7PBRdWy8EpmZAbAZdvXZpSKvdwMfo8eotN1PEr"),
    lendingPoolCreditAccount: new PublicKey("FGKikDsnBPQ5m7jgbNNbHaR1gh1T8GYJ5sPYWoYdoE4p"),
  },
  ATLAS: {
    programId: lendProgramId,
    tokenMint: TOKENS.ATLAS.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey("FnkmnUqazYmSm791rSTSXYbAzDzsuHJBgySgNZeCHGDJ"),
    lendingPoolTknAccount: new PublicKey("E5ovYitzudRyUy7AS4U52eFgrq1rjr773rRGpYax1nmD"),
    lendingPoolFeeAccount: new PublicKey("E5ovYitzudRyUy7AS4U52eFgrq1rjr773rRGpYax1nmD"),
    lendingPoolShareMint: new PublicKey("4mygt5bFQrbXH9gNg75j1KVTrKGhvcYiQjir6FJ8afYH"),
    lendingPoolShareAccount: new PublicKey("Eb4Ai2PXmRX3V9TX6awjNdBXZKGRyCgTmQu6Pni9NnTb"),
    lendingPoolCreditMint: new PublicKey("3nAgm2XrSi3RNDWz4wCvUWwQW3QQE7s5i7MxNz8r8mGZ"),
    lendingPoolCreditAccount: new PublicKey("3PwecBTLVt8zqKadSFDjeKH7Swzt1GxvU27urj66L89P"),
  },
  GENE: {
    programId: lendProgramId,
    tokenMint: TOKENS.GENE.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('FrgyPPEPNC25ihob4ZobP3eYjh8uBoxLiobdMDX2EsMc'),
    lendingPoolTknAccount: new PublicKey('A4UMfr97y35AvCaakKRAE5UBsb4UuvRQ2JiT23dyzDFu'),
    lendingPoolFeeAccount: new PublicKey('A4UMfr97y35AvCaakKRAE5UBsb4UuvRQ2JiT23dyzDFu'),
    lendingPoolShareMint: new PublicKey('9z3eDHueAMdUtym9Q2ku3hi5YXHTYjpFLp1YEEnxUHPV'),
    lendingPoolShareAccount: new PublicKey('58teG2GNEoeYQUBa3VxQe5ZH5SPCZ6nUsrCuN5akbaQS'),
    lendingPoolCreditMint: new PublicKey('2KR5Q6zCik6kFyiWPMMVCKC5HDAP6joGNhKhbEv6nFdY'),
    lendingPoolCreditAccount: new PublicKey('7LBnkdaCZsM82t7G5MYKBoYAZetcnsqfU1cABxnPoquw'),
  },
  SONAR: {
    programId: lendProgramId,
    tokenMint: TOKENS.SONAR.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),

    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('3USSy3sAZSCnUiCZJaTFt5hCHWSw87kg8tNPaEZh1p9D'),
    lendingPoolTknAccount: new PublicKey('2F2yrLZQa3av7PxW7vdqiYBV4AwTbkCdswgN2BYGgtvs'),
    lendingPoolFeeAccount: new PublicKey('2F2yrLZQa3av7PxW7vdqiYBV4AwTbkCdswgN2BYGgtvs'),
    lendingPoolShareMint: new PublicKey('FvHrhBTTgo7q8uDX7gN5f7YzSXMrf3mwYtkay5NvkJzg'),
    lendingPoolShareAccount: new PublicKey('DPMixAHcMsryStgytYBhvvtR2WbvyRxkMwG147NmXEPS'),
    lendingPoolCreditMint: new PublicKey('HsKN1EC5zcArg1yoq1tMg7JKfxPW9m644mqCphrbLMC'),
    lendingPoolCreditAccount: new PublicKey('7zqtZ8LhBYUUXoDCwDFcdLgNkYo8tZZqTdoFJqAL5ie8'),
  },

  DFL: {
    programId: lendProgramId,
    tokenMint: TOKENS.DFL.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),

    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('74fWq2xnHBP1W6QhLDazCZAuZvp9XY3ck1PGNJg9hfhi'),
    lendingPoolTknAccount: new PublicKey('5QNHLaujxMgFKYaJM55uYb3jyMGgvspizg7S5eVAD3d8'),
    lendingPoolFeeAccount: new PublicKey('5QNHLaujxMgFKYaJM55uYb3jyMGgvspizg7S5eVAD3d8'),
    lendingPoolShareMint: new PublicKey('CGhMaGeVLxxQGJh6Y2bEYfLazumuFyEXpxF1UgrcMRJi'),
    lendingPoolShareAccount: new PublicKey('EHUF88xvJZyXzosAQ7Jzx5ozdvxCfZuwppSEo5b9pe2S'),
    lendingPoolCreditMint: new PublicKey('26Eo8VcgDuNZSn8x5infdYxDKs7mYZj4JKxLUCkKP3DV'),
    lendingPoolCreditAccount: new PublicKey('GYZgKQmYZBosdS3PsSRv83CdPFAtTRXRZaqdFVUnumiw'),
  },

  // CAVE: {
  //   programId: lendProgramId,
  //   tokenMint: TOKENS.CAVE.mintAddress,
  //   marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
  //   marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),

  //   lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
  //   lendingPoolInfoAccount: new PublicKey('4hoQV8MoKnecGKuzvo29sR2jtkxkmiQHyzNXctZ3F9Ka'),
  //   lendingPoolTknAccount: new PublicKey('YsP7Jj2zdbyyAqjuSN7cVJSG38izimcJXvtdMJ639Ao'),
  //   lendingPoolFeeAccount: new PublicKey('YsP7Jj2zdbyyAqjuSN7cVJSG38izimcJXvtdMJ639Ao'),
  //   lendingPoolShareMint: new PublicKey('CYMKtPi9KmaGJVWm6A2v7zbR8ARh49r3qLPBbdFiVzf6'),
  //   lendingPoolShareAccount: new PublicKey('Dzg2xe7wcKeC5PF47Nv3hVfo9tXEch4cw6gobZRknhEs'),
  //   lendingPoolCreditMint: new PublicKey('Bby7VbTHvpseY7KFCwpRM5BnwVrhS9ReCaZNcHMcSV3i'),
  //   lendingPoolCreditAccount: new PublicKey('mBEqr9wEJR2fUFvjgzYCAKBQTaia7N5j2DQnFMgrtzP'),
  // },
  wbWBNB: {
    programId: lendProgramId,
    tokenMint: TOKENS.wbWBNB.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),

    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('6RnKftFywvw8sceeWUM623BYyMeW216276G4atZ23CrF'),
    lendingPoolTknAccount: new PublicKey('F7SQgbgunwx7PKc9i5zXJfSNsjU9xM5P8Sb18FCUBKyf'),
    lendingPoolFeeAccount: new PublicKey('F7SQgbgunwx7PKc9i5zXJfSNsjU9xM5P8Sb18FCUBKyf'),
    lendingPoolShareMint: new PublicKey('8EzbLKBQ8Rest1SWUtZR6zFvYTo4cCaQ73ni8sF9vtjA'),
    lendingPoolShareAccount: new PublicKey('DgBnJvW9iQT5sP5YyVHeNbRjG8Xd2d53f19a2451eXkV'),
    lendingPoolCreditMint: new PublicKey('6bMAnnzp3pim8wd8XypLGuqVFQ3LMuY3vkRRse1DkZ7o'),
    lendingPoolCreditAccount: new PublicKey('CFsjid6WFmsyZozJkj43ssA5rRmYa97mzvfs8eRYqBeZ'),
  },
  'stSOL': {
    programId: lendProgramId,
    tokenMint: TOKENS.stSOL.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),

    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('9ogtxmnUF94KaPn3dB3unT5yyu7rpzSwc5igysgqFxrU'),
    lendingPoolTknAccount: new PublicKey('85pJTrAVdjHNvgCcUtefwkSe9RDKnHueyvs2uTocWmWs'),
    lendingPoolFeeAccount: new PublicKey('85pJTrAVdjHNvgCcUtefwkSe9RDKnHueyvs2uTocWmWs'),
    lendingPoolShareMint: new PublicKey('HyxfDg47HKS1rQUXWvJH2XQhwEJM3AqrHU7sK9bSNt5h'),
    lendingPoolShareAccount: new PublicKey('3H64RCjRcHEJAJK9mZ3q1mBZJ2hWuv3tUvXVY7XgFL5L'),
    lendingPoolCreditMint: new PublicKey('Hhh5mQQMuWjmyUNyYFDtuXKFp9wptPuLYvH9x98FSDq8'),
    lendingPoolCreditAccount: new PublicKey('CRorEh6T7aXamCsjggckCMgF1ewVavo6CfXTPNkipson'),
  },
  SHDW: {
    programId: lendProgramId,
    tokenMint: TOKENS.SHDW.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),

    lendingPoolInfoAccount: new PublicKey('8NvPwUxtBohPg45bAmzzB45qLajpfptMVgqgu5vmCNgi'),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey('EoVqoTtczavGmATCagSQU11c74MkL8enp96fGkQz6uqK'),
    lendingPoolShareMint: new PublicKey('AJu1s738dGsZ8mV2XKTqjuMiAiqNGaRsixTR4Czx4mJ2'),
    lendingPoolShareAccount: new PublicKey('48YJFjo3zLGSkUDXpa8mte3EMFNSPvy6pE9wUhoPSLnH'),
    lendingPoolCreditMint: new PublicKey('3fu3y5yGbBPqDpwKjN1PsVurm4af6uQnpkkuSo5SxZQa'),
    lendingPoolCreditAccount: new PublicKey('2zxQFrSGMSWbHMzMjxDN8ceqgbJVUyyEEwR75R5zzh4M'),
    lendingPoolFeeAccount: new PublicKey('3H3QXT9oEG5DaoWfQ727jgJdhVewgrTNc8jsGgBsXvQE'),
  },
  BASIS: {
    programId: lendProgramId,
    tokenMint: TOKENS.BASIS.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),

    lendingPoolInfoAccount: new PublicKey('499SnZR7dFzLU6BF9v9obfSCsmgui3FBtYtFDakD89zQ'),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey('E85Eyi4NmBp2Der1ntoNNx3AH5FHmjp4gGoUPW7qYVJ8'),
    lendingPoolShareMint: new PublicKey('9s2iRZBzSNCNTUtuzSRHcv3q4Q9SaFFhSFZVnFXGtHUp'),
    lendingPoolShareAccount: new PublicKey('5phQAZCwdfbYqj1tsv4xYWREpLZuxhqnMaZ126RAfVNb'),
    lendingPoolCreditMint: new PublicKey('AVRoCxDDfx525L1XJJ5JbKrPPbuHs1JL6Z17vWS3HpKc'),
    lendingPoolCreditAccount: new PublicKey('FeMzBdYfGJtqeRAadiC4fStY13cjxe6GutTyFCFsP1vL'),
    lendingPoolFeeAccount: new PublicKey('CtdMN3hrU9yq2GJpojbU1oQZbMXJyuVZYMfNkAPbgaZN'),
  },
  wUST: {
    programId: lendProgramId,
    tokenMint: TOKENS.wUST.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),

    lendingPoolInfoAccount: new PublicKey('G1PYcFc56DQHDjSyt8zRKcnxbBrKJq4Vehurzrt2KUzs'),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolTknAccount: new PublicKey('DKYpvhtPyU9yWkGZx5VM4fA1isLwpcmQ8ttqhPJgMMrJ'),
    lendingPoolShareMint: new PublicKey('FPnFwW1ASFLBReVz1EPWVGkbrsnrekVkEcQnrBRkvDXS'),
    lendingPoolShareAccount: new PublicKey('MeLTPseZyHm2aWSk9Gda9d6xWM8DS5QySFKBS3Vyzsv'),
    lendingPoolCreditMint: new PublicKey('AbPJaMzRetUebzRV3mtoXtyPDVwEBEHif3EibVKhfcTs'),
    lendingPoolCreditAccount: new PublicKey('mYi2FARcy26GxkDuTneTybM75izMAR7swioxUMvyPRa'),
    lendingPoolFeeAccount: new PublicKey('5wTjKzJyEJHbjw4fsZM51fKBDwiq5JSA3bSzzRE2PXob'),
  },

  'GST': {
    programId: lendProgramId,
    tokenMint: TOKENS.GST.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    lendingPoolInfoAccount: new PublicKey('93zxnt1gPepvUjWYPP32uANnhAK6NNphGD6A2yQFhk4s'),
    lendingPoolTknAccount: new PublicKey('4Y7VyaAWEDaQSkeYXbXRf1d82ZPViVRZ7Dt4fjHKgotL'),
    lendingPoolShareMint: new PublicKey('4GDuSZwHUQvL6zga2UNdjgXSqXjcWaUYc4S36N9q4567'),
    lendingPoolShareAccount: new PublicKey('GjmnPLwAAA5aZCfN5sCwcbartonu8iyVMPqSnfkyvtC9'),
    lendingPoolCreditMint: new PublicKey('8Nq8YV7BYoe3dqdTX996TRDB2iYryAHbzZTXntt2A3Uo'),
    lendingPoolCreditAccount: new PublicKey('8dzJgZxp7rBEbKhvFYXTMXKLmkqscn9UXwzcGA14fEgN'),
    lendingPoolFeeAccount: new PublicKey('ERyCAJh59hn8187Kn6wiKpeXdnGw4hptrbn55vh9YJQ1'),
  },
  'GMT': {
    programId: lendProgramId,
    tokenMint: TOKENS.GMT.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey('9b5QWW2SqjmhRxtYTHXj6LFkmUkahrLAMQer3rEurd1k'),
    lendingPoolTknAccount: new PublicKey('7ZosDG7JWwXFnzhQ2aQ1ghCSQ9mrQzvH3ZhduhRPHgJB'),
    lendingPoolShareMint: new PublicKey('9R6toP3xTFBWoqwBY8bfjUj6Tyd5hyR192jY4NeMmkNg'),
    lendingPoolShareAccount: new PublicKey('BPPtMXgGkpo5HuDbiFyQWiA5r4BfxRWfwUA8XoKPixb7'),
    lendingPoolCreditMint: new PublicKey('B1yWMWp7nvSV2upJxFUxpUkDiZAVD2MabnRgaBtR14Dm'),
    lendingPoolCreditAccount: new PublicKey('6NvFHm9p6oSK8DJ9jurTMkC8KBo2hCk8UQm19Nub7R6X'),
    lendingPoolFeeAccount: new PublicKey('ejLn4fFkVS29aYksC87TQYwcu8wy1tvc2AySpfHGabQ'),
  },
  ZBC: {
    programId: lendProgramId,
    tokenMint: TOKENS.ZBC.mintAddress,
    marketInfoAccount: new PublicKey("4XNif294wbrxj6tJ8K5Rg7SuaEACnu9s2L27i28MQB6E"),
    lendingMarketAuthority: new PublicKey("sCDiYj7X7JmXg5fVq2nqED2q1Wqjo7PnqMgH3casMem"),
    marketOwner: new PublicKey("7MBLg6oV5phip11YBbJPuq7u38kdzSi9PM3BifKSpLaR"),
    lendingPoolInfoAccount: new PublicKey('6uPerEUyomCC5qn4z9xF3fbVa7SCytcKoCVannPDez5R'),
    lendingPoolTknAccount: new PublicKey('7quTFi1N9EZfz7jUx7ui9wx9rk1rb3F1Enjbh8Me2tSs'),
    lendingPoolShareMint: new PublicKey('HUry6RSbDasMfU7LXZ5QR42YajkbMuLBQkyV742xgFKx'),
    lendingPoolShareAccount: new PublicKey('BHuVdzrDTssFdWTqt15fsdJzJuHESQrMhSnc3jsJ8X2Y'),
    lendingPoolCreditMint: new PublicKey('ADWAgFjannL985LDKQsQ9B833BFDMj4q8qQappe2F3X9'),
    lendingPoolCreditAccount: new PublicKey('5xqkszmojpTFy3wGQTXFB7XoLyWXxw7ymmHN9iNYVdUK'),
    lendingPoolFeeAccount: new PublicKey('qt8KMibr5UcB1WZGVdgyFNGvmzEtp3faUqfcKDytLzq'),
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
    pool: 'wUST',
    scale: 6,
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
    pool: 'stSOL',
    scale: TOKENS.stSOL.decimals
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
    pool: 'SRM',
    scale: 6
  },
  {
    pool: 'ORCA',
    scale: 6
  },
  {
    pool: 'whETH',
    scale: 8
  },
  {
    pool: 'weUNI',
    scale: TOKENS.weUNI.decimals
  },
  {
    pool: 'weSUSHI',
    scale: TOKENS.weSUSHI.decimals
  },
  {
    pool: 'RAY',
    scale: 6
  },
  {
    pool: 'SAMO',
    scale: TOKENS.SAMO.decimals
  },
  {
    pool: 'POLIS',
    scale: TOKENS.POLIS.decimals
  },
  {
    pool: 'ATLAS',
    scale: TOKENS.ATLAS.decimals
  },
  {
    pool: 'GENE',
    scale: TOKENS.GENE.decimals
  },
  // {
  //   pool: 'SONAR',
  //   scale: TOKENS.SONAR.decimals
  // },
  {
    pool: 'DFL',
    scale: TOKENS.DFL.decimals
  },
  // {
  //   pool: 'CAVE',
  //   scale: TOKENS.CAVE.decimals
  // },
  {
    pool: 'wbWBNB',
    scale: TOKENS.wbWBNB.decimals
  },
  {
    pool: 'SHDW',
    scale: TOKENS.SHDW.decimals
  },
  {
    pool: 'BASIS',
    scale: TOKENS.BASIS.decimals
  },
  {
    pool: 'GST',
    scale: TOKENS.GST.decimals
  },
  {
    pool: 'GMT',
    scale: TOKENS.GMT.decimals
  },
  {
    pool: 'ZBC',
    scale: TOKENS.ZBC.decimals
  }
];
