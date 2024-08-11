import { ethers } from "ethers";
import { ITrialOracleV1 } from "../../../typechain-types/contracts/privatenet/oracle/ITrialOracleV1";

import ITrialOracleV1Data from "../../../artifacts/contracts/privatenet/oracle/ITrialOracleV1.sol/ITrialOracleV1.json";
import TrialOracleV1Data from "../../../artifacts/contracts/privatenet/oracle/TrialOracleV1.sol/TrialOracleV1.json";

export const deployTrialOracleV1 = async (
    decimals: number, description: string, initAnswer: bigint, intiUpdateAt: number, signer: ethers.Signer
) => {
    // デプロイ実行
    const factory = createTrialOracleV1Factory().connect(signer);
    const contract = await factory.deploy(decimals, description, initAnswer, intiUpdateAt);
    return await contract.waitForDeployment();
};

const createTrialOracleV1Factory = () => {
    // const abi = ITrialOracleV1Data.abi;
    const abi = JSON.parse(JSON.stringify(ITrialOracleV1Data.abi)) as typeof ITrialOracleV1Data.abi;
    (abi as any[]).push({
        "inputs": [
            {
                "internalType": "uint8",
                "name": "decimals_",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "description_",
                "type": "string"
            },
            {
                "internalType": "int256",
                "name": "answer",
                "type": "int256"
            },
            {
                "internalType": "uint256",
                "name": "updatedAt",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    });
    const bytecode = TrialOracleV1Data.bytecode;

    return new ethers.ContractFactory<any[], ITrialOracleV1>(abi, bytecode);
}
