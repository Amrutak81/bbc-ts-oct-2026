import * as utils from "./utils.js"
import { company } from "./utils.js"
import fs from "node:fs";


console.log(utils.location)
console.log(company)
fs.writeFileSync("output.txt", `Location: ${utils.location}\nCompany: ${company}`);