import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from 'ethers'
import { abis, Network } from "./constants";

export async function initThirdWeb(network: Network): Promise<ThirdwebSDK> {
  if (network.chainId === 84531) {
    const sdk = new ThirdwebSDK(
      new ethers.Wallet(
        process.env.MMPK,
        ethers.getDefaultProvider(network.url)
      )
    );

    return sdk;
  } else {
    const provider = new ethers.providers.JsonRpcProvider(network.url);
    const signer = new ethers.Wallet(process.env.MMPK, provider);
    const sdk = ThirdwebSDK.fromSigner(signer, network.chainId);

    return sdk;
  }
}

export async function getSimpleAcctContract(network: Network, contractAddr: string) {
  const sdk = await initThirdWeb(network);
  const contract = await sdk.getContractFromAbi(
    contractAddr,
    abis.simpleAccount.abi
  );
  return contract;
}

export async function getSimpleAcctFactoryContract(network: Network) {
  const sdk = await initThirdWeb(network);
  const contract = await sdk.getContractFromAbi(
    network.SAFAddress,
    abis.simpleAccountFactory.abi
  );
  return contract;
}

export async function getSimpleAcctContractAddress(network: Network, owner: string, salt: string) {
  const factory = await getSimpleAcctFactoryContract(network);
  const SimpleAcctAddress = await factory.call("getAddress", owner, salt);
  return SimpleAcctAddress;
}

export async function newSimpleAcct(network: Network, owner: string, salt: string) {
  const factory = await getSimpleAcctFactoryContract(network);
  const newSimpleAcct = await factory.call("createAccount", owner, salt);
  return {
    receipt: newSimpleAcct,
    simpleAccountAddress: await getSimpleAcctContractAddress(
      network,
      owner,
      salt
    ),
  };
}

export async function getSimpleAcctOwner(network: Network, simpleAccountAddress: string) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  const owner = await contract.call("owner");
  return owner;
}

export async function setSimpleAcctOwner(network: Network, simpleAccountAddress: string, newOwnerAddr: string) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  await contract.call("setOwner", newOwnerAddr);
  const owner = await contract.call("owner");
  return owner;
}

export async function getSimpleAcctBalance(network: Network, simpleAccountAddress: string) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  const balance = await contract.call("getDeposit");
  return balance;
}

export async function getSimpleAcctBalanceInEth(network: Network, simpleAccountAddress: string) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  const balance = await contract.call("getDeposit");
  return ethers.utils.formatEther(balance.toBigInt());
}

export async function depositToSimpleAcct(network: Network, simpleAccountAddress, amt: string) {
  /*
    amt is a string representing the amount of ether to deposit

    EXAMPLE: depositToSimpleAcct(networks.goerli, "0x4D211554bfD6427A6971c54A25c165B565d65A0e", "0.1")
    */

  const contract = await getSimpleAcctContract(network, simpleAccountAddress);

  return await contract.call("addDeposit", {
    gasLimit: 1000000, // override default gas limit
    value: ethers.utils.parseEther(amt), // send 0.1 ether with the contract call
  });
}

// TODO:
export async function transfer(network: Network, amount: string, fromAddress: string, toAddress: string): Promise<string> {
  // const contract = await getSimpleAcctContract(network, fromAddress);
  // const txHash = await contract.call("transfer", toAddress, amount);
  // return txHash;
}

// TODO:
export async function transferECR20(network: Network, token: string, amount: string, fromAddress: string, toAddress: string): Promise<string> {
  // const contract = await getSimpleAcctContract(network, fromAddress);
  // const txHash = await contract.call("erc20transfer", toAddress, amount, token,);
  // return txHash;
}












