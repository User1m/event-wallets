import { HttpRpcClient } from "@account-abstraction/sdk/dist/src/HttpRpcClient";
import { JsonRpcProvider } from "@ethersproject/providers";
export declare function getHttpRpcClient(provider: JsonRpcProvider, bundlerUrl: string, entryPointAddress: string): Promise<HttpRpcClient>;
