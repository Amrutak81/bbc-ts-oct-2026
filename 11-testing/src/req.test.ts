import { fakeFetch } from "./req.js";
import { test, expect, vi, beforeEach, afterEach } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("responds with data with correct url", async () => {
  const responsePromise = fakeFetch("https://bbc.co.uk");
  vi.runAllTimers();
  const response = await responsePromise;
  expect(Buffer.isBuffer(response)).toBe(true);
  expect(response.toString()).toMatchInlineSnapshot(`"some other data"`);
});

test("throws error with error url", async () => {
  const responsePromise = fakeFetch("http://error.com");
  vi.runAllTimers();
  await expect(() => responsePromise).rejects.toThrow();
});
