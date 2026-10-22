import type { Person } from "./types.js";

const person: Person = {};

person.name = "Murali";
person.interested_in = "Automation frameworks";

type Axis = "x" | "y" | "z";

type Vector3 = {
  x: { value: number };
  y: { value: number };
  z: { value: number };
}; // {{x: 2}, {y: 3}, {z: 4}}

function getComponent(vector: Vector3, axis: Axis) {
  return vector[axis]["value"];
}

let vec = {
  x: { value: 10 },
  y: { value: 20 },
  z: { value: 30 },
};

let axis = "x";

axis;

if (axis === "x" || axis === "y" || axis === "z") {
  axis;
  getComponent(vec, axis);
}

// 1. Type the variable as axis
// 2. `as` casting the variable type - not typesafe by default
// 3. Make the initial variable a const
// 4. `as any` - opting out of the type system
// 5. using a typeguard
