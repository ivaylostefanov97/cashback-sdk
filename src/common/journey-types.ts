import { AbiItem } from "@moralisweb3/streams-typings";
import { BigNumber } from "ethers";


export type FilterLeaf = { [k: string]: [string, string | BigNumber] }
export type FilterNode = FilterLeaf | { [k: string]: FilterNode[] }

export type Journey = {
    eventAbi: AbiItem,
    filter?: FilterNode,
    eventMetadata?: Record<string, any>,
    event?: string,
    isMain?: boolean,
}