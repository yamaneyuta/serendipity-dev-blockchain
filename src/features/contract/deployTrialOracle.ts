import { ethers } from "ethers";

import TrialOracleAbi from "../../../artifacts/contracts/privatenet/oracle/TrialOracleV1.sol/TrialOracleV1.abi.json";
import TrialOracleBytecode from "../../../artifacts/contracts/privatenet/oracle/TrialOracleV1.sol/TrialOracleV1.bytecode.json";
import { TrialOracleV1 } from "../../../typechain-types/contracts/privatenet/oracle/TrialOracleV1";

export const deployTrialOracleV1 = async (
    decimals: number, description: string, initAnswer: bigint, intiUpdateAt: number, signer: ethers.Signer
) => {
    // デプロイ実行
    const factory = new ethers.ContractFactory<any[], TrialOracleV1>(TrialOracleAbi.abi, TrialOracleBytecode.bytecode).connect(signer);
    const contract = await factory.deploy(decimals, description, initAnswer, intiUpdateAt);
    return await contract.waitForDeployment();
};
