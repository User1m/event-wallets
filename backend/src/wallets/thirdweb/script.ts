import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers, providers } from 'ethers';
import { abis, Network, NETWORKS } from './constants';
import { getVerifyingPaymaster, getSimpleAccount, getGasFee, printOp, getHttpRpcClient, ERC20_ABI } from '../helpers';

// require('dotenv').config();

// const _config = require('../config.json');

/*
  chainId: 5 = goerli,
  chainId: 84531 = coinbase,
  chainId: 80001 = mumbai,
*/


export async function _initThirdWeb(
                                      chainId:number, 
                                      provider: ethers.providers.Provider, 
                                      signer: string
                                    ): Promise<ThirdwebSDK> 
{

  const _signer = new ethers.Wallet(signer, provider);
  const sdk = ThirdwebSDK.fromSigner(_signer, chainId);
  return sdk;

}

export async function _getSimpleAcctFactoryContract(
                                                      chainId: number, 
                                                      simpleAccountFactoryAddress: string,
                                                      simpleAccountFactoryABI: any,
                                                      provider: ethers.providers.Provider,						
                                                      signer: string, 
                                                    ) 
{
  const sdk = await _initThirdWeb(chainId, provider, signer);
  const contract = await sdk.getContractFromAbi(simpleAccountFactoryAddress, simpleAccountFactoryABI);
  return contract;
}

export async function _getSimpleAcctContract(
                                                  contractAddr: string, 
                                                  chainId:number, 
                                                  provider: ethers.providers.Provider, 
                                                  signer: string
                                              ) 
{

  const sdk = await _initThirdWeb(chainId, provider, signer);
  const contract = await sdk.getContractFromAbi(contractAddr, abis.simpleAccount.abi);
  return contract;
}

export async function getWalletAddress(
                                        chainId:number, 
                                        simpleAccountFactoryAddress: string,
                                        simpleAccountFactoryABI: any,
                                        salt: string,
                                        owner: string,
                                        provider: ethers.providers.Provider,
                                        signer: string,
                                        
                                      ): Promise<string> 
{

const factory = await _getSimpleAcctFactoryContract(
                                                        chainId, 
                                                        simpleAccountFactoryAddress,
                                                        simpleAccountFactoryABI,
                                                        provider,						
                                                        signer, 

                                                    );
                                  
  const SimpleAcctAddress = await factory.call('getAddress', owner, salt);
  return SimpleAcctAddress;
}

export async function createWallet(
                                    chainId:number, 
                                    simpleAccountFactoryAddress: string,
                                    simpleAccountFactoryABI: any,
                                    salt: string, 
                                    owner: string, 
                                    provider: ethers.providers.Provider,
                                    signer: string, 
                                    
                                  ) 
{
  const factory = await _getSimpleAcctFactoryContract(
                                                          chainId, 
                                                          simpleAccountFactoryAddress,
                                                          simpleAccountFactoryABI,
                                                          provider,						
                                                          signer, 

                                                      );

  const newSimpleAcct = await factory.call('createAccount', owner, salt);
  return {
              receipt: newSimpleAcct,
              address: await getWalletAddress(
                                                  chainId, 
                                                  simpleAccountFactoryAddress, 
                                                  simpleAccountFactoryABI, 
                                                  salt, 
                                                  owner, 
                                                  provider, 
                                                  signer
                                              ),
            };
}

export async function getWalletOwner(
                                        simpleAccountAddress: string, 
                                        chainId:number, 
                                        provider: ethers.providers.JsonRpcProvider,
                                        signer: string,
                                    ): Promise<string> 
{
  const contract = await _getSimpleAcctContract(simpleAccountAddress,chainId, provider, signer);
  const owner = await contract.call('owner');
  return owner;
}

export async function getWalletBalance(
                                          simpleAccountAddress: string, 
                                          chainId:number, 
                                          provider: ethers.providers.JsonRpcProvider,
                                          signer: string,
                                      ): Promise<ethers.BigNumber>

{
  const contract = await _getSimpleAcctContract(
                                    simpleAccountAddress,
                                    chainId, 
                                    provider, 
                                    signer
                                );
  const balance = await contract.call('getDeposit');
  return balance;
}

export async function getWalletBalanceInEth(
                                              simpleAccountAddress: string, 
                                              chainId:number, 
                                              provider: ethers.providers.JsonRpcProvider,
                                              signer: string,
                                          ): Promise<String>
{
  const contract = await _getSimpleAcctContract(
                                                  simpleAccountAddress,
                                                  chainId, 
                                                  provider, 
                                                  signer
                                              );
  const balance = await contract.call('getDeposit');
  return ethers.utils.formatEther(balance.toBigInt());
}

export async function depositToWallet(
                                      amt: string,
                                      simpleAccountAddress: string, 
                                      chainId:number, 
                                      provider: ethers.providers.JsonRpcProvider,
                                      signer: string,
                                  ) 
{

  const contract = await _getSimpleAcctContract(
                                    simpleAccountAddress,
                                    chainId, 
                                    provider, 
                                    signer
                                );  
  return await contract.call('addDeposit', {
  gasLimit: 1000000, // override default gas limit
  value: ethers.utils.parseEther(amt), // send 0.1 ether with the contract call
  });
}

export async function transferEth(
                                    amount: string,
                                    toAddress: string,
                                    salt: string,
                                    simple_account_factory_addr:string,
                                    simple_account_entrypoint: string,
                                    simple_account_bundler_url: string,
                                    provider: ethers.providers.JsonRpcProvider,
                                    signer: string,

                                ): Promise<{ op: string; uoHash: string; txHash: string }> 
{
  const paymasterAPI = undefined;
  const accountAPI = getSimpleAccount(
                            provider, 
                            signer, 
                            simple_account_entrypoint, 
                            simple_account_factory_addr, 
                            paymasterAPI, 
                            Number(salt)
                        );

  const target = ethers.utils.getAddress(toAddress);
  const value = ethers.utils.parseEther(amount);

  const op = await accountAPI.createSignedUserOp({
  target,
  value,
  data: '0x',
  ...(await getGasFee(provider)),
  });

  const opCode = await printOp(op);
  console.log(`Signed UserOperation: ${opCode}`);

  const client = await getHttpRpcClient(
                            provider, 
                            simple_account_bundler_url, 
                            simple_account_entrypoint
                        );

  console.log(client);

  const uoHash = await client.sendUserOpToBundler(op);
  console.log(`UserOpHash: ${uoHash}`);

  console.log('Waiting for transaction...');
  const txHash = await accountAPI.getUserOpReceipt(uoHash);
  console.log(`Transaction hash: ${txHash}`);

  return { op: opCode, uoHash, txHash };
}

export async function transferECR20(
                                      token: string,
                                      amount: string,
                                      toAddress: string,
                                      salt: string,
                                      withPM = false,
                                      simple_account_entrypoint: string,
                                      simple_account_bundler_url: string,
                                      simple_account_factory_addr:string,
                                      simple_account_pm_url: string = "",
                                      provider: ethers.providers.JsonRpcProvider,
                                      signer: string,
                                  ): Promise<{ op: string; uoHash: string; txHash: string }> 
{


const paymasterAPI = withPM ? getVerifyingPaymaster(simple_account_pm_url, simple_account_entrypoint) : undefined;

const accountAPI = getSimpleAccount(
                                      provider, 
                                      signer, 
                                      simple_account_entrypoint, 
                                      simple_account_factory_addr, 
                                      paymasterAPI, 
                                      Number(salt)
                                  );

  const _token = ethers.utils.getAddress(token);

  const to = ethers.utils.getAddress(toAddress);

  const erc20 = new ethers.Contract(_token, ERC20_ABI, provider);

  const [symbol, decimals] = await Promise.all([erc20.symbol(), erc20.decimals()]);

  const _amount = ethers.utils.parseUnits(amount, decimals);

  // Need a way to error check if SWA has enough balance
  // Need a way to error check if SWA has ANY eth

  console.log(`Transferring ${amount} ${symbol}...`);

  const op = await accountAPI.createSignedUserOp({
  target: erc20.address,
  data: erc20.interface.encodeFunctionData('transfer', [to, _amount]),
  ...(await getGasFee(provider)),
  });
  const opCode = await printOp(op);
  console.log(`Signed UserOperation: ${opCode}`);

  const client = await getHttpRpcClient(provider, simple_account_bundler_url, simple_account_entrypoint);
  const uoHash = await client.sendUserOpToBundler(op);
  console.log(`UserOpHash: ${uoHash}`);

  console.log('Waiting for transaction...');
  const txHash = await accountAPI.getUserOpReceipt(uoHash);
  console.log(`Transaction hash: ${txHash}`);

  return { op: opCode, uoHash, txHash };
}

export async function transferOwner(
                                      simpleAccountAddress: string,
                                      newOwnerAddr: string,
                                      chainId:number, 
                                      provider: ethers.providers.Provider, 
                                      signer: string
                                  ) 
{

  const contract = await _getSimpleAcctContract(  
                                    simpleAccountAddress, 
                                    chainId, 
                                    provider, 
                                    signer
                                );

  // When this function is called, if the signer is not the owner of the SimpleAccount contract, it will throw an error
  await contract.call('setOwner', newOwnerAddr);
  const owner = await contract.call('owner');
  return owner;
}
