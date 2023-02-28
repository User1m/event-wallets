import { PaymasterAPI } from "@account-abstraction/sdk";
import { UserOperationStruct } from "@account-abstraction/contracts";
declare class VerifyingPaymasterAPI extends PaymasterAPI {
    private paymasterUrl;
    private entryPoint;
    constructor(paymasterUrl: string, entryPoint: string);
    getPaymasterAndData(userOp: Partial<UserOperationStruct>): Promise<string>;
}
export declare const getVerifyingPaymaster: (paymasterUrl: string, entryPoint: string) => VerifyingPaymasterAPI;
export {};
