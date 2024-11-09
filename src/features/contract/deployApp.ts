import { ethers } from "ethers";

import AppBytecode from "../../../artifacts/contracts/app/AppV1.sol/AppV1.bytecode.json";
import AppAbi from "../../../artifacts/contracts/app/AppV1.sol/AppV1.abi.json";
import { AppV1 } from "../../../typechain-types/contracts/app/AppV1";

export const deployAppV1 = async (signer: ethers.Signer) => {
    // デプロイ実行
    const factory = new ethers.ContractFactory<[], AppV1>(AppAbi.abi, AppBytecode.bytecode).connect(signer);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    // 初期化処理
    // ※本番環境ではdeployProxy等を使用し、このような初期化は絶対に行わないこと。
    const tx = await contract.initialize(await signer.getAddress());
    await tx.wait();

    return contract;
};
