const calculate = operation => a => b => operation(a)(b);

const add = a => b => Number(a) + Number(b);
const subtract = a => b => Number(a) - Number(b);
const multiply = a => b => Number(a) * Number(b);
const divide = a => b => (Number(b) != 0) ? Number(a) / Number(b) : undefined;

const getVal = elemId => (<HTMLInputElement>document.getElementById(elemId)).value;
const setResult = elemId => result => document.getElementById(elemId).innerHTML = result;

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

const createButton = opMaps => getButton => setResult => resId => calc => getVal => a => b => {
    if (opMaps.length != 0) {
    return [getButton(opMaps[0])(setResult)(resId)(calc)(getVal)(a)(b)]
        .concat(createButton(opMaps.slice(1))(getButton)(setResult)(resId)(calc)(getVal)(a)(b));
    }
}

const getButton = opMap => result => resId => calc => getVal => valAId => valBId => {
    const button = document.getElementById(opMap.name);
    button.addEventListener("click", () => {
        result(resId)(calc(opMap.func)(getVal(valAId))(getVal(valBId)));
    });
    return button;
}

const buttons = createButton(operationMaps)(getButton)(setResult)("result")(calculate)(getVal)("firstValue")("secondValue");
