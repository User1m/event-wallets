import { PrismaService } from '@src/prisma/prisma.service';
import { UserWhereUniqueInput } from 'prisma/graphql/generated';
import { CreateUserInput, ERC20TransferInput, TransferInput } from './inputs';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class UserService {
    private prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    createUser(input: CreateUserInput): Promise<import(".prisma/client").User & {
        org: import(".prisma/client").Org;
    }>;
    getBalance(input: UserWhereUniqueInput): Promise<string>;
    createWallet(input: UserWhereUniqueInput): Promise<import(".prisma/client").User & {
        org: import(".prisma/client").Org;
    }>;
    private getUserId;
    transfer(input: TransferInput): Promise<string>;
    erc20Transfer(input: ERC20TransferInput): Promise<string>;
}
