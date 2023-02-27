import { ethers } from 'ethers';
import * as bcrypt from 'bcrypt';
import { TextEncoder } from 'util';
export const isProd = process.env.NODE_ENV === 'production';
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export interface IConfig {
  bundlerUrl: string;
  rpcUrl: string;
  signingKey: string;
  entryPoint: string;
  simpleAccountFactory: string;
  paymasterUrl: string;
}

export const GET_CONFIG = async (email: string, orgId: string) => {
  const hashEmail = await bcrypt.hash(`${email}x${orgId}`, 10);
  const bytes = new TextEncoder().encode(hashEmail);
  // console.log("bytes", bytes.slice(0,32));
  // console.log("bytes1", ethers.utils.randomBytes(32));

  return {
    bundlerUrl: 'https://node.stackup.sh/api/v1/bundler/caa091b2db4dd5777273a9a32af5352f41954e788ef551508a6eb3ab08553a86',
    rpcUrl: 'https://endpoints.omniatech.io/v1/eth/goerli/public',
    // signingKey: new ethers.Wallet(ethers.utils.randomBytes(32)).privateKey,
    signingKey: new ethers.Wallet(bytes.slice(0, 32)).privateKey, //https://stackoverflow.com/a/48762658
    entryPoint: '0x0F46c65C17AA6b4102046935F33301f0510B163A',
    simpleAccountFactory: '0x63658F82752688E3E2Dd2FA8C511E85e919F62D7',
    paymasterUrl: '',
  };
};
