import { SortGenerator } from './types.ts';

export const selectionSort: SortGenerator = function* (arr) {
  const a = [...arr];
  const n = a.length;
  let compareCount = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      compareCount++;
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      yield { array: [...a], compareCount };
    }
  }

  yield { array: [...a], compareCount };
};
