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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const generated_1 = require("../../prisma/graphql/generated");
const inputs_1 = require("./inputs");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(service) {
        this.service = service;
    }
    _createUser(input) {
        return this.service.createUser(input);
    }
    _confirmUser(input) {
        return this.service.createWallet(input);
    }
    _getWalletBalance(input) {
        return this.service.getBalance(input);
    }
    _transfer(input) {
        return this.service.transfer(input);
    }
    _transferERC20Token(input) {
        return this.service.erc20Transfer(input);
    }
};
__decorate([
    graphql_1.Mutation(() => generated_1.User),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "_createUser", null);
__decorate([
    graphql_1.Mutation(() => generated_1.User),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generated_1.UserWhereUniqueInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "_confirmUser", null);
__decorate([
    graphql_1.Query(() => Number),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generated_1.UserWhereUniqueInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "_getWalletBalance", null);
__decorate([
    graphql_1.Mutation(() => String),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.TransferInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "_transfer", null);
__decorate([
    graphql_1.Mutation(() => String),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.ERC20TransferInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "_transferERC20Token", null);
UserResolver = __decorate([
    graphql_1.Resolver(() => generated_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map