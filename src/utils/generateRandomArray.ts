export function generateRandomArray(length: number, min = 5): number[] {
  const max = length*2
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}
