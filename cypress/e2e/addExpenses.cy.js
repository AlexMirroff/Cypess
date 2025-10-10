/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage"
import LogInForm from "../../pom/forms/LogInForm"
import GaragePage from "../../pom/pages/GaragePage"
import AddCarForm from "../../pom/forms/AddCarForm"
import AddExpensesForm from "../../pom/forms/AddExpensesForm"
import FuelExpenses from "../../pom/pages/FuelExpensesPage"
import SideMenu from "../../pom/pages/SideMenu"


describe("Add fuel expenses", () => {

    beforeEach(() => {
        cy.visit("/")
        HomePage.openSignInForm()
        LogInForm.signInWithCredentials(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"))
        GaragePage.verifyPageHeaderIsVisible()
        GaragePage.openAddCarPopUp()
        AddCarForm.fillMilage(1000)
        AddCarForm.addButtonClick()
        GaragePage.verifyCarAdded("Audi TT")
    })

    it("Add expenses via Garage page", () => {
        GaragePage.openExpensesPopUp()
        AddExpensesForm.verifyCurrentCar("Audi TT")
        AddExpensesForm.increaseMilage()
        AddExpensesForm.fillLiters(50)
        AddExpensesForm.fillTotalCost(100)
        AddExpensesForm.addExpense()
        FuelExpenses.verifyNumberOfExpenses(1)
        FuelExpenses.verifyFuelExpenses(1, 2000, "50L", "100.00 USD")
    })

    it("Add expenses via Fuel expenses page", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.verifyCurrentCar("Audi TT")
        AddExpensesForm.increaseMilage()
        AddExpensesForm.fillLiters(50)
        AddExpensesForm.fillTotalCost(700)
        AddExpensesForm.addExpense()
        FuelExpenses.verifyNumberOfExpenses(1)
        FuelExpenses.verifyFuelExpenses(1, 2000, "50L", "700.00 USD")
    })

    it("Add multiple expenses via Fuel expenses page", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp() //1
        AddExpensesForm.verifyCurrentCar("Audi TT")
        AddExpensesForm.increaseMilage(5000)
        AddExpensesForm.fillLiters(10)
        AddExpensesForm.fillTotalCost(80)
        AddExpensesForm.addExpense()
        FuelExpenses.openExpensesPopUp() //2
        AddExpensesForm.verifyCurrentCar("Audi TT")
        AddExpensesForm.increaseMilage()
        AddExpensesForm.fillLiters(35)
        AddExpensesForm.fillTotalCost(120)
        AddExpensesForm.addExpense()
        FuelExpenses.openExpensesPopUp() //3
        AddExpensesForm.verifyCurrentCar("Audi TT")
        AddExpensesForm.increaseMilage()
        AddExpensesForm.fillLiters(78)
        AddExpensesForm.fillTotalCost(350)
        AddExpensesForm.addExpense()
        FuelExpenses.verifyNumberOfExpenses(3)
        FuelExpenses.verifyFuelExpenses(3, 6000, "10L", "80.00 USD")
        FuelExpenses.verifyFuelExpenses(2, 7000, "35L", "120.00 USD")
        FuelExpenses.verifyFuelExpenses(1, 8000, "78L", "350.00 USD")
    })

    it("Milage required message", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.clearAndBlurMilageField()
        AddExpensesForm.verifyMilageRequiredMsg()
        AddExpensesForm.verifyMilageBorderColor()
        AddExpensesForm.verifyAddExpenseBtnDisabled()
    })

    it("Liters required message", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.focusAndBlurLitersField()
        AddExpensesForm.verifyLitersRequiredMsg()
        AddExpensesForm.verifyLitersBorderColor()
        AddExpensesForm.verifyAddExpenseBtnDisabled()
    })

    it("Total cost required message", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.focusAndBlurCostsField()
        AddExpensesForm.verifyTotalCostRequiredMsg()
        AddExpensesForm.verifyCostBorderColor()
        AddExpensesForm.verifyAddExpenseBtnDisabled()
    })

    it("Close pop up with icon", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.closeAddCarPopUpWithIcon()
        FuelExpenses.verifyPopUpIsNotVisible()
    })

    it("Close pop up with cancel button", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.closeAddCarPopUpWithCancelBtn()
        FuelExpenses.verifyPopUpIsNotVisible()
    })

    it("Empty report date", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.clearAndBlurDate()
        AddExpensesForm.verifyAddExpenseBtnDisabled()
    })

    it("Switch car in add expenses pop up", () => {
        GaragePage.openAddCarPopUp()
        AddCarForm.selectBrand("Porsche")
        AddCarForm.selectModel("911")
        AddCarForm.fillMilage(1000)
        AddCarForm.addButtonClick()
        GaragePage.verifyCarAdded("Porsche 911")
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.verifyCurrentCar("Porsche 911")
        AddExpensesForm.switchCurrentCar("Audi TT")
        AddExpensesForm.increaseMilage()
        AddExpensesForm.fillLiters(8.70)
        AddExpensesForm.fillTotalCost(9000)  
        AddExpensesForm.addExpense()
        FuelExpenses.verifyNumberOfExpenses(1)
        FuelExpenses.verifyFuelExpenses(1, 2000, "8.7L", "9000.00 USD")
        FuelExpenses.verifyCurrentCar("Audi TT")
    })

    it("Liters below range", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.fillLiters(0)
        AddExpensesForm.blurLitersField()
        AddExpensesForm.verifyLiterOutRangeMsg()
    })

    it("Liters above range", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.fillLiters(9999.01)
        AddExpensesForm.blurLitersField()
        AddExpensesForm.verifyLiterOutRangeMsg()
    })

    it("Cost below range", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.fillTotalCost(0)
        AddExpensesForm.blurCostsField()
        AddExpensesForm.verifyCostOutRangeMsg()
    })

    it("Cost above range", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.fillTotalCost(1000000.01)
        AddExpensesForm.blurCostsField()
        AddExpensesForm.verifyCostOutRangeMsg()
    })

    it("Date before now", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.fillDate("6.10.2020")
        AddExpensesForm.increaseMilage()
        AddExpensesForm.fillLiters(1)
        AddExpensesForm.fillTotalCost(1)
        AddExpensesForm.addExpense()
        AddExpensesForm.verifyAlert("New expense date must not be less than car creation date. Car creation date is")
    })

    it("Date after now", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.fillDate("6.10.2050")
        AddExpensesForm.increaseMilage()
        AddExpensesForm.fillLiters(1)
        AddExpensesForm.fillTotalCost(1)
        AddExpensesForm.addExpense()
        AddExpensesForm.verifyAlert("Report date has to be less than tomorrow")
    })

    it("Same milage", () => {
        SideMenu.openFuelExpensesPage()
        FuelExpenses.openExpensesPopUp()
        AddExpensesForm.fillLiters(1)
        AddExpensesForm.fillTotalCost(1)
        AddExpensesForm.addExpense()
        AddExpensesForm.verifyAlert("First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 1000")
    })

    afterEach(() => {
        cy.visit("/panel/garage")
        GaragePage.deleteAllCars()
    })
})