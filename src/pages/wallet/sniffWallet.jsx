import React, { useEffect, useState } from "react";

const SniffWallet = () => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const accounts = [
        {
            name: "Account 1",
            address: "0xF0E29C9154c491f9f1bb31F8BFc6C2b92A4A8b9d",
        },
        {
            name: "Account 2",
            address: "0xabcdef1234567890abcdef1234567890",
        },
        {
            name: "Account 3",
            address: "0x1134567890abcdef1234567890abcdef",
        },
    ]

    useEffect(() => {
        setCurrentAccount(accounts[0]);
    }, [])
    const getBalance =  (address) => {
        console.log(address);
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const balance = await provider.getBalance(currentAccount.address);
        // console.log(balance);
        return "10 ETH";
    }

    function handleAccountChange(e) {
        const selectedAccount = accounts.find(account => account.address === e.target.value);
        setCurrentAccount(selectedAccount);
        console.log(selectedAccount);
    }
    return (
        <div className="home-container">
            <div className="content">
                <h1 className="title">Sniff Wallet</h1>
                <div>
                    <select name="account" id="accounts" onChange={handleAccountChange}>
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
                </div>

                <button className="create-wallet-button" style={{ marginTop: "20px" }}>Send</button>
            </div>
        </div>
    );
};

export default SniffWallet;