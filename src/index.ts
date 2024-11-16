import assert from "node:assert/strict";
import { JsonRpcProvider } from "ethers";
import { createSigner } from "./features/account/createSigner";
import { deployTrialERC20V1 } from "./features/contract/deployTrialERC20";
import { deployTrialOracleV1 } from "./features/contract/deployTrialOracle";
import { waitForNetworkReady } from "./features/network/waitForNetworkReady";
import { deployAppV1 } from "./features/contract/deployApp";

const HARDHAT_CHAIN_ID = 31337n;

const main = async () => {
	await waitForNetworkReady(30); // hardhatが起動するまで最大30秒待機

	const signer = await createSigner();
	const chainId = (await signer.provider!.getNetwork()).chainId;

	let ethusd: Awaited<ReturnType<typeof deployTrialOracleV1>> | undefined;
	let jpyusd: Awaited<ReturnType<typeof deployTrialOracleV1>> | undefined;
	let usdcusd: Awaited<ReturnType<typeof deployTrialOracleV1>> | undefined;
	let maticusd: Awaited<ReturnType<typeof deployTrialOracleV1>> | undefined;

	// Oracleコントラクトのアドレスをずらすためにダミートランザクションを送信
	const sendDummyTransactionRemain = await (async () => {
		const dummyAccount = "0x" + "0".repeat(40);
		const PREV_SEND_COUNT = chainId === HARDHAT_CHAIN_ID ? 1 : 0;	// 事前に送信する回数(0~1回)
		const POST_SEND_COUNT = 1 - PREV_SEND_COUNT;	// 事後に送信する回数(0~1回)

		const send = async (count: number) => {
			for (let i = 0; i < count; i++) {
				const tx = await signer.sendTransaction({ to: dummyAccount, value: 1 });
				await tx.wait();
			}
		};
		// 事前にダミートランザクションを送信
		await send(PREV_SEND_COUNT);

		// 後で送信するアロー関数を返す
		return async () => {
			// 事後にダミートランザクションを送信
			await send(POST_SEND_COUNT);
		};
	})();

	// Oracleコントラクトのデプロイ
	{
		// ETH/USDデプロイ
		// 	https://etherscan.io/address/0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419#readContract
		// 	RoundID: 110680464442257329221 のデータ(2024-07-12 00:55:35(UTC))
		ethusd = await deployTrialOracleV1(8, "ETH / USD", 310965000000n, 1720745735, signer);
		console.log(`ETH/USD deployed at ${await ethusd.getAddress()}`);

		// JPY/USDデプロイ
		// 	https://etherscan.io/address/0xBcE206caE7f0ec07b545EddE332A47C2F75bbeb3#readContract
		// 	RoundID: 73786976294838215253 のデータ(2024-07-12 00:56:23(UTC))
		jpyusd = await deployTrialOracleV1(8, "JPY / USD", 628525n, 1720745783, signer);
		console.log(`JPY/USD deployed at ${await jpyusd.getAddress()}`);

		// USDC/USDデプロイ
		// 	https://etherscan.io/address/0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6#readContract
		// 	RoundID: 36893488147419104943 のデータ(2024-07-11 08:00:35(UTC))
		usdcusd = await deployTrialOracleV1(8, "USDC / USD", 100000000n, 1720684835, signer);
		console.log(`USDC/USD deployed at ${await usdcusd.getAddress()}`);

		// MATIC/USDデプロイ
		//	https://etherscan.io/address/0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676#readContract
		//	RoundID: 55340232221128685633 のデータ(2024-07-12 02:49:35(UTC))
		maticusd = await deployTrialOracleV1(8, "MATIC / USD", 50276906n, 1720752575, signer);
		console.log(`MATIC/USD deployed at ${await maticusd.getAddress()}`);
	}

	// 残りのダミートランザクションを送信
	await sendDummyTransactionRemain();

	// nonceの数をチェック
	const nonce = await signer.provider!.getTransactionCount(await signer.getAddress());
	assert(nonce === 5, `nonce is ${nonce}`);

	// ERC20コントラクトのデプロイ
	{
		// chainIdがhardhatの場合はETH/USDを、それ以外の場合はMATIC/USDを採用
		const nativeUsdAddress = chainId === HARDHAT_CHAIN_ID ? await ethusd.getAddress() : await maticusd.getAddress();

		// TUSDデプロイ(レート変換はUSDCの値を採用)
		const tusd = await deployTrialERC20V1("Trial USD", "TUSD", 18, signer, nativeUsdAddress, await usdcusd.getAddress());
		console.log(`TUSD deployed at ${await tusd.getAddress()}`);

		// TJPYデプロイ
		const tjp = await deployTrialERC20V1("Trial JPY", "TJPY", 18, signer, nativeUsdAddress, await jpyusd.getAddress());
		console.log(`TJPY deployed at ${await tjp.getAddress()}`);
	}

	// Appコントラクトのデプロイ
	{
		const app = await deployAppV1(signer);
		console.log(`App deployed at ${await app.getAddress()}`);
	}

	// ダミーアカウントに対して1wei送信することでスマートコントラクトの初期設定が完了した合図とする。
	const dummyAccount = "0x0000000000000000000000000000000000000001";
	const provider = signer.provider as JsonRpcProvider;
	const tx = await provider.send("eth_sendTransaction", [
		{ from: await signer.getAddress(), to: dummyAccount, value: "0x01" }
	]);
	await signer.provider!.waitForTransaction(tx);

	// 定期的にブロックを生成
	const interval = HARDHAT_CHAIN_ID === chainId ? 12048 : 2126; // 12秒と2.1秒
	provider.send("evm_setIntervalMining", [interval]);

	console.log(`Privatenet(${chainId}) is ready!`);
};

(async () => {
	await main();
})();
