import { ethers } from "ethers";

import ITestERC20Data from "../../../assets/contracts/ITestERC20.json";
import TestERC20Data from "../../../assets/contracts/TestERC20.json";
import { ITestERC20 } from "../../../typechain-types/contracts/token/ITestERC20";

export const deployTestERC20Factory = async(name: string, sybmol: string, decimals: number, signer: ethers.Signer) => {
    // ERC20コントラクトの所有者となるアドレス(デプロイアカウント)
    const owner = await signer.getAddress();

    // デプロイ実行
    const factory = createTestERC20Factory(signer);
    const contract = (await factory.deploy() as ITestERC20);
    await contract.waitForDeployment();

    // 初期化処理
    // ※本番環境ではdeployProxy等を使用し、このような初期化は絶対に行わないこと。
    await contract.initialize(owner, name, sybmol, decimals);

    return contract;
};

const createTestERC20Factory = (signer: ethers.Signer) => {
    const abi = ITestERC20Data.abi;
    const bytecode = TestERC20Data.bytecode;

    return new ethers.ContractFactory(abi, bytecode, signer);
};
