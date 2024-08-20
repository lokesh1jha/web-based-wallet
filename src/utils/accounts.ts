import { convertMnemonicToSeed, deriveEthereumWallet } from "@/utils/generateKeys";

// Define types for account object
interface Account {
    name: string;
    address: string;
    privateKey?: string; // Optional since it's not always needed
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

export async function getAccountBalance(address: string): Promise<string> {
    const url = 'https://eth-mainnet.g.alchemy.com/v2/hbbeJpn0pQXOFr6NKVavbhwWChKQlXjj';
    const devnetURL = 'https://eth-sepolia.g.alchemy.com/v2/2x4uoQcn--CgdIKiNlfgV-wGsKqhJvRE'
    console.log(address, typeof address);
    const response = await fetch(devnetURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [address, "latest"]
        }),
    });

    const data = await response.json();

    function weiToEther(wei: string) {
        const weiDecimal = BigInt(wei);
        
        const decimalPlaces = 18;
    
        const ether = weiDecimal * BigInt(10 ** decimalPlaces) / BigInt(10 ** 18);

        const etherStr = ether.toString();
        const integerPart = etherStr.slice(0, -decimalPlaces) || '0';

        const fractionalPart = etherStr.slice(-decimalPlaces);
        
        return `${integerPart}.${fractionalPart} ETH`;
    }
    
    let value: string = weiToEther(data.result);
    return value;
}

export function getDerivationPath(account: number, addressIndex: number, coinType: number = 60): string {
    if (account === undefined || addressIndex === undefined || account == null || addressIndex == null) {
        return "";
    }
    const purpose = 44; // BIP-44 standard
    const change = 0; // External address

    const path = `m/${purpose}'/${coinType}'/${account}'/${change}/${addressIndex}`;

    return path;
}

export function createNewWallet(): void {
    try {
        const seed = localStorage.getItem("seed") || "";
        const accountCount = getAccounts().length;
        const derivationPath = getDerivationPath(0, accountCount);

        const mnemonicPhrase = convertMnemonicToSeed(seed);

        const walletObject = deriveEthereumWallet(mnemonicPhrase, derivationPath);
        console.log(JSON.stringify(walletObject));

        const existingAccountsCount = getAccounts().length;
        addAccount({
            name: `Account-${existingAccountsCount + 1}`,
            address: walletObject.wallet.address,
            privateKey: walletObject.privateKey
        });
    } catch (error: any) {
        console.error("Error creating new wallet:", error);
        throw new Error("Error creating new wallet: " + error.message);
    }
}

export async function sendEthTo(senderAddress: string, receiverAddress: string, amountToSend: string): Promise<void> {
    try {
        const url = 'https://eth-mainnet.g.alchemy.com/v2/hbbeJpn0pQXOFr6NKVavbhwWChKQlXjj';
        const response = await fetch(url, {
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
                }]
            }),
        });
        const data = await response.json();
        console.log(data);
        alert("Transaction sent successfully");
    } catch (error: any) {
        console.error("Error sending transaction:", error);
        throw new Error("Error sending transaction: " + error.message);
    }
}
