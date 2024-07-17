import { ethers } from "ethers";

import ITestERC20Data from "../../../artifacts/contracts/testnet/token/ITestERC20.sol/ITestERC20.json";
import TestERC20Data from "../../../artifacts/contracts/testnet/token/TestERC20.sol/TestERC20.json";
import { ITestERC20 } from "../../../typechain-types/contracts/testnet/token/ITestERC20";

export const deployTestERC20 = async(name: string, sybmol: string, decimals: number, signer: ethers.Signer) => {

    // デプロイ実行
    const factory = createTestERC20Factory().connect(signer);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    // 初期化処理
    // ※本番環境ではdeployProxy等を使用し、このような初期化は絶対に行わないこと。
    const tx = await contract.initialize(await signer.getAddress(), name, sybmol, decimals);
    await tx.wait();

    return contract;
};

const createTestERC20Factory = () => {
    const abi = ITestERC20Data.abi;
    const bytecode = TestERC20Data.bytecode;

    return new ethers.ContractFactory<[], ITestERC20>(abi, bytecode);
};
