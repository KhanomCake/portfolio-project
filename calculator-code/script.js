const displayBox = document.getElementById("display-box");
const displayTop = document.getElementById("display-top");

displayBox.innerText = "0"; // แสดงผลลัพธ์เริ่มต้น

let currentValue = "0"; // เก็บตัวเลขที่กำลังกด
let total = 0;         // เก็บผลรวมที่บวกไปแล้ว
let lastOperator = null;
let isWaitingForNextNumber = false; // ใช้เพื่อตรวจสอบว่ากำลังรอการกดตัวเลขถัดไปหรือไม่

function clickOnNumber(num) {
  if (hasSummarizeTag()) {
    clearAll(); // ถ้ามีการคำนวณแล้ว ให้ล้างค่าทั้งหมดก่อนเริ่มใหม่
    currentValue = "0"; // รีเซ็ต currentValue เมื่อเริ่มการคำนวณใหม่
    displayBox.innerText = currentValue; // แสดงผลลัพธ์เป็น 0
  }
  if (isWaitingForNextNumber) {
    isWaitingForNextNumber = false;
    currentValue = "0"; // รีเซ็ต currentValue เมื่อเริ่มการคำนวณใหม่
    displayBox.innerText = currentValue; // แสดงผลลัพธ์เป็น 0
  }
  if (num === "0" && currentValue === "0") return;
  if (num === "." && currentValue === "") {
    currentValue = "0.";
    displayBox.innerText = currentValue;
    return;
  }
  if (num === "." && currentValue.includes(".")) return;
  if (currentValue.length >= 11) return;

  if (currentValue === "0" && num !== ".") {
    currentValue = num; // ถ้าเป็น 0 ให้แทนที่ด้วยตัวเลข
  } else {
    currentValue += num; // ถ้าไม่ใช่ 0 ให้ต่อท้ายตัวเลข
  }

  displayBox.innerText = currentValue;
}

function clickPlus() {
  if (isWaitingForNextNumber) {
    if (lastOperator !== '+') {
      changeOperator('+');
    }
    return;
  }

  addNumber(currentValue);

  prepareForNextAction("+");
}

function clickMinus() {
  if (isWaitingForNextNumber) {
    if (lastOperator !== '-') {
      changeOperator('-');
    }
    return;
  }

  subtractNumber(currentValue);

  prepareForNextAction("-");
}

function clickMultiply() {
  if (isWaitingForNextNumber) {
    if (lastOperator !== '*') {
      changeOperator('*');
    }
    return;
  }

  multiplyNumber(currentValue);

  prepareForNextAction("*");
}

function clickDivide() {
  if (isWaitingForNextNumber) {
    if (lastOperator !== '/') {
      changeOperator('/');
    }
    return;
  }

  divideNumber(currentValue);

  prepareForNextAction("/");
}

function addNumber(currentValue) {
  let number = parseFloat(currentValue);
  if (isNaN(total)) {
    total = number;
  } else if (hasSummarizeTag()) {
    // do nothing and pass for next action
  } else {
    total += number;
  }
}

function subtractNumber(currentValue) {
  let number = parseFloat(currentValue);

  if (isNaN(total)) {
    total = number;
  } else if (hasSummarizeTag()) {
    // do nothing and pass for next action
  } else {
    total -= number;
  }
}

function multiplyNumber(currentValue) {
  let number = parseFloat(currentValue);
  if (total === 0 && displayTop.innerText === "") {
    total = number;
  } else if (hasSummarizeTag()) {
    // do nothing and pass for next action
  } else {
    total *= number;
  }
}

function divideNumber(currentValue) {
  let number = parseFloat(currentValue);
  if (number === 0) {
    clearAll();
    displayBox.innerText = "Error: Division by zero";
    return;
  }
  if (isNaN(number)) return; // ✅ ถ้าไม่ใช่ตัวเลข ให้หยุดเลย

  // ตั้งค่าเริ่มต้นให้ total ถ้ายังไม่มีการคำนวณมาก่อน
  if (total === 0 && displayTop.innerText === "") {
    total = number;
  } else if (hasSummarizeTag()) {
    // do nothing and pass for next action
  } else {
    total /= number;
  }
}

function prepareForNextAction(operator) {
  lastOperator = operator;
  displayTop.innerText = total + operatorToSymbol(operator);
  displayBox.innerText = total;
  currentValue = displayBox.innerText;
  isWaitingForNextNumber = true; // ตั้งค่าว่ากำลังรอการกดตัวเลขถัดไป
}

function changeOperator(currentOperator) {
  // calculateResult();
  lastOperator = currentOperator;
  displayTop.innerText = total + operatorToSymbol(lastOperator);
}

function operatorToSymbol(operator) {
  switch (operator) {
    case "+":
      return " +";
    case "-":
      return " -";
    case "*":
      return " ×";
    case "/":
      return " ÷";
    default:
      return "";
  }
}

function hasSummarizeTag() {
  if (displayTop.innerText.includes("=")) {
    return true;
  } else {
    return false;
  }
}

function clearCurrentValue() {
  currentValue = "0";
}

function clearTotal() {
  total = 0;
}

function clearInputDisplay() {
  displayBox.innerText = "";
}

function clearPendingActionDisplay() {
  displayTop.innerText = "";
}

function clearAll() {
  clearCurrentValue();
  clearTotal();
  clearInputDisplay();
  clearPendingActionDisplay();
  lastOperator = null;
  currentValue = "0";
  total = 0;
  displayBox.innerText = "0";
  displayTop.innerText = "";
  isWaitingForNextNumber = false;
}

function calculateResult() {
  const value = currentValue || displayBox.innerText;

  if (value === "") return;

  let number = parseFloat(value);
  if (isNaN(number) || isNaN(total)) return;

  displayTop.innerText = total + operatorToSymbol(lastOperator) + " " + number + " =";

  if (lastOperator === "+") {
    total += number;
  } else if (lastOperator === "-") {
    total -= number;
  } else if (lastOperator === "*") {
    total *= number;
  } else if (lastOperator === "/") {
    total /= number;
  }

  displayBox.innerText = parseFloat(total.toFixed(3));
  currentValue = number.toString();
}
