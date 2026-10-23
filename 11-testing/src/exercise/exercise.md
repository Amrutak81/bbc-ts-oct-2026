# Practice Lab - Writing Tests

`add.ts`/`add.test.ts` and `req.ts`/`req.test.ts` (one level up, in `src/`) showed you the shape of a test. This lab is where you write them yourself, across six small functions that get progressively harder to test — plain validation, then callback-based async, then promise-based async, then type-level assertions.

## Getting Started

Work through `student/src/`. Each `.test.ts` file already has `describe`/`test` blocks with empty bodies — your job is to fill them in. A couple of tests per file are already written for you, matching the pattern to follow. `solution/src/` has the finished version of everything once you want to check your work.

---

## Exercise 1: Testing Pure Validation — `filterBiggest`

**Objective:** Write tests for a function with no side effects, including its error paths.

**Context:** `filterBiggestNumbers` throws if you pass it the wrong argument types — those throw paths need testing just as much as the happy path.

**Tasks:**

1. Fill in the empty test for "throws if the first parameter is not an array" — call the function with something that isn't an array and assert it throws, using `expect(() => ...).toThrow(...)`.
2. Fill in "returns correct output for reasonable input" using the array `[1, -3, 8, 7]`.
3. Fill in "throws if the second argument is not a number".
4. The floating-point and negative-number tests are already written — run them and confirm they pass before moving on.

**Key Learning:** `expect(() => fn()).toThrow(...)` needs the wrapping arrow function — `expect(fn()).toThrow()` would call `fn()` immediately and try to assert on its return value (or its thrown error, uncaught) instead of letting `expect` catch the throw itself.

---

## Exercise 2: Testing String Validation — `uppercase`

**Objective:** Cover a small pure function completely: normal input, edge input, and invalid input.

**Tasks:**

1. Fill in all three tests under "Correctly uppercases strings" — lowercase input, mixed-case input, and already-uppercase input.
2. Fill in "should throw an error when the input is not a string", passing a number where a string is expected.

**Key Learning:** Even a two-line function benefits from testing its edge cases (already-uppercase input) and its failure mode (wrong type), not just the obvious case.

---

## Exercise 3: Testing Business Logic — `singularOrPlural`

**Objective:** Test a function whose behaviour depends on a boundary condition (`count === 1`), not just its type signature.

**Tasks:**

1. Fill in the test for count `1` → singular.
2. Fill in the test for count `0` → plural. Note this one is a deliberate edge case: zero of something is plural ("0 people"), not singular.
3. Fill in the test for a negative count → should throw.
4. Fill in the test for a non-numeric count → should throw.

**Key Learning:** The interesting bugs in `count === 1 ? singular : plural`-style logic live at the boundaries (`0`, negative numbers) — a test suite that only checks `1` and `2` would miss both.

---

## Exercise 4: Testing Callback-Based Async — `store`

**Objective:** Test a function that reports success or failure through a callback, not a return value or a thrown error.

**Context:** `store` takes a Node-style `(error, data)` callback. Older test runners used a `done` parameter to know when a callback test had finished, but Vitest no longer supports it (it throws `done() callback is deprecated, use promise instead`). The replacement is to wrap the callback in a Promise and `await` it — a `storeAsync` helper at the top of the test file already does this for you.

**Tasks:**

1. Fill in "should return an object with an id when given a Buffer": `await storeAsync(...)`, then assert `error` is `null` and `data` has a 4-character `id`.
2. Fill in "should call the callback with an error when the input is not a Buffer": pass a non-Buffer, then assert you got an `Error` with the right message and no `data`.
3. Fill in "should take at least 300ms to return a result": record a start time, `await storeAsync(...)`, and assert the elapsed time is at least 300ms.
4. Read `storeAsync`. Where does the `resolve` call happen, and what would happen to a test if the callback never fired?

**Key Learning:** A callback can fire after the test function has already returned, so the test has to hand the runner something to wait for. Wrapping the callback in a Promise is the general fix — and if you forget to `await` (or `return`) it, the test finishes before the assertions run and passes without testing anything.

---

## Exercise 5: Testing Promise-Based Async — `store-async`

**Objective:** Test the same behaviour as Exercise 4, now that the function returns a Promise instead of taking a callback.

**Tasks:**

1. Fill in "should return an object with an id when given a Buffer": mark the test `async`, `await store(buffer)`, and assert on the result directly — no wrapper needed.
2. Fill in "should throw an error when the input is not a Buffer": use `await expect(store(input)).rejects.toThrow("input must be a buffer")` rather than a manual `try`/`catch`.
3. Fill in the timing test the same way as Exercise 4, but with a plain `await` instead of a callback.
4. Compare this file to Exercise 4's, function-by-function. Same behaviour, same three things tested — which version was easier to get right?

**Key Learning:** This is the payoff for Section 7's callback → promise → async/await arc: the exact same three behaviours needed a Promise wrapper around the callback in Exercise 4, and just `await` here. Testing async code gets easier as the code itself moves up that same ladder.

---

## Exercise 6: Testing Types, Not Just Values — `type-testing`

**Objective:** Use Vitest's `expectTypeOf` to assert on the *type* TypeScript infers, not just the value a function returns.

**Context:** `area` takes a `Shape` (a `"circle" | "square"` discriminated union) and a `switch` with `const exhaustive: never = shape` in the default case — the same exhaustiveness pattern from Section 5. `fetchArea` wraps it in a promise.

**Tasks:**

1. Fill in "should calculate the area of a circle" and "should calculate the area of a square" — ordinary value-based tests, same as Exercises 1–3.
2. Read the already-filled-in `expectTypeOf(fetchArea(...)).resolves.toEqualTypeOf<number>()` test. This is new syntax: it checks the type Vitest sees for the resolved value, not the value itself.
3. Fill in "should equal the exact union of shape kinds" using `expectTypeOf<Shape["kind"]>().toEqualTypeOf<...>()`, following the pattern from task 2.
4. Try it: add a third shape to the `Shape` union (e.g. `{ kind: "triangle"; base: number; height: number }`) but don't add a case for it in `area`'s `switch`. Run the tests — do they fail? Now run `tsc --noEmit` — what happens, and why didn't the tests catch it?

**Key Learning:** A runtime test can only fail on values it was actually given — it has no way to know a case is *missing* unless something calls that exact path. Exhaustiveness checking catches that class of bug at compile time instead, and `expectTypeOf` lets you assert on it directly rather than relying on remembering to run `tsc` separately.

---

## Summary

By the end of this lab you should be able to:

- Write tests for both the success path and the error path of a function
- Explain why `expect(() => fn()).toThrow()` needs the extra arrow function
- Identify boundary conditions worth testing beyond the obvious cases
- Wrap a callback-based function in a Promise so it can be tested, and explain how a forgotten `await` makes a test pass without testing anything
- Write the promise-based equivalent with `async`/`await`, and say why it's less error-prone than the callback version
- Use `expectTypeOf` to assert on inferred types, and explain what class of bug it catches that a value-based test can't
