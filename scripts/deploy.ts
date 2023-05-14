import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const CashbackVoucherFactory = await ethers.getContractFactory("CashbackVoucher");

    const custodian = "0x6A29e3C5F3B16878e86426C6E4e0Eb396b047288"
    const appId = "app_0556cf9d04050e337fb71fbb0f469bca"
    const actionId = "mint-soul-bound-voucher"
    const worldId = "0xD81dE4BCEf43840a2883e5730d014630eA6b7c4A"

    const voucherFactory = await CashbackVoucherFactory.deploy("TEST", "TTT", "ipfs://QmQ1u96yqkH7S3fRKnfaphdSkYMRetozxN8Kk2gLQfteca/", custodian, 0, custodian, worldId, appId, actionId)

    await voucherFactory.deployed();

    console.log(`CampaignFactory deployed to ${voucherFactory.address}`);
}

async function main2() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const CashbackCampaignFactory = await ethers.getContractFactory("CashbackCampaignFactory");

    const custodian = "0x6A29e3C5F3B16878e86426C6E4e0Eb396b047288"
    const appId = "app_0556cf9d04050e337fb71fbb0f469bca"
    const actionId = "mint-soul-bound-voucher"
    const worldId = "0xD81dE4BCEf43840a2883e5730d014630eA6b7c4A"

    const campaignFactory = await CashbackCampaignFactory.deploy(process.env.CUSTODIAN_ADDRESS, worldId, appId, actionId)
    await campaignFactory.deployed();

    console.log(`CampaignFactory deployed to ${campaignFactory.address}`);
}

async function main3() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const CashbackVoucherFactory = await ethers.getContractFactory("CashbackVoucher");

    const custodian = "0x6A29e3C5F3B16878e86426C6E4e0Eb396b047288"
    const appId = "app_0556cf9d04050e337fb71fbb0f469bca"
    const actionId = "mint-soul-bound-voucher"
    const worldId = "0xD81dE4BCEf43840a2883e5730d014630eA6b7c4A"

    const voucherFactory = await CashbackVoucherFactory.deploy("TEST", "TTT", "ipfs://QmQ1u96yqkH7S3fRKnfaphdSkYMRetozxN8Kk2gLQfteca/", custodian, 0, custodian, worldId, appId, actionId)

    await voucherFactory.deployed();

    console.log(`CampaignFactory deployed to ${voucherFactory.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});