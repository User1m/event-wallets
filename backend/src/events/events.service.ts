import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { sendMail } from '@src/common/mail';
import { TemplateEmail } from '@src/common/mail/template';
import { PrismaService } from '@src/prisma/prisma.service';
import { GET_CONFIG } from '@src/utils';
import erc20Transfer from '@src/wallets/smartAccount/erc20Transfer';
import transfer from '@src/wallets/smartAccount/transfer';

@Injectable()
export class EventsService {
  constructor(private eventEmitter: EventEmitter2) {}
  private prisma = new PrismaService();
  private readonly logger = new Logger(EventsService.name);

  @OnEvent('transfer', { async: true })
  async transfer(payload: { userId: string; toAddress: string; amount: string; usePaymaster: boolean }) {
    console.log('payload', payload);
    this.logger.log('transferring...');
    const { userId, toAddress, amount, usePaymaster } = payload;
    const {
      email,
      org: { id: orgId },
    } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        org: true,
      },
    });
    const config = await GET_CONFIG(email, orgId);
    const withPM = Boolean(usePaymaster || false);
    console.log('withPM', withPM);
    const res = await transfer(config, toAddress, amount, withPM);
    const txn = await this.prisma.transaction.create({
      data: {
        ...res,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: {
          include: {
            org: true,
          },
        },
      },
    });

    this.eventEmitter.emit('sendEmail', {
      subject: 'Transfer Completed',
      message: `Congrats! Your transfer completed. Here are the details:<br/>
      op: ${res.op}<br/>
      uoHash: ${res.uoHash}<br/>
      txHash: ${res.txHash}`,
      to: { name: txn.user.username || 'there!', email: txn.user.email },
      action: { link: `https://goerli.etherscan.io/tx/${res.txHash}`, text: 'View on Etherscan' },
      image: txn.user.org.picture,
      from: { name: txn.user.org.name, email: txn.user.org.email },
    });
  }

  @OnEvent('erc20Transfer', { async: true })
  async erc20Transfer(payload: { userId: string; token: string; toAddress: string; amount: string; usePaymaster: boolean }) {
    this.logger.log('erc20Transferring...');
    const { token, userId, toAddress, amount, usePaymaster } = payload;

    const {
      email,
      org: { id: orgId },
    } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        org: true,
      },
    });

    const config = await GET_CONFIG(email, orgId);
    const withPM = Boolean(usePaymaster || false);
    const res = await erc20Transfer(config, token, toAddress, amount, withPM);
    const txn = await this.prisma.transaction.create({
      data: {
        ...res,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: {
          include: {
            org: true,
          },
        },
      },
    });

    this.eventEmitter.emit('sendEmail', {
      subject: 'ERC20 Transfer Completed',
      message: `Congrats! Your ERC20 transfer completed. Here are the details:<br/>
      op: ${res.op}<br/>
      uoHash: ${res.uoHash}<br/>
      txHash: ${res.txHash}`,
      to: { name: txn.user.username || 'there!', email: txn.user.email },
      action: { link: `https://goerli.etherscan.io/tx/${res.txHash}`, text: 'View on Etherscan' },
      image: txn.user.org.picture,
      from: { name: txn.user.org.name, email: txn.user.org.email },
    });
  }

  @OnEvent('sendEmail', { async: true })
  async sendEmail(payload: TemplateEmail) {
    this.logger.log('sending Email...');
    await sendMail(payload);
  }
}
