"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const helpers_1 = require("../helpers");
async function main(config, t, amt, withPM) {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.rpcUrl);
    const paymasterAPI = withPM ? helpers_1.getVerifyingPaymaster(config.paymasterUrl, config.entryPoint) : undefined;
    const accountAPI = helpers_1.getSimpleAccount(provider, config.signingKey, config.entryPoint, config.simpleAccountFactory, paymasterAPI);
    const sender = await accountAPI.getCounterFactualAddress();
    const ac = await accountAPI._getAccountContract();
    const value = ethers_1.ethers.utils.parseEther(amt);
    let dest = [];
    let data = [];
    t.map((addr) => addr.trim()).forEach((addr) => {
        dest = [...dest, sender];
        data = [...data, ac.interface.encodeFunctionData('execute', [ethers_1.ethers.utils.getAddress(addr), value, '0x'])];
    });
    const op = await accountAPI.createSignedUserOp({
        target: sender,
        data: ac.interface.encodeFunctionData('executeBatch', [dest, data]),
        ...(await helpers_1.getGasFee(provider)),
    });
    console.log(`Signed UserOperation: ${await helpers_1.printOp(op)}`);
    const client = await helpers_1.getHttpRpcClient(provider, config.bundlerUrl, config.entryPoint);
    const uoHash = await client.sendUserOpToBundler(op);
    console.log(`UserOpHash: ${uoHash}`);
    console.log('Waiting for transaction...');
    const txHash = await accountAPI.getUserOpReceipt(uoHash);
    console.log(`Transaction hash: ${txHash}`);
}
exports.default = main;
//# sourceMappingURL=batchTransfer.js.map