import React, { useEffect, useState } from 'react';
import CreatePassword from '../../components/CreatePassword';
import MnemonicPhrase from '../../components/MnemonicPhrase';
import MnemonicPhraseGenerator from '../../utils/MnemonicPhraseGenerator';

function CreateWallet() {
    const [password, setPassword] = useState("");
    const [mnemonicPhrase, setMnemonicPhrase] = useState("");
    const [onNext, setOnNext] = useState(false);

    // Check if the password is set
    useEffect(() => {
        if (password.length > 0) {
            console.log("Password is set");
            if (!mnemonicPhrase) {
                const generatedMnemonic = MnemonicPhraseGenerator();
                setMnemonicPhrase(generatedMnemonic);
                console.log("Generated Mnemonic Phrase:", generatedMnemonic);
            }
        } else {
            console.log("Password is not set");
        }
    }, [password, mnemonicPhrase]);

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
        content = <div>New Step</div>;
    }

    return (
        <div className="home-container">
            <div className="content">{content}</div>
        </div>
    );
}

export default CreateWallet;
