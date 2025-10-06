class GaragePage {

    get header() {
        return cy.contains("h1", "Garage")
    }

    get addCarButton() {
        return cy.contains("button", "Add car")
    }

    get carTitle() {
        return cy.get(".car_name").first()
    }

    get milageField() {
        return cy.get("app-update-mileage-form input").first()
    }

    get addExpensesBtn() {
        return cy.get("button.car_add-expense.btn.btn-success").first()
    }

    verifyPageHeaderIsVisible() {
        this.header.should("be.visible")
    }

    openAddCarPopUp() {
        this.addCarButton.click()
    }

    openAddCarPopUp() {
        this.addCarButton.click()
    }

    verifyCarAdded(carTitle) {
        this.carTitle.should("have.text", carTitle)
    }

    verifyMileage(mileage) {
        this.milageField.should("have.value", mileage)
    }

    deleteAllCars() {
        cy.get(".icon-edit").each(($item) => {
            cy.wrap($item).click();
            cy.contains("button", "Remove car").click( )
            cy.get("button.btn.btn-danger").click()
        })
    }

    openExpensesPopUp() {
        this.addExpensesBtn.click()
    }
}

export default new GaragePage();