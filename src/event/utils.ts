import Moralis from "moralis";
import { Log, AbiItem } from "@moralisweb3/streams-typings";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { uniqBy } from "lodash";

import {
    IERC20Transfer,
    IERC20Approval,
    INFTTransfer,
    INFTApproval
} from "@moralisweb3/streams-typings";
import { Interface, LogDescription } from "ethers/lib/utils";

export type MoralisParsedLogType = IERC20Transfer | IERC20Approval | INFTTransfer | INFTApproval
export type ParsedLogArgsType = MoralisParsedLogType | Record<any, any>


export const getTransactionsByLogs = async (
    logs: Log[],
) => {
    const transactionsByLog: any[] = [];
    const uniqueLogs = uniqBy(logs, 'transactionHash');

    for (const log of uniqueLogs) {

        const transaction = await Moralis.EvmApi.transaction.getTransaction({
            transactionHash: log.transactionHash,
            chain: EvmChain.MUMBAI,
        });

        if (!transaction) {
            console.error("Failed to process log: ", JSON.stringify(log));
            continue;
        }

        transactionsByLog.push({ log, transaction: transaction.toJSON() })
    }

    return transactionsByLog;
}

export const getParsedLogs = (
    parsedWebhookLogs: MoralisParsedLogType[],
    partialLogDetail: any,
    eventAbis: AbiItem[]
) => {

    const moralisParsedLog = parsedWebhookLogs.find(parsedWebhookLog =>
        parsedWebhookLog.transactionHash === partialLogDetail.log.transactionHash
        && parsedWebhookLog.logIndex === partialLogDetail.log.logIndex
    );

    return (partialLogDetail.transaction.logs || []).map((log: any, index: number) => {

        const parsedLog = parseLog(log, eventAbis);

        if (
            log.transaction_hash === partialLogDetail.log.transactionHash
            && log.log_index === partialLogDetail.log.logIndex
            && moralisParsedLog
        ) {
            return { ...parsedLog, args: { ...moralisParsedLog, ...parsedLog.args } as any } as LogDescription;
        }
        return { ...parsedLog, args: { ...parsedLog.args } };
    });
}

const parseLog = (log: any, eventAbis: AbiItem[]) => {

    const iface = new Interface(eventAbis as any);

    const logDataToParse = {
        data: log.data,
        topics: [
            log.topic0,
            log.topic1 as string,
            log.topic2 as string,
            log.topic3 as string
        ].filter(topic => !!topic)
    }

    return iface.parseLog(logDataToParse as { data: string; topics: string[]; });
}