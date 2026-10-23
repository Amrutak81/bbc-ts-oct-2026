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
    test("should return an object with an id when given a Buffer", async () => {
      const { error, data } = await storeAsync(Buffer.from("Test data"));
      expect(error).toBeNull();
      expect(data).toHaveProperty("id");
      expect(typeof data?.id).toBe("string");
      expect(data?.id).toHaveLength(4);
    });
  });

  describe("Input validation", () => {
    test("should call the callback with an error when the input is not a Buffer", async () => {
      const { error, data } = await storeAsync("Not a buffer" as any);
      expect(error).toBeInstanceOf(Error);
      expect(error?.message).toBe("input must be a buffer");
      expect(data).toBeUndefined();
    });
  });

  describe("Asynchronous operation", () => {
    test("should take at least 300 ms to return a result", async () => {
      const startTime = Date.now();
      await storeAsync(Buffer.from("Test data"));
      expect(Date.now() - startTime).toBeGreaterThanOrEqual(300);
    });
  });
});
