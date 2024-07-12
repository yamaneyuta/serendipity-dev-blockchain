import { ethers } from "ethers";
import { ITestOracle } from "../../../typechain-types/contracts/oracle/ITestOracle";

import ITestOracleData from "../../../artifacts/contracts/oracle/ITestOracle.sol/ITestOracle.json";
import TestOracleData from "../../../artifacts/contracts/oracle/TestOracle.sol/TestOracle.json";

export const deployTestOracle = async (
    decimals: number, description: string, initAnswer: bigint, intiUpdateAt: number, signer: ethers.Signer
) => {
    // デプロイ実行
    const factory = createTestOracleFactory().connect(signer);
    const contract = await factory.deploy(decimals, description, initAnswer, intiUpdateAt);
    return await contract.waitForDeployment();
};

const createTestOracleFactory = () => {
    // const abi = ITestOracleData.abi;
    const abi = JSON.parse(JSON.stringify(ITestOracleData.abi)) as typeof ITestOracleData.abi;
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
    const bytecode = TestOracleData.bytecode;

    return new ethers.ContractFactory<any[], ITestOracle>(abi, bytecode);
}
