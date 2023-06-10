import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { BigNumber, ethers } from 'ethers';
import { abis } from '../constants';
import { getVerifyingPaymaster, getSimpleAccount, getGasFee, printOp, getHttpRpcClient, ERC20_ABI } from '../../helpers';
import * as constants from './constants';

console.log('////////// PROVIDER ///////////\n');
console.log(constants.provider);
console.log('\n\n');

console.log('////////// SIGNER //////////\n');
console.log(constants.signer);
console.log('\n\n');

export async function _initThirdWeb(chainId: number, provider: ethers.providers.Provider, signer: string): Promise<ThirdwebSDK> {
  const _signer = new ethers.Wallet(signer, provider);
  const sdk = ThirdwebSDK.fromSigner(_signer, chainId);
  return sdk;
}

export async function _getSimpleAcctFactoryContract(
  chainId: number,
  simpleAccountFactoryAddress: string,
  simpleAccountFactoryABI: any,
  provider: ethers.providers.Provider,
  signer: string
) {
  const sdk = await _initThirdWeb(chainId, provider, signer);
  const contract = await sdk.getContractFromAbi(simpleAccountFactoryAddress, simpleAccountFactoryABI);
  return contract;
}

export async function _getSimpleAcctContract(contractAddr: string, chainId: number, provider: ethers.providers.Provider, signer: string) {
  const sdk = await _initThirdWeb(chainId, provider, signer);
  const contract = await sdk.getContractFromAbi(contractAddr, abis.simpleAccount.abi);
  return contract;
}

export async function getWalletAddress(
  chainId: number,
  simpleAccountFactoryAddress: string,
  simpleAccountFactoryABI: any,
  salt: string,
  owner: string,
  provider: ethers.providers.Provider,
  signer: string
): Promise<string> {
  const factory = await _getSimpleAcctFactoryContract(chainId, simpleAccountFactoryAddress, simpleAccountFactoryABI, provider, signer);

  const SimpleAcctAddress = await factory.call('getAddress', owner, salt);
  return SimpleAcctAddress;
}

//getWalletAddress(chainID, simpleAccountFactoryAddr, abis.simpleAccountFactory.abi, salt, owner, provider, signer).then((x) => console.log(x));

export async function createWallet(
  chainId: number,
  simpleAccountFactoryAddress: string,
  simpleAccountFactoryABI: any,
  salt: string,
  owner: string,
  provider: ethers.providers.Provider,
  signer: string
) {
  const factory = await _getSimpleAcctFactoryContract(chainId, simpleAccountFactoryAddress, simpleAccountFactoryABI, provider, signer);

  const newSimpleAcct = await factory.call('createAccount', owner, salt);
  return {
    receipt: newSimpleAcct,
    address: await getWalletAddress(chainId, simpleAccountFactoryAddress, simpleAccountFactoryABI, salt, owner, provider, signer),
  };
}

//createWallet(chainID, simpleAccountFactoryAddr, abis.simpleAccountFactory.abi, "2", owner, provider, signer).then((x) => console.log(x));

export async function getWalletOwner(
  simpleAccountAddress: string,
  chainId: number,
  provider: ethers.providers.JsonRpcProvider,
  signer: string
): Promise<string> {
  const contract = await _getSimpleAcctContract(simpleAccountAddress, chainId, provider, signer);
  const owner = await contract.call('owner');
  return owner;
}

export async function getWalletBalance(
  simpleAccountAddress: string,
  chainId: number,
  provider: ethers.providers.JsonRpcProvider,
  signer: string
): Promise<BigNumber> {
  const contract = await _getSimpleAcctContract(simpleAccountAddress, chainId, provider, signer);
  const balance = await contract.call('getDeposit');
  return balance;
}

export async function getWalletBalanceInEth(
  simpleAccountAddress: string,
  chainId: number,
  provider: ethers.providers.JsonRpcProvider,
  signer: string
): Promise<string> {
  const contract = await _getSimpleAcctContract(simpleAccountAddress, chainId, provider, signer);
  const balance = await contract.call('getDeposit');
  return ethers.utils.formatEther(balance.toBigInt());
}

export async function depositToWallet(amt: string, simpleAccountAddress: string, chainId: number, provider: ethers.providers.JsonRpcProvider, signer: string) {
  const contract = await _getSimpleAcctContract(simpleAccountAddress, chainId, provider, signer);
  return await contract.call('addDeposit', {
    gasLimit: 1000000, // override default gas limit
    value: ethers.utils.parseEther(amt), // send 0.1 ether with the contract call
  });
}

export async function transferEth(
  amount: string,
  toAddress: string,
  salt: string,
  simple_account_factory_addr: string,
  simple_account_entrypoint: string,
  simple_account_bundler_url: string,
  provider: ethers.providers.JsonRpcProvider,
  signer: string
): Promise<{ op: string; uoHash: string; txHash: string }> {
  const paymasterAPI = undefined;

  const accountAPI = getSimpleAccount(provider, signer, simple_account_entrypoint, simple_account_factory_addr, paymasterAPI, Number(salt));

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

  const client = await getHttpRpcClient(provider, simple_account_bundler_url, simple_account_entrypoint);

  console.log(client);

  const uoHash = await client.sendUserOpToBundler(op);
  console.log(`UserOpHash: ${uoHash}`);

  console.log('Waiting for transaction...');
  const txHash = await accountAPI.getUserOpReceipt(uoHash);
  console.log(`Transaction hash: ${txHash}`);

  return { op: opCode, uoHash, txHash };
}

// transferEth(
//                 "0.001",
//                 "0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb",
//                 "1",
//                 simpleAccountFactoryAddr,
//                 entrypoint,
//                 bundler_url,
//                 provider,
//                 signer

//                 ).then((x) => console.log(x));

export async function transferECR20(
  token: string,
  amount: string,
  toAddress: string,
  salt: string,
  withPM = false,
  simple_account_entrypoint: string,
  simple_account_bundler_url: string,
  simple_account_factory_addr: string,
  simple_account_pm_url = '',
  provider: ethers.providers.JsonRpcProvider,
  signer: string
): Promise<{ op: string; uoHash: string; txHash: string }> {
  const paymasterAPI = withPM ? getVerifyingPaymaster(simple_account_pm_url, simple_account_entrypoint) : undefined;

  const accountAPI = getSimpleAccount(provider, signer, simple_account_entrypoint, simple_account_factory_addr, paymasterAPI, Number(salt));

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

// transferECR20(
//                 weenus_token_addr,
//                 "50",
//                 owner,
//                 "1",
//                 false,
//                 entrypoint,
//                 bundler_url,
//                 simpleAccountFactoryAddr,
//                 "",
//                 provider,
//                 signer
//             ).then((x) => console.log(x));

export async function transferOwner(simpleAccountAddress: string, newOwnerAddr: string, chainId: number, provider: ethers.providers.Provider, signer: string) {
  const contract = await _getSimpleAcctContract(simpleAccountAddress, chainId, provider, signer);

  // When this function is called, if the signer is not the owner of the SimpleAccount contract, it will throw an error
  await contract.call('setOwner', newOwnerAddr);
  const owner = await contract.call('owner');
  return owner;
}
