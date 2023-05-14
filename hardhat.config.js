require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.10",
        settings: {
            optimizer: {
                enabled: true,
                runs: 100,
            },
        }
    },
    networks: {
        polygon: {
            url: `https://polygon-mainnet.infura.io/v3/344632511bbc4e979e61795e76cd3bce`,
            accounts: [process.env.CUSTODIAN_KEY]
        }
    }
};