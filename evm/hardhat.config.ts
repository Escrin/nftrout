import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-watcher";
import "hardhat-deploy";

const accounts = process.env.PRIVATE_KEY
  ? [process.env.PRIVATE_KEY]
  : process.env.MNEMONIC
  ? { mnemonic: process.env.MNEMONIC }
  : [];

task('accounts')
.setAction(async (_, hre) => {
  const signers = await hre.ethers.getSigners();
  const balances = await Promise.all(signers.map(s => hre.ethers.provider.getBalance(s.address)));
  for (let i = 0; i < signers.length; i++) {
    let num: string | number;
    try {
      num = balances[i].toNumber();
    } catch {
      num = balances[i].toString();
    }
    console.log(signers[i].address, num);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
      },
      viaIR: true,
    },
  },
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
    },
    "sapphire-testnet": {
      url: "https://testnet.sapphire.oasis.dev",
      chainId: 0x5aff,
      accounts,
    },
    sapphire: {
      url: "https://sapphire.oasis.io",
      chainId: 0x5afe,
      accounts,
    },
    hyperspace: {
      url: "https://rpc.ankr.com/filecoin_testnet",
      chainId: 3141,
      accounts,
    },
  },
  watcher: {
    compile: {
      tasks: ["compile"],
    },
  },
  namedAccounts: {
    deployer: 0,
  },
};

export default config;
