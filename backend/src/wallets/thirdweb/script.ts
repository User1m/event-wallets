import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import { abis, Network, NETWORKS } from './constants';

export async function initThirdWeb(network: Network): Promise<ThirdwebSDK> {
  if (network.chainId === 84531) {
    const sdk = new ThirdwebSDK(new ethers.Wallet(process.env.MMPK, ethers.getDefaultProvider(network.url)));
    return sdk;
  } else {
    const provider = new ethers.providers.JsonRpcProvider(network.url);
    const signer = new ethers.Wallet(process.env.MMPK, provider);
    const sdk = ThirdwebSDK.fromSigner(signer, network.chainId);
    return sdk;
  }
}

// export async function createSmartWallet(network: Network, salt: string) {

//   /*
//       Create a new SimpleAccount contract on a specific network.

//       NOTE:
//       If the owner address + salt combo already exists,
//       the function will return the address of the existing contract.

//   */

//   // Init thirdweb to talk to the network
//   const provider = new ethers.providers.JsonRpcProvider(network.url);
//   const signer = new ethers.Wallet(process.env.MMPK, provider);
//   const sdk = ThirdwebSDK.fromSigner(signer, network.chainId);

//   // Get the simple acount factory contract
//   const contract = await sdk.getContractFromAbi(network.SAFAddress, abis.simpleAccountFactory.abi);

//   console.log("network", network)
//   //call the createAccount function on the factory contract
//   const newSimpleAcct = await contract.call("createAccount", network.owner, salt);
//   console.log("here2")

//   return { receipt: newSimpleAcct, address: await getWalletAddress(network, salt) }
// }

export async function getSimpleAcctContract(network: Network, contractAddr: string) {
  const sdk = await initThirdWeb(network);
  const contract = await sdk.getContractFromAbi(contractAddr, abis.simpleAccount.abi);
  return contract;
}

export async function getSimpleAcctFactoryContract(network: Network) {
  const sdk = await initThirdWeb(network);
  const contract = await sdk.getContractFromAbi(network.SAFAddress, abis.simpleAccountFactory.abi);
  return contract;
}

export async function getWalletAddress(network: Network, salt: string) {
  const factory = await getSimpleAcctFactoryContract(network);
  const SimpleAcctAddress = await factory.call('getAddress', network.owner, salt);
  return SimpleAcctAddress;
}

export async function createWallet(network: Network, salt: string) {
  console.log('network', network);
  const factory = await getSimpleAcctFactoryContract(network);
  const newSimpleAcct = await factory.call('createAccount', network.owner, salt);
  return {
    receipt: newSimpleAcct,
    address: await getWalletAddress(network, salt),
  };
}

export async function getWalletOwner(network: Network, simpleAccountAddress: string) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  const owner = await contract.call('owner');
  return owner;
}

export async function transferOwner(network: Network, simpleAccountAddress: string, newOwnerAddr: string) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  await contract.call('setOwner', newOwnerAddr);
  const owner = await contract.call('owner');
  return owner;
}

export async function getWalletBalance(network: Network, simpleAccountAddress: string) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  const balance = await contract.call('getDeposit');
  return balance;
}

export async function getWalletBalanceInEth(network: Network, simpleAccountAddress: string) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  const balance = await contract.call('getDeposit');
  return ethers.utils.formatEther(balance.toBigInt());
}

export async function depositToWallet(network: Network, simpleAccountAddress, amt: string) {
  /*
    amt is a string representing the amount of ether to deposit
    EXAMPLE: depositToSimpleAcct(networks.goerli, "0x4D211554bfD6427A6971c54A25c165B565d65A0e", "0.1")
    */

  const contract = await getSimpleAcctContract(network, simpleAccountAddress);

  return await contract.call('addDeposit', {
    gasLimit: 1000000, // override default gas limit
    value: ethers.utils.parseEther(amt), // send 0.1 ether with the contract call
  });
}

// TODO:
export async function transfer(network: Network, amount: string, fromAddress: string, toAddress: string): Promise<string> {
  // const contract = await getSimpleAcctContract(network, fromAddress);
  // const txHash = await contract.call("transfer", toAddress, amount);
  // return txHash;
  return '';
}

// TODO:
export async function transferECR20(network: Network, token: string, amount: string, fromAddress: string, toAddress: string): Promise<string> {
  // const contract = await getSimpleAcctContract(network, fromAddress);
  // const txHash = await contract.call("erc20transfer", toAddress, amount, token,);
  // return txHash;
  return '';
}

// initThirdWeb(NETWORKS.goerli).then((x)=>console.log(x))
// getSimpleAcctContract(NETWORKS.goerli, "0x5914594613c2fb4a3fb80f22f7baa8906368e3b3").then((x)=>console.log(x))
// getSimpleAcctFactoryContract(NETWORKS.goerli).then((x)=>console.log(x))
// createWallet(NETWORKS.goerli, '12344').then((x)=>console.log(x))
