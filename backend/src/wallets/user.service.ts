import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserUncheckedCreateInput, UserWhereUniqueInput } from 'prisma/graphql/generated';
import { omit } from 'lodash';
// import genAddress from './smartAccount/address';
import { CreateUserInput, ERC20TransferInput, TransferInput, TransferOwnerInput, UserNetworkInput } from './inputs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { faucetUrl, getBaseUrl, GET_CONFIG } from '@src/utils';
import { ethers } from 'ethers';
// import { NETWORKS } from './thirdweb/constants';
// import { createSmartWallet } from './thirdweb/script';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private eventEmitter: EventEmitter2) {}

  // create user
  async createUser(input: CreateUserInput) {
    const { email, eventSlug } = input;
    const org = await this.prisma.org.findUnique({
      where: {
        eventSlug,
      },
    });
    //check for existing user;
    const user = await this.prisma.user.findUnique({
      where: {
        orgUserIdentifier: {
          email,
          orgId: org.id,
        },
      },
    });

    if (user) throw new Error('User already exists! Try fetching/retrieving instead.');

    // create user
    const newUser = await this.prisma.user.create({
      data: {
        ...omit(input, ['orgId', 'eventSlug']),
        username: input?.username || email.split('@')[0],
        org: {
          connect: {
            id: org.id,
          },
        },
      },
      include: {
        org: true,
      },
    });

    const verifyUrl = `${getBaseUrl()}/${org.eventSlug}/u/${newUser.id}/confirm`;
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

  // async test(input: UserWhereUniqueInput) {

  //   // https://ethereum.stackexchange.com/a/131944

  //   const { orgUserIdentifier } = input;
  //   //check for existing user;
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       orgUserIdentifier,
  //     },
  //   });

  //   if (!user) throw new Error('User Not Found!');
  //   const { email, orgId } = orgUserIdentifier;
  //   const config = await GET_CONFIG(email, orgId);
  //   //  https://docs.ethers.org/v5/getting-started/
  //   const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  //   // https://ethereum.stackexchange.com/a/103532
  //   const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
  //   // const contractInstance = await new ethers.getContractAt("contracts/XYZ.sol:ContractName", contractAddress)
  //   const balance = await provider.getBalance(user.accAddress);
  //   return ethers.utils.formatEther(balance)
  // }

  async getBalance(input: UserNetworkInput) {
    const { id, network } = input;
    //check for existing user;
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        accounts: true,
      },
    });

    if (!user) throw new Error('User Not Found!');

    const { email, orgId } = user;
    const config = await GET_CONFIG(email, orgId);
    //  https://docs.ethers.org/v5/getting-started/
    const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
    const networkAddress = user.accounts.find((x) => x.network === network).address;
    const balance = await provider.getBalance(networkAddress);
    return ethers.utils.formatEther(balance);
  }

  // create wallet account
  async createWallet(input: UserWhereUniqueInput) {
    console.log('input', input);
    const { id } = input;
    //check for existing user;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        org: true,
      },
    });

    if (!user) throw new Error('User Not Found!');

    //create 3 wallets
    const { email, orgId } = user;
    this.eventEmitter.emit('createWallets', { userId: user.id });

    // const config = await GET_CONFIG(email, orgId);
    // const accAddress = await genAddress(config);
    // console.log('accAddress', accAddress);

    const { org } = user;
    const loginUrl = `${getBaseUrl()}/${org.eventSlug}/u/${user.id}/wallet`;
    this.eventEmitter.emit('sendEmail', {
      subject: 'Event Wallet Created!',
      message: `Congrats! Get ready for ${org.name}!<br/>
        Your event wallet has been created.<br/><br/>
        Here are your details:<br/>
        Email: ${user.email}<br/>
        <br/>
        <br/>
        <strong>Navigate to a faucet, such as <a href="${faucetUrl}">${faucetUrl}</a> to top off your wallet with some (Test)ETH!</strong>`,
      to: { name: user.username || 'there!', email: user.email },
      action: [{ link: loginUrl, text: 'Event Wallet Login' }],
      image: org.picture,
      from: { name: org.name, email: org.email },
    });

    const res = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        org: true,
        accounts: true,
      },
    });

    return res;
  }

  private async getUserId(input: Partial<TransferInput>) {
    // let userId = input.userId;
    const user = await this.prisma.user.findUnique({
      where: {
        ...(input.id
          ? { id: Number(input.id) }
          : {
              orgUserIdentifier: {
                email: input.email,
                orgId: input.orgId,
              },
            }),
      },
    });
    if (!user) throw new Error('User Not Found!');

    return user.id;
  }

  async transferOwner(input: TransferOwnerInput) {
    const userId = await this.getUserId(input);
    this.eventEmitter.emit('transferOwner', { userId, ...input });
    return "Ownership Transfer started. You'll be alerted once completed.";
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
