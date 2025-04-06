const calculate = operation => a => b => operation(a)(b);

const add = a => b => Number(a) + Number(b);
const subtract = a => b => Number(a) - Number(b);
const multiply = a => b => Number(a) * Number(b);
const divide = a => b => (Number(b) != 0) ? Number(a) / Number(b) : undefined;

const getVal = elemId => (<HTMLInputElement>document.getElementById(elemId)).value;
const setResult = elemId => result => document.getElementById(elemId).innerHTML = result;

const numpadNumbers = [
    { name: "numpad-zero", value: "0", },
    { name: "numpad-one", value: "1", },
    { name: "numpad-two", value: "2", },
    { name: "numpad-three", value: "3", },
    { name: "numpad-four", value: "4", },
    { name: "numpad-five", value: "5", },
    { name: "numpad-six", value: "6", },
    { name: "numpad-seven", value: "7", },
    { name: "numpad-eight", value: "8", },
    { name: "numpad-nine", value: "9", },
    { name: "numpad-period", value: ".", },
];

const createNumpadButtons = numpadNumbers => displayId => {
    if (numpadNumbers.length != 0) {
        return [getNumpadButton(numpadNumbers[0])(displayId)]
            .concat(createNumpadButtons(numpadNumbers.slice(1))(displayId));
    }
};

const getNumpadButton = numpadNumber => displayId => {
    const numpadButton = document.getElementById(numpadNumber.name);
    numpadButton.addEventListener("click", () => {
        const display = document.getElementById(displayId);
        display.innerHTML = setDisplayValue(numpadNumber.value)(display.innerHTML);
    });
    return numpadButton;
};

const setDisplayValue = numpadValue => displayValue => {
    return (addingSecondPeriod(numpadValue)(displayValue))
        ? displayValue
        : (displayValue + numpadValue).slice(0, 12);
}

const addingSecondPeriod = numpadValue => displayValue => {
    return numpadValue === "." && displayValue.indexOf(".") != -1
}

const numpadButtons = createNumpadButtons(numpadNumbers)("display");

const operationMaps = [
    { name: "addition", func: add, },
    { name: "subtraction", func: subtract, },
    { name: "multiplication", func: multiply, },
    { name: "division", func: divide, }
];

const createButtons = opMaps => getButton => setResult => resId => calc => getVal => a => b => {
    if (opMaps.length != 0) {
    return [getButton(opMaps[0])(setResult)(resId)(calc)(getVal)(a)(b)]
        .concat(createButtons(opMaps.slice(1))(getButton)(setResult)(resId)(calc)(getVal)(a)(b));
    }
}

const getButton = opMap => result => resId => calc => getVal => valAId => valBId => {
    const button = document.getElementById(opMap.name);
    button.addEventListener("click", () => {
        result(resId)(calc(opMap.func)(getVal(valAId))(getVal(valBId)));
    });
    return button;
}

const buttons = createButtons(operationMaps)(getButton)(setResult)("result")(calculate)(getVal)("firstValue")("secondValue");
