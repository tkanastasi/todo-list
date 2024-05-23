export function factorial(n: bigint) {
  let acc = BigInt(1);
  for (let i = BigInt(1); i <= n; i++) {
    acc *= i;
  }
  return acc;
}

export function partialSums(numbers: number[]): number[] {
  let arr: number[] = [];
  let acc: number = 0;
  for (let i = 0; i < numbers.length; i++) {
    acc += numbers[i];
    arr.push(acc);
  }
  return arr;
}
