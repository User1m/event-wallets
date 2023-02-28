import { IConfig } from '@src/utils';
export default function main(config: IConfig, tkn: string, t: string, amt: string, withPM: boolean): Promise<{
    op: string;
    uoHash: string;
    txHash: string;
}>;
