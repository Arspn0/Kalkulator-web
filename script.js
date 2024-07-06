let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const output = document.querySelector('.output');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    output.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }

            flushOperation(parseInt(buffer.split(previousOperator)[1]));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    if (previousOperator !== null) {
        flushOperation(parseInt(buffer.split(previousOperator)[1]));
    } else {
        runningTotal = parseInt(buffer);
    }

    previousOperator = symbol;
    buffer += ` ${symbol} `;
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
        case '÷':
            runningTotal /= intBuffer;
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.bagian-tombol').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();