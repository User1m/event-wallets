import { getWalletBalanceInEth } from '../script';
import * as constants from './constants';

console.log('////////// PROVIDER ///////////\n');
console.log(constants.provider);
console.log('\n\n');

console.log('////////// SIGNER //////////\n');
console.log(constants.signer);
console.log('\n\n');

console.log('////////// MAIN //////////\n');

getWalletBalanceInEth(constants.simple_account_contract_address, constants.chain_id, constants.provider, constants.signer).then((x) => console.log(x));

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
//   }

//   ////////// SIGNER //////////

//   10e........255a

//   ////////// MAIN //////////

//   0.097609021302530477
