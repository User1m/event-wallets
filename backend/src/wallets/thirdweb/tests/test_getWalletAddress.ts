import { getWalletAddress } from '../script';
import * as constants from './constants';

console.log("////////// PROVIDER ///////////\n");
console.log(constants.provider);
console.log("\n\n");

console.log("////////// SIGNER //////////\n");
console.log(constants.signer);
console.log("\n\n");


console.log("////////// MAIN //////////\n");

getWalletAddress(                
                    constants.chain_id,
                    constants.simple_account_factory_addr,
                    constants.simple_account_factory_abi,
                    constants.salt,
                    constants.owner,
                    constants.provider,
                    constants.signer
                ).then((x) => console.log(x));



// EXPECTED OUTPUT
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
//   10e843...11e9639255a
  
  
  
//   ////////// MAIN //////////
//   0x38B4c8200f4Abc4806E34e27ac43DBb771B72911

