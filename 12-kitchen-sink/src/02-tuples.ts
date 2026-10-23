// Tuples -> [1,2]

const coord: [number, number, boolean?] = [1, 3];
// number[]

type Point = readonly [number, number];

const origin: Point = [0, 0];

const data: Array<string | number> = [];

const userTuple: [string, number, ...string[]] = ["Kevin", 1234, "", "", ""];
