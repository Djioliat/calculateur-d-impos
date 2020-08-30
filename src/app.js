import TaxesCalculator from "./taxes-calculator.js";

const calculator = new TaxesCalculator;

const $income = document.querySelector("#income");
const $parts = document.querySelector("#parts");
const $resultat = document.querySelector("#resultat");

$income.addEventListener('input', function () {
    $resultat.textContent = calculator.setIncome(+this.value).calculate();
});

$parts.addEventListener('input', function () {
    $resultat.textContent = calculator.setParts(+this.value).calculate();
});