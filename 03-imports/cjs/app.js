const utils = require('./utils');
const fs = require("node:fs");

console.log(utils);
console.log(fs.writeFileSync("output.txt", "Hello World!"))