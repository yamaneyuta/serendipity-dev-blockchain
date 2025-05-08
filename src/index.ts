import { BigNumberish, ContractFactory, ethers, JsonRpcProvider, Signer } from "ethers";
import { getHardhatProvider } from "./lib/getHardhatProvider";
import { waitForNetworkReady } from "./lib/waitForNetworkReady";
import { DevERC20 } from "../typechain-types/contracts/privatenet/DevERC20";
import DevERC20Data from "../artifacts/contracts/privatenet/DevERC20.sol/DevERC20.json";
import { DevOracle } from "../typechain-types/contracts/privatenet/DevOracle";
import DevOracleData from "../artifacts/contracts/privatenet/DevOracle.sol/DevOracle.json";
import { App } from "../typechain-types/contracts/app/App";
import AppData from "../artifacts/contracts/app/App.sol/App.json";
import { getHardhatSigners } from "./lib/getHardhatSigners";
import { createSignersWithSeed } from "./lib/createSignersWithSeed";

const DUMMY_ACCOUNT = "0x0000000000000000000000000000000000000001";
const PRIVATENET_CHAIN_ID_ETHEREUM = 31337n;	// Ethereumネットワークとして扱うチェーンID(HardhatのデフォルトチェーンID)
const PRIVATENET_CHAIN_ID_L2 = 1337n;	// L2ネットワークとして扱うチェーンID

/** デプロイするERC20トークンの情報 */
// `initSupply`はHardhatのデフォルトユーザーに対して配布する初期供給量
const ERC20_TOKENS: { name: string, symbol: string, decimals: number, initSupply: BigNumberish }[] = [
	{ name: "Test JPY", symbol: "TJPY", decimals: 18, initSupply: 1_000_000_000_000_000_000_000_000n },	// 100万円相当
	{ name: "Test USD", symbol: "TUSD", decimals: 18, initSupply: 10_000_000_000_000_000_000_000n },	// 1万ドル相当
	{ name: "Test ChainLink Token", symbol: "TLINK", decimals: 18, initSupply: 100_000_000_000_000_000_000n },	// 2025年5月2日のレートで1LINK≒2160円なので21.6万円相当
	// トークンのアドレスがずれないように配列の末尾に追加してください
];
const MINT_ERC20_TOKEN_DEFAULT_ACCOUNTS_NUM = 10;	// 一旦、Hardhatが生成するアカウントすべて(10アカウント)にERC20トークンを配布

/** デプロイするOralceの情報 */
// 2025年5月2日現在のデータを元に作成
const ORACLES: { decimals: number, description: string, phaseId: number, version: number, answer: BigNumberish, updatedAt: number }[] = [
	{ decimals: 8, description: "ETH / USD", phaseId: 7, version: 6, answer: 1840_16520000n, updatedAt: 1746151415 },
	{ decimals: 8, description: "JPY / USD", phaseId: 5, version: 6, answer: 687809n, updatedAt: 1746151295 }, // 1円 = 0.00687809ドル(=>1ドル≒145.3891996179172円)
	{ decimals: 8, description: "LINK / USD", phaseId: 7, version: 6, answer: 14_86872000n, updatedAt: 1746152327 },
];

/** デプロイ後に表示するためのメッセージキュー */
const DEPLOY_COMPLETION_MESSAGES: string[] = [
	"--------------------------------------------------------------------------------"
];


const deployERC20 = async () => {
	const provider = await getHardhatProvider();
	const { chainId } = await provider.getNetwork();

	// チェーンID毎に異なるアドレスにデプロイするためにseedにチェーンIDを含めてSignersを生成
	const erc20Deployers = await createSignersWithSeed(provider, `ERC20-${chainId}`, { num: ERC20_TOKENS.length });

	const hardhatSigners = await getHardhatSigners(MINT_ERC20_TOKEN_DEFAULT_ACCOUNTS_NUM);	// 初期配布対象となるアカウント一覧
	// デプロイ＆初期供給量の付与(デプロイはコントラクト1つにつき1つのウォレットで行う => コントラクトアドレスが固定される)
	for (const [i, { name, symbol, decimals, initSupply }] of ERC20_TOKENS.entries()) {
		// コントラクトをデプロイ
		const deployer = erc20Deployers[i];
		const erc20Factory = await createDevERC20Factory(deployer);
		let erc20Contract = await erc20Factory.deploy(name, symbol, decimals);
		erc20Contract = await erc20Contract.waitForDeployment();

		// Hardhatが生成するアカウントに初期供給量を付与
		for (const hardhatSiner of hardhatSigners) {
			const address = await hardhatSiner.getAddress();
			const tx = await erc20Contract.mint(address, initSupply);
			await tx.wait();
		}

		// デプロイ完了メッセージに追加
		DEPLOY_COMPLETION_MESSAGES.push(`- [ERC20] ${symbol}(${name}) deployed at ${await erc20Contract.getAddress()}, deployer: ${await deployer.getAddress()}`);
	}
};

const deployOracle = async () => {
	const provider = await getHardhatProvider();
	const { chainId } = await provider.getNetwork();

	// 今のところデプロイするのはHARDHAT_DEFAULT_CHAIN_IDのみとする
	if (chainId !== PRIVATENET_CHAIN_ID_ETHEREUM) {
		DEPLOY_COMPLETION_MESSAGES.push(`- [Oracle] Oracle is not deployed on chainId: ${chainId}`);
		return;
	}

	// 今後、チェーンID毎に異なるアドレスにデプロイする可能性があるためseedにチェーンIDを含めてSignersを生成
	const oracleDeployers = await createSignersWithSeed(provider, `Oracle-${chainId}`, { num: ORACLES.length });

	// デプロイ(デプロイはコントラクト1つにつき1つのウォレットで行う => コントラクトアドレスが固定される)
	for (const [i, { decimals, description, phaseId, version, answer, updatedAt }] of ORACLES.entries()) {
		// コントラクトをデプロイ
		const deployer = oracleDeployers[i];
		const oracleFactory = await createDevOracleFactory(deployer);
		let oracleContract = await oracleFactory.deploy(decimals, description, phaseId, version, answer, updatedAt);
		oracleContract = await oracleContract.waitForDeployment();

		// デプロイ完了メッセージに追加
		DEPLOY_COMPLETION_MESSAGES.push(`- [Oracle] ${description} deployed at ${await oracleContract.getAddress()}, deployer: ${await deployer.getAddress()}`);
	}
};

const deployApp = async () => {
	const provider = await getHardhatProvider();
	const { chainId } = await provider.getNetwork();

	// デプロイに失敗して異なるアドレスになった場合を想定。デプロイアカウントは同一とし、nonceを調整してコントラクトアドレスを調整する。
	const [deployer] = await getHardhatSigners(1);
	const sendEmptyTransactionCount = [PRIVATENET_CHAIN_ID_ETHEREUM, PRIVATENET_CHAIN_ID_L2].findIndex((id) => id === chainId);
	if (sendEmptyTransactionCount < 0) {
		// ここを通る時は上記配列に対象のチェーンIDを追加してください
		throw new Error(`[4089EE81] Not implemented chainId: ${chainId}`);
	}
	for (let i = 0; i < sendEmptyTransactionCount; i++) {
		await deployer.sendTransaction({
			to: ethers.ZeroAddress,
			value: 0,
		});
	}

	const appFactory = await createAppFactory(deployer);
	let appContract = await appFactory.deploy();
	appContract = await appContract.waitForDeployment();

	// initialize関数を呼び出す(開発環境以外ではこのような初期化は行わないこと)
	// コントラクトの所有者はHardhatが生成する1つめのアカウントとする
	const tx = await appContract.initialize();
	await tx.wait();

	// デプロイ完了メッセージに追加
	DEPLOY_COMPLETION_MESSAGES.push(`- [App] App deployed at ${await appContract.getAddress()}, deployer: ${await deployer.getAddress()}, owner: ${await deployer.getAddress()}`);
};


const createDevERC20Factory = async (signer: Signer) => {
	return new ContractFactory<[string, string, number], DevERC20>(DevERC20Data.abi, DevERC20Data.bytecode, signer);
};

const createDevOracleFactory = async (signer: Signer) => {
	return new ContractFactory<[number, string, number, number, BigNumberish, number], DevOracle>(DevOracleData.abi, DevOracleData.bytecode, signer);
};

const createAppFactory = async (signer: Signer) => {
	return new ContractFactory<[], App>(AppData.abi, AppData.bytecode, signer);
}

/** デプロイ前の処理 */
const preDeploy = async () => {
	const provider = await getHardhatProvider();
	await waitForNetworkReady(provider, 30); // hardhatが起動するまで最大30秒待機

	// 現在のチェーンIDをデプロイ後に表示するメッセージに追加
	const { chainId } = await provider.getNetwork();
	DEPLOY_COMPLETION_MESSAGES.push(`Privatenet(${chainId}) is ready!`);
};

/** デプロイ完了後の後処理 */
const postDeploy = async (startTime: number) => {
	// ダミーアカウントに対して1wei送信することでスマートコントラクトの初期設定が完了した合図とする。
	await sendEthToDummyAccount();

	// デプロイにかかった時間をメッセージキューに追加
	const endTime = Date.now();
	const elapsedTime = (endTime - startTime) / 1000;
	DEPLOY_COMPLETION_MESSAGES.push(`⏱ Deploy time: ${elapsedTime} seconds`);

	// 定期的にブロックを生成する設定を行う
	await setBlockMiningInterval();

	// メッセージを表示
	await showDeployCompletionMessages();
};

/**
 * ダミーアカウントにETHを送信します
 * @dev この操作を行うことでプラグインのテストが開始できるようになります
 * (CIでブロックチェーンの準備ができていない状態でテストが開始しないように、そういう取り決めをしているだけ)
 */
const sendEthToDummyAccount = async () => {
	// ※ provider.getBalanceを使用した場合、結果をキャッシュしているようなので、
	//    残高の確認はprovider.send("eth_getBalance")を使用している
	const provider = await getHardhatProvider() as JsonRpcProvider;

	// hardhat_setBalanceでダミーアカウントのETH数量を1weiに設定
	await provider.send("hardhat_setBalance", [
		DUMMY_ACCOUNT,
		"0x01",
	]);

	// 設定後のダミーアカウントのETH数量を確認
	const postBalance: string = await provider.send("eth_getBalance", [DUMMY_ACCOUNT]);
	if (postBalance !== "0x1") {
		throw new Error(`[E5C800E9] balance is ${ethers.formatEther(postBalance)}`)
	};
}

const setBlockMiningInterval = async () => {
	// 定期的にブロックを生成
	const provider = await getHardhatProvider() as JsonRpcProvider;
	const { chainId } = await provider.getNetwork();
	const interval = (() => {
		switch (chainId) {
			case PRIVATENET_CHAIN_ID_ETHEREUM:
				return 12_000n;	// 12秒
			case PRIVATENET_CHAIN_ID_L2:
				return 2_000n;	// 2秒
			default:
				throw new Error(`[FD312AE7] Not implemented chainId: ${chainId}`);
		}
	})();
	provider.send("evm_setIntervalMining", [Number(interval.toString(10))]);
};

/**
 * デプロイ完了メッセージを表示します
 */
const showDeployCompletionMessages = async () => {
	// デプロイ完了メッセージを表示
	for (const message of DEPLOY_COMPLETION_MESSAGES) {
		console.log(message);
	}
	console.log("🎉 Deploy completed!");
	console.log();	//最後の行が表示されないので、とりあえず空行を追加することで対処
};

(async () => {
	const startTime = Date.now();
	await preDeploy();
	await deployERC20();
	await deployOracle();
	await deployApp();
	await postDeploy(startTime);
})();
