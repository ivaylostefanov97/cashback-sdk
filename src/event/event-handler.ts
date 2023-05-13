import { IWebhook } from "@moralisweb3/streams-typings";
import { downloadJSON } from "../utils/storage";
import { getParsedLogs, getTransactionsByLogs } from "./utils";
import Web3 from 'web3';
import { Journey } from "../common/journey-types";
import { checkEventMatchJourneyFilter } from "./journey";

const web3 = new Web3();

const campaignOptionsCache: Record<string, any> = {}

export const handleContractEvent = async (webhookData: IWebhook) => {
    const parsedWebhookLogs = [
        ...webhookData.erc20Approvals,
        ...webhookData.erc20Transfers,
        ...webhookData.nftTokenApprovals,
        ...webhookData.nftTransfers
    ]

    let campaignOptions: any;

    console.log("WHAt is happening: ", webhookData.tag)
    if (!webhookData.tag) {
        return;
    }
    if (!Object.keys(campaignOptionsCache).includes(webhookData.tag)) {
        campaignOptions = await downloadJSON(webhookData.tag);
        campaignOptionsCache[webhookData.tag] = campaignOptions
    }
    else {
        campaignOptions = campaignOptionsCache[webhookData.tag]
    }

    const eventAbis = campaignOptions.journey.map((journeyEntry: Journey) => journeyEntry.eventAbi);

    try {

        const partialLogDetails: any[] = await getTransactionsByLogs(webhookData.logs);

        console.log("campaignOptions: ", JSON.stringify(campaignOptions, null, 3))
        console.log("partialLogDetails: ", JSON.stringify(partialLogDetails, null, 3))

        const filteredPartialLogDetails = [];

        for (let partialLogDetail of partialLogDetails) {
            
            const logs = partialLogDetail.transaction.logs?.filter((log: any) => log.address !== "0x0000000000000000000000000000000000001010");
            console.log("logs: ", JSON.stringify(logs, null, 4))
            if (!logs || !Array.isArray(logs) || logs.length !== campaignOptions.journey.length) {
                continue
            }
            const logsMatchEventABI = logs.every((log: any, index: number) => {
                const transactionHash = web3.eth.abi.encodeEventSignature(campaignOptions.journey[index].eventAbi as any)
                return transactionHash === log.topic0;
            })

            if (logsMatchEventABI) {
                partialLogDetail = { ...partialLogDetail, transaction: { ...partialLogDetail.transaction, logs } }
                filteredPartialLogDetails.push(partialLogDetail)
            }
        }

        console.log("filteredPartialLogDetails: ", JSON.stringify(filteredPartialLogDetails, null, 4))

        const logDetails: any[] = filteredPartialLogDetails.map(partialLogDetail => {
            const parsedLogs = getParsedLogs(parsedWebhookLogs, partialLogDetail, eventAbis)
            return { ...partialLogDetail, parsedLogs }
        });

        console.log("logDetails: ", JSON.stringify(logDetails, null, 4))

        const filteredLogDetails = logDetails.filter(
            ({ parsedLogs }) => parsedLogs.every((parsedLog: any, index: number) => {
                if (!campaignOptions.journey[index].filter) return true;
                return checkEventMatchJourneyFilter(parsedLog.args, campaignOptions.journey[index].filter!);
            })
        );

        // TODO: send transaction hash and from_address to smart contract

        console.log("FILTERED LOG DETAILS: ", JSON.stringify(filteredLogDetails, null, 4))

    } catch (err) {
        console.error(err);
    }
}