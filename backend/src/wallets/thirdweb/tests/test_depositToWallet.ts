import { depositToWallet } from '../script';
import * as constants from './constants';

console.log("////////// PROVIDER ///////////\n");
console.log(constants.provider);
console.log("\n\n");

console.log("////////// SIGNER //////////\n");
console.log(constants.signer);
console.log("\n\n");


console.log("////////// MAIN //////////\n");


depositToWallet(
                    "0.01",
                    constants.simple_account_contract_address,
                    constants.chain_id,
                    constants.provider,
                    constants.signer
                    ).then((x) => console.log(x));

// Expected output:
////////// PROVIDER ///////////

// JsonRpcProvider {
//     _isProvider: true,
//     _events: [],
//     _emitted: { block: -2 },
//     disableCcipRead: false,
//     formatter: Formatter {
//       formats: {
//         transaction: [Object],
//         transactionRequest: [Object],
//         receiptLog: [Object],
//         receipt: [Object],
//         block: [Object],
//         blockWithTransactions: [Object],
//         filter: [Object],
//         filterLog: [Object]
//       }
//     },
//     anyNetwork: false,
//     _networkPromise: Promise { <pending> },
//     _maxInternalBlockNumber: -1024,
//     _lastBlockNumber: -2,
//     _maxFilterBlockRange: 10,
//     _pollingInterval: 4000,
//     _fastQueryDate: 0,
//     connection: {
//       url: 'https://goerli.infura.io/v3/884a1eec1b9343bb81fc7778dfad1f39'
//     },
//     _nextId: 42
//   }
  
  
  
//   ////////// SIGNER //////////
  
//   10e8...9255a
  
  
  
//   ////////// MAIN //////////
  
//   {
//     receipt: {
//       to: '0x38B4c8200f4Abc4806E34e27ac43DBb771B72911',
//       from: '0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb',
//       contractAddress: null,
//       transactionIndex: 6,
//       gasUsed: BigNumber { _hex: '0xa807', _isBigNumber: true },
//       logsBloom: '0x00000000000000000000000000000000000000000000000002000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200008000000000000000000000000008000000000000000000000000000000200000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000002000000000000000000000000000000000000000000000',
//       blockHash: '0xbff253cd3f604095117cdc62d70ae210d0b4ebd538511eeed78643b995da1c43',
//       transactionHash: '0x2c27160daf71eaafe4c6dc7d548f886f969f5a0021c9fa04d8d31f2709038459',
//       logs: [ [Object] ],
//       blockNumber: 9141728,
//       confirmations: 1,
//       cumulativeGasUsed: BigNumber { _hex: '0x3d6adb', _isBigNumber: true },
//       effectiveGasPrice: BigNumber { _hex: '0x59682f1b', _isBigNumber: true },
//       status: 1,
//       type: 2,
//       byzantium: true,
//       events: [ [Object] ]
//     }
//   }