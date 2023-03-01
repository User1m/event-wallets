import { ethers } from 'ethers';
import * as crypto from 'crypto';
import { TextEncoder } from 'util';
export const isProd = process.env.NODE_ENV === 'production';
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
export const faucetUrl = `https://goerlifaucet.com/`;
export interface IConfig {
  bundlerUrl: string;
  rpcUrl: string;
  signingKey: string;
  entryPoint: string;
  simpleAccountFactory: string;
  paymasterUrl: string;
}

export const getBaseUrl = () => {
  return isProd ? 'https://event-wallets.herokuapp.com' : 'http://localhost:3001';
}

export const GET_CONFIG = async (email: string, orgId: string) => {
  // https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript/
  const hashEmail = crypto.createHash('sha1').update(`${email}x${orgId}`).digest('hex');
  const bytes = new TextEncoder().encode(hashEmail).slice(0, 32);
  // console.log("hashEmail", hashEmail);
  // console.log("bytes", bytes);
  const signingKey = new ethers.Wallet(bytes).privateKey;
  // console.log("signingKey", signingKey);

  // https://omniatech.io/pages/ethereum-rpc/
  return {
    bundlerUrl: 'https://node.stackup.sh/api/v1/bundler/caa091b2db4dd5777273a9a32af5352f41954e788ef551508a6eb3ab08553a86',
    // rpcUrl: 'https://endpoints.omniatech.io/v1/eth/goerli/public',
    rpcUrl: "https://node.stackup.sh/v1/rpc/caa091b2db4dd5777273a9a32af5352f41954e788ef551508a6eb3ab08553a86",
    signingKey, //https://stackoverflow.com/a/48762658
    entryPoint: '0x0F46c65C17AA6b4102046935F33301f0510B163A',
    simpleAccountFactory: '0x63658F82752688E3E2Dd2FA8C511E85e919F62D7',
    paymasterUrl: '',
  };
};

// https://ethereum.stackexchange.com/a/131944
// https://docs.ethers.org/v5/api/providers/api-providers/#EtherscanProvider
// https://github.com/OpenZeppelin/openzeppelin-contracts
// https://docs.ethers.org/v5/api/utils/abi/formats/#abi-formats--object
// https://docs.stackup.sh/docs/introduction/more-resources
// https://docs.stackup.sh/docs/introduction/contract-addresses -> https://goerli.etherscan.io/tx/0x25e8abeab017a6e86a10083fa657ff0023c129e633c06ea4b08d52e4f2145601
// https://ethereum.stackexchange.com/questions/11484/how-can-contract-ownership-be-transferred-from-one-account-to-another


// {
//   "bundlerUrl": "https://node.stackup.sh/api/v1/bundler/ccd63252e4316eba4dac12989fe47cf6576d0cd7cd05260fad4cc493b7db13bc", 
//   "rpcUrl": "https://endpoints.omniatech.io/v1/eth/goerli/public",
//   "signingKey": "0x2ae2783b2cb8686f3996537221b1a2573058e57df35f8a551f58061281d46cb2",
//   "entryPoint": "0x0F46c65C17AA6b4102046935F33301f0510B163A",
//   "simpleAccountFactory": "0x63658F82752688E3E2Dd2FA8C511E85e919F62D7",
//   "paymasterUrl": ""
// }
