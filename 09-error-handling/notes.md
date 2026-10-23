# Section 9 — Error Handling

These notes follow the examples in `src/`. Each file handles the same problem (parsing a birthday typed by the user) with a different error-handling strategy.

## The problem (01-error-handling.ts)

`new Date("not a date")` does not throw. It returns an `Invalid Date` object, so `date.toISOString()` later throws a `RangeError` far from the real cause. Bad input needs to be caught where it enters the program.

## Strategy 1 — Return `null` (02-return-null.ts)

- `parse` returns `Date | null`.
- TypeScript forces the caller to check before using the result (narrowing with `if (date)`).
- Downside: `null` carries no information about _why_ it failed.

## Strategy 2 — Throw and catch (03-throw-catch.ts)

- `throw new Error("message")` stops execution and unwinds to the nearest `try/catch`.
- Built-in error types: `Error`, `RangeError`, `TypeError`, `SyntaxError`, `ReferenceError`, `URIError`, `EvalError`.
- In a `catch` block, `error` is `unknown` (with `useUnknownInCatchVariables`, part of `strict`), so narrow it with `error instanceof Error` before using `.message`.
- Downside: thrown errors are not part of a function's type signature. Nothing tells the caller that `parse` can fail.

## Strategy 3 — Custom errors (04-custom-errors.ts)

- Extend `Error` to add your own fields, such as a `code`.
- Use a union of string literals (`"E101" | "E102"`) for the codes so a `switch` is checked for exhaustiveness.
- `instanceof InvalidDateError` narrows the error, so `error.code` is typed.
- Call `super(message)` first in the constructor.

## Strategy 4 — Return the error (05-returning-the-error.ts)

- `parse` returns `Date | InvalidDateError`.
- The possible failure is now visible in the return type.
- The caller narrows with `instanceof` and handles both cases.
- Don't `throw` it; `return` it.
- Downside: every caller must remember to check, and it only works if errors are distinguishable from valid values.

## Strategy 5 — Option / Try / Either (06-option.ts)

- Wrap a value in a container (`Some<T>` or `None`) instead of returning a raw value or `null`.
- Operations chain with `flatMap`, and `getOrElse` supplies a default.
- These types come from Haskell, OCaml, Scala and Rust. They are not built into JavaScript, so you need an npm package or your own implementation.
- Downside: poor interoperability with code that doesn't use the same types.

## Comparing the approaches

| Approach         | Error visible in type? | Carries detail? | Notes                               |
| ---------------- | ---------------------- | --------------- | ----------------------------------- |
| Return `null`    | Yes                    | No              | Simple, good when the reason is obvious |
| Throw / catch    | No                     | Yes             | Idiomatic JS, easy to forget to catch |
| Custom errors    | No                     | Yes (typed)     | Good for error codes and `switch`   |
| Return the error | Yes                    | Yes             | Caller must check with `instanceof` |
| Option / Either  | Yes                    | Depends         | Chainable, needs a library          |

## Rules of thumb

- Validate at the boundary (user input, network, files) and convert to your own types early.
- Use `throw` for unexpected or unrecoverable problems, and return values for expected failures.
- Always narrow `unknown` in `catch` before using it.
- Throw `Error` objects (or subclasses), never strings, so you get a stack trace.
- Don't swallow errors with an empty `catch`; log or rethrow.
- Pick one strategy per module and stay consistent.
