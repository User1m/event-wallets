import { UserOperationStruct } from "@account-abstraction/contracts";
export declare function toJSON(op: Partial<UserOperationStruct>): Promise<any>;
export declare function printOp(op: Partial<UserOperationStruct>): Promise<string>;
