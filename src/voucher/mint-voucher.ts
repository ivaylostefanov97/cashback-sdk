import { defaultAbiCoder } from "ethers/lib/utils";
import { checkUserHasToken } from "./gating";

import { ContractTransaction, ethers, Wallet } from "ethers";
import { CashbackCampaignFactory__factory, CashbackVoucher__factory } from "../../typechain-types";

const dataJson = require('../utils/cache.json');

import dotenv from 'dotenv';

dotenv.config();

const nodeProvider = new ethers.providers.InfuraProvider(process.env.NETWORK, process.env.INFURA);
const wallet = new Wallet(String(process.env.CUSTODIAN_KEY), nodeProvider);


type MintVoucherOptions = {
    tokenGate?: {
        tokenAddress: string,
        minBalance: number
    },
    nftGate?: {
        tokenAddress: string,
        minBalance: number
    },
    humanityProof: {
        credential_type: string,
        merkle_root: string,
        nullifier_hash: string,
        proof: string,
    },
    walletAddress: string,
}

export const mintVoucher = async (options: MintVoucherOptions) => {
    const { walletAddress, tokenGate, nftGate, humanityProof } = options;

    if (tokenGate) {
        const isEligible = await checkUserHasToken(walletAddress, tokenGate.tokenAddress, tokenGate.minBalance)
        if (!isEligible) {
            return { error: "You are not eligible to participate in this campaign" }
        }
    }

    if (nftGate) {
        const isEligible = await checkUserHasToken(walletAddress, nftGate.tokenAddress, nftGate.minBalance)
        if (!isEligible) {
            return { error: "You are not eligible to participate in this campaign" }
        }
    }

    console.log("Inside humanity proof")
    const unpackedProof = defaultAbiCoder.decode(['uint256[8]'], humanityProof.proof)[0];
    console.log("Unpacked Proof: ", unpackedProof)

    const cashbackCampaignFactory = CashbackCampaignFactory__factory.connect(
        String("0xFe123F01178494997F85041011C60F2d956729B0"),
        wallet
    );

    const voucher = await cashbackCampaignFactory.lastCreatedVoucher();

    console.log("VOUCHER contract: ", voucher)

    const voucherFactory = CashbackVoucher__factory.connect(
        String(voucher),
        wallet
    );

    console.log("wallet address: ", walletAddress)
    console.log("IPFS LINK: ", Object.keys(dataJson)[0])

    const uri = `https://gateway.pinata.cloud/ipfs/${Object.keys(dataJson)[0].replace("ipfs://", "")}`

    console.log("IPFS uri: ", uri)

    const mintVoucherTx = await voucherFactory.mintVoucher(
        walletAddress,
        walletAddress,
        humanityProof.merkle_root,
        humanityProof.nullifier_hash,
        unpackedProof
    )
    console.log("mintVoucherTx: ", mintVoucherTx)
    const receipt = await mintVoucherTx.wait();

    console.log("receipt before: ", receipt)
    if (!receipt.status)
        throw new Error("minting failed.");

    console.log("receipt: ", receipt)
}