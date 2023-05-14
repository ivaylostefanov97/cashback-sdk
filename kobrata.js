const { initCashbackSDK } = require("./dist/src/index")

initCashbackSDK((sdk) => {
    //sdk.createCampaign();
    sdk.mintVoucher({
        humanityProof: {
            credential_type: string,
            merkle_root: string,
            nullifier_hash: string,
            proof: string,
        },
        walletAddress: "",
        tokenAddress: ""
    });
});