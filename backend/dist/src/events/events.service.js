"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EventsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mail_1 = require("../common/mail");
const prisma_service_1 = require("../prisma/prisma.service");
const utils_1 = require("../utils");
const erc20Transfer_1 = require("../wallets/smartAccount/erc20Transfer");
const transfer_1 = require("../wallets/smartAccount/transfer");
let EventsService = EventsService_1 = class EventsService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.prisma = new prisma_service_1.PrismaService();
        this.logger = new common_1.Logger(EventsService_1.name);
    }
    async transfer(payload) {
        this.logger.log('transferring...');
        const { userId, toAddress, amount, usePaymaster } = payload;
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                org: true,
            },
        });
        const { email, org: { id: orgId }, } = user;
        const config = await utils_1.GET_CONFIG(email, orgId);
        const withPM = Boolean(usePaymaster || false);
        try {
            const res = await transfer_1.default(config, toAddress, amount, withPM);
            await this.prisma.transaction.create({
                data: {
                    ...res,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
            this.eventEmitter.emit('sendEmail', {
                subject: 'Transfer Completed',
                message: `Congrats! Your transfer completed. View on the Blockchain below:<br/>
        Transaction Hash: <strong>${res.txHash}</strong>`,
                to: { name: user.username || 'there!', email: user.email },
                action: [
                    { link: `https://goerli.etherscan.io/tx/${res.txHash}`, text: 'View on Transaction' },
                    { link: `https://goerli.etherscan.io/address/${user.accAddress}#internaltx`, text: 'View on Sender' },
                    { link: `https://goerli.etherscan.io/address/${toAddress}#internaltx`, text: 'View on Receiver' },
                ],
                image: user.org.picture,
                from: { name: user.org.name, email: user.org.email },
            });
        }
        catch (error) {
            this.eventEmitter.emit('sendEmail', {
                subject: 'Transfer Failed!',
                message: `Sorry! Your transfer failed.<br/><strong>Please <a href="${utils_1.faucetUrl}">Top Off</a> your account with more ETH before trying your transfer again.</strong>`,
                to: { name: user.username || 'there!', email: user.email },
                image: user.org.picture,
                from: { name: user.org.name, email: user.org.email },
            });
        }
    }
    async erc20Transfer(payload) {
        this.logger.log('erc20Transferring...');
        const { token, userId, toAddress, amount, usePaymaster } = payload;
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                org: true,
            },
        });
        const { email, org: { id: orgId }, } = user;
        const config = await utils_1.GET_CONFIG(email, orgId);
        const withPM = Boolean(usePaymaster || false);
        try {
            const res = await erc20Transfer_1.default(config, token, toAddress, amount, withPM);
            await this.prisma.transaction.create({
                data: {
                    ...res,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                }
            });
            this.eventEmitter.emit('sendEmail', {
                subject: 'ERC20 Transfer Completed',
                message: `Congrats! Your ERC20 transfer completed. Here are the details:<br/>
      op: ${res.op}<br/>
      uoHash: ${res.uoHash}<br/>
      txHash: ${res.txHash}`,
                to: { name: user.username || 'there!', email: user.email },
                action: [
                    { link: `https://goerli.etherscan.io/tx/${res.txHash}`, text: 'View on Transaction' },
                    { link: `https://goerli.etherscan.io/address/${user.accAddress}#internaltx`, text: 'View on Sender' },
                    { link: `https://goerli.etherscan.io/address/${toAddress}#internaltx`, text: 'View on Receiver' },
                ], image: user.org.picture,
                from: { name: user.org.name, email: user.org.email },
            });
        }
        catch (error) {
            this.eventEmitter.emit('sendEmail', {
                subject: 'Transfer Failed!',
                message: `Sorry! Your transfer failed.<br/><strong>Please <a href="${utils_1.faucetUrl}">Top Off</a> your account with more ETH before trying your transfer again.</strong>`,
                to: { name: user.username || 'there!', email: user.email },
                image: user.org.picture,
                from: { name: user.org.name, email: user.org.email },
            });
        }
    }
    async sendEmail(payload) {
        this.logger.log('sending Email...');
        await mail_1.sendMail(payload);
    }
};
__decorate([
    event_emitter_1.OnEvent('transfer', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsService.prototype, "transfer", null);
__decorate([
    event_emitter_1.OnEvent('erc20Transfer', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsService.prototype, "erc20Transfer", null);
__decorate([
    event_emitter_1.OnEvent('sendEmail', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsService.prototype, "sendEmail", null);
EventsService = EventsService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map