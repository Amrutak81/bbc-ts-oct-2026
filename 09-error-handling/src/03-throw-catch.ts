import readline from "node:readline/promises";

async function askForBirthday(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question("When is your birthday? ");
  rl.close();

  return answer;
}

function isValidDate(date: Date): date is Date {
  return date instanceof Date && date.toString() !== "Invalid Date";
}

// 5, 10, 1
new Error();
new RangeError();
new TypeError();
new SyntaxError();
new ReferenceError();
new URIError();
new EvalError();

function parse(birthday: string) {
  const date = new Date(birthday);
  if (isValidDate(date)) {
    return date;
  }
  throw new Error(`Date format invalid (YYYY-MM-DD). You said '${birthday}'`);
}

const userInput = await askForBirthday();

try {
  const date = parse(userInput);
  console.log(date);
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
