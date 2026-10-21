// ECMAScript
// 2015 -> ES6 -> ES2015  <- let, const, Promises, arrow functions, string literals
// 2016 -> ES7 -> ES2016
// 2017 -> ES8 -> ES2017  <- async/await
// 2018 -> ES2018  <- rest/spread for objects, asynchronous iteration

import type { Url } from "node:url";

// 1. Default Parameters

function areaOfRect(length = 1, width = length) {
  return length * width;
}

console.log(areaOfRect());
console.log(areaOfRect(3));
console.log(areaOfRect(3, 4));

// 2. Template Literals

const name = "Olamide";
const team = "Mobile";
const role = "Grad Trainee";

console.log(`Hello ${name}, how is being a ${role} on the ${team} team?`);

type Greeting = "Hello" | "Bonjour" | "Gutentag";
let greeting: Greeting = "Gutentag";

type Target = "World" | "Planet" | "Universe";

type GreetOptions = `${Greeting} ${Target}`;

type Area = "news" | "sport" | "iplayer";
type ValidUrls = `https://${Area}.bbc.co.uk`;
type NewUrls = `https://bbc.co.uk/${Area}`;

type LangCode = "en" | "fr" | "ar";
type ValidUrl = `https://${LangCode}.bbc.co.uk`;
type ValidUrl2 = `https://bbc.co.uk/${LangCode}/${Area}`;

// 3. Arrow Functions

type ThemeColor = "red" | "black";

function AccordionComponent(
  name: string,
  content: string[],
  color: ThemeColor,
  followOnButton: Url,
) {}

type ArrowAccordionType = (
  name: string,
  content: string[],
  color: ThemeColor,
  followOnButton: Url,
) => string;

const ArrowAccordionComponent: ArrowAccordionType = (
  name,
  content,
  color,
  followOnButton,
) => {
  return "Hello";
};

// 4. var => let/const

function simulateDom() {
  const pseudoDom = {
    button1: { click: () => "" },
    button2: { click: () => "" },
    button3: { click: () => "" },
  };
  for (let i = 1; i <= 3; i++) {
    // not block-scoped
    // @ts-expect-error
    const element = pseudoDom[`button${i}`];
    element.click = function () {
      return `Item ${i} is clicked.`; // {1,2,3}, {nothing}, {123,123,123}, {null, null, null}
    };
  }
  console.log(pseudoDom.button1.click());
  console.log(pseudoDom.button2.click());
  console.log(pseudoDom.button3.click());
}

simulateDom();
