#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const address_1 = require("./address");
const transfer_1 = require("./transfer");
const erc20Transfer_1 = require("./erc20Transfer");
const batchTransfer_1 = require("./batchTransfer");
const batchErc20Transfer_1 = require("./batchErc20Transfer");
const config = require("../config.json");
const program = new commander_1.Command();
program.name('ERC-4337 SimpleAccount').description('A collection of example scripts for working with ERC-4337 SimpleAccount.sol').version('0.1.0');
program
    .command('address')
    .description('Generate a counterfactual address.')
    .action(() => {
    address_1.default(config);
});
program
    .command('transfer')
    .description('Transfer ETH')
    .option('-pm, --withPaymaster', 'Use a paymaster for this transaction')
    .requiredOption('-t, --to <address>', 'The recipient address')
    .requiredOption('-amt, --amount <eth>', 'Amount in ETH to transfer')
    .action(async (opts) => {
    transfer_1.default(config, opts.to, opts.amount, Boolean(opts.withPaymaster));
});
program
    .command('erc20Transfer')
    .description('Transfer ERC-20 token')
    .option('-pm, --withPaymaster', 'Use a paymaster for this transaction')
    .requiredOption('-tkn, --token <address>', 'The token address')
    .requiredOption('-t, --to <address>', 'The recipient address')
    .requiredOption('-amt, --amount <decimal>', 'Amount of the token to transfer')
    .action(async (opts) => {
    erc20Transfer_1.default(config, opts.token, opts.to, opts.amount, Boolean(opts.withPaymaster));
});
program
    .command('batchTransfer')
    .description('Batch transfer ETH')
    .option('-pm, --withPaymaster', 'Use a paymaster for this transaction')
    .requiredOption('-t, --to <addresses>', 'Comma separated list of recipient addresses')
    .requiredOption('-amt, --amount <eth>', 'Amount in ETH to transfer')
    .action(async (opts) => {
    batchTransfer_1.default(config, opts.to.split(','), opts.amount, Boolean(opts.withPaymaster));
});
program
    .command('batchErc20Transfer')
    .description('Batch transfer ERC-20 token')
    .option('-pm, --withPaymaster', 'Use a paymaster for this transaction')
    .requiredOption('-tkn, --token <address>', 'The token address')
    .requiredOption('-t, --to <addresses>', 'Comma separated list of recipient addresses')
    .requiredOption('-amt, --amount <decimal>', 'Amount of the token to transfer')
    .action(async (opts) => {
    batchErc20Transfer_1.default(config, opts.token, opts.to.split(','), opts.amount, Boolean(opts.withPaymaster));
});
program.parse();
//# sourceMappingURL=index.js.map