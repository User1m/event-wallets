import { SimpleAccountAPI, PaymasterAPI } from "@account-abstraction/sdk";
import { JsonRpcProvider } from "@ethersproject/providers";
export declare function getSimpleAccount(provider: JsonRpcProvider, signingKey: string, entryPointAddress: string, factoryAddress: string, paymasterAPI?: PaymasterAPI): SimpleAccountAPI;
