import { checkUserHasToken } from "./gating"


type MintVoucherOptions = {
    tokenGate?: {
        tokenAddress: string,
        minBalance: number
    },
    nftGate?: {
        tokenAddress: string,
        minBalance: number
    },
    walletAddress: string,
}

export const mintVoucher = async (options: MintVoucherOptions) => {
    const { walletAddress, tokenGate, nftGate } = options;

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

    
}