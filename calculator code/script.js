const displayBox = document.getElementById("display-box");
const displayTop = document.getElementById("display-top");

let currentValue = ""; // เก็บตัวเลขที่กำลังกด
let total = NaN;         // เก็บผลรวมที่บวกไปแล้ว

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

  displayTop.innerText = total + " +";
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

  displayTop.innerText = total + " -";
  displayBox.innerText = total;

  currentValue = "";
}

