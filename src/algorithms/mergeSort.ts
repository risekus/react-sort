import { SortGenerator } from './types.ts';

export const mergeSort: SortGenerator = function* (arr) {
  const a = [...arr];
  let compareCount = 0;

  function* mergeSortRecursive(start: number, end: number): Generator<any> {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);
    yield* mergeSortRecursive(start, mid);
    yield* mergeSortRecursive(mid, end);

    const merged: number[] = [];
    let i = start, j = mid;

    while (i < mid && j < end) {
      compareCount++;
      if (a[i] < a[j]) merged.push(a[i++]);
      else merged.push(a[j++]);
    }

    while (i < mid) merged.push(a[i++]);
    while (j < end) merged.push(a[j++]);

    for (let k = 0; k < merged.length; k++) {
      a[start + k] = merged[k];
      yield { array: [...a], compareCount };
    }
  }

  yield* mergeSortRecursive(0, a.length);
  yield { array: [...a], compareCount };
};
