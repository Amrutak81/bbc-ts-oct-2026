function contains(text: string, search: string | RegExp) {
  if (typeof search === "string") {
    return text.includes(search);
  }
  return Boolean(search.exec(text));
}

function contains2(text: string, search: string | RegExp) {
  if (typeof text !== "string") {
    throw new Error("text must be string");
  }
  if (search instanceof RegExp) {
    return Boolean(search.exec(text));
  }
  return text.includes(search);
}
