import { UserUncheckedCreateInput } from 'prisma/graphql/generated';
export declare class CreateUserInput implements Pick<UserUncheckedCreateInput, 'email' | 'orgId'> {
    email: string;
    orgId: string;
    username?: string;
}
export declare class TransferInput {
    email?: string;
    orgId?: string;
    toAddress: string;
    amount: string;
    usePaymaster?: boolean;
}
export declare class ERC20TransferInput extends TransferInput {
    token: string;
}
