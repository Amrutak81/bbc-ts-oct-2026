"use strict";
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
    let name = "Mary"; // object, symbol, string, "Kevin"
    // name = "Emma"
    let world = "Earth";
    world = 12;
    world = true;
    world = new Object();
    function add(a, b) {
        return a + b;
    }
    function adding(a, b) {
        if (typeof a === "number" && typeof b === "number") {
            return a + b;
        }
        return 0;
    }
    function printSomething(x) {
        console.log(x);
    }
    function example(x) {
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
    let STATUS_CODE;
    (function (STATUS_CODE) {
        STATUS_CODE[STATUS_CODE["NOT_FOUND"] = 404] = "NOT_FOUND";
        STATUS_CODE[STATUS_CODE["OK"] = 200] = "OK";
        STATUS_CODE[STATUS_CODE["UNAUTHORIZED"] = 403] = "UNAUTHORIZED";
    })(STATUS_CODE || (STATUS_CODE = {}));
    console.log(STATUS_CODE[404]);
}
