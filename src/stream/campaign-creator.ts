import { FilterNode, Journey } from "../common/journey-types";
import { uploadJSON } from "../utils/storage";
import { addContractListener } from "./"


export const createCampaign = async (
    name: string,
    contractAddress: string,
    journey: Journey[],
    mainFilter?: FilterNode,
) => {

    const campaignOptionsURI = await uploadJSON({});

    const streamId = await addContractListener(name, contractAddress, campaignOptionsURI, journey, mainFilter);
    return streamId;
}