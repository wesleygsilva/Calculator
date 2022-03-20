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

const getValue = value => {
    input.value == 0 ? (input.value = value) : (input.value = input.value + value) ;
};

const clearDisplay = () => {
    input.value = 0;
};

const clearAll = () => {
    input.value = 0;
    boxResult.value = '';
};

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
    getValue(e.target.value);
});

btn2.addEventListener("click",  e => {
    getValue(e.target.value);
});

btn3.addEventListener("click",  e => {
    getValue(e.target.value);
});

btn4.addEventListener("click",  e => {
    getValue(e.target.value);
});

btn5.addEventListener("click",  e => {
    getValue(e.target.value);
});

btn6.addEventListener("click",  e => {
    getValue(e.target.value);
});

btn7.addEventListener("click",  e => {
    getValue(e.target.value);
});

btn8.addEventListener("click",  e => {
    getValue(e.target.value);
});

btn9.addEventListener("click",  e => {
    getValue(e.target.value);
});

virgula.addEventListener("click",  e => {
    getValue(e.target.value);
});

const execSum = (value1, value2) => {
    return value1 + value2;
};

const execSubtract = (value1, value2) => {
    return value1 - value2;
};

const execMultiply = (value1, value2) => {
    return value1 * value2;
};

const execDivide = (value1, value2) => {
    if (value2 === 0) {
        return `Cannot divide by zero`;
    } else {
        return value1 / value2;
    }
};

const execOperation = (getInfoCalc) => {
    switch (getInfoCalc.operator) {
        case '+':
            return execSum(parseFloat(getInfoCalc.firstValue), parseFloat(getInfoCalc.secondValue)); 
        case '-':
            return execSubtract(parseFloat(getInfoCalc.firstValue), parseFloat(getInfoCalc.secondValue)); 
        case 'x':
            return execMultiply(parseFloat(getInfoCalc.firstValue), parseFloat(getInfoCalc.secondValue)); 
        case '/':
            return execDivide(parseFloat(getInfoCalc.firstValue), parseFloat(getInfoCalc.secondValue)); 
        case '%':
            return '';
        default:
            console.log('Erro: Operação inválida');
    }
};

const getOperation = operation => {
    let getInfoCalc = {
        operator: '',
        firstValue: 0,  
        secondValue: 0
    }

    if (operation == '=') {
        if (boxResult.value !== '') {
            let operator = boxResult.value[boxResult.value.length - 1];
            let array = ['+', '-', 'x', '/', '%'];
            let index = array.indexOf(operator);

            if ((index !== -1)) {
                getInfoCalc.operator    = operator;
                getInfoCalc.firstValue  = boxResult.value.substring(0, boxResult.value.indexOf(' '));
                getInfoCalc.secondValue = input.value;
                
                boxResult.value = execOperation(getInfoCalc);
                clearDisplay();
            }
        }
    } else {  
        let operator = boxResult.value[boxResult.value.length - 1];
        //routine for exec operation before the main operation
        if ((operator !== undefined) && (operator !== operation)) {
            let array = ['+', '-', 'x', '/', '%'];
            let index = array.indexOf(operator);

            if ((index !== -1)) {
                getInfoCalc.operator    = operator;
                getInfoCalc.firstValue  = boxResult.value.substring(0, boxResult.value.indexOf(' '));
                getInfoCalc.secondValue = input.value;
            
                getInfoCalc.operator = operator;
                let firstValue = boxResult.value.substring(0, boxResult.value.indexOf(' ')); 

                if (firstValue !== '') {
                    getInfoCalc.firstValue = firstValue;
                } else if (boxResult.value !== '') {
                    getInfoCalc.firstValue = boxResult.value;    
                }
        
                if (input.value !== '0') {
                    getInfoCalc.secondValue = input.value;   
                }

                boxResult.value = execOperation(getInfoCalc);

                if ((operation == 'x') || (operation == '/')) {
                    input.value = 1;        
                } else {
                    clearDisplay();   
                }
            } else {
                boxResult.value = `${boxResult.value} ${operation}`;  
                return false; 
            }
        }

        getInfoCalc.operator = operation;
        let firstValue = boxResult.value.substring(0, boxResult.value.indexOf(' ')); 

        if (firstValue !== '') {
            getInfoCalc.firstValue = firstValue;
        } else if (boxResult.value !== '') {
            getInfoCalc.firstValue = boxResult.value;    
        }

        getInfoCalc.secondValue = input.value;   

        // if (input.value !== '0') {
        //     getInfoCalc.secondValue = input.value;   
        // }

        boxResult.value = `${execOperation(getInfoCalc).toString().replace(".", ",")} ${operation}`;
        clearDisplay();
    }
};

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

const init = () => {
    clearDisplay();
};

init();






