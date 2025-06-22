const displayBox = document.getElementById("display-box");
const displayTop = document.getElementById("display-top");

let currentValue = ""; // เก็บตัวเลขที่กำลังกด
let total = 0;         // เก็บผลรวมที่บวกไปแล้ว
let lastOperator = null;

function clickOnNumber(num) {
  if (num === "0" && currentValue === "" && !isPendingAction()) return;
  if (num === "." && currentValue === "") {
    currentValue = "0.";
    displayBox.innerText = currentValue;
    return;
  }
  if (num === "." && currentValue.includes(".")) return;
  if (currentValue.length >= 11) return;

  currentValue += num;
  displayBox.innerText = currentValue;
}

function clickPlus() {
  if (currentValue === "") return;

  addNumber(currentValue);

  prepareForNextAction("+");
}

function clickMinus() {
  if (currentValue === "") return;

  subtractNumber(currentValue);

  prepareForNextAction("-");
}

function clickMultiply() {
  if (currentValue === "") return;

  multiplyNumber(currentValue);

  prepareForNextAction("*");
}

function clickDivide() {
  if (currentValue === "") return;

  divideNumber(currentValue);

  prepareForNextAction("/");
}

function addNumber(currentValue) {
  let number = parseFloat(currentValue);
  if (isNaN(total)) {
    total = number;
  } else if (isPendingAction()) {
    total += number;
  }
}

function subtractNumber(currentValue) {
  let number = parseFloat(currentValue);

  if (isNaN(total)) {
    total = number;
  } else if (isPendingAction()) {
    total -= number;
  }
}

function multiplyNumber(currentValue) {
  let number = parseFloat(currentValue);
  if (total === 0 && displayTop.innerText === "") {
    total = number;
  } else if (isPendingAction()) {
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
  } else if (isPendingAction()) {
    total /= number;
  }
}

function prepareForNextAction(operator) {
  lastOperator = operator;
  displayTop.innerText = total + operatorToSymbol(operator);
  displayBox.innerText = total;
  currentValue = "";
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

function isPendingAction() {
  // if (displayTop.innerText === "") {
  //   return false; // No pending action
  // } else {
  //   return true; // There is a pending action
  // }

  return true;
}

function clearCurrentValue() {
  currentValue = "";
}

function clearTotal() {
  total = 0;
}

function clearInputDisplay() {
  displayBox.innerText = "";
}

function clearPendingActionDisplaty() {
  displayTop.innerText = "";
}

function clearAll() {
  clearCurrentValue();
  clearTotal();
  clearInputDisplay();
  clearPendingActionDisplaty();
  // lastOperator = null;
  // displayBox.innerText = "0";
  // displayTop.innerText = "";
}

function calculateResult() {
  const value = currentValue || displayBox.innerText;
  
  if (value === "") return;

  let number = parseFloat(value);
  if (isNaN(number) || isNaN(total)) return;

  displayTop.innerText = displayTop.innerText + " =";

  if (lastOperator === "+") {
    total += number;
  } else if (lastOperator === "-") {
    total -= number;
  } else if (lastOperator === "*") {
    total *= number;
  } else if (lastOperator === "/") {
    total /= number;
  }

  // displayTop.innerText = "";
  displayBox.innerText = total;
  currentValue = total.toString();
  lastOperator = null;
}
