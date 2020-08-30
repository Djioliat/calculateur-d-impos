const assert = require('assert');
const { Given, When, Then } = require('cucumber');

import TaxesCalculator from "../../src/taxes-calculator";

const calculator = new TaxesCalculator();

Given("a family composed of {float} part(s) and has an income of {int}",
    function (parts, income)
{
    calculator.setIncome(income).setParts(parts);
});

When('he uses the calculator', function () {
    this.result = calculator.calculate();
});

Then('taxes should be {int}', function (taxes)
{
    assert.equal(this.result, taxes);
});
