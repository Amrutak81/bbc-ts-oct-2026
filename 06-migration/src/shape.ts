import type { ValidShapes, ValidShapeNames, PropsFor } from "./shape.types.js";

const PI = Math.PI;

function getCircleArea(radius: number) {
  return radius * radius * PI;
}

function getRectangleArea(length: number, width: number) {
  return length * width;
}

function getSquareArea(width: number) {
  return getRectangleArea(width, width);
}

function getRightTriangleArea(base: number, height: number) {
  return (base * height) / 2;
}

export function getArea(shape: ValidShapes) {
  if (shape.type === "circle") {
    shape.area = getCircleArea(shape.radius);
  } else if (shape.type === "rectangle") {
    shape.area = getRectangleArea(shape.length, shape.width);
  } else if (shape.type === "square") {
    shape.area = getSquareArea(shape.width);
  } else if (shape.type === "rightTriangle") {
    shape.area = getRightTriangleArea(shape.base, shape.height);
  } else {
    throw new Error("Unknown shape");
  }
}

export const shapes: Array<ValidShapes> = [];

export function makeShape<T extends ValidShapeNames>(
  type: T,
  props: PropsFor<T>,
) {
  const shape = { type: type, ...props } as Extract<ValidShapes, { type: T }>;
  shapes.push(shape);
  return shape;
}
