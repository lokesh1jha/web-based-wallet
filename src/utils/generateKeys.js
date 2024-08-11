import { HDNodeWallet, Wallet } from "ethers";
import * as bip39 from '@scure/bip39';

export function deriveEthereumWallet(
  seed,
  derivationPath
) {
  const privateKey = deriveEthereumPrivateKey(seed, derivationPath);
  return {wallet: new Wallet(privateKey), privateKey};
}

export function deriveEthereumPrivateKey(
  seed,
  derivationPath
) {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  return child.privateKey;
}

/**
 * Validate an Ethereum private key
 */
export function getEthereumWallet(privateKey) {
  let wallet;
  try {
    wallet = new Wallet(privateKey);
  } catch {
    throw new Error("Invalid Ethereum private key");
  }
  return wallet;
}

/**
 * Convert a mnemonic phrase to a seed.
 * @param {string} mnemonic - The mnemonic phrase (12 or 24 words) as a single string.
 * @returns {Buffer} - The seed buffer
 */
export function convertMnemonicToSeed(mnemonic) {
  try {
    // Convert mnemonic phrase to seed
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    return seed;
  } catch (error) {
    console.error("Error converting mnemonic to seed:", error);
    throw error;
  }
}