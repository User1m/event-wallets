import { EventEmitter2 } from '@nestjs/event-emitter';
import { TemplateEmail } from '@src/common/mail/template';
export declare class EventsService {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    private prisma;
    private readonly logger;
    transfer(payload: {
        userId: string;
        toAddress: string;
        amount: string;
        usePaymaster: boolean;
    }): Promise<void>;
    erc20Transfer(payload: {
        userId: string;
        token: string;
        toAddress: string;
        amount: string;
        usePaymaster: boolean;
    }): Promise<void>;
    sendEmail(payload: TemplateEmail): Promise<void>;
}
