import { _getSimpleAcctContract } from '../script';
import * as constants from './constants';

console.log('////////// PROVIDER ///////////\n');
console.log(constants.provider);
console.log('\n\n');

console.log('////////// SIGNER //////////\n');
console.log(constants.signer);
console.log('\n\n');

console.log('////////// MAIN //////////\n');

_getSimpleAcctContract(constants.simple_account_contract_address, constants.chain_id, constants.provider, constants.signer).then((x) => console.log(x));

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
//   10e843...1e9639255a

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
//         filters: [Object],
//         _runningEvents: {},
//         _wrappedEmits: {},
//         address: '0x5914594613c2fb4a3fb80f22f7baa8906368e3b3',
//         resolvedAddress: [Promise],
//         'addDeposit()': [Function (anonymous)],
//         'entryPoint()': [Function (anonymous)],
//         'execute(address,uint256,bytes)': [Function (anonymous)],
//         'executeBatch(address[],bytes[])': [Function (anonymous)],
//         'getDeposit()': [Function (anonymous)],
//         'initialize(address)': [Function (anonymous)],
//         'nonce()': [Function (anonymous)],
//         'owner()': [Function (anonymous)],
//         'proxiableUUID()': [Function (anonymous)],
//         'setOwner(address)': [Function (anonymous)],
//         'upgradeTo(address)': [Function (anonymous)],
//         'upgradeToAndCall(address,bytes)': [Function (anonymous)],
//         'validateUserOp((address,uint256,bytes,bytes,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes32,uint256)': [Function (anonymous)],
//         'withdrawDepositTo(address,uint256)': [Function (anonymous)],
//         addDeposit: [Function (anonymous)],
//         entryPoint: [Function (anonymous)],
//         execute: [Function (anonymous)],
//         executeBatch: [Function (anonymous)],
//         getDeposit: [Function (anonymous)],
//         initialize: [Function (anonymous)],
//         nonce: [Function (anonymous)],
//         owner: [Function (anonymous)],
//         proxiableUUID: [Function (anonymous)],
//         setOwner: [Function (anonymous)],
//         upgradeTo: [Function (anonymous)],
//         upgradeToAndCall: [Function (anonymous)],
//         validateUserOp: [Function (anonymous)],
//         withdrawDepositTo: [Function (anonymous)]
//       },
//       readContract: Contract {
//         interface: [Interface],
//         provider: [JsonRpcProvider],
//         signer: null,
//         callStatic: [Object],
//         estimateGas: [Object],
//         functions: [Object],
//         populateTransaction: [Object],
//         filters: [Object],
//         _runningEvents: {},
//         _wrappedEmits: {},
//         address: '0x5914594613c2fb4a3fb80f22f7baa8906368e3b3',
//         resolvedAddress: [Promise],
//         'addDeposit()': [Function (anonymous)],
//         'entryPoint()': [Function (anonymous)],
//         'execute(address,uint256,bytes)': [Function (anonymous)],
//         'executeBatch(address[],bytes[])': [Function (anonymous)],
//         'getDeposit()': [Function (anonymous)],
//         'initialize(address)': [Function (anonymous)],
//         'nonce()': [Function (anonymous)],
//         'owner()': [Function (anonymous)],
//         'proxiableUUID()': [Function (anonymous)],
//         'setOwner(address)': [Function (anonymous)],
//         'upgradeTo(address)': [Function (anonymous)],
//         'upgradeToAndCall(address,bytes)': [Function (anonymous)],
//         'validateUserOp((address,uint256,bytes,bytes,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes32,uint256)': [Function (anonymous)],
//         'withdrawDepositTo(address,uint256)': [Function (anonymous)],
//         addDeposit: [Function (anonymous)],
//         entryPoint: [Function (anonymous)],
//         execute: [Function (anonymous)],
//         executeBatch: [Function (anonymous)],
//         getDeposit: [Function (anonymous)],
//         initialize: [Function (anonymous)],
//         nonce: [Function (anonymous)],
//         owner: [Function (anonymous)],
//         proxiableUUID: [Function (anonymous)],
//         setOwner: [Function (anonymous)],
//         upgradeTo: [Function (anonymous)],
//         upgradeToAndCall: [Function (anonymous)],
//         validateUserOp: [Function (anonymous)],
//         withdrawDepositTo: [Function (anonymous)]
//       },
//       abi: [
//         [Object], [Object], [Object],
//         [Object], [Object], [Object],
//         [Object], [Object], [Object],
//         [Object], [Object], [Object],
//         [Object], [Object], [Object],
//         [Object], [Object], [Object],
//         [Object], [Object], [Object]
//       ]
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
//         type: 'event',
//         name: 'AdminChanged',
//         inputs: [Array],
//         outputs: [],
//         anonymous: false
//       },
//       {
//         type: 'event',
//         name: 'BeaconUpgraded',
//         inputs: [Array],
//         outputs: [],
//         anonymous: false
//       },
//       {
//         type: 'event',
//         name: 'Initialized',
//         inputs: [Array],
//         outputs: [],
//         anonymous: false
//       },
//       {
//         type: 'event',
//         name: 'SimpleAccountInitialized',
//         inputs: [Array],
//         outputs: [],
//         anonymous: false
//       },
//       {
//         type: 'event',
//         name: 'Upgraded',
//         inputs: [Array],
//         outputs: [],
//         anonymous: false
//       },
//       {
//         type: 'function',
//         name: 'addDeposit',
//         inputs: [],
//         outputs: [],
//         stateMutability: 'payable'
//       },
//       {
//         type: 'function',
//         name: 'entryPoint',
//         inputs: [],
//         outputs: [Array],
//         stateMutability: 'view'
//       },
//       {
//         type: 'function',
//         name: 'execute',
//         inputs: [Array],
//         outputs: [],
//         stateMutability: 'nonpayable'
//       },
//       {
//         type: 'function',
//         name: 'executeBatch',
//         inputs: [Array],
//         outputs: [],
//         stateMutability: 'nonpayable'
//       },
//       {
//         type: 'function',
//         name: 'getDeposit',
//         inputs: [],
//         outputs: [Array],
//         stateMutability: 'view'
//       },
//       {
//         type: 'function',
//         name: 'initialize',
//         inputs: [Array],
//         outputs: [],
//         stateMutability: 'nonpayable'
//       },
//       {
//         type: 'function',
//         name: 'nonce',
//         inputs: [],
//         outputs: [Array],
//         stateMutability: 'view'
//       },
//       {
//         type: 'function',
//         name: 'owner',
//         inputs: [],
//         outputs: [Array],
//         stateMutability: 'view'
//       },
//       {
//         type: 'function',
//         name: 'proxiableUUID',
//         inputs: [],
//         outputs: [Array],
//         stateMutability: 'view'
//       },
//       {
//         type: 'function',
//         name: 'setOwner',
//         inputs: [Array],
//         outputs: [],
//         stateMutability: 'nonpayable'
//       },
//       {
//         type: 'function',
//         name: 'upgradeTo',
//         inputs: [Array],
//         outputs: [],
//         stateMutability: 'nonpayable'
//       },
//       {
//         type: 'function',
//         name: 'upgradeToAndCall',
//         inputs: [Array],
//         outputs: [],
//         stateMutability: 'payable'
//       },
//       {
//         type: 'function',
//         name: 'validateUserOp',
//         inputs: [Array],
//         outputs: [Array],
//         stateMutability: 'nonpayable'
//       },
//       {
//         type: 'function',
//         name: 'withdrawDepositTo',
//         inputs: [Array],
//         outputs: [],
//         stateMutability: 'nonpayable'
//       },
//       {
//         type: 'receive',
//         name: '',
//         inputs: [],
//         outputs: [],
//         stateMutability: 'payable'
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
