import { Provider } from "ethers";

export const waitForNetworkReady = async (provider: Provider, maxWaitSec: number) => {
    const loopMax = maxWaitSec;
    for (let i = 0; i < loopMax; i++) {
        try {
            await provider!.getNetwork();
            break;
        } catch (e) {
            console.log("Network is not ready yet. Retry in 1 second...");
            await new Promise((resolve) => setTimeout(resolve, 1000));  // 1秒待機
        }
    }
}
