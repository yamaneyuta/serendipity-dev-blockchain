import { ethers, Contract } from "ethers";

import ITrialERC20V1Data from "../../../artifacts/contracts/testnet/token/ITrialERC20V1.sol/ITrialERC20V1.json";
import TrialERC20V1Data from "../../../artifacts/contracts/testnet/token/TrialERC20V1.sol/TrialERC20V1.json";
import { ITrialERC20V1 } from "../../../typechain-types/contracts/testnet/token/ITrialERC20V1";

export const deployTrialERC20V1 = async (
    name: string, sybmol: string, decimals: number, signer: ethers.Signer, ethUsdAddress: string, meUsdAddress: string
) => {

    // デプロイ実行
    const factory = createTrialERC20V1Factory().connect(signer);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    // 初期化処理
    // ※本番環境ではdeployProxy等を使用し、このような初期化は絶対に行わないこと。
    const tx = await (contract as unknown as Contract).initialize(
        await signer.getAddress(), name, sybmol, decimals, ethUsdAddress, meUsdAddress
    );
    await tx.wait();

    return contract;
};

const createTrialERC20V1Factory = () => {
    const abi = JSON.parse(JSON.stringify(ITrialERC20V1Data.abi)) as typeof ITrialERC20V1Data.abi;
    (abi as any[]).push({
        "inputs": [
            {
                "internalType": "address",
                "name": "initialOwner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name_",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol_",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "decimals_",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "nativeUsdOracle_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "meUsdOracle_",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    });

    const bytecode = TrialERC20V1Data.bytecode;

    return new ethers.ContractFactory<[], ITrialERC20V1>(abi, bytecode);
};
