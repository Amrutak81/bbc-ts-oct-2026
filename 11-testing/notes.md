# Section 11 — Testing

These notes follow the examples in `src/` and use [Vitest](https://vitest.dev), which runs TypeScript directly and has an API close to Jest's.

## Setup

- `npm install -D vitest`
- `"test": "vitest"` in `package.json` scripts. `npm test` starts watch mode, and `npx vitest run` runs once and exits.
- Vitest finds files matching `**/*.{test,spec}.?(c|m)[jt]s?(x)`, so name tests `add.test.ts` or `add.spec.ts`.
- With `"type": "module"`, imports use the `.js` extension (`import { add } from "./add.js"`) even though the source is `.ts`.

## Anatomy of a test (add.test.ts)

```ts
import { test, expect } from "vitest";

test("returns correct answer when adding two numbers", () => {
  // Arrange - Given
  const a = 3;
  const b = 4;
  // Act - When
  const result = add(a, b);
  // Assert - Then
  expect(result).toBe(7);
});
```

- **Arrange / Act / Assert** (or Given / When / Then) keeps each test readable: set up, do one thing, check one outcome.
- Name tests after the behaviour, not the function.
- Cover three kinds of case: the **happy path**, **edge cases** and the **unhappy path**.

## Table-driven tests with `test.each`

```ts
const testCases = [
  { a: -1, b: -10, expected: -11 },
  { a: 0, b: 0, expected: 0 },
];

test.each(testCases)("adding $a and $b", ({ a, b, expected }) => {
  expect(add(a, b)).toBe(expected);
});
```

- One test body runs for every row, and `$a` / `$b` in the title are filled in from the row.
- Good for edge cases: negatives, zero, floats, `Number.MAX_SAFE_INTEGER`.
- Floating point: `0.1 + 0.2` is not `0.3`. Use `toBeCloseTo` for inexact values.

## Testing errors

```ts
expect(() => add("1" as any, true as any)).toThrow();
```

- Wrap the call in an arrow function. `expect(add(...)).toThrow()` runs `add` immediately, so the error is thrown before `expect` can catch it.
- Use `as any` to pass deliberately wrong types, because TypeScript would otherwise refuse to compile the test.
- `toThrow("message")` or `toThrow(TypeError)` makes the assertion more specific.
- `toThrowErrorMatchingInlineSnapshot` records the error in the test file the first time it runs.

## Inline snapshots

- `toMatchInlineSnapshot()` with no argument makes Vitest write the current value into the test file. Review it, then commit it.
- Later runs fail if the value changes. Update deliberately with `u` in watch mode or `vitest -u`.
- Best for small, stable values. Avoid snapshotting large objects, because people stop reading the diffs.

## Testing async code (req.test.ts)

- Mark the test `async` and `await` the result, or `return` the promise. If you forget, the test finishes before the assertions run and passes without testing anything.
- Rejections: `await expect(promise).rejects.toThrow()`.
- The `done` callback is no longer supported in Vitest. Wrap a callback API in a `Promise` and `await` that instead.

### Fake timers

`fakeFetch` waits 2 seconds. Tests shouldn't.

```ts
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const promise = fakeFetch("https://bbc.co.uk");
vi.runAllTimers();
const response = await promise;
```

- Start the call first, advance the clock, then `await`.
- Always restore real timers in `afterEach`, or later tests are affected.
- `beforeEach` / `afterEach` run around every test in the file.

## Testing types (type-testing.test.ts)

Runtime tests only fail on the values you give them. A missing `case` in a `switch` is a bug no value-based test will find unless it happens to hit that path.

- `area` ends its `switch` with `const exhaustive: never = shape`. Adding a new `Shape` without handling it is a **compile error**.
- `expectTypeOf` asserts on the type TypeScript infers:

```ts
expectTypeOf(fetchArea(shape)).resolves.toEqualTypeOf<number>();
expectTypeOf<Shape["kind"]>().toEqualTypeOf<"circle" | "square">();
```

- `expectTypeOf` is checked by the type checker, not at runtime. The test body runs fine either way, so run `tsc --noEmit` (or `vitest --typecheck`) to see type failures.
- Use `toBeCloseTo(12.566, 3)` for the circle area, since `Math.PI` results are inexact.

## Common matchers

| Matcher                  | Use for                                 |
| ------------------------ | --------------------------------------- |
| `toBe`                   | primitives, reference equality          |
| `toEqual`                | deep equality of objects and arrays     |
| `toBeCloseTo`            | floating-point numbers                  |
| `toThrow`                | functions that throw                    |
| `rejects.toThrow`        | promises that reject                    |
| `toBeNull`, `toBeTruthy` | null and truthiness                     |
| `toMatchInlineSnapshot`  | small stable values                     |

## Best practices

- Test behaviour, not implementation details.
- One reason to fail per test.
- Test boundaries (`0`, negative numbers, empty input), not just the obvious value.
- Keep tests fast and independent of each other. Fake time and network.
- Test the failure path as carefully as the success path.
