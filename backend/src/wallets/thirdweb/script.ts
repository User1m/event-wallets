import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers, providers } from 'ethers';
import { abis, Network, NETWORKS } from './constants';
import { getVerifyingPaymaster, getSimpleAccount, getGasFee, printOp, getHttpRpcClient, ERC20_ABI } from '../helpers';

require('dotenv').config();

const _config = require('../config.json');

/*
  chainId: 5 = goerli,
  chainId: 84531 = coinbase,
  chainId: 80001 = mumbai,
*/

export async function _initThirdWeb(network: Network, provider: ethers.providers.Provider, signer: string): Promise<ThirdwebSDK> {
  /* 
    Initialize the Thirdweb SDK by specifying the network, provider, and signer

    @param network: Network
    @param provider: ethers.providers.Provider 
    @param signer: string
      This is the private key of the wallet that will be used to sign transactions

    Example:
      const provider = new ethers.providers.JsonRpcProvider(NETWORKS.goerli.url);
      const signer = process.env.PRIVATE_KEY;
      const sdk = await initThirdWeb(NETWORKS.goerli, provider, signer);

  
  */

  if (network.chainId === 84531) {
    // if the chainID is for coinbaase, we need to use the default provider
    return new ThirdwebSDK(new ethers.Wallet(signer, ethers.getDefaultProvider(network.url)));
  } else {
    const _signer = new ethers.Wallet(signer, provider);
    const sdk = ThirdwebSDK.fromSigner(_signer, network.chainId);
    return sdk;
  }
}

export async function _getSimpleAcctContract(network: Network, contractAddr: string, signer: string, provider: ethers.providers.Provider) {
  /*
    Returns a contract object for a SimpleAccount contract

    @param network: Network
    @param contractAddr: string
      The address of the SimpleAccount contract that you want to interact with
    @param signer: string
      This is the private key of the wallet that will be used to sign transactions
    @param provider: ethers.providers.Provider
  */
  const sdk = await _initThirdWeb(network, provider, signer);
  const contract = await sdk.getContractFromAbi(contractAddr, abis.simpleAccount.abi);
  return contract;
}

export async function _getSimpleAcctFactoryContract(network: Network, signer: string, provider: ethers.providers.Provider) {
  /*
    Returns a contract object for the SimpleAccountFactory contract

    @param network: Network
    @param signer: string
      This is the private key of the wallet that will be used to sign transactions
    @param provider: ethers.providers.Provider
  */

  const sdk = await _initThirdWeb(network, provider, signer);
  // console.log("sdk", sdk)
  const contract = await sdk.getContractFromAbi(network.SAFAddress, abis.simpleAccountFactory.abi);
  // console.log("contract", contract)
  return contract;
}

export async function getWalletAddress(
  network: Network,
  salt: string,
  owner?: string,
  signer: string = process.env.MMPK,
  provider?: ethers.providers.Provider
) {
  /*
    Returns the address of a SimpleAccount contract when given the owner and salt
  */

  const _provider = provider || new ethers.providers.JsonRpcProvider(network.url);
  const _owner = owner || network?.owner;
  const factory = await _getSimpleAcctFactoryContract(network, signer, _provider);
  const SimpleAcctAddress = await factory.call('getAddress', _owner, salt);
  return SimpleAcctAddress;
}

export async function createWallet(network: Network, salt: string, owner?: string, signer: string = process.env.MMPK, provider?: ethers.providers.Provider) {
  /*
    Creates a new SimpleAccount contract

    @param network: Network
    @param owner: string
      The address of the owner of the SimpleAccount contract
      Should look like: "0x..."
      
    @param salt: string
      The salt used to generate the SimpleAccount contract address
    
      @param signer: string
      This is the private key of the wallet that will be used to sign transactions
    @param provider: ethers.providers.Provider
  */

  const _provider = provider || new ethers.providers.JsonRpcProvider(network.url);
  const _owner = owner || network?.owner;

  // console.log("_provider", _provider)
  // console.log("_owner", _owner)

  const factory = await _getSimpleAcctFactoryContract(network, signer, _provider);
  const newSimpleAcct = await factory.call('createAccount', _owner, salt);
  const address = await getWalletAddress(network, _owner, salt, signer, _provider);

  return {
    receipt: newSimpleAcct,
    address,
  };
}

export async function getWalletOwner(network: Network, simpleAccountAddress: string, signer: string = process.env.MMPK, provider?: ethers.providers.Provider) {
  /*
    Returns the owner of a SimpleAccount contract

    @param network: Network
    @param simpleAccountAddress: string
      The address of the SimpleAccount contract that you want to interact with
    @param signer: string
      This is the private key of the wallet that will be used to sign transactions
    @param provider: ethers.providers.Provider
  */
  const _provider = provider || new ethers.providers.JsonRpcProvider(network.url);
  const contract = await _getSimpleAcctContract(network, simpleAccountAddress, signer, _provider);
  const owner = await contract.call('owner');
  return owner;
}

export async function transferOwner(
  network: Network,
  simpleAccountAddress: string,
  newOwnerAddr: string,
  signer: string = process.env.MMPK,
  provider?: ethers.providers.Provider
) {
  /*
    Transfers ownership of a SimpleAccount contract to a new address

    @param network: Network
    @param simpleAccountAddress: string
      The address of the SimpleAccount contract that you want to interact with
    @param newOwnerAddr: string
      The address of the new owner of the SimpleAccount contract
    @param signer: string
      This is the private key of the wallet that will be used to sign transactions
    @param provider: ethers.providers.Provider
  */

  const _provider = provider || new ethers.providers.JsonRpcProvider(network.url);
  const contract = await _getSimpleAcctContract(network, simpleAccountAddress, signer, _provider);

  // When this function is called, if the signer is not the owner of the SimpleAccount contract, it will throw an error
  await contract.call('setOwner', newOwnerAddr);
  const owner = await contract.call('owner');
  return owner;
}

export async function getWalletBalance(
  network: Network,
  simpleAccountAddress: string,
  signer: string = process.env.MMPK,
  provider?: ethers.providers.Provider
) {
  /*
    Returns the balance of a SimpleAccount contract

    @param network: Network
    @param simpleAccountAddress: string
      The address of the SimpleAccount contract that you want to interact with
    @param signer: string
      This is the private key of the wallet that will be used to sign transactions
    @param provider: ethers.providers.Provider
  */

  const _provider = provider || new ethers.providers.JsonRpcProvider(network.url);

  const contract = await _getSimpleAcctContract(network, simpleAccountAddress, signer, _provider);
  const balance = await contract.call('getDeposit');
  return balance;
}

export async function getWalletBalanceInEth(
  network: Network,
  simpleAccountAddress: string,
  signer: string = process.env.MMPK,
  provider: ethers.providers.Provider
) {
  /*
    Returns the balance of a SimpleAccount contract in ether

    @param network: Network
    @param simpleAccountAddress: string
      The address of the SimpleAccount contract that you want to interact with
    @param signer: string
      This is the private key of the wallet that will be used to sign transactions
    @param provider: ethers.providers.Provider
  */
  const _provider = provider || new ethers.providers.JsonRpcProvider(network.url);

  const contract = await _getSimpleAcctContract(network, simpleAccountAddress, signer, _provider);
  const balance = await contract.call('getDeposit');
  return ethers.utils.formatEther(balance.toBigInt());
}

export async function depositToWallet(
  network: Network,
  simpleAccountAddress,
  amt: string,
  signer: string = process.env.MMPK,
  provider: ethers.providers.Provider
) {
  /*
    amt is a string representing the amount of ether to deposit
    
    EXAMPLE: 
      depositToSimpleAcct(networks.goerli, "0x4D211554bfD6427A6971c54A25c165B565d65A0e", "0.1")
    
  */

  const _provider = provider || new ethers.providers.JsonRpcProvider(network.url);
  const contract = await _getSimpleAcctContract(network, simpleAccountAddress, signer, _provider);

  return await contract.call('addDeposit', {
    gasLimit: 1000000, // override default gas limit
    value: ethers.utils.parseEther(amt), // send 0.1 ether with the contract call
  });
}

export async function transferEth(
  amount: string,
  toAddress: string,
  network: Network,
  salt: string,
  config: any = _config,
  signer: string = process.env.MMPK,
  provider?: ethers.providers.JsonRpcProvider
): Promise<{ op: string; uoHash: string; txHash: string }> {
  /*
    Transfers ETH from a SimpleAccount contract to another address

    @param network: Network
    @param amount: string
      The amount of ETH to transfer
    @param toAddress: string
      The address to transfer ETH to
    @param config: any
      The config object
    @param signer: string
      This is the private key of the wallet that will be used to sign transactions
    @param provider: ethers.providers.JsonRpcProvider
    @param salt: number 
      The salt used to generate the SimpleAccount contract address
  */

  // DON'T worry about PM for now
  //const paymasterAPI = undefined //withPM ? getVerifyingPaymaster(config.paymasterUrl, config.entryPoint) : undefined;
  const paymasterAPI = undefined;
  const _provider = provider || new ethers.providers.JsonRpcProvider(network.url);

  const accountAPI = getSimpleAccount(_provider, signer, config.entryPoint, network.SAFAddress, paymasterAPI, Number(salt));

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

  const client = await getHttpRpcClient(provider, config.bundlerUrl, config.entryPoint);
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
  network: Network,
  salt: string,
  withPM = false,
  config: any = _config,
  signer: string = process.env.MMPK,
  provider?: ethers.providers.JsonRpcProvider
): Promise<{ op: string; uoHash: string; txHash: string }> {
  /*
    Transfers ERC20 tokens from a SimpleAccount contract to another address
    
    @param network: Network
    @param token: string
      The address of the ERC20 token
    @param amount: string
      The amount of ERC20 tokens to transfer
    @param toAddress: string
      The address to transfer ERC20 tokens to
    @param config: any
      The config object
    @param signer: string
      This is the private key of the wallet that will be used to sign transactions
    @param provider: ethers.providers.JsonRpcProvider
    @param salt: number
      The salt used to generate the SimpleAccount contract address
    @param withPM: boolean
      Whether or not to use a paymaster
  */
  const _provider = provider || new ethers.providers.JsonRpcProvider(network.url);

  const paymasterAPI = withPM ? getVerifyingPaymaster(config.paymasterUrl, config.entryPoint) : undefined;

  const accountAPI = getSimpleAccount(_provider, signer, config.entryPoint, network.SAFAddress, paymasterAPI, Number(salt));

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

  const client = await getHttpRpcClient(provider, config.bundlerUrl, config.entryPoint);
  const uoHash = await client.sendUserOpToBundler(op);
  console.log(`UserOpHash: ${uoHash}`);

  console.log('Waiting for transaction...');
  const txHash = await accountAPI.getUserOpReceipt(uoHash);
  console.log(`Transaction hash: ${txHash}`);

  return { op: opCode, uoHash, txHash };
}

// const provider = new ethers.providers.JsonRpcProvider(NETWORKS.goerli.url);
// const signer = process.env.MMPK;

// createWallet(NETWORKS.goerli, '1', '0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb', signer, provider).then((x) => console.log(x));

// getSimpleAccount(provider, signer, _config.entryPoint, NETWORKS.goerli.SAFAddress, 1, undefined)
//   .getCounterFactualAddress()
//   .then((x) => console.log(x));

// transferECR20(
//                 "0xaFF4481D10270F50f203E0763e2597776068CBc5", // WEENUS token
//                 "200",
//                 '0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb',
//                 signer,
//                 provider,
//                 NETWORKS.goerli, config, 1, false).then((x) => console.log(x));
