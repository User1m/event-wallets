"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHttpRpcClient = void 0;
const HttpRpcClient_1 = require("@account-abstraction/sdk/dist/src/HttpRpcClient");
async function getHttpRpcClient(provider, bundlerUrl, entryPointAddress) {
    const chainId = await provider.getNetwork().then((net) => net.chainId);
    return new HttpRpcClient_1.HttpRpcClient(bundlerUrl, entryPointAddress, chainId);
}
exports.getHttpRpcClient = getHttpRpcClient;
//# sourceMappingURL=getHttpRpcClient.js.map