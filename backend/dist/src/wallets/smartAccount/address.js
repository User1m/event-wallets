"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const ethers_1 = require("ethers");
async function main(config) {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.rpcUrl);
    const accountAPI = helpers_1.getSimpleAccount(provider, config.signingKey, config.entryPoint, config.simpleAccountFactory);
    const address = await accountAPI.getCounterFactualAddress();
    console.log(`SimpleAccount address: ${address}`);
    return address;
}
exports.default = main;
//# sourceMappingURL=address.js.map