"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOp = exports.toJSON = void 0;
const ethers_1 = require("ethers");
function toJSON(op) {
    return ethers_1.ethers.utils.resolveProperties(op).then((userOp) => Object.keys(userOp)
        .map((key) => {
        let val = userOp[key];
        if (typeof val !== "string" || !val.startsWith("0x")) {
            val = ethers_1.ethers.utils.hexValue(val);
        }
        return [key, val];
    })
        .reduce((set, [k, v]) => ({
        ...set,
        [k]: v,
    }), {}));
}
exports.toJSON = toJSON;
async function printOp(op) {
    return toJSON(op).then((userOp) => JSON.stringify(userOp, null, 2));
}
exports.printOp = printOp;
//# sourceMappingURL=opUtils.js.map