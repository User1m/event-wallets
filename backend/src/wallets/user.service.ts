import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserUncheckedCreateInput, UserWhereUniqueInput } from 'prisma/graphql/generated';
import { omit } from 'lodash';
import genAddress from './smartAccount/address';
import { CreateUserInput, ERC20TransferInput, TransferInput } from './inputs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GET_CONFIG } from '@src/utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private eventEmitter: EventEmitter2) {}

  // create user
  async createUser(input: CreateUserInput) {
    const { email, orgId } = input;
    //check for existing user;
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
        orgId: orgId,
      },
    });

    if (user) throw new Error('User already exists! Try fetching/retrieving instead.');

    // create user
    const newUser = await this.prisma.user.create({
      data: {
        ...omit(input, ['orgId', 'accAddress']),
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

  // create wallet account
  async createWallet(input: UserWhereUniqueInput) {
    const { orgUserIdentifier } = input;
    //check for existing user;
    const user = await this.prisma.user.findUnique({
      where: {
        orgUserIdentifier,
      },
    });

    if (!user) throw new Error('User Not Found!');

    //create wallet
    const { email, orgId } = orgUserIdentifier;
    const config = await GET_CONFIG(email, orgId);
    const accAddress = await genAddress(config);
    console.log('accAddress', accAddress);

    // update user
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
    const faucetUrl = `https://goerlifaucet.com/`;
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
        <strong>Navigate to a faucet, such as <a href="${faucetUrl}">${faucetUrl}</a> to top off your wallet with some (Test)ETH!</strong>`,
      to: { name: res.username || 'there!', email: res.email },
      image: org.picture,
      from: { name: org.name, email: org.email },
    });

    return res;
  }

  private async getUserId(input: TransferInput) {
    // let userId = input.userId;
    const { email, orgId } = input;
    const user = await this.prisma.user.findUnique({
      where: {
        orgUserIdentifier: {
          email,
          orgId,
        },
      },
    });
    if (!user) throw new Error('User Not Found!');

    return user.id;
  }

  async transfer(input: TransferInput) {
    const userId = await this.getUserId(input);
    this.eventEmitter.emit('transfer', { userId, ...input });
    // return {
    //   status: "Transfer started. You'll be alerted once completed."
    // };
    return "Transfer started. You'll be alerted once completed.";
  }

  async erc20Transfer(input: ERC20TransferInput) {
    const userId = await this.getUserId(input);
    this.eventEmitter.emit('erc20Transfer', { userId, ...input });
    // return {
    //   status: "ERC20 Transfer started. You'll be alerted once completed."
    // };
    return "ERC20 Transfer started. You'll be alerted once completed.";
  }

  // TODO:implement batch transfers

  // // get user and wallet
  // async getUserData(input: UserWhereUniqueInput) {
  //   const { orgUserIdentifier } = input;
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       orgUserIdentifier
  //     }
  //   })

  //   return user;
  // }
}
