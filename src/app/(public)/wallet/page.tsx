'use client';

import React, { useEffect, useState } from "react";
import { createNewWallet, getAccountBalance, getAccounts } from "@/utils/accounts";

// Define types for the account object
interface Account {
    address: string;
    name: string;
}

const SniffWallet: React.FC = () => {
    const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [balance, setBalance] = useState<string>("....");
    const [isSend, setIsSend] = useState<boolean>(false);
    const [receiverAddress, setReceiverAddress] = useState<string>("");
    const [amountToSend, setAmountToSend] = useState<string>("");

    useEffect(() => {
        const fetchAccounts = () => {
            const accounts = getAccounts();
            console.log(accounts, "accounts");
            setAccounts(accounts);
            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            }
        };

        fetchAccounts();
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            if (currentAccount?.address) {
                const accountBalance = await getAccountBalance(currentAccount.address);
                setBalance(accountBalance);
            }
        };

        fetchBalance();
    }, [currentAccount]);

    const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedAccount = accounts.find(account => account.address === e.target.value);
        setCurrentAccount(selectedAccount || null);
    };

    const createANewWallet = () => {
        createNewWallet();
        alert("New Wallet Created");
        setAccounts(getAccounts());
    };

    const sendCrypto = () => {
        if (!receiverAddress || !amountToSend) {
            alert("Please enter a receiver address and amount.");
            return;
        }

        if (parseFloat(amountToSend) > parseFloat(balance)) {
            alert("Insufficient balance.");
            return;
        }

        // Call your send ETH function here
        // sendEthTo(currentAccount?.address || "", receiverAddress, amountToSend);
        console.log(`Sending ${amountToSend} ETH to ${receiverAddress}`);
    };

    return (
        <div className="home-container">
            <div className="content">
                <h1 className="title">Sniff 🐕 Wallet</h1>
                <div>
                    <select
                        name="account"
                        id="accounts"
                        onChange={handleAccountChange}
                        style={{ fontSize: "20px", padding: "10px", borderRadius: "5px", marginBottom: "20px" }}
                    >
                        {accounts.map((account, index) => (
                            <option key={index} value={account.address}>
                                {account.name}
                            </option>
                        ))}
                    </select>

                    {currentAccount && (
                        <div>
                            <p>Account Address: {currentAccount.address}</p>
                        </div>
                    )}
                </div>
                <div className="balance-container">
                    <div style={{ marginRight: "15px" }}>Balance :</div>
                    <div className="balance">{balance}</div>
                </div>
                <div className="balance-container">
                    <button
                        className="create-wallet-button"
                        style={{ marginTop: "20px" }}
                        onClick={() => setIsSend(true)}
                    >
                        Send
                    </button>

                    <button
                        className="create-wallet-button"
                        style={{ marginTop: "20px", marginLeft: "20px" }}
                        onClick={createANewWallet}
                    >
                        New Account
                    </button>
                </div>

                {isSend && (
                    <div style={{ marginTop: "20px" }}>
                        <div>
                            <input
                                type="text"
                                placeholder="Receiver Address"
                                value={receiverAddress}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReceiverAddress(e.target.value)}
                                style={{ fontSize: "20px", padding: "10px", borderRadius: "5px", marginBottom: "20px" }}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={amountToSend}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmountToSend(e.target.value)}
                                style={{ fontSize: "20px", padding: "10px", borderRadius: "5px", marginBottom: "20px" }}
                            />
                        </div>
                        <div>
                            <button
                                className="create-wallet-button"
                                style={{ marginTop: "20px", marginLeft: "20px" }}
                                onClick={() => setIsSend(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="create-wallet-button"
                                style={{ marginTop: "20px", marginLeft: "20px" }}
                                onClick={sendCrypto}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SniffWallet;
