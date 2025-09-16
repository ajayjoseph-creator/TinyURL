const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(hex) {
  let num = BigInt("0x" + hex);
  let str = "";
  while (num > 0n) {
    str = BASE62[Number(num % 62n)] + str;
    num = num / 62n;
  }
  return str || "0";
}
