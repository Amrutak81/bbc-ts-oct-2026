import * as utils from "./utils.js";
import { company } from "./utils.js";
import fs from "node:fs";
import { type VALID_URL_VALUE, printHello } from "./types.js";
// import type { VALID_URL_VALUE } from "./types.js";
import data from "./user.json" with { type: "json" };

console.log(utils.location);
console.log(company);
fs.writeFileSync(
  "output.txt",
  `Location: ${utils.location}\nCompany: ${company}`,
);

const value: VALID_URL_VALUE = "https://example.com";
printHello();

console.log(data[0] && data[0].name);
console.log(data[0]?.role);
