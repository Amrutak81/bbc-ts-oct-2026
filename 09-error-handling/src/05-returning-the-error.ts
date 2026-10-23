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

class InvalidDateError extends Error {}

function parse(birthday: string) {
  const date = new Date(birthday);
  if (isValidDate(date)) {
    return date;
  }

  return new InvalidDateError(
    `Date format invalid (YYYY-MM-DD). You said '${birthday}'`,
  );
}

const userInput = await askForBirthday();

const date = parse(userInput);

if (date instanceof InvalidDateError) {
  const error = date;
  console.log(error);
  console.log(error.message);
} else {
  console.log(date);
  console.log(`Your birthday is ${date.toISOString()}`);
}
