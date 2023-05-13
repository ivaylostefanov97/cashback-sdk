import { FilterNode, Journey } from "../common/journey";
import { addContractListener } from "../stream"

export const createCampaign = async (
    name: string,
    contractAddress: string,
    journey: Journey[],
    mainFilter?: FilterNode,
) => {



    const streamId = await addContractListener(name, contractAddress, journey, mainFilter);
    return streamId;
}