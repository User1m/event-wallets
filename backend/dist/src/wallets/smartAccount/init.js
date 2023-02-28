"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
const prettier_1 = require("prettier");
const ethers_1 = require("ethers");
const INIT_CONFIG = {
    bundlerUrl: "http://localhost:4337",
    rpcUrl: "http://localhost:8545",
    signingKey: new ethers_1.ethers.Wallet(ethers_1.ethers.utils.randomBytes(32)).privateKey,
    entryPoint: "0x0F46c65C17AA6b4102046935F33301f0510B163A",
    simpleAccountFactory: "0x63658F82752688E3E2Dd2FA8C511E85e919F62D7",
    paymasterUrl: "",
};
const CONFIG_PATH = path_1.default.resolve(__dirname, "../config.json");
async function main() {
    return promises_1.default.writeFile(CONFIG_PATH, prettier_1.default.format(JSON.stringify(INIT_CONFIG, null, 2), { parser: "json" }));
}
main()
    .then(() => console.log(`Config written to ${CONFIG_PATH}`))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=init.js.map