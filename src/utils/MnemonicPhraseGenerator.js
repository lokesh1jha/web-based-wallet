import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

const MnemonicPhraseGenerator = () => {
    const mn = bip39.generateMnemonic(wordlist);
    console.log(mn);
    return mn;
};

export default MnemonicPhraseGenerator;
