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
exports.ERC20TransferInput = exports.TransferInput = exports.CreateUserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateUserInput = class CreateUserInput {
};
__decorate([
    graphql_1.Field((_type) => String, {
        nullable: false,
    }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field((_type) => String, {
        nullable: false,
    }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "orgId", void 0);
__decorate([
    graphql_1.Field((_type) => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "username", void 0);
CreateUserInput = __decorate([
    graphql_1.InputType()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
let TransferInput = class TransferInput {
};
__decorate([
    graphql_1.Field((_type) => String, {
        nullable: false,
    }),
    __metadata("design:type", String)
], TransferInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field((_type) => String, {
        nullable: false,
    }),
    __metadata("design:type", String)
], TransferInput.prototype, "orgId", void 0);
__decorate([
    graphql_1.Field((_type) => String, {
        nullable: false,
    }),
    __metadata("design:type", String)
], TransferInput.prototype, "toAddress", void 0);
__decorate([
    graphql_1.Field((_type) => String, {
        nullable: false,
    }),
    __metadata("design:type", String)
], TransferInput.prototype, "amount", void 0);
__decorate([
    graphql_1.Field((_type) => Boolean, {
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], TransferInput.prototype, "usePaymaster", void 0);
TransferInput = __decorate([
    graphql_1.InputType()
], TransferInput);
exports.TransferInput = TransferInput;
let ERC20TransferInput = class ERC20TransferInput extends TransferInput {
};
__decorate([
    graphql_1.Field((_type) => String, {
        nullable: false,
    }),
    __metadata("design:type", String)
], ERC20TransferInput.prototype, "token", void 0);
ERC20TransferInput = __decorate([
    graphql_1.InputType()
], ERC20TransferInput);
exports.ERC20TransferInput = ERC20TransferInput;
//# sourceMappingURL=index.js.map