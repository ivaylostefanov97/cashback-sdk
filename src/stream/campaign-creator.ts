import { Journey } from "../common/journey-types";
import { uploadJSON, uploadBatchJSON } from "../utils/storage";

import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

import { ethers, Wallet } from "ethers";

import Web3 from 'web3';

const web3 = new Web3();

import dotenv from 'dotenv';
dotenv.config();

import { CashbackCampaign__factory, CashbackCampaignFactory__factory } from "../../typechain-types";

const nodeProvider = new ethers.providers.InfuraProvider(process.env.NETWORK, process.env.INFURA);
const wallet = new Wallet(String(process.env.CUSTODIAN_KEY), nodeProvider);



export const createMetadata = async (collectionSize: number, collectionName: string, description: string, rewardType: string, rewardSize: number) => {
    const jsonArray: any[] = [];
    for (let i = 0; i < collectionSize; i++) {
        const metadataJson = JSON.stringify({
            "name": `${collectionName} #${i}`,
            "description": description,
            "image": "",
            "attributes": [
                {
                    "incentive_type": "Cashback",
                    "reward_type": rewardType,
                    "reward_size": rewardSize
                }
            ]
        }, null, 4);
        jsonArray.push(metadataJson)
    }

    const campaignOptionsURI = await uploadBatchJSON(jsonArray);

    return campaignOptionsURI;
}

export const createCampaign = async (
    name: string,
    tokenAddress: string,
    numberOfParticipants: number,
    startDate: Date,
    endDate: Date,
    contractAddress: string,
    description: string,
    rewardType: string,
    rewardSize: number,
    journey: Journey[],
) => {

    // Deploy campaign factory
    // create campaign 

    const uris = await createMetadata(numberOfParticipants, name, description, rewardType, rewardSize)

    const cashbackCampaignFactory = CashbackCampaignFactory__factory.connect(
        String("0xFe123F01178494997F85041011C60F2d956729B0"),
        wallet
    );

    const toUnixTimestamp = (date: Date) => Math.floor(date.getTime() / 1000)
    const unixStartTimestamp = toUnixTimestamp(startDate)
    const unixEndTimestamp = toUnixTimestamp(endDate)

    const createCampaignTx = await cashbackCampaignFactory.createCampaign(
        tokenAddress,
        unixStartTimestamp,
        unixEndTimestamp,
        name,
        "Test",
        uris[0].slice(0, -1)
    )

    const receipt = await createCampaignTx.wait();

    // console.log("receipt before: ", receipt)
    if (!receipt.status)
        throw new Error("minting failed.");

    const campaign = await createCampaignTx.lastCreatedCampaign()

    if (!campaign)
        throw new Error(`Campaign creation failed for owner: ${campaign}.`);

    console.log("campaign created: ", campaign)

    const cashbackCampaign = CashbackCampaign__factory.connect(
        String(campaign),
        wallet
    );

    const fundTx = await cashbackCampaign.fundCampaign(10);
    const fundReceipt = await fundTx.wait();

    if (!fundReceipt.status)
        throw new Error("failed to fund contract.");

    console.log("campaign funded: ", campaign)

    const campaignOptionsURI = await uploadJSON({ name, contractAddress, numberOfParticipants, journey, campaignAddress: campaign, rewardSize });
    console.log("campaign options uri: ", JSON.stringify(campaignOptionsURI, null, 4))

    const streamId = await addContractListener(name, contractAddress, campaignOptionsURI, journey);
    return streamId;
}

const addContractListener = async (
    name: string,
    contractAddress: string,
    campaignOptionsURI: string,
    journey: Journey[]
) => {
    try {

        const { event, eventAbi } = journey.find(journeyEntry => journeyEntry.isMain)!;

        const streams = await Moralis.Streams.getAll({ networkType: "evm", limit: 10 });

        console.log("STREAM_LIST: ", streams)

        let stream = streams.toJSON().result.find(stream => stream.tag === name);

        console.log("STREAM: ", stream)

        if (stream) {
            return { error: "Contract listener already set." }
        }

        const streamOptions = {
            chains: [EvmChain.MUMBAI],
            description: "monitor smart contract",
            tag: campaignOptionsURI,
            webhookUrl: `${process.env.WEBHOOK_URL}/event`,
            includeContractLogs: true,
            // advancedOptions: [{ topic0: event!, filter: {} }],
            abi: [eventAbi],
            topic0: [web3.eth.abi.encodeEventSignature(eventAbi as any)]
        }

        console.log("STREAM OPTIONS ", JSON.stringify(streamOptions, null, 4))

        stream = (await Moralis.Streams.add(streamOptions)).toJSON();

        await Moralis.Streams.addAddress({ address: [contractAddress], id: stream.id });

        return { data: { streamId: stream.id } }
    } catch (err) {
        console.error("Error: ", err)
    }
}