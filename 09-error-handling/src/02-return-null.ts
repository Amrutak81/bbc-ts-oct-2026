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

function parse(birthday: string) {
  const date = new Date(birthday);
  if (isValidDate(date)) {
    return date;
  }
  return null;
}

const userInput = await askForBirthday();
const date = parse(userInput);

if (date) {
  console.log(date);
  console.log(`Your birthday is ${date.toISOString()}`);
} else {
  console.log("Sorry. You need to give the date in the form YYYY-MM-DD");
}
