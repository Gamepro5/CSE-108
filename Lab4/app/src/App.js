import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function CalcOp(props) {
  return (
    <a className="button" onClick={() => props.operator_entered(props.operation)}><span>{props.operation}</span></a>
  );
}

function CalcNum(props) {
  return (
    <a className="button" onClick={() => props.number_entered(props.number)}><span>{props.number}</span></a>
  );
}

let previous_operation = ""
let latest_number = ""

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
}

function operator_entered(operation) {
    setDisplay(display + operation);
    latest_number = "";
    op_enter()
}

function dec_enter() {
  accept_decimal = false
  accept_operator = false
  accept_num = true
  decimal_used = true;
  accept_submit = false;
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
  if (accept_submit) {
    if (latest_number != "") {
      setDisplay(eval(display+latest_number));
      console.log("HI")
      num_enter()
    } else {
      setDisplay(eval(display));
      num_enter()
    }
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
      <div className="calc-display">{display}</div>
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
        <a className="button" onClick={() => decimal_entered()}><span>.</span></a>
        <a className="button" onClick={() => equalEnetered()}><span>=</span></a>
        <CalcOp operator_entered={operator_entered} operation="+"/>

        <a className="button" onClick={() => clearEntered()}><span>CLEAR</span></a>
      </div>
    </header>
  );
}

export default Calculator;
