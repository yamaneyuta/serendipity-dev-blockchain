import { createSigner } from "../account/createSigner";

export const waitForNetworkReady = async (maxWaitSec: number) => {
    const loopMax = maxWaitSec;
    for (let i = 0; i < loopMax; i++) {
        try {
            const signer = await createSigner();
            await signer.provider!.getNetwork();
            break;
        } catch (e) {
            console.log("Network is not ready yet. Retry in 1 second...");
            await new Promise((resolve) => setTimeout(resolve, 1000));  // 1秒待機
        }
    }
}
