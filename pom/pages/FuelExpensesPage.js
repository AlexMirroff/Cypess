class FuelExpenses {

    get addExpenseButton() {
        return cy.contains("button", "Add an expense")
    }

    get header() {
        return cy.contains("h1", "Fuel expenses")
    }

    get popUpHeader() {
        return cy.contains("h4", "Add an expense")
    }

    get currentCar() {
        return cy.get("#carSelectDropdown")
    }

    openExpensesPopUp() {
        this.addExpenseButton.click()
    }

    verifyFuelExpenses(expenseNumber, milage, liters, totalCost) {
        cy.get(".expenses_table-wrapper tr:nth-child(" + expenseNumber + ") > td:nth-child(2)").should("have.text", milage)
        cy.get(".expenses_table-wrapper tr:nth-child(" + expenseNumber + ") > td:nth-child(3)").should("have.text", liters)
        cy.get(".expenses_table-wrapper tr:nth-child(" + expenseNumber + ") > td:nth-child(4)").should("have.text", totalCost)
    }

    verifyNumberOfExpenses(number) {
        cy.get(".expenses_table-wrapper tbody tr").should("have.length", number)
    }

    verifyPopUpIsNotVisible() {
        this.popUpHeader.should("be.not.visible")
    }

    verifyCurrentCar(carTitle) {
        this.currentCar.should("have.text", carTitle)
    }
}

export default new FuelExpenses();