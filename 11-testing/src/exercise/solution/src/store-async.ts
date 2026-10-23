import { setTimeout } from "node:timers/promises";

export default async function store(value: Buffer) {
  if (Buffer.isBuffer(value) === false) {
    throw Error("input must be a buffer");
  }
  await setTimeout(300);
  const id = Math.random().toString(36).slice(2, 6);
  return { id };
}
