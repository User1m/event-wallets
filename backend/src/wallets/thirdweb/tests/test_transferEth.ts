import { transferEth } from '../script';
import * as constants from './constants';

console.log("////////// PROVIDER ///////////\n");
console.log(constants.provider);
console.log("\n\n");

console.log("////////// SIGNER //////////\n");
console.log(constants.signer);
console.log("\n\n");


console.log("////////// MAIN //////////\n");

transferEth(
                "0.001", 
                constants.owner,
                constants.salt,
                constants.simple_account_factory_addr ,
                constants.entrypoint,
                constants.bundler_url,
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
  
//   10e8..............255a
  
  
  
//   ////////// MAIN //////////
  
//   Signed UserOperation: {
//     "sender": "0x38B4c8200f4Abc4806E34e27ac43DBb771B72911",
//     "nonce": "0x4",
//     "initCode": "0x",
//     "callData": "0xb61d27f600000000000000000000000090c9bd12bd1c20bf61736f819886cf7983044fdb00000000000000000000000000000000000000000000000000038d7ea4c6800000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
//     "callGasLimit": "0x9a67",
//     "verificationGasLimit": "0x186a0",
//     "maxFeePerGas": "0x57",
//     "maxPriorityFeePerGas": "0x2f",
//     "paymasterAndData": "0x",
//     "preVerificationGas": "0xb6e4",
//     "signature": "0x12c99010eadd86cb47f29574f2e2030ec2ef235103f72ac0829eec30f7455e15717b79db990a964b655e16b0088f602d4f3481918ae7c87582ab95d33d9035a71b"
//   }
//   HttpRpcClient {
//     bundlerUrl: 'https://node.stackup.sh/v1/rpc/3b0e9ecb8b4166d581ea722a117de25437094b1ac7af0d84d3023178b69b8c1f',
//     entryPointAddress: '0x0576a174D229E3cFA37253523E645A78A0C91B57',
//     chainId: 5,
//     userOpJsonRpcProvider: JsonRpcProvider {
//       _isProvider: true,
//       _events: [],
//       _emitted: { block: -2 },
//       disableCcipRead: false,
//       formatter: Formatter { formats: [Object] },
//       anyNetwork: false,
//       _network: { name: 'Connected bundler network', chainId: 5 },
//       _maxInternalBlockNumber: -1024,
//       _lastBlockNumber: -2,
//       _maxFilterBlockRange: 10,
//       _pollingInterval: 4000,
//       _fastQueryDate: 0,
//       connection: {
//         url: 'https://node.stackup.sh/v1/rpc/3b0e9ecb8b4166d581ea722a117de25437094b1ac7af0d84d3023178b69b8c1f'
//       },
//       _nextId: 43,
//       _eventLoopCache: { eth_chainId: [Promise] }
//     },
//     initializing: Promise { <pending> }
//   }
//   UserOpHash: 0x395f7e074b33b3ddbb2b9178f1d4092411a8584892696d808f6d21c543b6d444
//   Waiting for transaction...
//   Transaction hash: 0x5b9888f19ae72b70dd2f5bee466cc5eed3b200956d421562b675abb4105ee093
//   {
//     op: '{\n' +
//       '  "sender": "0x38B4c8200f4Abc4806E34e27ac43DBb771B72911",\n' +
//       '  "nonce": "0x4",\n' +
//       '  "initCode": "0x",\n' +
//       '  "callData": "0xb61d27f600000000000000000000000090c9bd12bd1c20bf61736f819886cf7983044fdb00000000000000000000000000000000000000000000000000038d7ea4c6800000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",\n' +
//       '  "callGasLimit": "0x9a67",\n' +
//       '  "verificationGasLimit": "0x186a0",\n' +
//       '  "maxFeePerGas": "0x57",\n' +
//       '  "maxPriorityFeePerGas": "0x2f",\n' +
//       '  "paymasterAndData": "0x",\n' +
//       '  "preVerificationGas": "0xb6e4",\n' +
//       '  "signature": "0x12c99010eadd86cb47f29574f2e2030ec2ef235103f72ac0829eec30f7455e15717b79db990a964b655e16b0088f602d4f3481918ae7c87582ab95d33d9035a71b"\n' +       
//       '}',
//     uoHash: '0x395f7e074b33b3ddbb2b9178f1d4092411a8584892696d808f6d21c543b6d444',
//     txHash: '0x5b9888f19ae72b70dd2f5bee466cc5eed3b200956d421562b675abb4105ee093'
//   }