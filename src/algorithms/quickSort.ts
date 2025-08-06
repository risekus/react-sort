import { SortGenerator } from './types.ts';

export const quickSort: SortGenerator = function* (arr) {
  const a = [...arr];
  let compareCount = 0;

  function* quickSortRecursive(start: number, end: number): Generator<any> {
    if (start >= end) return;

    const pivot = a[end];
    let i = start;

    for (let j = start; j < end; j++) {
      compareCount++;
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        yield { array: [...a], compareCount };
        i++;
      }
    }

    [a[i], a[end]] = [a[end], a[i]];
    yield { array: [...a], compareCount };

    yield* quickSortRecursive(start, i - 1);
    yield* quickSortRecursive(i + 1, end);
  }

  yield* quickSortRecursive(0, a.length - 1);
  yield { array: [...a], compareCount };
};