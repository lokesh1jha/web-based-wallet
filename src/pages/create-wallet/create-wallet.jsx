import React, { useEffect, useState } from 'react';
import CreatePassword from '../../components/CreatePassword';
import MnemonicPhrase from '../../components/MnemonicPhrase';
import MnemonicPhraseGenerator from '../../utils/MnemonicPhraseGenerator';
import { createNewWallet } from '../../utils/accounts';
import { useNavigate } from 'react-router-dom';

function CreateWallet() {
    const [password, setPassword] = useState("");
    const [mnemonicPhrase, setMnemonicPhrase] = useState("");
    const [onNext, setOnNext] = useState(false);
    const navigate = useNavigate();

    // Check if the password is set
    useEffect(() => {
        if (password.length > 0) {
            console.log("Password is set");
            if (!mnemonicPhrase) {
                const generatedMnemonic = MnemonicPhraseGenerator();
                setMnemonicPhrase(generatedMnemonic);
                console.log("Generated Mnemonic Phrase:", generatedMnemonic);
                localStorage.setItem("seed", generatedMnemonic);
                createNewWallet()
            }
        } else 
        if(localStorage.getItem("accounts")) {
            navigate('/wallet'); 
        }
    }, [password, mnemonicPhrase, navigate]);

    let content;

    if (!password) {
        content = <CreatePassword setPassword={setPassword} />;
    } else if (!mnemonicPhrase || !onNext) {
        content = (
            <MnemonicPhrase
                mnemonicPhrase={mnemonicPhrase}
                setOnNext={setOnNext}
            />
        );
    } else {
        if(localStorage.getItem("accounts")) {
            navigate('/wallet'); 
        }
        content = <div>Congratulations !! Your wallet is created.</div>;
    }

    return (
        <div className="home-container">
            <div className="content">{content}</div>
        </div>
    );
}

export default CreateWallet;
