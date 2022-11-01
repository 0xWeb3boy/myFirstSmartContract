require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
// require("./tasks/block-number");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
// require("solidity-coverage");

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const MATIC_RPC_URL = process.env.MATIC_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    matic: {
      url: MATIC_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};
