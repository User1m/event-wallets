import { transferECR20 } from '../script';
import * as constants from './constants';

console.log("////////// PROVIDER ///////////\n");
console.log(constants.provider);
console.log("\n\n");

console.log("////////// SIGNER //////////\n");
console.log(constants.signer);
console.log("\n\n");


console.log("////////// MAIN //////////\n");

transferECR20(
                constants.weenus_token_addr,
                "50",
                constants.owner,
                "1",
                false,
                constants.entrypoint,
                constants.bundler_url,
                constants.simple_account_factory_addr,
                "",
                constants.provider,
                constants.signer
            ).then((x) => console.log(x));


// EXPECTED OUTPUT
////////// PROVIDER ///////////

// JsonRpcProvider {
//         _isProvider: true,
//         _events: [],
//         _emitted: { block: -2 },
//         disableCcipRead: false,
//         formatter: Formatter {
//           formats: {
//             transaction: [Object],
//             transactionRequest: [Object],
//             receiptLog: [Object],
//             receipt: [Object],
//             block: [Object],
//             blockWithTransactions: [Object],
//             filter: [Object],
//             filterLog: [Object]
//           }
//         },
//         anyNetwork: false,
//         _networkPromise: Promise { <pending> },
//         _maxInternalBlockNumber: -1024,
//         _lastBlockNumber: -2,
//         _maxFilterBlockRange: 10,
//         _pollingInterval: 4000,
//         _fastQueryDate: 0,
//         connection: {
//           url: 'https://goerli.infura.io/v3/884a1eec1b9343bb81fc7778dfad1f39'
//         },
//         _nextId: 42
//       }
           
      
//       ////////// SIGNER //////////      
//       10......55a
            
      
//       ////////// MAIN //////////      
//       Transferring 50 WEENUS...
//       Signed UserOperation: {
//         "sender": "0x38B4c8200f4Abc4806E34e27ac43DBb771B72911",
//         "nonce": "0x5",
//         "initCode": "0x",
//         "callData": "0xb61d27f6000000000000000000000000aff4481d10270f50f203e0763e2597776068cbc5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044a9059cbb00000000000000000000000090c9bd12bd1c20bf61736f819886cf7983044fdb000000000000000000000000000000000000000000000002b5e3af16b188000000000000000000000000000000000000000000000000000000000000",
//         "callGasLimit": "0xae21",
//         "verificationGasLimit": "0x186a0",
//         "maxFeePerGas": "0x57",
//         "maxPriorityFeePerGas": "0x2f",
//         "paymasterAndData": "0x",
//         "preVerificationGas": "0xbb1c",
//         "signature": "0xdfcc545f42d85b700692632ef4c08fcdb28a8953a6c5b507c7fbb0d2cdfcd90408f3d452a5341e899792b24e66e78e509e9b2dd6b302ba76d8806df145eb97051c"
//       }
//       UserOpHash: 0x9ff13d6529df3413cee796ad7a88650ba38df4f2aa22a69a235ad74c1bb286c5
//       Waiting for transaction...
//       Transaction hash: 0x51149f2b02a1508016de3057d4ee3e98d38706e12fb888cbbad28cc76ccc1b2d
//       {
//         op: '{\n' +
//           '  "sender": "0x38B4c8200f4Abc4806E34e27ac43DBb771B72911",\n' +
//           '  "nonce": "0x5",\n' +
//           '  "initCode": "0x",\n' +
//           '  "callData": "0xb61d27f6000000000000000000000000aff4481d10270f50f203e0763e2597776068cbc5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044a9059cbb00000000000000000000000090c9bd12bd1c20bf61736f819886cf7983044fdb000000000000000000000000000000000000000000000002b5e3af16b188000000000000000000000000000000000000000000000000000000000000",\n' +
//           '  "callGasLimit": "0xae21",\n' +
//           '  "verificationGasLimit": "0x186a0",\n' +
//           '  "maxFeePerGas": "0x57",\n' +
//           '  "maxPriorityFeePerGas": "0x2f",\n' +
//           '  "paymasterAndData": "0x",\n' +
//           '  "preVerificationGas": "0xbb1c",\n' +
//           '  "signature": "0xdfcc545f42d85b700692632ef4c08fcdb28a8953a6c5b507c7fbb0d2cdfcd90408f3d452a5341e899792b24e66e78e509e9b2dd6b302ba76d8806df145eb97051c"\n' +       
//           '}',
//         uoHash: '0x9ff13d6529df3413cee796ad7a88650ba38df4f2aa22a69a235ad74c1bb286c5',
//         txHash: '0x51149f2b02a1508016de3057d4ee3e98d38706e12fb888cbbad28cc76ccc1b2d'
//       }