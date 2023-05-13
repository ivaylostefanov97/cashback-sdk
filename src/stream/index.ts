import Moralis from "moralis";
import dotenv from 'dotenv';

import { EvmChain } from "@moralisweb3/common-evm-utils";
import { FilterNode, Journey } from "../common/journey-types";


dotenv.config();


export const addContractListener = async (name: string, contractAddress: string, campaignOptionsURI: string, journey: Journey[], mainFilter?: FilterNode) => {
    try {

        const { event, eventAbi } = journey.find(journeyEntry => journeyEntry.isMain)!;

        const streams = await Moralis.Streams.getAll({ networkType: "evm", limit: 10 });
        let stream = streams.toJSON().result.find(stream => stream.tag === name);

        if (stream) {
            return { error: "Contract listener already set." }
        }

        const streamOptions = {
            chains: [EvmChain.MUMBAI],
            description: "monitor smart contract",
            tag: campaignOptionsURI,
            webhookUrl: `${process.env.WEBHOOK_URL}/event`,
            includeContractLogs: true,
            advancedOptions: mainFilter ? [{ topic0: event!, filter: mainFilter }] : [],
            abi: eventAbi as any,
            topic0: [event!]
        }

        stream = (await Moralis.Streams.add(streamOptions)).toJSON();

        await Moralis.Streams.addAddress({ address: [contractAddress], id: stream.id });

        return { data: { streamId: stream.id } }
    } catch (err) {
        console.error("Error: ", err)
    }
}