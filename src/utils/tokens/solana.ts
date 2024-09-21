import {
    Connection,
    Keypair,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
import * as bip39 from 'bip39';

export const SOLANA_SYMBOL = 'sol'

// Define types for Solana account object
interface SolanaAccount {
    name?: string;
    symbol: string
    publicAddress: string;
    privateKey: string;
}

interface Response {
    data: any,
    status: number,
    message: string
}

export const createSolanaConnection = (): Connection => {
    const solanaNetwork = "https://api.devnet.solana.com"; // Use Devnet for testing. Change to Mainnet for production.
    const connection = new Connection(solanaNetwork, "confirmed"); // "confirmed" gives finalized results
    return connection;
};


// Create a new Solana wallet
export async function createSolanaWallet(): Promise<SolanaAccount> {
    try {
        const seedPhrase = localStorage.getItem("seed") || "";

        if (!seedPhrase) {
            throw new Error("Seed phrase is missing. Create wallet first.");
        }

        // Derive a seed from the mnemonic
        const seed = await bip39.mnemonicToSeed(seedPhrase);

        // Use the first 32 bytes of the seed for ed25519 derivation
        const derivedSeed = seed.slice(0, 32);

        // Generate the keypair from the derived seed using ed25519
        const keypair = Keypair.fromSeed(Uint8Array.from(derivedSeed));

        // Convert private key (which is a 64-byte Uint8Array) to a comma-separated string for easier storage
        const privateKeyString = Array.from(keypair.secretKey).toString();

        // Return the public key (address) and private key
        return {
            name: "Solana Account",
            symbol: SOLANA_SYMBOL,
            publicAddress: keypair.publicKey.toString(),
            privateKey: privateKeyString,
        };
    } catch (error: any) {
        console.error("Error creating Solana wallet:", error);
        throw new Error("Error creating Solana wallet: " + error.message);
    }
}

// Get Solana balance by address
export async function getSolanaBalance(solAddress: string): Promise<string> {
    try {
        const connection = createSolanaConnection();
        const publicKey = new PublicKey(solAddress);
        const balance = await connection.getBalance(publicKey);
        return (balance / LAMPORTS_PER_SOL).toFixed(4) + " SOL";
    } catch (error: any) {
        console.error("Error fetching Solana balance:", error);
        throw new Error("Error fetching Solana balance: " + error.message);
    }
}

// Send SOL transaction
export async function sendSolTransaction(
    senderPrivateKey: string,
    receiverAddress: string,
    amountToSend: number
): Promise<Response> {
    try {
        const connection = createSolanaConnection();

        const privateKeyArray = JSON.parse(senderPrivateKey);
        const senderKeypair = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));

        const receiverPublicKey = new PublicKey(receiverAddress);
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: senderKeypair.publicKey,
                toPubkey: receiverPublicKey,
                lamports: amountToSend * LAMPORTS_PER_SOL,
            })
        );

        // Sign and send the transaction
        const signature = await connection.sendTransaction(transaction, [senderKeypair]);
        console.log("Solana Transaction Signature:", signature);
        return { data: signature, status: 200, message: "Transaction sent successfully" };
    } catch (error: any) {
        console.error("Error sending SOL transaction:", error);
        throw new Error("Error sending SOL transaction: " + error.message);
    }
}


