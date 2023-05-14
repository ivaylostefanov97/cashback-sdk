import { defaultAbiCoder } from "ethers/lib/utils";
import { checkUserHasToken } from "./gating";


type MintVoucherOptions = {
    tokenGate?: {
        tokenAddress: string,
        minBalance: number
    },
    nftGate?: {
        tokenAddress: string,
        minBalance: number
    },
    humanityProof?: {
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
        const isEligible =  await checkUserHasToken(walletAddress, tokenGate.tokenAddress, tokenGate.minBalance)
        if (!isEligible) {
            return { error: "You are not eligible to participate in this campaign" }
        }
    }

    if (nftGate) {
        const isEligible =  await checkUserHasToken(walletAddress, nftGate.tokenAddress, nftGate.minBalance)
        if (!isEligible) {
            return { error: "You are not eligible to participate in this campaign" }
        }
    }

    if (humanityProof) {
        console.log("Inside humanity proof")
        const unpackedProof = defaultAbiCoder.decode(['uint256[8]'], humanityProof.proof)[0];
        console.log("Unpacked Proof: ", unpackedProof)
    }
}