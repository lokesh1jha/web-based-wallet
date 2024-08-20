import { HDNodeWallet, Wallet } from "ethers";
import * as bip39 from 'bip39';

// Define types for the function parameters and return values
export function deriveEthereumWallet(
  seed: Buffer,
  derivationPath: string
): { wallet: Wallet; privateKey: string } {
  const privateKey = deriveEthereumPrivateKey(seed, derivationPath);
  return { wallet: new Wallet(privateKey), privateKey };
}

export function deriveEthereumPrivateKey(
  seed: Buffer,
  derivationPath: string
): string {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  return child.privateKey;
}

/**
 * Validate an Ethereum private key
 * @param privateKey - The private key to validate
 * @returns The Wallet instance if the private key is valid
 * @throws Error if the private key is invalid
 */
export function getEthereumWallet(privateKey: string): Wallet {
  let wallet: Wallet;
  try {
    wallet = new Wallet(privateKey);
  } catch {
    throw new Error("Invalid Ethereum private key");
  }
  return wallet;
}

/**
 * Convert a mnemonic phrase to a seed.
 * @param mnemonic - The mnemonic phrase (12 or 24 words) as a single string.
 * @returns The seed buffer
 * @throws Error if conversion fails
 */
export function convertMnemonicToSeed(mnemonic: string): Buffer {
  try {
    // Convert mnemonic phrase to seed
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    return seed;
  } catch (error) {
    console.error("Error converting mnemonic to seed:", error);
    throw error;
  }
}
