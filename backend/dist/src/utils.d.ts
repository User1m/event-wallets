export declare const isProd: boolean;
export declare const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
export declare const faucetUrl = "https://goerlifaucet.com/";
export interface IConfig {
    bundlerUrl: string;
    rpcUrl: string;
    signingKey: string;
    entryPoint: string;
    simpleAccountFactory: string;
    paymasterUrl: string;
}
export declare const GET_CONFIG: (email: string, orgId: string) => Promise<{
    bundlerUrl: string;
    rpcUrl: string;
    signingKey: string;
    entryPoint: string;
    simpleAccountFactory: string;
    paymasterUrl: string;
}>;
