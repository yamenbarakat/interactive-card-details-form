const form = document.querySelector(".form form");
const allInputs = document.querySelectorAll("form input");
const cardName = document.getElementById("card-name");
const cardNameHolder = document.querySelector(".card-name-holder");
const cardNumber = document.getElementById("card-number");
const cardNumberHolder = document.querySelector(".card-number-holder");
const cardMonth = document.querySelector(".month");
const cardYear = document.querySelector(".year");
const monthHolder = document.querySelector(".month-holder");
const yearHolder = document.querySelector(".year-holder");
const cardCvc = document.getElementById("cvc");
const cvcHolder = document.querySelector(".cvc-holder");
const confirm = document.getElementById("confirm");
const completedForm = document.querySelector(".completed-form");

// errors element
const nameError = document.querySelector(".name-error");
const numberError = document.querySelector(".number-error");
const dateError = document.querySelector(".date-error");
const cvcError = document.querySelector(".cvc-error");

// make the value of cardNameHolder liek the value of card name input on input event
cardName.addEventListener("input", () => {
  cardNameHolder.textContent = cardName.value;

  // remove error msg
  nameError.textContent = "";
  // remove style error
  cardName.classList.remove("error-style");
});

// format card number input to be like a card and copy its values to card number holder
cardNumber.addEventListener("input", () => {
  cardNumber.value = formatNumber(cardNumber.value.replaceAll(" ", ""));
  cardNumberHolder.textContent = copyCardNumber();

  // remove error msg
  numberError.textContent = "";
  // remove style error
  cardNumber.classList.remove("error-style");
});

// format card number input to be like a card
function formatNumber(number) {
  return number.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
  }, "");
}

// for stoping the condition later
let check = true;

// for replacing values in card number holder
const arr = cardNumberHolder.textContent.split("");

function copyCardNumber() {
  // if car number length equals 19 then don't make this condition work any more
  if (check) {
    const indexNumber = cardNumber.value.length - 1;

    if (cardNumber.value.length === 19) {
      check = false;
    }

    arr[indexNumber] = cardNumber.value[indexNumber];

    return arr.join("");
  } else {
    return cardNumber.value;
  }
}

// copy the card month value to month holder
cardMonth.addEventListener("input", () => {
  monthHolder.textContent = cardMonth.value;

  // remove error msg
  dateError.textContent = "";
  // remove style error
  cardMonth.classList.remove("error-style");
});

// copy the card month value to month holder
cardYear.addEventListener("input", () => {
  yearHolder.textContent = cardYear.value;

  // remove error msg
  dateError.textContent = "";
  // remove style error
  cardYear.classList.remove("error-style");
  cardMonth.classList.remove("error-style");
});

// copy the card cvc value to cvc holder
cardCvc.addEventListener("input", () => {
  cvcHolder.textContent = cardCvc.value;

  // remove error msg
  cvcError.textContent = "";
  // remove style error
  cardCvc.classList.remove("error-style");
});

// attach click event on sumbit button
confirm.addEventListener("click", (e) => {
  e.preventDefault();

  // if there is an empty input stop the function
  if (checkEmpty()) return;

  // if the validation failed stop the function
  if (valdiateInputs()) return;

  // hide form and show feedback for completion
  form.classList.add("hide");
  completedForm.classList.remove("hide");
});

// if there is an empty input return false and show error msg
function checkEmpty() {
  let checker = false;

  allInputs.forEach((input) => {
    if (input.value === "") {
      if (input.classList.contains("month")) {
        dateError.textContent = "Can't be blank";
      } else {
        input.nextElementSibling.textContent = "Can't be blank";
      }
      input.classList.add("error-style");
      checker = true;
    }
  });

  return checker;
}

function valdiateInputs() {
  let checker = false;

  // card name must be letters
  if (!cardName.value.match(/^[A-Za-z]+$/)) {
    helperError(cardName, nameError, "Must be only letters");
  }

  // card number must be numbers
  if (cardNumber.value.length !== 19) {
    helperError(cardNumber, numberError, "Please complete the card number");
    console.log(cardNumber.value.length);
  } else if (!cardNumber.value.match(/^[0-9\s]*$/)) {
    helperError(cardNumber, numberError, "Wrong format, numbers only");
  }

  // card month must be numbers and between 1 and 12
  if (cardMonth.value.length !== 2) {
    helperError(cardMonth, dateError, "Month must have two values");
  } else if (isNumber(cardMonth)) {
    helperError(cardMonth, dateError, "Must be numbers only");
  } else if (cardMonth.value <= 0 || cardMonth.value > 12) {
    helperError(cardMonth, dateError, "Month must be between 1 and 12");
  } else {
    // card year must be current year or above and if it is the current year the month must be above the current month
    const currentYear = new Date().getFullYear().toString().slice(2);
    const currentMonth = new Date().getDate();

    if (cardYear.value.length !== 2) {
      helperError(cardYear, dateError, "Year must have two values");
    } else if (isNumber(cardYear)) {
      helperError(cardYear, dateError, "Must be numbers only");
    } else if (
      (currentYear === cardYear.value && currentMonth >= +cardMonth.value) ||
      +cardYear.value < +currentYear
    ) {
      helperError(cardMonth, dateError, "Your card has Expired");
      cardYear.classList.add("error-style");
    }
  }

  // card cvc must be numbers
  if (cardCvc.value.length !== 3) {
    helperError(cardCvc, cvcError, "It must have three values");
  } else if (isNumber(cardCvc)) {
    helperError(cardCvc, cvcError, "Must be numbers only");
  }

  // helper error function
  function helperError(input, errorInput, msg) {
    checker = true;
    errorInput.textContent = msg;
    input.classList.add("error-style");
  }

  // check if there is a value other than a number
  function isNumber(input) {
    return !input.value.match(/^[0-9]+$/);
  }

  return checker;
}
