
class AddExpensesForm {

    get milageField() {
        return cy.get("#addExpenseMileage")
    }

    get litersField() {
        return cy.get("#addExpenseLiters")
    }

    get totalCostField() {
        return cy.get("#addExpenseTotalCost")
    }

    get addExpenseBtn() {
        return cy.contains("Cancel").next().contains("button", "Add")
    }

    get dateField() {
        return cy.get("#addExpenseDate")
    }

    get carSelect() {
        return cy.get("#addExpenseCar")
    }

    get alert() {
        return cy.get("form > p.alert.alert-danger")
    }

    clearAndBlurMilageField() {
        this.milageField.clear().blur()
    }

    focusAndBlurLitersField() {
        this.litersField.focus().blur()
    }

    focusAndBlurCostsField() {
        this.totalCostField.focus().blur()
    }

    clearAndBlurMilageField() {
        this.milageField.clear().blur()
    }

    focusAndBlurLitersField() {
        this.litersField.focus().blur()
    }

    focusAndBlurCostsField() {
        this.totalCostField.focus().blur()
    }

    blurLitersField() {
        this.litersField.blur()
    }

    blurCostsField() {
        this.totalCostField.blur()
    }

    verifyMilageRequiredMsg() {
        this.milageField.parent().next().should("have.text", "Mileage required")
    }

    verifyLiterOutRangeMsg() {
        this.litersField.parent().next().should("have.text", "Liters has to be from 0.01 to 9999")
    }

    verifyLitersRequiredMsg() {
        this.litersField.parent().next().should("have.text", "Liters required")
    }

    verifyTotalCostRequiredMsg() {
        this.totalCostField.parent().next().should("have.text", "Total cost required")
    }

    verifyCostOutRangeMsg() {
        this.totalCostField.parent().next().should("have.text", "Total cost has to be from 0.01 to 1000000")
    }

    increaseMilage(mileageToAdd = 1000) {
        this.milageField.invoke("val").then((mileage) => {
            this.milageField.clear().type(Number(mileage) + mileageToAdd)
        })
    }

    fillLiters(liters) {
        this.litersField.type(liters)
    }

    fillTotalCost(cost) {
        this.totalCostField.type(cost)
    }

    fillDate(date) {
        this.dateField.clear().type(date)
    }

    addExpense() {
        this.addExpenseBtn.click()
    }

    verifyMilageBorderColor() {
        this.milageField.should("have.css", "border-color", "rgb(220, 53, 69)")
    }

    verifyLitersBorderColor() {
        this.litersField.should("have.css", "border-color", "rgb(220, 53, 69)")
    }

    verifyCostBorderColor() {
        this.totalCostField.should("have.css", "border-color", "rgb(220, 53, 69)")
    }

    verifyAddExpenseBtnDisabled() {
        this.addExpenseBtn.should("have.attr", "disabled")
    }

    closeAddCarPopUpWithIcon() {
        cy.get("button.close").click()
    }

    closeAddCarPopUpWithCancelBtn() {
        cy.contains("button", "Cancel").click()
    }

    clearAndBlurDate() {
        this.dateField.clear().blur()
    }

    verifyCurrentCar(carTitle) {
        this.carSelect.get("option:selected").should("have.text", carTitle)
    }

    switchCurrentCar(carTitle) {
        this.carSelect.select(carTitle)
    }

    verifyAlert(text) {
        this.alert.should("contain", text)
    }

}

export default new AddExpensesForm();