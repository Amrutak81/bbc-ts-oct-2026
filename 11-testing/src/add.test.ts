import { add } from "./add.js";
import { test, expect } from "vitest";

// happy path
test("returns correct answer when adding two numbers", () => {
  // Arrange    - Given
  const a = 3;
  const b = 4;
  const expected = 7;

  // Act  			- When
  const result = add(a, b);

  // Assert			- Then
  expect(result).toBe(expected);
});

// edge cases
const testCases = [
  { a: -1, b: -10, expected: -11 },
  { a: 0.3, b: 0.2, expected: 0.5 },
  { a: 0, b: 0, expected: 0 },
  { a: Number.MAX_SAFE_INTEGER, b: -1, expected: Number.MAX_SAFE_INTEGER - 1 },
];

test.each(testCases)("adding $a and $b", ({ a, b, expected }) => {
  expect(add(a, b)).toBe(expected);
});

// unhappy path
test("throws an error if non-numbers are added", () => {
  expect(() => add("1" as any, true as any)).toThrow();
  expect(() => add("1" as any, [] as any)).toThrowErrorMatchingInlineSnapshot(
    `[TypeError: Both arguments must be numbers.]`,
  );
});
