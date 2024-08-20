import * as bip39 from 'bip39';

const MnemonicPhraseGenerator: () => string = () => {
    const mn = bip39.generateMnemonic();
    console.log(mn);
    return mn;
};

export default MnemonicPhraseGenerator;
