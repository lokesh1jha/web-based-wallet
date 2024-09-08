// import { Connection, Keypair, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';

// const network = 'https://api.mainnet-beta.solana.com'; 

// async function transferSol(senderPrivateKey: Uint8Array, recipientPublicKey: string, amountInSOL: number): Promise<void> {
//     // Create a connection to the Solana cluster
//     const connection = new Connection(network, 'confirmed');

//     // Create sender wallet instance from private key
//     const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);
//     const senderPublicKey = senderKeypair.publicKey;

//     // Convert amount from SOL to lamports (1 SOL = 1,000,000,000 lamports)
//     const amountInLamports = amountInSOL * 1e9;

//     // Create recipient public key
//     const recipientPublicKeyObj = new PublicKey(recipientPublicKey);

//     // Create a transaction instruction to transfer SOL
//     const transactionInstruction = SystemProgram.transfer({
//         fromPubkey: senderPublicKey,
//         toPubkey: recipientPublicKeyObj,
//         lamports: amountInLamports,
//     });

//     // Create a new transaction
//     const transaction = new Transaction().add(transactionInstruction);

//     // Send and confirm the transaction
//     try {
//         // Sign transaction
//         const signature: TransactionSignature = await connection.sendTransaction(transaction, [senderKeypair]);
//         console.log(`Transaction signature: ${signature}`);

//         // Wait for confirmation
//         const confirmation = await connection.confirmTransaction(signature, 'confirmed');
//         console.log(`Transaction confirmed in block: ${confirmation.context.slot}`);
//     } catch (error) {
//         console.error('Error sending transaction:', error);
//     }
// }

