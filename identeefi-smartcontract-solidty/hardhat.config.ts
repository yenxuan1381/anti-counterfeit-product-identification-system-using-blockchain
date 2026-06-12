import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";


import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-etherscan";
// require("@nomiclabs/hardhat-etherscan/dist/src/resolveEtherscanApiKey")

require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  bscmainnet: 56,
  matic: 137,
  rinkeby: 4,
  ropsten: 3,
  bsctestnet: 97,
  mumbai:80001 ,
  sepolia:11155111,
  vanar:78600

};

// Ensure that we have all the environment variables we need.
let privateKey: string;
if (!process.env.PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
} else {
  privateKey = process.env.PRIVATE_KEY;
}

let infuraApiKey: string;
if (!process.env.INFURA_API_KEY) {
  throw new Error("Please set your INFURA_API_KEY in a .env file");
} else {
  infuraApiKey = process.env.INFURA_API_KEY;
}

function createTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  if (network == "bsctestnet") {
    const url: string = "https://data-seed-prebsc-1-s1.binance.org:8545/";
    
    return {
      accounts: [privateKey],
      chainId: chainIds[network],
      url,
    };
  }
  else if(network == "mumbai"){
    const url: string = "https://polygon-mumbai-bor-rpc.publicnode.com";
    return {
      accounts: [privateKey],
      chainId: chainIds[network],
      url,
    };
    
  }

  else if(network == "matic"){
    const url: string = "https://rpc-mainnet.maticvigil.com";
    const privateKey:any = process.env.PRIVATE_KEY;
    return {
      accounts: [privateKey],
      chainId: chainIds[network],
      url,
    };
    
  }

  else if(network == "bscmainnet"){
    const url: string = "https://rpc-mainnet.maticvigil.com";
    const privateKey:any = process.env.PRIVATE_KEY;
    return {
      accounts: [privateKey],
      chainId: chainIds[network],
      url,
    };
    
  }
  else if(network == "vanar"){
    const url: string = "https://rpc-vanguard.vanarchain.com";
    const privateKey:any = process.env.PRIVATE_KEY;
    return {
      accounts: [privateKey],
      chainId: chainIds[network],
      url,
    };
  }
  else if(network == "sepolia"){
    const url: string = "https://sepolia.infura.io/v3/";
    const privateKey:any = process.env.PRIVATE_KEY;
    return {
      accounts: [privateKey],
      chainId: chainIds[network],
      url,
    };
    
  }
  else {
    const url: string = "https://" + network + ".infura.io/v3/" + infuraApiKey;

    return {
      accounts: [privateKey],
      chainId: chainIds[network],
      url,
    };
  }
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {

    goerli: createTestnetConfig("goerli"),
    mainnet: createTestnetConfig("mainnet"),
    kovan: createTestnetConfig("kovan"),
    rinkeby: createTestnetConfig("rinkeby"),
    ropsten: createTestnetConfig("ropsten"),
    bsctestnet: createTestnetConfig("bsctestnet"),
    mumbai: createTestnetConfig("mumbai"),
    bscmainnet: createTestnetConfig("bscmainnet"),
    matic: createTestnetConfig("matic"),
    sepolia: createTestnetConfig("sepolia"),
    vanar: createTestnetConfig("vanar")

  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "ZUQBXSVXNT8RWQDK7Z5NHV4395U5JJFB5M" // matic
    // apiKey: "RQ83XPC9R4JQ9GJFXMIGXFEHZIY1SG1E5V" //mainnet
    // apiKey: "FFBBU5ZQ2KV1183XT3VRBKF68ZR56RWT5B" //bsc
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.8.17",
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.7.5",
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.4.19",
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
     
      {
        version: "0.6.6",
      },
      {
        version: "0.4.17",
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;