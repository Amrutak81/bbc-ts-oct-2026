import store from "./store.js";
import { describe, test, expect } from "vitest";

// Vitest no longer supports the `done` callback, so we wrap the
// callback-style `store` in a Promise and `await` it.
function storeAsync(value: Buffer) {
  return new Promise<{ error: Error | null; data?: { id: string } }>(
    (resolve) => {
      store(value, (error, data) => resolve({ error, data }));
    }
  );
}

describe("store function", () => {
  describe("Successful storage", () => {
    test("should return an object with an id when given a Buffer", async () => {});
  });

  describe("Input validation", () => {
    test("should call the callback with an error when the input is not a Buffer", async () => {});
  });

  describe("Asynchronous operation", () => {
    test("should take at least 300 ms to return a result", async () => {});
  });
});
