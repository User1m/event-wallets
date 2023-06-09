import * as sABI from './simpleAcctABI.json';
import * as sAFBI from './SimpleAccountFactory.json';
// import dotenv from 'dotenv';
// dotenv.config();

require('dotenv').config();

export const abis = {
  simpleAccount: sABI,
  simpleAccountFactory: sAFBI,
};

export interface Network {
  url: string;
  chainId: number;
  scanUrl: string;
  SAFAddress: string;
  owner?: string;
}

const WAGMI_OWNER = '0x8b559858E63f14d323A1ad7c5238A96b273f999c';

export const NETWORKS: { [key: string]: Network } = {
  goerli: {
    url: process.env.GOERLI_INFURA_URL,
    chainId: 5,
    scanUrl: 'https://goerli.etherscan.io',
    SAFAddress: '0xfB5A68B43c521E98DbA812e3C4D4d6654476a70f', //'0x822cFC6B982285Ccb35Df85287DE57f44cb25814',
    owner: WAGMI_OWNER,
  },
  // mumbai: {
  //   url: process.env.MUMBAI_INFURA_URL,
  //   chainId: 80001,
  //   scanUrl: 'https://mumbai.polygonscan.com',
  //   SAFAddress: '0xC529a6A67181E50859808eEFe5bBc589eB3dd609',
  //   owner: WAGMI_OWNER,
  // },
  // base: {
  //   url: process.env.BASE_INFURA_URL,
  //   chainId: 84531,
  //   scanUrl: 'https://goerli.basescan.org',
  //   SAFAddress: '0x25e7F2B0887A7d1D3B918563019eC44C3425c4b0',
  //   owner: WAGMI_OWNER,
  // },
};

export const prevCreatedSimpleAccts = {
  goerli: '0x5914594613c2fb4a3fb80f22f7baa8906368e3b3',
  mumbai: '0x2Cd8961b040c831eFC31DFdFaC6Aa52D33C79f2f',
  base: '0x626a12D6147a98Be996B09BdcD795Bd68eBcdB9D',
};
