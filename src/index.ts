import { createSigner } from "./features/account/createSigner";
import { deployTestERC20Factory } from "./features/contract/deployTestERC20Factory";

const main = async () => {
	const signer = await createSigner();
	
	// TUSDデプロイ
	const tusd = await deployTestERC20Factory("Test USD", "TUSD", 18, signer);
	console.log(`TUSD deployed at ${await tusd.getAddress()}`);

};

(async () => {
	await main();
})();


