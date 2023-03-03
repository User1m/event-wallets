import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from 'ethers'
import {abis, networks, prevCreatedSimpleAccts} from './constants.mjs'


async function getSimpleAcctContractAddress(network, owner, salt) {
    /* Return a new SimpleAccount contract on a specific network*/

    // Init thirdweb to talk to the network
    const provider = new ethers.providers.JsonRpcProvider(network.url);
    const signer = new ethers.Wallet(process.env.MMPK, provider);
    const sdk = ThirdwebSDK.fromSigner(signer, network.chainId);
    
    // Get the simple acount factory contract
    const contract = await sdk.getContractFromAbi(network.SAFAddress, abis.simpleAccountFactory.abi);

    //call the createAccount function on the factory contract
    const SimpleAcctAddress = await contract.call("getAddress", owner, salt);

    return SimpleAcctAddress
}

async function newSimpleAcct(network, owner, salt){

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
    const newSimpleAcct = await contract.call("createAccount", owner, salt);

    return { receipt: newSimpleAcct, simpleAccountAddress: await getSimpleAcctContractAddress(network, network.SAFAddress, owner, salt) }

}

async function getSimpleAcctContract(network, simpleAccountAddress) {


    // Init thirdweb to talk to the network
    const provider = new ethers.providers.JsonRpcProvider(network.url);
    const signer = new ethers.Wallet(process.env.MMPK, provider);
    const sdk = ThirdwebSDK.fromSigner(signer, network.chainId);
    
    // Get the simple acount factory contract
    const contract = await sdk.getContractFromAbi(simpleAccountAddress, abis.simpleAccount.abi);

    return contract
}

async function getSimpleAcctOwner(network, simpleAccountAddress) {
    const contract = await getSimpleAcctContract(network, simpleAccountAddress);
    const owner = await contract.call("owner");
    return owner
}

async function setSimpleAcctOwner(network, simpleAccountAddress, newOwnerAddr) {
    const contract = await getSimpleAcctContract(network, simpleAccountAddress);
    
    await contract.call("setOwner", newOwnerAddr);

    const owner = await contract.call("owner");
    return owner
}

// setSimpleAcctOwner(Networks.mumbai, prevCreatedSimpleAccts.mumbai, "0xb2aB9159345e405ff1442f32FEF403A9552e86AA").then((owner) => {
//     console.log("Owner", owner);
// });







// newSimpleAcct(
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














