export type SortStep = {
    array: number[];
    compareCount: number;
}

export type SortGenerator = (arr: number[]) => Generator<SortStep>;