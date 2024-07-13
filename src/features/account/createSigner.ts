import { ethers, NonceManager } from "ethers";

const PORT = process.env.HARDHAT_PORT || "8545";
const HOST = `http://127.0.0.1:${PORT}`;
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
    return new NonceManager(ethers.HDNodeWallet.fromMnemonic(ethers.Mnemonic.fromPhrase(MNEMONIC)));
};

