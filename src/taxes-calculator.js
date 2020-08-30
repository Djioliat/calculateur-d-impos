export default class TaxesCalculator {
    constructor() {
        this.seuils = [
            {max: 10064, rate: 0},
            {max: 25659, rate: 11},
            {max: 73369, rate: 30},
            {max: 157806, rate: 41},
            {max: Infinity, rate: 45},
        ];
        this.income = 0;
        this.parts = 1;
    }

    setIncome(income) {
        this.income = income;
        return this;
    }

    setParts(parts) {
        this.parts = parts;
        return this;
    }

    calculate() {
        const incomePerPart = this.income / this.parts;
        return Math.round(this.getTaxesBySlice(incomePerPart).reduce(
            (acc, slice) => acc + slice, 0) * this.parts);
    }

    getTaxesBySlice(incomePerPart) {
        let alreadyConted = 0;
        let i = 0;

        const slices = [];
        while (alreadyConted < incomePerPart) {
            let actualTaxe;

            const {max: limit, rate} = this.seuils[i];

            let isFirstSlice = i === 0;

            actualTaxe = isFirstSlice
                ? (limit * rate) / 100
                : incomePerPart <= limit
                    ? ((incomePerPart - this.seuils[i - 1].max - 1) * rate) / 100
                    : ((limit - this.seuils[i-1].max - 1) * rate) / 100;


            alreadyConted = limit;
            slices.push(actualTaxe);
            i++;
        }
        return slices;

    }
}
