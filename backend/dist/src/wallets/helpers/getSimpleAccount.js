"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimpleAccount = void 0;
const sdk_1 = require("@account-abstraction/sdk");
const ethers_1 = require("ethers");
function getSimpleAccount(provider, signingKey, entryPointAddress, factoryAddress, paymasterAPI) {
    const owner = new ethers_1.ethers.Wallet(signingKey, provider);
    const sw = new sdk_1.SimpleAccountAPI({
        provider,
        entryPointAddress,
        owner,
        factoryAddress,
        paymasterAPI,
    });
    sw.getUserOpReceipt = async (userOpHash, timeout = 30000, interval = 5000) => {
        const endtime = Date.now() + timeout;
        const block = await sw.provider.getBlock("latest");
        while (Date.now() < endtime) {
            const events = await sw.entryPointView.queryFilter(sw.entryPointView.filters.UserOperationEvent(userOpHash), Math.max(0, block.number - 100));
            if (events.length > 0) {
                return events[0].transactionHash;
            }
            await new Promise((resolve) => setTimeout(resolve, interval));
        }
        return null;
    };
    return sw;
}
exports.getSimpleAccount = getSimpleAccount;
//# sourceMappingURL=getSimpleAccount.js.map