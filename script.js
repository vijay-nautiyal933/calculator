const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operation = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.textContent;

        if (action === 'number') {
            handleNumber(value);
        } else if (action === 'operation') {
            handleOperation(value);
        } else if (action === 'decimal') {
            handleDecimal();
        } else if (action === 'clear') {
            clear();
        } else if (action === 'delete') {
            deleteLast();
        } else if (action === 'calculate') {
            calculate();
        }

        updateDisplay();
    });
});

function handleNumber(value) {
    if (currentInput === '0' && value === '0') return;
    currentInput += value;
}

function handleOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result;
    operation = null;
    previousInput = '';
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}