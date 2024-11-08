import { ethers, Contract } from "ethers";

import AppV1Data from "../../../artifacts/contracts/app/AppV1.sol/AppV1.json";

export const deployAppV1 = async (signer: ethers.Signer) => {
    // デプロイ実行
    const factory = createAppV1Factory().connect(signer);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    // 初期化処理
    // ※本番環境ではdeployProxy等を使用し、このような初期化は絶対に行わないこと。
    const tx = await (contract as unknown as Contract).initialize(await signer.getAddress());
    await tx.wait();

    return contract;
};

const createAppV1Factory = () => {
    const abi = [
        {
            "inputs": [
              {
                "internalType": "address",
                "name": "initialAdmin",
                "type": "address"
              }
            ],
            "name": "initialize",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const bytecode = AppV1Data.bytecode;

    return new ethers.ContractFactory<[], Contract>(abi, bytecode);
};
