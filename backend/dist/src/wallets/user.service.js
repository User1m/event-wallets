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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const lodash_1 = require("lodash");
const address_1 = require("./smartAccount/address");
const event_emitter_1 = require("@nestjs/event-emitter");
const utils_1 = require("../utils");
const ethers_1 = require("ethers");
let UserService = class UserService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async createUser(input) {
        const { email, orgId } = input;
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
                orgId: orgId,
            },
        });
        if (user)
            throw new Error('User already exists! Try fetching/retrieving instead.');
        const newUser = await this.prisma.user.create({
            data: {
                ...lodash_1.omit(input, ['orgId', 'accAddress']),
                org: {
                    connect: {
                        id: input.orgId,
                    },
                },
            },
            include: {
                org: true,
            },
        });
        const { org } = newUser;
        const verifyUrl = `https://eventwallets.com/${newUser.id}/confirm`;
        this.eventEmitter.emit('sendEmail', {
            subject: `Welcome to ${org.name}!`,
            message: `We hope you're as excited as us for ${org.name}!<br/> Create your ${org.name} event wallet below.`,
            to: { name: newUser.username || 'there!', email: newUser.email },
            image: org.picture,
            from: { name: org.name, email: org.email },
            action: { link: `${verifyUrl}`, text: 'Create My Event Wallet!' },
        });
        return newUser;
    }
    async getBalance(input) {
        const { orgUserIdentifier } = input;
        const user = await this.prisma.user.findUnique({
            where: {
                orgUserIdentifier,
            },
        });
        if (!user)
            throw new Error('User Not Found!');
        const { email, orgId } = orgUserIdentifier;
        const config = await utils_1.GET_CONFIG(email, orgId);
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.rpcUrl);
        const balance = await provider.getBalance(user.accAddress);
        return ethers_1.ethers.utils.formatEther(balance);
    }
    async createWallet(input) {
        const { orgUserIdentifier } = input;
        const user = await this.prisma.user.findUnique({
            where: {
                orgUserIdentifier,
            },
        });
        if (!user)
            throw new Error('User Not Found!');
        const { email, orgId } = orgUserIdentifier;
        const config = await utils_1.GET_CONFIG(email, orgId);
        const accAddress = await address_1.default(config);
        console.log('accAddress', accAddress);
        const res = await this.prisma.user.update({
            where: {
                orgUserIdentifier: {
                    email,
                    orgId,
                },
            },
            data: {
                accAddress,
            },
            include: {
                org: true,
            },
        });
        const { org } = res;
        const loginUrl = `https://eventwallets.com/${org.id}/login`;
        this.eventEmitter.emit('sendEmail', {
            subject: 'Account Created!',
            message: `Congrats! Get ready for ${org.name}!<br/>
        Your event wallet <strong><${accAddress}></strong> has been created.<br/><br/>
        Here are your details:<br/>
        Email: ${res.email}<br/>
        Wallet Address: ${accAddress}<br/>
        Login: <a href="${loginUrl}">${loginUrl}</a>
        <br/>
        <br/>
        <strong>Navigate to a faucet, such as <a href="${utils_1.faucetUrl}">${utils_1.faucetUrl}</a> to top off your wallet with some (Test)ETH!</strong>`,
            to: { name: res.username || 'there!', email: res.email },
            image: org.picture,
            from: { name: org.name, email: org.email },
        });
        return res;
    }
    async getUserId(input) {
        const { email, orgId } = input;
        const user = await this.prisma.user.findUnique({
            where: {
                orgUserIdentifier: {
                    email,
                    orgId,
                },
            },
        });
        if (!user)
            throw new Error('User Not Found!');
        return user.id;
    }
    async transfer(input) {
        const userId = await this.getUserId(input);
        this.eventEmitter.emit('transfer', { userId, ...input });
        return "Transfer started. You'll be alerted once completed.";
    }
    async erc20Transfer(input) {
        const userId = await this.getUserId(input);
        this.eventEmitter.emit('erc20Transfer', { userId, ...input });
        return "ERC20 Transfer started. You'll be alerted once completed.";
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, event_emitter_1.EventEmitter2])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map