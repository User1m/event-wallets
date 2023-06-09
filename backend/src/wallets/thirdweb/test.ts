import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers, providers } from 'ethers';
import { abis, Network, NETWORKS } from './constants';
import { getVerifyingPaymaster, getSimpleAccount, getGasFee, printOp, getHttpRpcClient, ERC20_ABI } from '../helpers';

import {
    _initThirdWeb,
    _getSimpleAcctContract,
    getWalletAddress,
    createWallet,
    getWalletOwner,
    transferOwner,
    getWalletBalance,
    getWalletBalanceInEth,
    depositToWallet,
    transferEth,
    transferECR20,
    _getSimpleAcctFactoryContract
  } from './script'; 


require('dotenv').config();

const _config = require('../config.json');


const provider = new ethers.providers.JsonRpcProvider(NETWORKS.goerli.url);
const signer = process.env.MMPK;

_initThirdWeb(NETWORKS.goerli, provider, signer).then((x) => console.log(x));

//_getSimpleAcctFactoryContract(NETWORKS.goerli, signer, provider).then((x) => console.log(x));

//_getSimpleAcctContract(NETWORKS.goerli, simpleAccountAddress, provider, signer).then((x) => console.log(x));


//getWalletAddress(NETWORKS.goerli, provider, signer).then((x) => console.log(x));


