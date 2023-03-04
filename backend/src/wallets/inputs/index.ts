import { Field, InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from 'prisma/graphql/generated';
import { UserUncheckedCreateInput } from 'prisma/graphql/generated';

@InputType()
export class UserNetworkInput implements Pick<UserWhereUniqueInput, 'id'> {
  @Field((_type) => Number, {
    nullable: false,
  })
  id!: number;

  @Field((_type) => String, {
    nullable: false,
  })
  network!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  email?: string;

  @Field((_type) => String, {
    nullable: false,
  })
  orgId?: string;
}

@InputType()
export class CreateUserInput implements Pick<UserUncheckedCreateInput, 'email' | 'orgId'> {
  @Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  @Field((_type) => String, {
    nullable: true,
  })
  orgId!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  eventSlug!: string;

  @Field((_type) => String, {
    nullable: true,
  })
  username?: string;
}

@InputType()
export class TransferInput extends UserNetworkInput {
  @Field((_type) => String, {
    nullable: false,
  })
  toAddress!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  amount!: string;

  // @Field((_type) => Boolean, {
  //   nullable: true,
  // })
  // usePaymaster?: boolean;
}

@InputType()
export class TransferOwnerInput extends UserNetworkInput implements Omit<TransferInput, 'amount'> {

  @Field((_type) => String, {
    nullable: false,
  })
  toAddress!: string;
}

@InputType()
export class ERC20TransferInput extends TransferInput {
  @Field((_type) => String, {
    nullable: false,
  })
  token!: string;
}
