export async function fakeFetch(url: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });
  if (url === "http://error.com") throw new Error("network error");
  return Buffer.from("some other data");
}
