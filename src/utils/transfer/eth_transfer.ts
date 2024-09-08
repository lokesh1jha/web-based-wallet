import { ethers } from 'ethers';


const providerUrl = process.env.NODE_ENV == 'development'
    ? process.env.DEVNET_ETH_SEPOLIA_PROVIDER_URL
    : process.env.MAINET_ETH_PROVIDER_URL

export const sendEther = async (privateKey: string, recipientAddress: string, amountInEther: string) => {
    const provider = new ethers.JsonRpcProvider(providerUrl);

    const wallet = new ethers.Wallet(privateKey, provider);

    const amountInWei = ethers.parseEther(amountInEther);

    const tx = {
        to: recipientAddress,
        value: amountInWei,
        // Optional: Add gas limit and gas price if needed
        // gasLimit: 21000, // gas limit for a simple transfer
        // gasPrice: ethers.parseUnits('5', 'gwei'), 
    };

    try {
        // Send the transaction
        const txResponse = await wallet.sendTransaction(tx);
        console.log(`Transaction hash: ${txResponse.hash}`);

        // Wait for the transaction to be confirmed
        const receipt: any = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);

        return txResponse;
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

