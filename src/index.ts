const add = (a) => (b) => Number(a) + Number(b);
const subtract = (a) => (b) => Number(a) - Number(b);
const multiply = (a) => (b) => Number(a) * Number(b);
const divide = (a) => (b) => (Number(b) != 0) ? Number(a) / Number(b) : undefined;

const calculate = (operation) => (a, b) => operation(a, b);

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
    button.addEventListener("click", () => { result(calc(opMap.func)(a())(b())); });
    return button;
}

const createButton = (opMaps, button, result, calc, a, b) => {
    if (opMaps.length === 0) { return; };
    return [button(opMaps[0], result, calc, a, b)]
        .concat(createButton(opMaps.slice(1), button, result, calc, a, b));
}
const buttons = createButton(operationMaps, getButton, setResult, calculate, getA, getB);
