import { Provider, JsonRpcProvider } from "ethers";

export const getHardhatProvider = async (): Promise<Provider> => {
    return new JsonRpcProvider(await getHardhatHost(), undefined, { staticNetwork: true, pollingInterval: 0 });
};

/**
 * ローカルのHardhatに接続するためのURLを取得します
 */
const getHardhatHost = async () => {
    // 環境変数で指定されたポート番号を取得
    const port = process.env.HARDHAT_PORT;
    if (!port) {
        throw new Error("[0AAF6E52] `HARDHAT_PORT` environment variable is not set.");
    }

    return `http://127.0.0.1:${port}`;
};