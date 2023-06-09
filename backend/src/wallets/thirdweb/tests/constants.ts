import { ethers} from 'ethers';
import { abis, Network, NETWORKS } from '../constants';

const dotenv = require('dotenv');
dotenv.config({ path: '../../../../.env' });

export const chain_id = 5; // Goerli
export const simple_account_factory_addr = "0xe16B0712FEed4D24a1dE6cFC5bcB5c3b481C44C2"
export const simple_account_factory_abi = abis.simpleAccountFactory.abi;
export const signer = process.env.MMPK;
export const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_INFURA_URL);

export const salt = "1"
export const owner = "0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb"
export const owner_2 = "0xb2aB9159345e405ff1442f32FEF403A9552e86AA"
export const simple_account_contract_address = "0x38B4c8200f4Abc4806E34e27ac43DBb771B72911"
export const simple_account_contract_address_2 = "0x8488116B1B8B19cc3235edec337eeDA190F28954"
export const entrypoint = "0x0576a174D229E3cFA37253523E645A78A0C91B57"
export const bundler_url = "https://node.stackup.sh/v1/rpc/3b0e9ecb8b4166d581ea722a117de25437094b1ac7af0d84d3023178b69b8c1f"
export const weenus_token_addr = "0xaFF4481D10270F50f203E0763e2597776068CBc5"