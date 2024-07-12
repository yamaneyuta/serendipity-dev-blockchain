import { ethers } from "ethers";

const HOST = "http://127.0.0.1:8545";
const MNEMONIC = "test test test test test test test test test test test junk";

export const createSigner = async() => {
    const provider = createProvider();
    const wallet = createWallet();

    const signer = await wallet.connect(provider);
    return signer;
};

const createProvider = () => {
    return new ethers.JsonRpcProvider(HOST, undefined, { staticNetwork: true });
};

const createWallet = () => {
    return ethers.HDNodeWallet.fromMnemonic(ethers.Mnemonic.fromPhrase(MNEMONIC));
};

