// Microsoft 2012
// C#/Java -> Object oriented, modules,
// Jscript.Net
// 1. JavaScript (run-time) is TypeScript -> any
// 2. Structural typing (duck typing)
// 3. Gradual adoption
// 4. Type safety without getting in the way
// 5. Tooling

// 7 Primitive in JS (Object)
// String, Number, Boolean, undefined, BigInt, null, Symbol

// JS -> 8 types (value land)
// TS -> unlimited types (type land)

// Non-primitive
// tuple

{
  // any, unknown, void, never
  let name: "Kevin" | "Mary" = "Mary"; // object, symbol, string, "Kevin"
  // name = "Emma"
  let world: any = "Earth";
  world = 12;
  world = true;
  world = new Object();

  function add(a: number, b: number) {
    return a + b;
  }

  function adding(a: unknown, b: unknown) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    return 0;
  }

  function printSomething(x: string) {
    console.log(x);
  }

  function example(x: string | number) {
    x;
    if (typeof x === "string") {
      x;
      return "Hello";
    }
    if (typeof x === "number") {
      return x;
    }

    x;
    if (x) {
      throw new Error("x should be a string or number");
    }
  }
}

{
  enum STATUS_CODE {
    "NOT_FOUND" = 404,
    "OK" = 200,
    "UNAUTHORIZED" = 403,
  }

  console.log(STATUS_CODE[404]);
}
