import { SortGenerator } from './types.ts';

export const bubbleSort: SortGenerator = function* (arr) {
  const a = [...arr];
  const n = a.length;
  let compareCount = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      compareCount++;
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { array: [...a], compareCount };
      }
    }
  }

  yield { array: [...a], compareCount };
};