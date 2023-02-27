import { getSimpleAccount } from '../helpers';
import { ethers } from 'ethers';
import { IConfig } from '@src/utils';
// import * as config from "../config.json";

export default async function main(config: IConfig) {
  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const accountAPI = getSimpleAccount(provider, config.signingKey, config.entryPoint, config.simpleAccountFactory);
  const address = await accountAPI.getCounterFactualAddress();

  console.log(`SimpleAccount address: ${address}`);
  return address;
}
