"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_CONFIG = exports.faucetUrl = exports.DEFAULT_DATE_FORMAT = exports.isProd = void 0;
const ethers_1 = require("ethers");
const crypto = require("crypto");
const util_1 = require("util");
exports.isProd = process.env.NODE_ENV === 'production';
exports.DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
exports.faucetUrl = `https://goerlifaucet.com/`;
const GET_CONFIG = async (email, orgId) => {
    const hashEmail = crypto.createHash('sha1').update(`${email}x${orgId}`).digest('hex');
    const bytes = new util_1.TextEncoder().encode(hashEmail).slice(0, 32);
    const signingKey = new ethers_1.ethers.Wallet(bytes).privateKey;
    return {
        bundlerUrl: 'https://node.stackup.sh/api/v1/bundler/caa091b2db4dd5777273a9a32af5352f41954e788ef551508a6eb3ab08553a86',
        rpcUrl: "https://node.stackup.sh/v1/rpc/caa091b2db4dd5777273a9a32af5352f41954e788ef551508a6eb3ab08553a86",
        signingKey,
        entryPoint: '0x0F46c65C17AA6b4102046935F33301f0510B163A',
        simpleAccountFactory: '0x63658F82752688E3E2Dd2FA8C511E85e919F62D7',
        paymasterUrl: '',
    };
};
exports.GET_CONFIG = GET_CONFIG;
//# sourceMappingURL=utils.js.map