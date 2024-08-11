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



export { addAccount, getAccounts, createNewWallet }