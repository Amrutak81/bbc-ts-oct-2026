const firstArray: Array<number | string> = [1, 2, 3];
// const newArray: (number | string)[] = [1, 2, 3];

firstArray.push("four");

console.log(firstArray);

const secondArray = [...firstArray];
secondArray.push("five");

console.log(firstArray);
console.log(secondArray);

const people = [{ name: "Stephen" }, { name: "Amruta" }, { name: "George" }];
// [0x123123, 0x123123, 0x123123, 0x123123]
const people2 = structuredClone(people); // copy.deepcopy
// const people2 = JSON.parse(JSON.stringify(people)); // copy.deepcopy

console.log(people2);
people2[0]!.name = "Oyin";

console.log(people2);
console.log(people);

const [a, b, ...rest] = people;

type FullMapped = {
  name: string;
  lengthOfName: number;
  company: string;
  language: string;
};

const mappedPeople = people
  .map<{ name: string; lengthOfName: number }>((person) => ({
    ...person,
    lengthOfName: person.name.length,
  }))
  .filter((person) => person.name !== "George")
  .map<FullMapped>((person) => ({
    ...person,
    company: "BBC",
    language: "TypeScript",
  }));

console.log(mappedPeople);
