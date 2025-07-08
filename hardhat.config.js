require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: "localhost",
  solidity: {
    compilers: [{ version: "0.8.20", settings: { optimizer: { enabled: true, runs: 200 }}}]
  },
  networks: {
    hardhat: { chainId: 31337
 },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      chainId: 1337
    }
  }
};
