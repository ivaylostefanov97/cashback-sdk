import { defaultAbiCoder } from "ethers/lib/utils";
import { checkUserHasToken } from "./gating";

import { ContractTransaction, ethers, Wallet } from "ethers";
import { CashbackCampaignFactory__factory, CashbackVoucher__factory } from "../../typechain-types";

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
    tokenAddress: string
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

    const voucherFactory = CashbackVoucher__factory.connect(
        String("0xe769C331826a37f79A13c65c40C53E74e01E6191"),
        wallet
    );

    const mintVoucherTx = await voucherFactory.mintVoucher(process.env.CUSTODIAN_ADDRESS!, process.env.CUSTODIAN_ADDRESS!, humanityProof.merkle_root, humanityProof.nullifier_hash, unpackedProof)

    const receipt = await mintVoucherTx.wait();

    if (!receipt.status)
        throw new Error("minting failed.");
}