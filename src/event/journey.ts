import { FilterLeaf, FilterNode } from "../common/journey-types";
import { BigNumber } from "ethers"

export const checkEventMatchJourneyFilter = (logArgs: Record<string, any>, journeyFilter: FilterNode): boolean => {
    if (Object.keys(journeyFilter).length === 0) return true;
    const operator = Object.keys(journeyFilter)[0];

    if (leafOperators.hasOwnProperty(operator)) {

        const arg1 = journeyFilter[operator][0] as string;
        const arg2 = journeyFilter[operator][1];

        let argValue = logArgs[arg1];

        return leafOperators[operator as keyof typeof leafOperators](argValue, arg2 as any);
    }

    const filteredLogResultArray = (journeyFilter as { [k: string]: FilterNode[] })[operator].map(
        (filterNode: FilterNode) => checkEventMatchJourneyFilter(logArgs, filterNode)
    )

    return nodeOperators[operator as keyof typeof nodeOperators](...filteredLogResultArray)
}

export const getFilterLeaves = (journeyFilter: FilterNode): FilterLeaf[] => {
    const [operator, value] = Object.entries(journeyFilter)[0];
    if (leafOperators.hasOwnProperty(operator)) {
        return [journeyFilter as FilterLeaf];
    }

    return value.reduce((acc: string[], curr: FilterNode) => [...acc, ...getFilterLeaves(curr)], []);
}

export const getJourneyFilterLeaves = (journeyFilters: FilterNode[]) => {
    return journeyFilters.reduce((acc: FilterLeaf[], journeyFilter) => {
        if (Object.keys(journeyFilter).length === 0) return acc;
        return [...acc, ...getFilterLeaves(journeyFilter)]
    }, []);
}

const leafOperators = {
    "eq": (v1: any, v2: any) => {
        if (BigNumber.isBigNumber(v1)) {
            return v1.eq(v2)
        }
        return v1 === v2;
    },
    "ne": (v1: any, v2: any) => {
        if (BigNumber.isBigNumber(v1)) {
            return !v1.eq(v2)
        }
        return v1 !== v2;
    },
    "lt": (v1: any, v2: any) => {
        if (BigNumber.isBigNumber(v1)) {
            return v1.lt(v2)
        }
        return v1 < v2;
    },
    "lte": (v1: any, v2: any) => {
        if (BigNumber.isBigNumber(v1)) {
            return v1.lte(v2)
        }
        return v1 <= v2;
    },
    "gt": (v1: any, v2: any) => {
        if (BigNumber.isBigNumber(v1)) {
            return v1.gt(v2)
        }
        return v1 > v2;
    },
    "gte": (v1: any, v2: any) => {
        if (BigNumber.isBigNumber(v1)) {
            return v1.gte(v2)
        }
        return v1 >= v2;
    },
    "in": (v1: any, v2: any[]) => v2.includes(v1),
    "nin": (v1: any, v2: any[]) => !v2.includes(v1)
}

const nodeOperators = {
    "and": (...args: any) => args.reduce((acc: boolean, curr: boolean) => acc && curr, true),
    "or": (...args: any) => args.reduce((acc: boolean, curr: boolean) => acc || curr, false)
}