import { getWalletOwner } from '../script';
import * as constants from './constants';

console.log('////////// PROVIDER ///////////\n');
console.log(constants.provider);
console.log('\n\n');

console.log('////////// SIGNER //////////\n');
console.log(constants.signer);
console.log('\n\n');

console.log('////////// MAIN //////////\n');
getWalletOwner(constants.simple_account_contract_address, constants.chain_id, constants.provider, constants.signer).then((x) => console.log(x));

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

//   10e...1e9639255a

//   ////////// MAIN //////////

//   0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb
