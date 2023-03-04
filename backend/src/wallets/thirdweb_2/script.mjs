import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { abis, networks, prevCreatedSimpleAccts } from "./constants.mjs";

async function initThirdWeb(network) {
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

async function getSimpleAcctContract(network, contractAddr) {
  const sdk = await initThirdWeb(network);
  const contract = await sdk.getContractFromAbi(
    contractAddr,
    abis.simpleAccount.abi
  );
  return contract;
}

async function getSimpleAcctFactoryContract(network) {
  const sdk = await initThirdWeb(network);
  const contract = await sdk.getContractFromAbi(
    network.SAFAddress,
    abis.simpleAccountFactory.abi
  );
  return contract;
}

async function getSimpleAcctContractAddress(network, owner, salt) {
  const factory = await getSimpleAcctFactoryContract(network);
  const SimpleAcctAddress = await factory.call("getAddress", owner, salt);
  return SimpleAcctAddress;
}

async function newSimpleAcct(network, owner, salt) {
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

async function getSimpleAcctOwner(network, simpleAccountAddress) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  const owner = await contract.call("owner");
  return owner;
}

async function setSimpleAcctOwner(network, simpleAccountAddress, newOwnerAddr) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  await contract.call("setOwner", newOwnerAddr);
  const owner = await contract.call("owner");
  return owner;
}

async function getSimpleAcctBalance(network, simpleAccountAddress) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  const balance = await contract.call("getDeposit");
  return balance;
}

async function getSimpleAcctBalanceInEth(network, simpleAccountAddress) {
  const contract = await getSimpleAcctContract(network, simpleAccountAddress);
  const balance = await contract.call("getDeposit");
  return ethers.utils.formatEther(balance.toBigInt());
}

async function depositToSimpleAcct(network, simpleAccountAddress, amt) {
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



