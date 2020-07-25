let apples: number = 5;
let speeed: string = "fast";
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// built in objects
let now: Date = new Date();

//Array
let colors: string[] = ["red", "green", "blue"];
let myNumbers: number[] = [1, 2, 3];
let truth: boolean[] = [true, true, false];

//Classes
class Car {}

let car: Car = new Car();

//Objects literal

let point: { x: number; y: number } = {
  // tellting the type of dat inside the object
  x: 10,
  y: 20,
};

// function
const logNumber: (i: number) => void = (i: number) => {
  // a function with annotatio, i is a number and the function doesnt return
  console.log(i);
};

// When to use annotations
// 1) Function that return any type

const json = '{"x":10, "y":20}';
const coordiantes = JSON.parse(json);
console.log(coordiantes);
