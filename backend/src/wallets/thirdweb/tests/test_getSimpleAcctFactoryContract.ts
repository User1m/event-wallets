import { _getSimpleAcctFactoryContract } from '../script';
import * as constants from './constants';

console.log("////////// PROVIDER ///////////\n");
console.log(constants.provider);
console.log("\n\n");

console.log("////////// SIGNER //////////\n");
console.log(constants.signer);
console.log("\n\n");


console.log("////////// MAIN //////////\n");

_getSimpleAcctFactoryContract(
                                    constants.chain_id,
                                    constants.simple_account_contract_address,
                                    constants.simple_account_factory_abi,
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
  
//   10e843b..b881105bf11e9639255a
  
  
  
//   ////////// MAIN //////////
  
//   SmartContract {
//     contractWrapper: ContractWrapper {
//       _events: Events <[Object: null prototype] {}> {},
//       _eventsCount: 0,
//       provider: JsonRpcProvider {
//         _isProvider: true,
//         _events: [],
//         _emitted: [Object],
//         disableCcipRead: false,
//         formatter: [Formatter],
//         anyNetwork: false,
//         _networkPromise: [Promise],
//         _maxInternalBlockNumber: -1024,
//         _lastBlockNumber: -2,
//         _maxFilterBlockRange: 10,
//         _pollingInterval: 4000,
//         _fastQueryDate: 0,
//         connection: [Object],
//         _nextId: 44,
//         _eventLoopCache: [Object],
//         _network: [Object]
//       },
//       signer: Wallet {
//         _isSigner: true,
//         _signingKey: [Function (anonymous)],
//         _mnemonic: [Function (anonymous)],
//         address: '0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb',
//         provider: [JsonRpcProvider]
//       },
//       options: {
//         supportedChains: [Array],
//         thirdwebApiKey: 'c6634ad2d97b74baf15ff556016830c251050e6c36b9da508ce3ec80095d3dc1',
//         gasSettings: [Object]
//       },
//       isValidContract: false,
//       customOverrides: [Function (anonymous)],
//       writeContract: Contract {
//         interface: [Interface],
//         provider: [JsonRpcProvider],
//         signer: [Wallet],
//         callStatic: [Object],
//         estimateGas: [Object],
//         functions: [Object],
//         populateTransaction: [Object],
//         filters: {},
//         _runningEvents: {},
//         _wrappedEmits: {},
//         address: '0xe16B0712FEed4D24a1dE6cFC5bcB5c3b481C44C2',
//         resolvedAddress: [Promise],
//         'accountImplementation()': [Function (anonymous)],
//         'createAccount(address,uint256)': [Function (anonymous)],
//         'getAddress(address,uint256)': [Function (anonymous)],
//         accountImplementation: [Function (anonymous)],
//         createAccount: [Function (anonymous)],
//         getAddress: [Function (anonymous)]
//       },
//       readContract: Contract {
//         interface: [Interface],
//         provider: [JsonRpcProvider],
//         signer: null,
//         callStatic: [Object],
//         estimateGas: [Object],
//         functions: [Object],
//         populateTransaction: [Object],
//         filters: {},
//         _runningEvents: {},
//         _wrappedEmits: {},
//         address: '0xe16B0712FEed4D24a1dE6cFC5bcB5c3b481C44C2',
//         resolvedAddress: [Promise],
//         'accountImplementation()': [Function (anonymous)],
//         'createAccount(address,uint256)': [Function (anonymous)],
//         'getAddress(address,uint256)': [Function (anonymous)],
//         accountImplementation: [Function (anonymous)],
//         createAccount: [Function (anonymous)],
//         getAddress: [Function (anonymous)]
//       },
//       abi: [ [Object], [Object], [Object], [Object] ]
//     },
//     storage: ThirdwebStorage {
//       uploader: IpfsUploader { uploadWithGatewayUrl: false },
//       downloader: StorageDownloader {},
//       gatewayUrls: { 'ipfs://': [Array] }
//     },
//     events: ContractEvents {
//       contractWrapper: ContractWrapper {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0,
//         provider: [JsonRpcProvider],
//         signer: [Wallet],
//         options: [Object],
//         isValidContract: false,
//         customOverrides: [Function (anonymous)],
//         writeContract: [Contract],
//         readContract: [Contract],
//         abi: [Array]
//       }
//     },
//     interceptor: ContractInterceptor {
//       contractWrapper: ContractWrapper {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0,
//         provider: [JsonRpcProvider],
//         signer: [Wallet],
//         options: [Object],
//         isValidContract: false,
//         customOverrides: [Function (anonymous)],
//         writeContract: [Contract],
//         readContract: [Contract],
//         abi: [Array]
//       }
//     },
//     encoder: ContractEncoder {
//       contractWrapper: ContractWrapper {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0,
//         provider: [JsonRpcProvider],
//         signer: [Wallet],
//         options: [Object],
//         isValidContract: false,
//         customOverrides: [Function (anonymous)],
//         writeContract: [Contract],
//         readContract: [Contract],
//         abi: [Array]
//       }
//     },
//     estimator: GasCostEstimator {
//       contractWrapper: ContractWrapper {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0,
//         provider: [JsonRpcProvider],
//         signer: [Wallet],
//         options: [Object],
//         isValidContract: false,
//         customOverrides: [Function (anonymous)],
//         writeContract: [Contract],
//         readContract: [Contract],
//         abi: [Array]
//       }
//     },
//     publishedMetadata: ContractPublishedMetadata {
//       contractWrapper: ContractWrapper {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0,
//         provider: [JsonRpcProvider],
//         signer: [Wallet],
//         options: [Object],
//         isValidContract: false,
//         customOverrides: [Function (anonymous)],
//         writeContract: [Contract],
//         readContract: [Contract],
//         abi: [Array]
//       },
//       storage: ThirdwebStorage {
//         uploader: [IpfsUploader],
//         downloader: StorageDownloader {},
//         gatewayUrls: [Object]
//       },
//       _cachedMetadata: undefined
//     },
//     abi: [
//       {
//         type: 'constructor',
//         name: '',
//         inputs: [Array],
//         outputs: [],
//         stateMutability: 'nonpayable'
//       },
//       {
//         type: 'function',
//         name: 'accountImplementation',
//         inputs: [],
//         outputs: [Array],
//         stateMutability: 'view'
//       },
//       {
//         type: 'function',
//         name: 'createAccount',
//         inputs: [Array],
//         outputs: [Array],
//         stateMutability: 'nonpayable'
//       },
//       {
//         type: 'function',
//         name: 'getAddress',
//         inputs: [Array],
//         outputs: [Array],
//         stateMutability: 'view'
//       }
//     ],
//     metadata: ContractMetadata {
//       featureName: 'ContractMetadata',
//       contractWrapper: ContractWrapper {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0,
//         provider: [JsonRpcProvider],
//         signer: [Wallet],
//         options: [Object],
//         isValidContract: false,
//         customOverrides: [Function (anonymous)],
//         writeContract: [Contract],
//         readContract: [Contract],
//         abi: [Array]
//       },
//       schema: { deploy: [ZodObject], output: [ZodObject], input: [ZodObject] },
//       storage: ThirdwebStorage {
//         uploader: [IpfsUploader],
//         downloader: StorageDownloader {},
//         gatewayUrls: [Object]
//       }
//     },
//     appURI: ContractAppURI {
//       featureName: 'AppURI',
//       contractWrapper: ContractWrapper {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0,
//         provider: [JsonRpcProvider],
//         signer: [Wallet],
//         options: [Object],
//         isValidContract: false,
//         customOverrides: [Function (anonymous)],
//         writeContract: [Contract],
//         readContract: [Contract],
//         abi: [Array]
//       },
//       metadata: ContractMetadata {
//         featureName: 'ContractMetadata',
//         contractWrapper: [ContractWrapper],
//         schema: [Object],
//         storage: [ThirdwebStorage]
//       }
//     },
//     _chainId: 5
//   }


