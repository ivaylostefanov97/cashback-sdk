import { AbiItem } from "@moralisweb3/streams-typings";


export type FilterLeaf = { [k: string]: [string, string | BigInt] }
export type FilterNode = FilterLeaf | { [k: string]: FilterNode[] }

export type Journey = {
    eventAbi: AbiItem,
    filter?: FilterNode,
    eventMetadata?: Record<string, any>,
    event?: string,
    isMain?: boolean,
}