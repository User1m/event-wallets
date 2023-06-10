import { getWalletOwner, transferOwner } from '../script';
import * as constants from './constants';

console.log('////////// PROVIDER ///////////\n');
console.log(constants.provider);
console.log('\n\n');

console.log('////////// SIGNER //////////\n');
console.log(constants.signer);
console.log('\n\n');

console.log('////////// MAIN //////////\n');

console.log('////////// OLD OWNER //////////\n');
getWalletOwner(constants.simple_account_contract_address_2, constants.chain_id, constants.provider, constants.signer).then((x) => console.log(x));

console.log('////////// TRANSFER OWNER //////////\n');
transferOwner(constants.simple_account_contract_address_2, constants.owner_2, constants.chain_id, constants.provider, constants.signer).then((x) =>
  console.log(x)
);

console.log('////////// NEW OWNER //////////\n');
getWalletOwner(constants.simple_account_contract_address_2, constants.chain_id, constants.provider, constants.signer).then((x) => console.log(x));

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

//   10e84.....255a

//   ////////// MAIN //////////

//   ////////// OLD OWNER //////////

//   ////////// TRANSFER OWNER //////////

//   ////////// NEW OWNER //////////

//   0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb
//   0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb
//   0xb2aB9159345e405ff1442f32FEF403A9552e86AA
