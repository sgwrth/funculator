const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0) ? undefined : a / b;

const calculate = (operation, a, b) => operation(Number(a), Number(b));

const getA = () => (<HTMLInputElement>document.getElementById("firstValue")).value;
const getB = () => (<HTMLInputElement>document.getElementById("secondValue")).value
const setResult = (result) => document.getElementById("result").innerHTML = result;

const addButton = document.getElementById("addition");
addButton.addEventListener("click", () => { setResult(calculate(add, getA(), getB())); });

const subtractButton = document.getElementById("multiplication");
subtractButton.addEventListener("click", () => { setResult(calculate(subtract, getA(), getB())); });

const multiplyButton = document.getElementById("multiplication");
multiplyButton.addEventListener("click", () => { setResult(calculate(multiply, getA(), getB())); });

const divideButton = document.getElementById("division");
divideButton.addEventListener("click", () => { setResult(calculate(divide, getA(), getB())); });
