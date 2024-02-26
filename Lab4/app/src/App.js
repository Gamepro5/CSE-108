import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function CalcOp(props) {
  return (
    <Button variant="contained" onClick={() => props.operator_entered(props.operation)}>{props.operation}</Button>
  );
}

function CalcNum(props) {
  return (
    <Button variant="contained" onClick={() => props.number_entered(props.number)}>{props.number}</Button>
  );
}

let previous_operation = ""
let latest_number = ""
let equalJustPressed = false

let accept_num = true
let accept_operator = false
let accept_decimal = false
let accept_submit = false

let decimal_used = false

function Calculator() {
const [display, setDisplay] = useState("")

function num_enter() {
  if (decimal_used == false) {
    accept_decimal = true
  }
  accept_operator = true
  accept_num = true
  accept_submit = true
  equalJustPressed = false
}

function number_entered(num) {
  if (accept_num) {
    setDisplay(display + num);
    latest_number += num;
    num_enter()
  }
}

function op_enter() {
  accept_decimal = false
  accept_operator = false
  accept_num = true
  accept_submit = false;
  decimal_used = false;
  equalJustPressed = false;
}

function operator_entered(operation) {
    setDisplay(display + operation);
    latest_number = "";
    previous_operation = operation
    op_enter()
}

function dec_enter() {
  accept_decimal = false
  accept_operator = false
  accept_num = true
  decimal_used = true;
  accept_submit = false;
  equalJustPressed = false
}

function decimal_entered() {
  console.log(accept_decimal)
  if (accept_decimal) {
    setDisplay(display + ".");
    latest_number += "."
    dec_enter()
  }
}
function equalEnetered() {
  console.log(previous_operation, latest_number)
  if (accept_submit) {
    if (equalJustPressed) {
      setDisplay(eval(display+previous_operation+latest_number));
      num_enter()
    } else {
      setDisplay(eval(display));
      num_enter()
    }
    equalJustPressed = true;
  }
}
function clearEntered() {
    setDisplay("")
    latest_number = 0;
    accept_decimal = false;
    accept_num = true;
    accept_operator = false;
    accept_submit = false;
    decimal_used = false;
};
  return (
    <header>
      <div className="calculator-wrapper">
      <TextField id="outlined-basic" label="Calculator" variant="outlined" value={display} />
      
        <CalcNum  number_entered={number_entered} number="1"/>
        <CalcNum number_entered={number_entered} number="2"/>
        <CalcNum number_entered={number_entered} number="3"/>
        <CalcOp operator_entered={operator_entered} operation="/"/>

        <CalcNum number_entered={number_entered} number="4"/>
        <CalcNum number_entered={number_entered} number="5"/>
        <CalcNum number_entered={number_entered} number="6"/>
        <CalcOp operator_entered={operator_entered} operation="*"/>

        <CalcNum number_entered={number_entered} number="7"/>
        <CalcNum number_entered={number_entered} number="8"/>
        <CalcNum number_entered={number_entered} number="9"/>
        <CalcOp operator_entered={operator_entered} operation="-"/>

        
        <CalcNum number_entered={number_entered} number="0"/>
        <Button variant="contained" onClick={() => decimal_entered()}>.</Button>
        <Button variant="contained" onClick={() => equalEnetered()}>=</Button>
        <CalcOp operator_entered={operator_entered} operation="+"/>

        <Button variant="contained" onClick={() => clearEntered()}>CLEAR</Button>
      </div>
    </header>
  );
}

export default Calculator;
