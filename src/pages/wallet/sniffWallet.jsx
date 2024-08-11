import React, { useEffect, useState } from "react";
import { createNewWallet, getAccounts } from "../../utils/accounts";

const SniffWallet = () => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const accounts = getAccounts();
        setAccounts(accounts);
        setCurrentAccount(accounts[0]);
    }, [])
    const getBalance =  (address) => {
        console.log(address);
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const balance = await provider.getBalance(currentAccount.address);
        // console.log(balance);
        return "0 ETH";
    }

    function handleAccountChange(e) {
        const selectedAccount = accounts.find(account => account.address === e.target.value);
        setCurrentAccount(selectedAccount);
        console.log(selectedAccount);
    }
    
    function createANewWallet() {
        createNewWallet();
        alert("New Wallet Created");
        window.location.reload();
    }

    return (
        <div className="home-container">
            <div className="content">
                <h1 className="title">Sniff 🐕 Wallet</h1>
                <div>
                    <select name="account" id="accounts" onChange={handleAccountChange} style={{ fontSize: "20px", padding: "10px", borderRadius: "5px", marginBottom: "20px"}}>
                        {accounts.map((account, index) => (
                            <option key={index} value={account.address}>
                                {account.name}
                            </option>
                        ))}
                    </select>

                    {currentAccount && (
                        <div>
                            <p>Account Address: {currentAccount?.address}</p>
                        </div>
                    )}
                </div>
                <div className="balance-container">
                    <div style={{ marginRight: "15px" }}>Balance :</div>  
                    <div className="balance">{getBalance(currentAccount?.address)}</div>
                </div  >
                    <div className="balance-container">
                <button className="create-wallet-button" style={{ marginTop: "20px" }}>Send</button>
                <button className="create-wallet-button" style={{ marginTop: "20px", marginLeft: "20px" }} onClick={createANewWallet}>New Account</button>
            </div>
            </div>
        </div>
    );
};

export default SniffWallet;