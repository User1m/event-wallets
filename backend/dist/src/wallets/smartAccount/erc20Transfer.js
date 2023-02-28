"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const helpers_1 = require("../helpers");
async function main(config, tkn, t, amt, withPM) {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.rpcUrl);
    const paymasterAPI = withPM ? helpers_1.getVerifyingPaymaster(config.paymasterUrl, config.entryPoint) : undefined;
    const accountAPI = helpers_1.getSimpleAccount(provider, config.signingKey, config.entryPoint, config.simpleAccountFactory, paymasterAPI);
    const token = ethers_1.ethers.utils.getAddress(tkn);
    const to = ethers_1.ethers.utils.getAddress(t);
    const erc20 = new ethers_1.ethers.Contract(token, helpers_1.ERC20_ABI, provider);
    const [symbol, decimals] = await Promise.all([erc20.symbol(), erc20.decimals()]);
    const amount = ethers_1.ethers.utils.parseUnits(amt, decimals);
    console.log(`Transferring ${amt} ${symbol}...`);
    const op = await accountAPI.createSignedUserOp({
        target: erc20.address,
        data: erc20.interface.encodeFunctionData('transfer', [to, amount]),
        ...(await helpers_1.getGasFee(provider)),
    });
    const opCode = await helpers_1.printOp(op);
    console.log(`Signed UserOperation: ${opCode}`);
    const client = await helpers_1.getHttpRpcClient(provider, config.bundlerUrl, config.entryPoint);
    const uoHash = await client.sendUserOpToBundler(op);
    console.log(`UserOpHash: ${uoHash}`);
    console.log('Waiting for transaction...');
    const txHash = await accountAPI.getUserOpReceipt(uoHash);
    console.log(`Transaction hash: ${txHash}`);
    return { op: opCode, uoHash, txHash };
}
exports.default = main;
//# sourceMappingURL=erc20Transfer.js.map