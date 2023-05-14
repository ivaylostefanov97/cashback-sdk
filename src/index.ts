import Moralis from "moralis";

import { createCampaign } from "./stream";
import { handleContractEvent } from "./event";
import { mintVoucher } from "./voucher";

export type CashbackSDK = {
    createCampaign: typeof createCampaign;
    handleContractEvent: typeof handleContractEvent;
    mintVoucher: typeof mintVoucher
}

export const initCashbackSDK = async (cb: Function) => {
    console.log("Starting Service...", process.env.MORALIS_API_KEY);

    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
    });

    console.log("Started Service");

    await cb({
        createCampaign,
        handleContractEvent,
        mintVoucher
    })
}