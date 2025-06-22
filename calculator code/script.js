const displayBox = document.getElementById("display-box");
const displayTop = document.getElementById("display-top");

let currentValue = ""; // เก็บตัวเลขที่กำลังกด
let total = NaN;         // เก็บผลรวมที่บวกไปแล้ว
let lastOperator = null;

function clickOnNumber(num) {
  if (num === "0" && currentValue === "") return;
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

  let number = parseFloat(currentValue);
  if (isNaN(total)) {
    total = number;
  } else {
    total += number;
  }

  lastOperator = "+";
  displayTop.innerText = total + " +";
  displayBox.innerText = total;
  currentValue = "";
}

function clickMultiply() {
  if (currentValue === "") return;

  let number = parseFloat(currentValue);
  if (total === 0 && displayTop.innerText === "") {
  total = number;
} else {
  total *= number;
}

  lastOperator = "*"; 
  displayTop.innerText = total + " ×";
  displayBox.innerText = total;
  currentValue = "";
}

function clickDivide() {
  if (currentValue === "") return;

  let number = parseFloat(currentValue);
  if (isNaN(number)) return; // ✅ ถ้าไม่ใช่ตัวเลข ให้หยุดเลย

  // ตั้งค่าเริ่มต้นให้ total ถ้ายังไม่มีการคำนวณมาก่อน
  if (total === 0 && displayTop.innerText === "") {
    total = number;
  } else {
    total /= number;
  }

  lastOperator = "/";
  displayTop.innerText = total + " ÷";
  displayBox.innerText = total;
  currentValue = "";
}

function clearDisplay() {
  currentValue = "";
  total = 0;
  displayBox.innerText = "";
  displayTop.innerText = "";
}

function clickMinus() {
  if (currentValue === "") return;

  let number = parseFloat(currentValue);

  if (isNaN(total)) {
    total = number;
  } else {
    total -= number;
  }

  lastOperator ="-";
  displayTop.innerText = total + " -";
  displayBox.innerText = total;
  currentValue = "";
}

function calculateResult() {
  if (currentValue === "") return;

  let number = parseFloat(currentValue);
  if (isNaN(number) || isNaN(total)) return;

  if (lastOperator === "+") {
    total += number;
  } else if (lastOperator === "-") {
    total -= number;
  } else if (lastOperator === "*") {
    total *= number;
  } else if (lastOperator === "/") {
    total /= number;
  }

  displayTop.innerText = "";
  displayBox.innerText = total;
  currentValue = total.toString();
  lastOperator = null;
}
