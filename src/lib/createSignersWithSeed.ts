import crypto from 'node:crypto';
import { JsonRpcProvider, NonceManager, Provider, Signer, Wallet } from 'ethers';

const DEFAULT_CREATE_SIGNERS_NUM = 10;

/**
 * seed文字列を元にウォレットを生成します
 * ※ 開発用です。本番環境では絶対に使用しないでください。
 */
export const createSignersWithSeed = async (provider: Provider, seed: string, options?: { num?: number }) => {
    const privateKeys = createPrivateKeys(seed, options?.num || DEFAULT_CREATE_SIGNERS_NUM);

    // 生成した秘密鍵からSignerを作成
    const signers: Signer[] = [];
    for (const privateKey of privateKeys) {
        const wallet = new NonceManager(new Wallet(privateKey));
        signers.push(await wallet.connect(provider));

        // この後デプロイ処理が実施できるよう、ウォレットにETHを付与
        const initETH = 1_000_000_000_000_000_000n; // 1ETH
        await (provider as JsonRpcProvider).send('hardhat_setBalance', [
            await wallet.getAddress(),
            '0x' + initETH.toString(16),
        ]);
    }
    return signers;
};

/**
 * 秘密鍵を指定した数だけ生成します
 * ※ ここではSHA256のハッシュ値を秘密鍵としていますが、本番環境ではこのような生成方法はしないでください。
 */
const createPrivateKeys = (seed: string, num: number) => {
    const privateKeys: string[] = [];
    for (let i = 0; i < num; i++) {
        const sha256 = crypto.createHash('sha256');
        const privateKey = sha256.update(seed + i).digest('hex');
        // 先頭に0xをつける
        privateKeys.push('0x' + privateKey);
    }
    return privateKeys;
}
