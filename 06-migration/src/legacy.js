var PI = Math.PI;

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

var shapes = [];

function makeShape(type, props) {
	var shape = { type: type };
	for (var key in props) {
		shape[key] = props[key];
	}
	shapes.push(shape);
	return shape;
}

var circle = makeShape("circle", { radius: 4 });
var rectangle = makeShape("rectangle", { length: 7, width: 4 });
var square = makeShape("square", { width: 5 });
var rightTriangle = makeShape("rightTriangle", { base: 9, height: 4 });

for (var i = 0; i < shapes.length; i++) {
	getArea(shapes[i]);
	console.log(shapes[i]);
}

var total = 0;
for (var j = 0; j < shapes.length; j++) {
	total = total + shapes[j].area;
}
console.log("Total area: " + total);
