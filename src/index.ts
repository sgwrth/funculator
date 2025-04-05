const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0) ? undefined : a / b;

const calculate = (operation, a, b) => operation(Number(a), Number(b));

const getA = () => (<HTMLInputElement>document.getElementById("firstValue")).value;
const getB = () => (<HTMLInputElement>document.getElementById("secondValue")).value
const setResult = (result) => document.getElementById("result").innerHTML = result;

const operationMaps = [
    {
        name: "addition",
        func: add,
    },
    {
        name: "subtraction",
        func: subtract,
    },
    {
        name: "multiplication",
        func: multiply,
    },
    {
        name: "division",
        func: divide,
    }
];

const getButton = (opMap, result, calc, a, b) => {
    const button = document.getElementById(opMap.name);
    button.addEventListener("click", () => { result(calc(opMap.func, a(), b())); });
    return button;
}

const createButton = (opMaps, button, result, calc, a, b) => {
    if (opMaps.length === 0) { return; };
    return [button(opMaps[0], result, calc, a, b)]
        .concat(createButton(opMaps.slice(1), button, result, calc, a, b));
}
const buttons = createButton(operationMaps, getButton, setResult, calculate, getA, getB);
