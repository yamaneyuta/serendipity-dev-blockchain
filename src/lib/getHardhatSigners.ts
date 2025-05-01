import { HDNodeWallet, Mnemonic, NonceManager, Signer } from "ethers";
import { getHardhatProvider } from "./getHardhatProvider";

const MNEMONIC = "test test test test test test test test test test test junk";
const HARDHAT_DEFAULT_ACCOUNT_NUM = 10; // Hardhatが生成するアカウント数
/**
 * ETHを所有するアカウント一覧を取得します
 */
export const getHardhatSigners = async (num?: number) => {
    const signers: Signer[] = [];
    const mnemonic = Mnemonic.fromPhrase(MNEMONIC);
    const provider = await getHardhatProvider();

    num = num || HARDHAT_DEFAULT_ACCOUNT_NUM;
    for (let i = 0; i < num; i++) {
        const wallet = HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`);
        signers.push(await wallet.connect(provider));
    }
    return signers;
};