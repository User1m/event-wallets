import { UserWhereUniqueInput } from 'prisma/graphql/generated';
import { CreateUserInput, ERC20TransferInput, TransferInput } from './inputs';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly service;
    constructor(service: UserService);
    _createUser(input: CreateUserInput): Promise<import(".prisma/client").User & {
        org: import(".prisma/client").Org;
    }>;
    _confirmUser(input: UserWhereUniqueInput): Promise<import(".prisma/client").User & {
        org: import(".prisma/client").Org;
    }>;
    _getWalletBalance(input: UserWhereUniqueInput): Promise<string>;
    _transfer(input: TransferInput): Promise<string>;
    _transferERC20Token(input: ERC20TransferInput): Promise<string>;
}
