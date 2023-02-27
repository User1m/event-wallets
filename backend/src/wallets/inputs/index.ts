import { Field, InputType } from '@nestjs/graphql';
import { UserUncheckedCreateInput } from 'prisma/graphql/generated';

@InputType()
export class CreateUserInput implements Pick<UserUncheckedCreateInput, 'email' | 'orgId'> {
  @Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  orgId!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  username?: string;
}

@InputType()
export class TransferInput {
  // @Field(_type => String, {
  //   nullable: true
  // })
  // userId?: string;

  @Field((_type) => String, {
    nullable: false,
  })
  email?: string;

  @Field((_type) => String, {
    nullable: false,
  })
  orgId?: string;

  @Field((_type) => String, {
    nullable: false,
  })
  toAddress!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  amount!: string;

  @Field((_type) => Boolean, {
    nullable: true,
  })
  usePaymaster?: boolean;
}

@InputType()
export class ERC20TransferInput extends TransferInput {
  @Field((_type) => String, {
    nullable: false,
  })
  token!: string;
}
