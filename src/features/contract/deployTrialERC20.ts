import { ethers } from "ethers";

import TrialERC20Abi from "../../../artifacts/contracts/testnet/token/TrialERC20V1.sol/TrialERC20V1.abi.json";
import TrialERC20Bytecode from "../../../artifacts/contracts/testnet/token/TrialERC20V1.sol/TrialERC20V1.bytecode.json";
import { TrialERC20V1 } from "../../../typechain-types/contracts/testnet/token/TrialERC20V1";

export const deployTrialERC20V1 = async (
    name: string, sybmol: string, decimals: number, signer: ethers.Signer, ethUsdAddress: string, meUsdAddress: string
) => {

    // デプロイ実行
    const factory = new ethers.ContractFactory<[], TrialERC20V1>(TrialERC20Abi.abi, TrialERC20Bytecode.bytecode).connect(signer);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    // 初期化処理
    // ※本番環境ではdeployProxy等を使用し、このような初期化は絶対に行わないこと。
    const tx = await contract.initialize(
        await signer.getAddress(), name, sybmol, decimals, ethUsdAddress, meUsdAddress
    );
    await tx.wait();

    return contract;
};
