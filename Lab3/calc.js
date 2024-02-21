let display = document.getElementById("calc-display")
let accept_num = true
let accept_operator = false
let accept_decimal = false
let accept_submit = false

let decimal_used = false

function number_entered() {
    if (decimal_used == false) {
        accept_decimal = true
    }
    accept_operator = true
    accept_num = true
    accept_submit = true
}

function operator_entered() {
    accept_decimal = false
    accept_operator = false
    accept_num = true
    accept_submit = false;
    decimal_used = false;
}

function decimal_entered() {
    accept_decimal = false
    accept_operator = false
    accept_num = true
    decimal_used = true;
    accept_submit = false;
}

document.getElementById("1").onclick = () => {
    if (accept_num) {
        display.innerHTML += `1`;
        number_entered()
    }
};
document.getElementById("2").onclick = () => {
    if (accept_num) {
        display.innerHTML += `2`;
        number_entered()
    }
};
document.getElementById("3").onclick = () => {
    if (accept_num) {
        display.innerHTML += `3`;
        number_entered()
    }
};
document.getElementById("4").onclick = () => {
    if (accept_num) {
        display.innerHTML += `4`;
        number_entered()
    }
};
document.getElementById("5").onclick = () => {
    if (accept_num) {
        display.innerHTML += `5`;
        number_entered()
    }
};
document.getElementById("6").onclick = () => {
    if (accept_num) {
        display.innerHTML += `6`;
        number_entered()
    }
};
document.getElementById("7").onclick = () => {
    if (accept_num) {
        display.innerHTML += `7`;
        number_entered()
    }
};
document.getElementById("8").onclick = () => {
    if (accept_num) {
        display.innerHTML += `8`;
        number_entered()
    }
};
document.getElementById("9").onclick = () => {
    if (accept_num) {
        display.innerHTML += `9`;
        number_entered()
    }
};
document.getElementById("0").onclick = () => {
    if (accept_num) {
        display.innerHTML += `0`;
        number_entered()
    }
};
document.getElementById(".").onclick = () => {
    if (accept_decimal) {
        display.innerHTML += `.`;
        decimal_entered()
    }
};
document.getElementById("/").onclick = () => {
    if (accept_operator) {
        display.innerHTML += `/`;
        operator_entered()
    }
};
document.getElementById("*").onclick = () => {
    if (accept_operator) {
        display.innerHTML += `*`;
        operator_entered()
    }
};
document.getElementById("+").onclick = () => {
    if (accept_operator) {
        display.innerHTML += `+`;
        operator_entered()
    }
};
document.getElementById("-").onclick = () => {
    if (accept_operator) {
        display.innerHTML += `-`;
        operator_entered()
    }
};
document.getElementById("=").onclick = () => {
    if (accept_submit) {
        display.innerHTML = eval(display.innerHTML);
        number_entered()
    }
};
document.getElementById("clear").onclick = () => {
    display.innerHTML = ``;
    accept_decimal = false;
    accept_num = true;
    accept_operator = false;
    accept_submit = false;
    decimal_used = false;
};