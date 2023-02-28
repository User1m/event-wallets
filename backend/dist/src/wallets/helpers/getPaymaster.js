"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerifyingPaymaster = void 0;
const axios_1 = require("axios");
const ethers_1 = require("ethers");
const sdk_1 = require("@account-abstraction/sdk");
const opUtils_1 = require("./opUtils");
const ADDR_SIZE = 20;
const SIG_SIZE = 65;
class VerifyingPaymasterAPI extends sdk_1.PaymasterAPI {
    constructor(paymasterUrl, entryPoint) {
        super();
        this.paymasterUrl = paymasterUrl;
        this.entryPoint = entryPoint;
    }
    async getPaymasterAndData(userOp) {
        try {
            await ethers_1.ethers.utils.resolveProperties(userOp);
        }
        catch (_) { }
        const pmOp = {
            sender: userOp.sender,
            nonce: userOp.nonce,
            initCode: userOp.initCode,
            callData: userOp.callData,
            callGasLimit: userOp.callGasLimit,
            verificationGasLimit: userOp.verificationGasLimit,
            maxFeePerGas: userOp.maxFeePerGas,
            maxPriorityFeePerGas: userOp.maxPriorityFeePerGas,
            paymasterAndData: ethers_1.ethers.utils.hexlify(Buffer.alloc(ADDR_SIZE + SIG_SIZE, 1)),
            signature: ethers_1.ethers.utils.hexlify(Buffer.alloc(SIG_SIZE, 1)),
        };
        const op = await ethers_1.ethers.utils.resolveProperties(pmOp);
        op.preVerificationGas = sdk_1.calcPreVerificationGas(op);
        return axios_1.default
            .post(this.paymasterUrl, {
            jsonrpc: "2.0",
            id: 1,
            method: "pm_sponsorUserOperation",
            params: [await opUtils_1.toJSON(op), this.entryPoint],
        })
            .then((res) => res.data.result.toString());
    }
}
const getVerifyingPaymaster = (paymasterUrl, entryPoint) => new VerifyingPaymasterAPI(paymasterUrl, entryPoint);
exports.getVerifyingPaymaster = getVerifyingPaymaster;
//# sourceMappingURL=getPaymaster.js.map