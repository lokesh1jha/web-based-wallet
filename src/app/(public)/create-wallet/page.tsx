'use client';

import CreatePassword from '@/components/CreatePassword';
import MnemonicPhrase from '@/components/MnemonicPhrase';
import { createNewWallet } from '@/utils/accounts';
import MnemonicPhraseGenerator from '@/utils/MnemonicPhraseGenerator';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'


function CreateWallet() {
    const [password, setPassword] = useState<string>("");
    const [mnemonicPhrase, setMnemonicPhrase] = useState<string>("");
    const [onNext, setOnNext] = useState<boolean>(false);
    const router = useRouter(); 

    useEffect(() => {
        if (password.length > 0) {
            console.log("Password is set");
            if (localStorage.getItem("accounts")) {
                router.push('/wallet');
            }
            else if (!mnemonicPhrase) {
                const generatedMnemonic = MnemonicPhraseGenerator();
                setMnemonicPhrase(generatedMnemonic);
                console.log("Generated Mnemonic Phrase:", generatedMnemonic);
                localStorage.setItem("seed", generatedMnemonic);
                createNewWallet();
            }
        }
    }, [password, mnemonicPhrase, router]);

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
        if (localStorage.getItem("accounts")) {
            router.push('/wallet');
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
