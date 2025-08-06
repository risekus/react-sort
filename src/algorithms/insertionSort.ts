import { SortGenerator } from './types.ts';

export const insertionSort: SortGenerator = function* (arr) {
  const a = [...arr];
  let compareCount = 0;

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    while (j >= 0) {
      compareCount++;
      if (a[j] > key) {
        a[j + 1] = a[j];
        j--;
        yield { array: [...a], compareCount };
      } else {
        break;
      }
    }

    a[j + 1] = key;
    yield { array: [...a], compareCount };
  }

  yield { array: [...a], compareCount };
};
