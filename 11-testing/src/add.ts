export function add(a: number, b: number) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers.");
  }
  return a + b;
}
// **/*.{test,spec}.?(c|m)[jt]s?(x)
// .test.ts
// .spec.ts
