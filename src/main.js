// ================================
// MAIN VARIABLES
// ================================
const totalBill = document.querySelector("#total-bill");
const totalPeople = document.querySelector("#total-people");
const tipButtons = document.querySelectorAll(".button-group .button");
const customInput = document.querySelector("#custom");

const tipAmount = document.querySelector("#tip-amount-number");
const totalAmount = document.querySelector("#total-amount-number");
const resetBtn = document.querySelector(".reset-button");

let bill = 0;
let people = 0;
let tipPercent = 0;


// ================================
// BILL EVENTS
// ================================
totalBill.addEventListener("input", () => {
  bill = parseFloat(totalBill.value) || 0;
  calculate();
});


// ================================
// VALIDATING PEOPLE
// ================================
totalPeople.addEventListener("input", () => {
  let value = parseInt(totalPeople.value);

  if (isNaN(value) || value <= 0) {
    totalPeople.value = "";
    people = 0;
    showPeopleWarning(true);
    calculate();
    return;
  }

  totalPeople.value = value;
  people = value;

  showPeopleWarning(false);
  calculate();
});


// ================================
// TIP FUNCTION BUTTONS
// ================================
tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // clean selected
    tipButtons.forEach((b) => b.classList.remove("active"));
    customInput.value = "";

    btn.classList.add("active");

    tipPercent = parseInt(btn.textContent.replace("%", "")) / 100;

    calculate();
  });
});


// ================================
// CUSTOM TIP
// ================================
customInput.addEventListener("input", () => {
  tipButtons.forEach((b) => b.classList.remove("active"));

  let value = parseFloat(customInput.value);

  if (isNaN(value) || value < 0) {
    tipPercent = 0;
  } else {
    tipPercent = value / 100;
  }

  calculate();
});


// ================================
// MAIN CALCULATOR
// ================================
function calculate() {
  if (bill > 0 && people > 0 && tipPercent >= 0) {
    const tipPerPerson = (bill * tipPercent) / people;
    const totalPerPerson = bill / people + tipPerPerson;

    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
  }
}


// ================================
// WARNING PEOPLE
// ================================
function showPeopleWarning(show) {
  const warning = document.querySelector("#people-warning");

  if (show) {
    warning.classList.remove("hidden");
    totalPeople.classList.add("error");
  } else {
    warning.classList.add("hidden");
    totalPeople.classList.remove("error");
  }
}


// ================================
// BOTÓN RESET
// ================================
resetBtn.addEventListener("click", () => {
  // reset values
  bill = 0;
  people = 0;
  tipPercent = 0;

  // reset inputs
  totalBill.value = "";
  totalPeople.value = "";
  customInput.value = "";

  // reset warning
  showPeopleWarning(false);

  // reset buttons
  tipButtons.forEach((b) => b.classList.remove("active"));

  // reset tip
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
});
