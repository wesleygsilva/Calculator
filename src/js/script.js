//Operations' Results
let boxResult = document.querySelector('#box-result');
let input     = document.querySelector('#input');

//Actions
const clearEntry = document.querySelector('#clear-entry');
const clear      = document.querySelector('#clear');
const equal      = document.querySelector('#equal');
const del        = document.querySelector('#delete');

//Operations
const percent   = document.querySelector('#percent');
const sum       = document.querySelector('#sum');
const subtract  = document.querySelector('#subtract');
const multiply  = document.querySelector('#multiply');
const divide    = document.querySelector('#divide');

//Numbers
const btn0  = document.querySelector('#btn0');
const btn1  = document.querySelector('#btn1');
const btn2  = document.querySelector('#btn2');
const btn3  = document.querySelector('#btn3');
const btn4  = document.querySelector('#btn4');
const btn5  = document.querySelector('#btn5');
const btn6  = document.querySelector('#btn6');
const btn7  = document.querySelector('#btn7');
const btn8  = document.querySelector('#btn8');
const btn9  = document.querySelector('#btn9');
const virgula  = document.querySelector('#virgula');

//Get digited values (only numbers and virgula)
const getValue = value => {  
    let oldValue = input.value;

    if (value == ',') {
        if (input.value.indexOf(',') == -1) {
            input.value = input.value + ',';
        }
    } else if (input.value == boxResult.value.substring(0, boxResult.value.indexOf(' '))) {
        input.value = value; 
    }else {
        input.value = input.value + value ;   
    }
    
    if (oldValue == '0') {
        if (value !== ',') {
            input.value = value;
        } 
    } 
};

//Clear the input display
const clearDisplay = () => {
    input.value = 0;
};

//Clear all displays
const clearAll = () => {
    input.value = 0;
    boxResult.value = '';
};

//Event Listeners
clear.addEventListener("click", e => {
    clearAll();
});

clearEntry.addEventListener("click", e => {
    clearDisplay();
});

btn0.addEventListener("click",  e => {
    getValue(e.target.value);
});

btn1.addEventListener("click",  e => {
    restartOperation();
    getValue(e.target.value);
});

btn2.addEventListener("click",  e => {
    restartOperation();
    getValue(e.target.value);
});

btn3.addEventListener("click",  e => {
    restartOperation();
    getValue(e.target.value);
});

btn4.addEventListener("click",  e => {
    restartOperation();
    getValue(e.target.value);
});

btn5.addEventListener("click",  e => {
    restartOperation();
    getValue(e.target.value);
});

btn6.addEventListener("click",  e => {
    restartOperation();
    getValue(e.target.value);
});

btn7.addEventListener("click",  e => {
    restartOperation();
    getValue(e.target.value);
});

btn8.addEventListener("click",  e => {
    restartOperation();
    getValue(e.target.value);
});

btn9.addEventListener("click",  e => {
    restartOperation();
    getValue(e.target.value);
});

virgula.addEventListener("click",  e => {
    getValue(e.target.value);
});
//Event Listeners

//Change value , by . to calc values
const replaceValues = (value) => {
    if (value == '') {
        value = 0;
    }

    return value.toString().replace(',', '.');
}

//Return just 2 decimal places
const roundToTwo = (number) => {
    return +(Math.round(number + "e+2")  + "e-2");
}

//Main function to proccess values
const execOperation = (getInfoCalc) => {
    let firstValue = replaceValues(getInfoCalc.firstValue);
    let secondValue = replaceValues(getInfoCalc.secondValue);

    let result = 0;

    switch (getInfoCalc.operator) {
        case '+':
            result = parseFloat(firstValue) + parseFloat(secondValue);
            break;
        case '-':
            result = parseFloat(firstValue) - parseFloat(secondValue);
            break;
        case 'x':
            result = parseFloat(firstValue) * parseFloat(secondValue);
            break;
        case '/':
            if (parseFloat(secondValue) == 0) {
                return `Cannot divide by zero`;
            } else {
                result = parseFloat(firstValue) / parseFloat(secondValue);
            } 
            break;
        case '%':
            return '';
        default:
            '';
    }

    return (roundToTwo(result)).toString().replace(".", ",");
};

//Calc percent value
const setPercentValue = () => {
    if (boxResult.value == '') {
        boxResult.value = 0;
    }

    let inputValue = replaceValues(input.value);
    let boxResultValue = replaceValues(boxResult.value);

    input.value = roundToTwo((parseFloat(boxResultValue) / 100) * parseFloat(inputValue)).toString().replace(".", ",");
};

//put info to calc values
const setValuesInfoCalc = (operator, firstValue, secondValue) => {
    let getInfoCalc = {
        operator: '',
        firstValue: 0,  
        secondValue: 0
    }
    
    getInfoCalc.operator    = operator;
    getInfoCalc.firstValue  = firstValue;
    getInfoCalc.secondValue = secondValue;

    return getInfoCalc;
};

//Return index of array with operations
const returnIndex = () => {
    let operator = boxResult.value[boxResult.value.length - 1];
    let array = ['+', '-', 'x', '/', '%'];
    let index = array.indexOf(operator);

    return index;
};

//Clean all display case boxResult <> '' and input.value = 0
const restartOperation = () => {
    if ((boxResult.value !== '') && (input.value == '0')) { 
        if ((returnIndex() == -1)) {
            input.value = '';
            boxResult.value = '';  
        }   
    }
}

//Calcs equal calc
const setEqualOperation = (operator) => {
    if (boxResult.value !== '') {
        if ((returnIndex() !== -1)) {

            let getInfoCalc = setValuesInfoCalc(operator, 
                                                boxResult.value.substring(0, boxResult.value.indexOf(' ')),
                                                input.value);
            
            let resultValue = execOperation(getInfoCalc);
            boxResult.value = resultValue;

            if (resultValue !== 'Cannot divide by zero') {
                input.value = resultValue;
            }
        }
    }
};

//Validations about infoCalc object
const prepareInfoCalc = (operation) => {
    let getInfoCalc = setValuesInfoCalc(operation, 
                                        boxResult.value.substring(0, boxResult.value.indexOf(' ')),
                                        input.value);

    if (getInfoCalc.firstValue !== '') {
        getInfoCalc.secondValue = input.value; 
    } else if (boxResult.value !== '') {
        getInfoCalc.firstValue = boxResult.value; 
        getInfoCalc.secondValue = input.value;    
    } else if (operation == 'x') {
        getInfoCalc.firstValue = 1;
        getInfoCalc.secondValue = input.value; 
    } else if (operation == '/') {
        getInfoCalc.secondValue = 1;
        getInfoCalc.firstValue = input.value;
    } else if ((operation == '-') && (boxResult.value == '')) {
        input.value = input.value * -1;
        getInfoCalc.secondValue = input.value; 
    } else {
        getInfoCalc.secondValue = input.value; 
    }

    return getInfoCalc;
};

//calcs normal operations
const setValueOperation = (operation) => {
    let operator = boxResult.value[boxResult.value.length - 1];

    if ((operator !== undefined) && (operator !== operation)) {
        if ((returnIndex() !== -1)) {
            let getInfoCalc = setValuesInfoCalc(operator, 
                                                boxResult.value.substring(0, boxResult.value.indexOf(' ')),
                                                input.value);
            
            if (boxResult.value !== '') {
                getInfoCalc.firstValue = boxResult.value;    
            }
    
            if (input.value !== '0') {
                getInfoCalc.secondValue = input.value;   
            }

            boxResult.value = execOperation(getInfoCalc);

            input.value = boxResult.value;
            boxResult.value = `${boxResult.value} ${operation}`;
        } else {
            boxResult.value = `${boxResult.value} ${operation}`;  
            return false; 
        }
    } else {
        let getInfoCalc = prepareInfoCalc(operation);input.value = boxResult.value;
        let resultValue = execOperation(getInfoCalc);
        
        input.value = resultValue;
        boxResult.value = `${resultValue} ${operation}`;
    }
};

//Prepare operation to calc values
const getOperation = operation => {
    try {
        if (operation == '=') {
            setEqualOperation(boxResult.value[boxResult.value.length - 1]);    
        } else if (operation == '%') {
            setPercentValue(operation); 
        } else {  
            setValueOperation(operation);        
        }
    } catch(error) {
        alert(error) 
    }
};

//Delete just 1 char of input display
const deleteChar = (value) => {
    if (input.value !== '0') {
        input.value = input.value.slice(0, -1);
    }

    if (input.value == '') {
        input.value = 0;
    }
}

//Event Listeners
sum.addEventListener("click", e => {
    getOperation(e.target.value);
});

subtract.addEventListener("click", e => {
    getOperation(e.target.value);
});

multiply.addEventListener("click", e => {
    getOperation(e.target.value);
});

divide.addEventListener("click", e => {
    getOperation(e.target.value);
});

percent.addEventListener("click", e => {
    getOperation(e.target.value);
});

equal.addEventListener("click", e => {
    getOperation(e.target.value);
});

del.addEventListener("click", e => {
    deleteChar(e.target.value);
});
//Event Listeners

//Keyboard Listeners
document.addEventListener("keydown", e => {
    switch (e.keyCode) {
        case 46:
            clearEntry.click();
            break;
        case 8:
            del.click();
            break;
        case 27:
            clear.click();
            break;
        case 111:
            divide.click();
            break;
        case 106:
            multiply.click();
            break;
        case 109:
            subtract.click();
            break;
        case 107:
            sum.click();
            break;
        case 110:
            virgula.click();
            break;
        case 194:
            virgula.click();
            break;
        case 13:
            equal.click();
            break;
        default:
            '';
    }

    if (e.shiftKey && e.which === 53) { 
        percent.click();
    }
});

document.addEventListener("keypress", e => {
    switch (e.keyCode) {
        case 48:
            btn0.click();
            break;
        case 49:
            btn1.click();
            break;
        case 50:
            btn2.click();
            break;
        case 51:
            btn3.click();
            break;
        case 52:
            btn4.click();
            break;
        case 53:
            btn5.click();
            break;
        case 54:
            btn6.click();
            break;
        case 55:
            btn7.click();
            break;
        case 56:
            btn8.click();
            break;
        case 57:
            btn9.click();
            break;
        default:
            '';
    }
});
//Keyboard Listeners

//start cleanning display
const init = () => {
    clearDisplay();
};

init();






