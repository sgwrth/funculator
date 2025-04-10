const calculate = operation => a => b => operation(a)(b);

const add = a => b => Number(a) + Number(b);
const subtract = a => b => Number(a) - Number(b);
const multiply = a => b => Number(a) * Number(b);
const divide = a => b => (b != "0") ? Number(a) / Number(b) : undefined;

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
    // { name: "numpad-period", value: ".", },
];

const numpadOperations = [
    { name: "numpad-plus", function: add, },
    { name: "numpad-minus", function: subtract, },
    { name: "numpad-times", function: multiply, },
    { name: "numpad-by", function: divide, },
];

const initialCalcState = {
    firstValue: "",
    secondValue: "",
    awaitingSecondValue: false,
    operation: null,
    display: "",
};

const inputValue = (state, value) => {
    if (!state.awaitingSecondValue) {
        return {
            ...state,
            firstValue: state.firstValue + value,
            display: state.firstValue + value,
        }
    }
    if (state.awaitingSecondValue) {
        return {
            ...state,
            secondValue: state.secondValue + value,
            display: state.secondValue + value,
        }
    }
    return {
        ...state,
    }
};

const setOperation = (state, operation) => {
    return {
        ...state,
        operation: operation.function,
        awaitingSecondValue: true,
        display: "",
    }
};

const updateDisplay = (state, display) => {
    display.innerHTML = state.display;
};

const showResult = (state, display) => {
    display.innerHTML = String(state.operation(state.firstValue)(state.secondValue));
};

let calcState = initialCalcState;

const equalsButton = document.getElementById("numpad-equals");
equalsButton.addEventListener("click", () => {
    showResult(calcState, display);
    calcState = initialCalcState;
});

const createNumpadOperationButtons = display => numpadOperations => {
    if (numpadOperations.length != 0) {
        return [getNumpadOperationButton(display)(numpadOperations[0])]
            .concat(createNumpadOperationButtons(display)(numpadOperations.slice(1)));
    }
}

const getNumpadOperationButton = display => numpadOperation => {
    const button = document.getElementById(numpadOperation.name);
    button.addEventListener("click", () => {
        calcState = setOperation(calcState, numpadOperation);
        updateDisplay(calcState, display);
    });
    return button;
}

const getValueAndOperation = displayValue => operation => {
    return [displayValue, operation];
}

const createNumpadButtons = numpadNumbers => display => {
    if (numpadNumbers.length != 0) {
        return [getNumpadButton(numpadNumbers[0])(display)]
            .concat(createNumpadButtons(numpadNumbers.slice(1))(display));
    }
};

const getNumpadButton = numpadNumber => display => {
    const numpadButton = document.getElementById(numpadNumber.name);
    numpadButton.addEventListener("click", () => {
        calcState = inputValue(calcState, numpadNumber.value);
        updateDisplay(calcState, display);
    });
    return numpadButton;
};

const display = document.getElementById("display");

const numpadButtons = createNumpadButtons(numpadNumbers)(display);
const numpadOperationButtons = createNumpadOperationButtons(display)(numpadOperations);

