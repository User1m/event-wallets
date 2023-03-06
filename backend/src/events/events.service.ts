import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { sendMail } from '@src/common/mail';
import { TemplateEmail } from '@src/common/mail/template';
import { PrismaService } from '@src/prisma/prisma.service';
import { faucetUrl, getBaseUrl, GET_CONFIG } from '@src/utils';
import { convertGuidToInt } from '@src/wallets/helpers/uuidToBigNum';
// import erc20Transfer from '@src/wallets/smartAccount/erc20Transfer';
// import transfer from '@src/wallets/smartAccount/transfer';
import { Network, NETWORKS } from '@src/wallets/thirdweb/constants';
import { createWallet, transfer, transferECR20, transferOwner } from '@src/wallets/thirdweb/script';
import { User } from 'prisma/graphql/generated';

@Injectable()
export class EventsService {
  constructor(private eventEmitter: EventEmitter2) {}
  private prisma = new PrismaService();
  private readonly logger = new Logger(EventsService.name);

  private sendErrorMsg(user: User) {
    this.eventEmitter.emit('sendEmail', {
      subject: 'Transfer Failed!',
      message: `Sorry! Your transfer failed.<br/><br/><strong>Please <a href="${faucetUrl}">Top Off</a> your account with more money for GAS before trying your transfer again.</strong>`,
      to: { name: user.username || 'there!', email: user.email },
      image: user.org.picture,
      from: { name: user.org.name, email: user.org.email },
    });
  }

  @OnEvent('transferOwner', { async: true })
  async transferOwner(payload: { userId: string; toAddress: string; network: string }) {
    // console.log('payload', payload);
    this.logger.log('transferring ownership...');
    const {
      userId,
      toAddress,
      network,
      // usePaymaster
    } = payload;
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        org: true,
        accounts: true,
      },
    });

    const fromAddress = user.accounts.find((x) => x.network === network).address;
    const _network = NETWORKS[network];
    try {
      const res = await transferOwner(_network, fromAddress, toAddress);

      this.eventEmitter.emit('sendEmail', {
        subject: 'Owner Transfer Completed',
        message: `Congrats! Your ownership transfer completed. <strong>${res}</strong> is now the owner of <strong>${fromAddress}</strong> on <strong>${network}</strong>`,
        to: { name: user.username || 'there!', email: user.email },
        image: user.org.picture,
        from: { name: user.org.name, email: user.org.email },
      });
    } catch (error) {
      this.sendErrorMsg(user);
    }
  }

  @OnEvent('transfer', { async: true })
  // async transfer(payload: { userId: string; toAddress: string; amount: string; usePaymaster: boolean }) {
  async transfer(payload: { userId: string; toAddress: string; amount: string; network: string }) {
    // console.log('payload', payload);
    this.logger.log('transferring...');
    const {
      userId,
      toAddress,
      amount,
      network,
      // usePaymaster
    } = payload;
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        org: true,
        accounts: true,
      },
    });
    // const { email, org: { id: orgId }, } = user;
    // const config = await GET_CONFIG(email, orgId);
    // console.log("config", config);
    // const withPM = Boolean(usePaymaster || false);
    const fromAddress = user.accounts.find((x) => x.network === network).address;
    const _network = NETWORKS[network];
    try {
      // const res = await transfer(config, toAddress, amount, withPM);
      const res = await transfer(_network, amount, fromAddress, toAddress);
      await this.prisma.transaction.create({
        data: {
          // ...res,
          txHash: res,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      this.eventEmitter.emit('sendEmail', {
        subject: 'Transfer Completed',
        message: `Congrats! Your transfer completed. View on the Blockchain below:<br/>
        Transaction Hash: <strong>${res}</strong>`,
        to: { name: user.username || 'there!', email: user.email },
        action: [
          { link: `${_network.scanUrl}/tx/${res}`, text: 'View on Transaction' },
          { link: `${_network.scanUrl}/address/${fromAddress}#internaltx`, text: 'View on Sender' },
          { link: `${_network.scanUrl}/address/${toAddress}#internaltx`, text: 'View on Receiver' },
        ],
        image: user.org.picture,
        from: { name: user.org.name, email: user.org.email },
      });
    } catch (error) {
      this.sendErrorMsg(user);
    }
  }

  @OnEvent('erc20Transfer', { async: true })
  // async erc20Transfer(payload: { userId: string; token: string; toAddress: string; amount: string; usePaymaster: boolean }) {
  async erc20Transfer(payload: { userId: string; token: string; toAddress: string; amount: string; network: string }) {
    this.logger.log('erc20Transferring...');
    const {
      token,
      userId,
      toAddress,
      amount,
      network,
      // usePaymaster
    } = payload;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        org: true,
        accounts: true,
      },
    });

    // const { email, org: { id: orgId }, } = user;
    // const config = await GET_CONFIG(email, orgId);
    // const withPM = Boolean(usePaymaster || false);
    const fromAddress = user.accounts.find((x) => x.network === network).address;
    const _network = NETWORKS[network];

    try {
      // const res = await erc20Transfer(config, token, toAddress, amount, withPM);
      const res = await transferECR20(_network, token, amount, fromAddress, toAddress);
      await this.prisma.transaction.create({
        data: {
          // ...res,
          txHash: res,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      this.eventEmitter.emit('sendEmail', {
        subject: 'ERC20 Transfer Completed',
        message: `Congrats! Your ERC20 transfer completed. Here are the details:<br/>   
      txHash: ${res}`,
        to: { name: user.username || 'there!', email: user.email },
        action: [
          { link: `${_network.scanUrl}/tx/${res}`, text: 'View on Transaction' },
          { link: `${_network.scanUrl}/address/${fromAddress}#internaltx`, text: 'View on Sender' },
          { link: `${_network.scanUrl}/address/${toAddress}#internaltx`, text: 'View on Receiver' },
        ],
        image: user.org.picture,
        from: { name: user.org.name, email: user.org.email },
      });
    } catch (error) {
      this.sendErrorMsg(user);
    }
  }

  @OnEvent('sendEmail', { async: true })
  async sendEmail(payload: TemplateEmail) {
    this.logger.log('sending Email...');
    await sendMail(payload);
  }

  @OnEvent('createWallets', { async: true })
  async createWallets(payload: { userId: string }) {
    this.logger.log('Creating Wallets ...');
    const { userId } = payload;
    const uuidToBigNum = convertGuidToInt(userId);

    for (const network of Object.keys(NETWORKS)) {
      //create address
      // const accAddress = await genAddress(config);
      const { address } = await createWallet(NETWORKS[network], `${uuidToBigNum}`);

      //save address
      await this.prisma.account.create({
        data: {
          network,
          address,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    // const accAddress = await genAddress(config);
    // const { address } = await createWallet(NETWORKS.goerli, '1234');
    // console.log("address", address);
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        org: true,
        accounts: true,
      },
    });

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
  }
}
