import { _initThirdWeb } from '../script';
import * as constants from './constants';

console.log('////////// PROVIDER ///////////\n');
console.log(constants.provider);
console.log('\n\n');

console.log('////////// SIGNER //////////\n');
console.log(constants.signer);
console.log('\n\n');

console.log('////////// MAIN //////////\n');
_initThirdWeb(constants.chain_id, constants.provider, constants.signer).then((x) => console.log(x));

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
//     connection: { url: 'http://localhost:8545' },
//     _nextId: 42
//   }

//   ////////// SIGNER //////////

//   10e843b........39255a

//   ////////// MAIN //////////
//   ThirdwebSDK {
//     _events: Events <[Object: null prototype] {}> {},
//     _eventsCount: 0,
//     provider: JsonRpcProvider {
//       _isProvider: true,
//       _events: [],
//       _emitted: { block: -2 },
//       disableCcipRead: false,
//       formatter: Formatter { formats: [Object] },
//       anyNetwork: false,
//       _networkPromise: Promise { <pending> },
//       _maxInternalBlockNumber: -1024,
//       _lastBlockNumber: -2,
//       _maxFilterBlockRange: 10,
//       _pollingInterval: 4000,
//       _fastQueryDate: 0,
//       connection: { url: 'http://localhost:8545' },
//       _nextId: 42
//     },
//     signer: Wallet {
//       _isSigner: true,
//       _signingKey: [Function (anonymous)],
//       _mnemonic: [Function (anonymous)],
//       address: '0x90c9BD12Bd1c20Bf61736f819886cF7983044Fdb',
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
//         _nextId: 42
//       }
//     },
//     options: {
//       supportedChains: [
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object]
//       ],
//       thirdwebApiKey: 'c6634ad2d97b74baf15ff556016830c251050e6c36b9da508ce3ec80095d3dc1',
//       gasSettings: { maxPriceInGwei: 300, speed: 'fastest' }
//     },
//     contractCache: Map(0) {},
//     _publisher: ContractPublisher {
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
//         _nextId: 42
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
//       storage: ThirdwebStorage {
//         uploader: [IpfsUploader],
//         downloader: StorageDownloader {},
//         gatewayUrls: [Object]
//       },
//       publisher: ContractWrapper {
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
//     storageHandler: ThirdwebStorage {
//       uploader: IpfsUploader { uploadWithGatewayUrl: false },
//       downloader: StorageDownloader {},
//       gatewayUrls: { 'ipfs://': [Array] }
//     },
//     deployer: ContractDeployer {
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
//         _nextId: 42
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
//       _factory: Promise { <pending> },
//       _registry: Promise { <pending> },
//       storage: ThirdwebStorage {
//         uploader: [IpfsUploader],
//         downloader: StorageDownloader {},
//         gatewayUrls: [Object]
//       },
//       events: EventEmitter {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0
//       },
//       deployMetadataCache: {},
//       transactionListener: [Function (anonymous)]
//     },
//     multiChainRegistry: MultichainRegistry {
//       registryLogic: ContractWrapper {
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
//       registryRouter: ContractWrapper {
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
//       }
//     },
//     wallet: UserWallet {
//       connection: RPCConnectionHandler {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0,
//         provider: [JsonRpcProvider],
//         signer: [Wallet],
//         options: [Object]
//       },
//       options: {},
//       events: EventEmitter {
//         _events: Events <Complex prototype> {},
//         _eventsCount: 0
//       }
//     },
//     storage: ThirdwebStorage {
//       uploader: IpfsUploader { uploadWithGatewayUrl: false },
//       downloader: StorageDownloader {},
//       gatewayUrls: { 'ipfs://': [Array] }
//     }
//   }
