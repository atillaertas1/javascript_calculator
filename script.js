const container = document.querySelector(".calculator");
const display = document.querySelector(".display");

let displayValue = "0";

let firstValue = null;
let secondValueControl = null;
let operator = null;
let result;

displayUpdate();

function displayUpdate() {
  display.value = displayValue;
}

container.addEventListener("click", function (e) {
  element = e.target;

  //button kontrolü
  if (!element.matches("button")) {
    return 0;
  }

  //operatore tıklanırsa
  if (element.classList.contains("operator")) {
    inputOperator(element.value);
    displayUpdate();
    console.log("operator", element.value);
    return 0;
  }

  //noktaya tıklanırsa
  if (element.classList.contains("decimal")) {
    console.log("decimal", element.value);
    inputDecimal();
    displayUpdate();
    return 0;
  }

  //acye tıklanırsa
  if (element.classList.contains("ac")) {
    inputClear();
    displayUpdate();
    console.log("ac", element.value);
    return 0;
  }

  inputNumber(element.value);
  displayUpdate();
});

function inputNumber(number) {
  if (secondValueControl) {
    displayValue = number;
    secondValueControl = false;
  } else {
    if (displayValue === "0") {
      displayValue = number;
    } else {
      displayValue += number;
    }
  }
  console.log(displayValue, secondValueControl, firstValue, operator);
}

function inputDecimal() {
  if (displayValue.includes(".")) {
    return 0;
  }
  displayValue += ".";
}

function inputClear() {
  displayValue = "0";
}

function inputOperator(operatorInput) {
  const value = parseFloat(displayValue);
  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    result = calculate(firstValue, value, operator);
    displayValue = parseFloat(result.toFixed(7));
    firstValue = result;
  }
  secondValueControl = true;
  operator = operatorInput;

  console.log(displayValue, secondValueControl, firstValue, operator);
}

function calculate(firstValue, value, operator) {
  switch (operator) {
    case "+":
      return firstValue + value;
    case "-":
      return firstValue - value;
    case "*":
      return firstValue * value;
    case "/":
      return firstValue / value;
    default:
      return value;
  }
}
