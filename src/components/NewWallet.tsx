'use client';

import CreatePassword from '@/components/CreatePassword';
import MnemonicPhrase from '@/components/MnemonicPhrase';
import { createNewWallet } from '@/utils/accounts';
import MnemonicPhraseGenerator from '@/utils/MnemonicPhraseGenerator';
import React, { useState, useEffect } from 'react';

function NewWallet() {
    const [password, setPassword] = useState<string>("");
    const [mnemonicPhrase, setMnemonicPhrase] = useState<string>("");

    // Function to generate and store the mnemonic phrase
    function createSeedPhrase() {
        const generatedMnemonic = MnemonicPhraseGenerator();
        setMnemonicPhrase(generatedMnemonic);
        console.log("Generated Mnemonic Phrase:", generatedMnemonic);
        localStorage.setItem("seed", generatedMnemonic);
    }

    // Only create the Solana account once, when the password is set
    useEffect(() => {
        if (password && !mnemonicPhrase) {
            createSeedPhrase();
            createNewWallet();
        }
    }, [password]);

    const handleOnNext = () => {
        window.location.reload();
    };

    let content;

    if (!password) {
        // Step 1: Password creation
        content = <CreatePassword setPassword={setPassword} />;
    } else if (mnemonicPhrase) {
        // Step 2: Display Mnemonic phrase after generating it
        content = (
            <MnemonicPhrase
                mnemonicPhrase={mnemonicPhrase}
                onNext={handleOnNext}
            />
        );
    }

    return (
        <div className="flex items-center justify-center">
            <div className="content">{content}</div>
        </div>
    );
}

export default NewWallet;
