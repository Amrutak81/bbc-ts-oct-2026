// Multiple signatures for one function.

function getValue(value: string): string;
/** This will return a number */
function getValue(value: number): number;
/** This will return a boolean */
function getValue(value: boolean): boolean;
function getValue(value: string | number | boolean): number | string | boolean {
  return value;
}

function getValue2<T extends string | number | boolean>(value: T): T {
  return value;
}

type CallbackFn = () => {};
const noopFn: CallbackFn = () => ({});

/** Call with just the name of the task */
function gulp(name: string): void;
/** Call with the name of the task and callback of work to be done */
function gulp(name: string, callback: CallbackFn): void;
/** Call with the name of the task, dependencies of other tasks and a callback. */
function gulp(name: string, dependencies: string[], callback: CallbackFn): void;
function gulp(
  name: string,
  second?: string[] | CallbackFn,
  third?: CallbackFn,
) {
  if (Array.isArray(second)) {
  }
}

// name
gulp("build css");
// name callback
gulp("second step", noopFn);
// name dependencies callback
gulp("third step", ["build css", "second step"], noopFn);

// gulp("problem", noopFn, noopFn);
gulp();
