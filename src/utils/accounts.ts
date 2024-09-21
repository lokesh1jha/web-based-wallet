'use client';
import { createSolanaWallet } from "./tokens/solana";
import { createEthereumWallet } from "./tokens/etherum";

export interface Wallet {
    name?: string;
    symbol: string
    publicKey: string;
    privateKey: string;
}
// Define types for account object
export interface Account {
    name: string;
    wallets: Wallet[];
}

// Define types for the function parameters and return values
export function addAccount(account: Account): void {
    let accounts: Account[] = JSON.parse(localStorage.getItem("accounts") || "[]");
    console.log(accounts);
    accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

export function getAccounts(): Account[] {
    let accounts = localStorage.getItem("accounts");
    return accounts ? JSON.parse(accounts) : [];
}


export async function createNewWallet(): Promise<Account> {
    try {
        console.log("Creating new wallet...");
        const solanaWallet = await createSolanaWallet();
        const etherumWallet = createEthereumWallet();
        const accountsCount = getAccounts().length;
        const newAccount = {
            name: "Account " + (accountsCount + 1),
            wallets: [{
                name: solanaWallet.name || "Solana Account",
                symbol: solanaWallet.symbol,
                publicKey: solanaWallet.publicAddress,
                privateKey: solanaWallet.privateKey
            }, {
                name: etherumWallet.name || "Ethereum Account",
                symbol: etherumWallet.symbol,
                publicKey: etherumWallet.publicAddress,
                privateKey: etherumWallet.privateKey
            }],
        }
        return newAccount;
    } catch (error: any) {
        console.error("Error creating new wallet:", error);
        throw new Error("Error creating new wallet: " + error.message);
    }
}

// export async function sendEthTo(senderAddress: string, receiverAddress: string, amountToSend: string): Promise<void> {
//     try {
//         const url = 'https://eth-mainnet.g.alchemy.com/v2/hbbeJpn0pQXOFr6NKVavbhwWChKQlXjj';
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 jsonrpc: "2.0",
//                 id: 1,
//                 method: "eth_sendTransaction",
//                 params: [{
//                     from: senderAddress,
//                     to: receiverAddress,
//                     value: parseInt(amountToSend, 10).toString(16) // Convert amount to hexadecimal
//                 }]
//             }),
//         });
//         const data = await response.json();
//         console.log(data);
//         alert("Transaction sent successfully");
//     } catch (error: any) {
//         console.error("Error sending transaction:", error);
//         throw new Error("Error sending transaction: " + error.message);
//     }
// }
