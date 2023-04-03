import { ethers } from 'ethers';
import { IConfig } from '@src/utils';
import { getVerifyingPaymaster, getSimpleAccount, getGasFee, printOp, getHttpRpcClient } from '../helpers';
// import * as config from "../config.json";

export default async function main(
    config: IConfig, 
    t: string, 
    amt: string, 
    withPM: boolean
    ): Promise<{ op: string; uoHash: string; txHash: string }> 
{
  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const paymasterAPI = withPM ? getVerifyingPaymaster(config.paymasterUrl, config.entryPoint) : undefined;
  console.log("paymasterAPI", paymasterAPI);

  const accountAPI = getSimpleAccount(
                                        provider, 
                                        config.signingKey, 
                                        config.entryPoint, 
                                        config.simpleAccountFactory, 
                                        paymasterAPI
                                        );

  const target = ethers.utils.getAddress(t);
  const value = ethers.utils.parseEther(amt);
  const op = await accountAPI.createSignedUserOp({
    target,
    value,
    data: '0x',
    ...(await getGasFee(provider)),
  });
  const opCode = await printOp(op);
  console.log(`Signed UserOperation: ${opCode}`);

  const client = await getHttpRpcClient(provider, config.bundlerUrl, config.entryPoint);
  const uoHash = await client.sendUserOpToBundler(op);
  console.log(`UserOpHash: ${uoHash}`);

  console.log('Waiting for transaction...');
  const txHash = await accountAPI.getUserOpReceipt(uoHash);
  console.log(`Transaction hash: ${txHash}`);

  return { op: opCode, uoHash, txHash };
}
