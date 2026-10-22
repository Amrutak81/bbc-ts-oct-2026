// @ts-check

const PI = Math.PI;

/**
 * @param { number } radius 
 * @returns 
 */
function getCircleArea(radius) {
	return radius * radius * PI;
}


function getRectangleArea(length, width) {
	return length * width;
}

function getSquareArea(width) {
	return getRectangleArea(width, width);
}

function getRightTriangleArea(base, height) {
	return (base * height) / 2;
}

function getArea(shape) {
	if (shape.type === "circle") {
		shape.area = getCircleArea(shape.radius);
	} else if (shape.type === "rectangle") {
		shape.area = getRectangleArea(shape.length, shape.width);
	} else if (shape.type === "square") {
		shape.area = getSquareArea(shape.width);
	} else if (shape.type === "rightTriangle") {
		shape.area = getRightTriangleArea(shape.base, shape.height);
	}
}

const shapes = [];

function makeShape(type, props) {
	const shape = { type: type };
	for (let key in props) {
		shape[key] = props[key];
	}
	shapes.push(shape);
	return shape;
}

const circle = makeShape("circle", { radius: 4 });
const rectangle = makeShape("rectangle", { length: 7, width: 4 });
const square = makeShape("square", { width: 5 });
const rightTriangle = makeShape("rightTriangle", { base: 9, height: 4 });

for (let shape of shapes) {
	getArea(shape);
	console.log(shape);
}

let total = 0;
for (let shape of shapes) {
	total = total + shape.area;
}
console.log("Total area: " + total);
