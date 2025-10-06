/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage"
import LogInForm from "../../pom/forms/LogInForm"
import GaragePage from "../../pom/pages/GaragePage"
import AddCarForm from "../../pom/forms/AddCarForm"


function getRandomMilage() {
    return Math.floor(Math.random() * 200) * 1000 + 1000
}

describe("Add new Car", () => {

    beforeEach(() => {
        cy.visit("/")
        HomePage.openSignInForm()
        LogInForm.signInWithCredentials(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"))
        GaragePage.verifyPageHeaderIsVisible()
        GaragePage.openAddCarPopUp()
    })

    it("Mileage cost required msg", () => {
        AddCarForm.focusMilageField()
        AddCarForm.blurMilageField()
        AddCarForm.verifyMilageRequiredMsg()
    })

    it("Mileage border color", () => {
        AddCarForm.focusMilageField()
        AddCarForm.blurMilageField()
        AddCarForm.verifyMilageBorderColor()
    })

    it("Close pop up with icon", () => {
        AddCarForm.closeAddCarPopUpWithIcon()
        GaragePage.verifyPageHeaderIsVisible()
    })

    it("Close pop up with cancel button", () => {
        AddCarForm.closeAddCarPopUpWithCancelBtn()
        GaragePage.verifyPageHeaderIsVisible()
    })

    it("Input invalid mileage", () => {
        AddCarForm.fillMilage("abcABCАБВ!@#+-")
        AddCarForm.blurMilageField()
        AddCarForm.verifyMilageRequiredMsg()
        AddCarForm.verifyAddBtnDisabled()
    })

    it("Add new car", () => {
        let mileage = getRandomMilage()
        AddCarForm.selectBrand("Porsche")
        AddCarForm.selectModel("911")
        AddCarForm.fillMilage(mileage)
        AddCarForm.addButtonClick()
        GaragePage.verifyCarAdded("Porsche 911")
        GaragePage.verifyMileage(mileage)
    })

    it("Add new another car", () => {
        let mileage = getRandomMilage()
        AddCarForm.selectBrand("BMW")
        AddCarForm.selectModel("5")
        AddCarForm.fillMilage(mileage)
        AddCarForm.addButtonClick()
        GaragePage.verifyCarAdded("BMW 5")
        GaragePage.verifyMileage(mileage)
    })

    it("Add new another car twice", () => {
        let mileage = getRandomMilage()
        AddCarForm.selectBrand("BMW")
        AddCarForm.selectModel("5")
        AddCarForm.fillMilage(mileage)
        AddCarForm.addButtonClick()
        GaragePage.verifyCarAdded("BMW 5")
        GaragePage.verifyMileage(mileage)
    })

    it("Add car with 0 milage", () => {
        AddCarForm.selectBrand("BMW")
        AddCarForm.selectModel("X5")
        AddCarForm.fillMilage(0)
        AddCarForm.addButtonClick()
        GaragePage.verifyCarAdded("BMW X5")
        GaragePage.verifyMileage(0)
    })

    after(() => {
        GaragePage.deleteAllCars()
    })
})