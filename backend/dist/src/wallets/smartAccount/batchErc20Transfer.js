"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const helpers_1 = require("../helpers");
async function main(config, tkn, t, amt, withPM) {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.rpcUrl);
    const paymasterAPI = withPM ? helpers_1.getVerifyingPaymaster(config.paymasterUrl, config.entryPoint) : undefined;
    const accountAPI = helpers_1.getSimpleAccount(provider, config.signingKey, config.entryPoint, config.simpleAccountFactory, paymasterAPI);
    const sender = await accountAPI.getCounterFactualAddress();
    const token = ethers_1.ethers.utils.getAddress(tkn);
    const erc20 = new ethers_1.ethers.Contract(token, helpers_1.ERC20_ABI, provider);
    const [symbol, decimals] = await Promise.all([erc20.symbol(), erc20.decimals()]);
    const amount = ethers_1.ethers.utils.parseUnits(amt, decimals);
    let dest = [];
    let data = [];
    t.map((addr) => addr.trim()).forEach((addr) => {
        dest = [...dest, erc20.address];
        data = [...data, erc20.interface.encodeFunctionData('transfer', [ethers_1.ethers.utils.getAddress(addr), amount])];
    });
    console.log(`Batch transferring ${amt} ${symbol} to ${dest.length} recipients...`);
    const ac = await accountAPI._getAccountContract();
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
//# sourceMappingURL=batchErc20Transfer.js.map