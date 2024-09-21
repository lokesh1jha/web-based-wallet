import { convertMnemonicToSeed, deriveEthereumWallet } from "@/utils/generateKeys";
export const ETHERUM_SYMBOL = 'eth'

// Define types for account object
interface Account {
    name: string;
    symbol: string;
    publicAddress: string;
    privateKey: string;
}


interface Response {
    data: any,
    status: number,
    message: string
}


// Helper function to get the derivation path
function getDerivationPath(account: number, addressIndex: number, coinType: number = 60): string {
    const purpose = 44; // BIP-44 standard
    const change = 0; // External address
    return `m/${purpose}'/${coinType}'/${account}'/${change}/${addressIndex}`;
}

// Create Ethereum wallet using mnemonic seed
export function createEthereumWallet(): Account {
    try {
        const seed = localStorage.getItem("seed") || ""; // Retrieve the seed from localStorage
        const accountCount = getAccounts().length;
        const derivationPath = getDerivationPath(0, accountCount); // Derive path

        const mnemonicPhrase = convertMnemonicToSeed(seed);
        const ethWalletObject = deriveEthereumWallet(mnemonicPhrase, derivationPath); // Derive wallet

        const newAccount = {
            name: `Etherum Account-${accountCount + 1}`,
            symbol: ETHERUM_SYMBOL,
            publicAddress: ethWalletObject.wallet.address,
            privateKey: ethWalletObject.privateKey,
        };

        return newAccount;
    } catch (error: any) {
        console.error("Error creating Ethereum wallet:", error);
        throw new Error("Error creating Ethereum wallet: " + error.message);
    }
}


// Get all Ethereum accounts from localStorage
export function getAccounts(): Account[] {
    const accounts = localStorage.getItem("accounts");
    return accounts ? JSON.parse(accounts) : [];
}

// Get Ethereum balance by address
export async function getEthereumBalance(ethAddress: string): Promise<string> {
    const devnetURL = 'https://eth-sepolia.g.alchemy.com/v2/2x4uoQcn--CgdIKiNlfgV-wGsKqhJvRE';

    try {
        const response = await fetch(devnetURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBalance",
                params: [ethAddress, "latest"],
            }),
        });

        const data = await response.json();
        return weiToEther(data.result);
    } catch (error: any) {
        console.error("Error fetching balance:", error);
        throw new Error("Error fetching balance: " + error.message);
    }
}

// Convert Wei (smallest Ethereum unit) to Ether
function weiToEther(wei: string): string {
    const weiDecimal = BigInt(wei);
    const decimalPlaces = 18;
    const ether = weiDecimal * BigInt(10 ** decimalPlaces) / BigInt(10 ** 18);
    const etherStr = ether.toString();
    const integerPart = etherStr.slice(0, -decimalPlaces) || '0';
    const fractionalPart = etherStr.slice(-decimalPlaces);
    return `${integerPart}.${fractionalPart} ETH`;
}

// Send Ethereum transaction
export async function sendEthereumTransaction(senderAddress: string, receiverAddress: string, amountToSend: string): Promise<Response> {
    const devnetURL = 'https://eth-sepolia.g.alchemy.com/v2/2x4uoQcn--CgdIKiNlfgV-wGsKqhJvRE';

    try {
        const response = await fetch(devnetURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "eth_sendTransaction",
                params: [{
                    from: senderAddress,
                    to: receiverAddress,
                    value: parseInt(amountToSend, 10).toString(16) // Convert amount to hexadecimal
                }],
            }),
        });

        const data = await response.json();
        console.log("Ethereum Transaction:", data);
        return { data: data, status: 200, message: "Transaction sent successfully" };
    } catch (error: any) {
        console.error("Error sending transaction:", error);
        throw new Error("Error sending transaction: " + error.message);
    }
}
