import { convertMnemonicToSeed, deriveEthereumWallet } from "./generateKeys";

/**
 *  
 * @param {string} account.name - The name of the account.
 * @param {string} account.address - The address of the account.
 **/
const addAccount = (account) => {
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    console.log(accounts);
    if (!accounts) {
        accounts = [];
    }
    accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(accounts));
}


/**
 * 
 * @returns {Array} - An array of accounts.
 */
const getAccounts = () => {
    let accounts = localStorage.getItem("accounts");
    return accounts ? JSON.parse(accounts) : [];
}

/**
 * 
 * @param {address} address 
 * @returns {balance} - String
 */
const getAccountBalance = async (address) => {
    const url = 'https://eth-mainnet.g.alchemy.com/v2/hbbeJpn0pQXOFr6NKVavbhwWChKQlXjj';
    
        console.log(address, typeof address);
        const response = await fetch(url, {
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
        return (data.result).split("x")[0] + " ETH";
}

/**
 * Generate a derivation path for an HD wallet.
 * 
 * @param {number} account - The account index.
 * @param {number} addressIndex - The address index.
 * @param {number} coinType - The coin type (e.g., 60 for Ethereum).
 * @returns {string} - The derivation path.
 */
const getDerivationPath = (account, addressIndex, coinType = 60) => {
    if (account === undefined || addressIndex === undefined || account == null || addressIndex == null) {
        return;
    }
    const purpose = 44; // BIP-44 standard
    // const coinType = 60; // Ethereum
    // const account = 0; // First account
    const change = 0; // External address
    // const addressIndex = 0; // First address

    const path = `m/${purpose}'/${coinType}'/${account}'/${change}/${addressIndex}`;

    return path;
}

function createNewWallet() {
    try {
        let seed = localStorage.getItem("seed");
        const accountCount = getAccounts().length;
        const derivationPath = getDerivationPath(0, accountCount);

        const mnemonicPhrase = convertMnemonicToSeed(seed);

        let walletObject = deriveEthereumWallet(mnemonicPhrase, derivationPath);
        console.log(JSON.stringify(walletObject));

        let exsistingAccountsCount = getAccounts().length;
        addAccount({
            name: `Account-${exsistingAccountsCount + 1}`,
            address: walletObject.wallet.address,
            privateKey: walletObject.privateKey
        })
    } catch (error) {
        console.error("Error creating new wallet:", error);
        throw new Error("Error creating new wallet:", error);
    }

}


const sendEthTo = async (senderAddress, receiverAddress, amountToSend) => {
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
                    value: amountToSend
                }]
            }),
        });
        const data = await response.json();
        console.log(data);
        alert("Transaction sent successfully");
    } catch (error) {
        console.error("Error sending transaction:", error);
        throw new Error("Error sending transaction:", error);
    }
}

export { addAccount, getAccounts, createNewWallet, getAccountBalance }