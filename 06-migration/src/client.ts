import { getArea, makeShape, shapes } from "./shape.js";

makeShape("circle", { radius: 4 });
makeShape("rectangle", { length: 7, width: 4 });
makeShape("square", { width: 5 });
makeShape("rightTriangle", { base: 9, height: 4 });

for (let shape of shapes) {
  getArea(shape);
  console.log(shape);
}

let total = 0;
for (let shape of shapes) {
  if (shape.area) {
    total = total + shape.area;
  }
}
console.log("Total area: " + total);
