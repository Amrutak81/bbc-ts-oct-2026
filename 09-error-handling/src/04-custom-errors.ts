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

type ErrorCodes = "E101" | "E102";

class InvalidDateError extends Error {
  public code: ErrorCodes;

  constructor(message: string, code: ErrorCodes = "E101") {
    super(message); // Error constructor
    this.code = code;
  }
}

function parse(birthday: string) {
  const date = new Date(birthday);
  if (isValidDate(date)) {
    return date;
  }

  throw new InvalidDateError(
    `Date format invalid (YYYY-MM-DD). You said '${birthday}'`,
    "E102",
  );
}

const userInput = await askForBirthday();

try {
  const date = parse(userInput);
  const now = new Date();

  if (now.getFullYear() - date.getFullYear() < 0) {
    throw new InvalidDateError("You're from the future!", "E102");
  }
} catch (error) {
  if (error instanceof InvalidDateError) {
    switch (error.code) {
      case "E101":
        console.log(error);
        console.log(error.message);
        break;
      case "E102":
        console.log("That date gives you a negative age");
        break;
      default:
        console.log("Something unexpect happened:");
    }
  } else if (error instanceof Error) {
    console.log("Something unexpected happened.");
  }
}
