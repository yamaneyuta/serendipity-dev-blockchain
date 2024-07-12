import { TransactionRequest, JsonRpcProvider } from "ethers";
import { ITestOracle } from "../typechain-types/contracts/oracle/ITestOracle";
import { createSigner } from "./features/account/createSigner";
import { deployTestERC20 } from "./features/contract/deployTestERC20";
import { deployTestOracle } from "./features/contract/deployTestOracle";

const main = async () => {
	const signer = await createSigner();
	const chainId = (await signer.provider!.getNetwork()).chainId;

	let ethusd: Awaited<ReturnType<typeof deployTestOracle>> | undefined;
	let jpyusd: Awaited<ReturnType<typeof deployTestOracle>> | undefined;
	let usdcusd: Awaited<ReturnType<typeof deployTestOracle>> | undefined;
	let maticusd: Awaited<ReturnType<typeof deployTestOracle>> | undefined;
	
	// hardhatのデフォルトチェーンIDのネットワークの時のみ、Oracleコントラクトをデプロイ
	if(chainId === 31337n) {
		// ETH/USDデプロイ
		// 	https://etherscan.io/address/0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419#readContract
		// 	RoundID: 110680464442257329221 のデータ(2024-07-12 00:55:35(UTC))
		ethusd = await deployTestOracle(8, "ETH / USD", 310965000000n, 1720745735, signer);
		console.log(`ETH/USD deployed at ${await ethusd.getAddress()}`);
	
		// JPY/USDデプロイ
		// 	https://etherscan.io/address/0xBcE206caE7f0ec07b545EddE332A47C2F75bbeb3#readContract
		// 	RoundID: 73786976294838215253 のデータ(2024-07-12 00:56:23(UTC))
		jpyusd = await deployTestOracle(8, "JPY / USD", 628525n, 1720745783, signer);
		console.log(`JPY/USD deployed at ${await jpyusd.getAddress()}`);
	
		// USDC/USDデプロイ
		// 	https://etherscan.io/address/0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6#readContract
		// 	RoundID: 36893488147419104943 のデータ(2024-07-11 08:00:35(UTC))
		usdcusd = await deployTestOracle(8, "USDC / USD", 100000000n, 1720684835, signer);
		console.log(`USDC/USD deployed at ${await usdcusd.getAddress()}`);
	
		// MATIC/USDデプロイ
		//	https://etherscan.io/address/0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676#readContract
		//	RoundID: 55340232221128685633 のデータ(2024-07-12 02:49:35(UTC))
		maticusd = await deployTestOracle(8, "MATIC / USD", 50276906n, 1720752575, signer);
		console.log(`MATIC/USD deployed at ${await maticusd.getAddress()}`);
	}
	
	// TUSDデプロイ
	const tusd = await deployTestERC20("Test USD", "TUSD", 18, signer);
	if(ethusd && usdcusd) {
		const tx = await tusd.setExchangeOracle(await ethusd.getAddress(), await usdcusd.getAddress());
		await tx.wait();
	}
	console.log(`TUSD deployed at ${await tusd.getAddress()}`);
	
	// TJPYデプロイ
	const tjp = await deployTestERC20("Test JPY", "TJPY", 18, signer);
	if(ethusd && jpyusd) {
		const tx = await tjp.setExchangeOracle(await ethusd.getAddress(), await jpyusd.getAddress());
		await tx.wait();
	}
	console.log(`TJPY deployed at ${await tjp.getAddress()}`);
};

(async () => {
	await main();
})();
