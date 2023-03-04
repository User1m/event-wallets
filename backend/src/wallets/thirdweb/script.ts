import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from 'ethers'
import { abis, Network } from "./constants";
// import { abis, networks, prevCreatedSimpleAccts } from './constants.ts'

export async function getWalletAddress(network: Network, salt: string) {
  /* Return a new SimpleAccount contract on a specific network*/

  // Init thirdweb to talk to the network
  const provider = new ethers.providers.JsonRpcProvider(network.url);
  const signer = new ethers.Wallet(process.env.MMPK, provider);
  const sdk = ThirdwebSDK.fromSigner(signer, network.chainId);

  // Get the simple acount factory contract
  const contract = await sdk.getContractFromAbi(network.SAFAddress, abis.simpleAccountFactory.abi);

  //call the createAccount function on the factory contract
  const SimpleAcctAddress = await contract.call("getAddress", network.owner, salt);

  return SimpleAcctAddress;
}

export async function createSmartWallet(network: Network, salt: string) {

  /* 
      Create a new SimpleAccount contract on a specific network.

      NOTE:
      If the owner address + salt combo already exists, 
      the function will return the address of the existing contract.
  
  
  */

  // Init thirdweb to talk to the network
  const provider = new ethers.providers.JsonRpcProvider(network.url);
  const signer = new ethers.Wallet(process.env.MMPK, provider);
  const sdk = ThirdwebSDK.fromSigner(signer, network.chainId);

  // Get the simple acount factory contract
  const contract = await sdk.getContractFromAbi(network.SAFAddress, abis.simpleAccountFactory.abi);

  //call the createAccount function on the factory contract
  const newSimpleAcct = await contract.call("createAccount", network.owner, salt);

  return { receipt: newSimpleAcct, address: await getWalletAddress(network, salt) }

}

export async function getContract(network: Network, accountAddress: string) {
  // Init thirdweb to talk to the network
  const provider = new ethers.providers.JsonRpcProvider(network.url);
  const signer = new ethers.Wallet(process.env.MMPK, provider);
  const sdk = ThirdwebSDK.fromSigner(signer, network.chainId);

  // Get the simple acount factory contract
  const contract = await sdk.getContractFromAbi(accountAddress, abis.simpleAccount.abi);

  return contract
}

export async function getSimpleAcctOwner(network: Network, accountAddress: string) {
  const contract = await getContract(network, accountAddress);
  const owner = await contract.call("owner");
  return owner
}

export async function transferOwner(network: Network, accountAddress: string, newOwnerAddr: string) {
  const contract = await getContract(network, accountAddress);
  await contract.call("setOwner", newOwnerAddr);
  const owner = await contract.call("owner");
  return owner;
}

// TODO:
export async function transfer(network: Network, amount: string, fromAddress: string, toAddress: string): Promise<string> {
  const contract = await getContract(network, fromAddress);
  const txHash = await contract.call("transfer", toAddress, amount);
  return txHash;
}

// TODO:
export async function transferECR20(network: Network, token: string, amount: string, fromAddress: string, toAddress: string): Promise<string> {
  const contract = await getContract(network, fromAddress);
  const txHash = await contract.call("erc20transfer", toAddress, amount, token,);
  return txHash;
}

// setSimpleAcctOwner(Networks.mumbai, prevCreatedSimpleAccts.mumbai, "0xb2aB9159345e405ff1442f32FEF403A9552e86AA").then((owner) => {
//     console.log("Owner", owner);
// });



// createSmartWallet(
//     Networks.mumbai, 
//     SAFAddresses.mumbai, 
//     "0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb", 123).then((returnValue) => { 
//         console.log(returnValue); 
//     });

// getSimpleAcctOwner(Networks.mumbai, prevCreatedSimpleAccts.mumbai).then((owner) => {
//     console.log("Owner", owner);
// });

// getSimpleAcctOwner(networks.mumbai, '0x775A71d26c8d3D000c2C615C164E68733316bE6a').then((contract) => {
//     console.log("Owner", contract);
// });














