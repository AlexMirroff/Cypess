
class SideMenu {

    get fuelExpensesLink() {
        return cy.contains("a", "Fuel expenses")
    }

    openFuelExpensesPage() {
        this.fuelExpensesLink.click()
    }
}

export default new SideMenu();