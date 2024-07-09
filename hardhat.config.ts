import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
	solidity: "0.8.24",
	networks: {
		hardhat: {
			chainId: Number(process.env.HARDHAT_CHAIN_ID ?? 31337)
		}
	}
};

export default config;
