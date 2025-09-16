
export function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

export function nextPrime(num) {
  let n = num + 1;
  while (!isPrime(n)) {
    n++;
  }
  return n;
}
