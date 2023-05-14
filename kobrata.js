const { initCashbackSDK } = require("./dist/src/index")

initCashbackSDK((sdk) => {
    sdk.createCampaign();
});