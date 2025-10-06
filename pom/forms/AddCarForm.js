class AddCarForm {

    get milageField() {
        return cy.get("#addCarMileage")
    }

    get addButton() {
        return cy.contains("Cancel").next().contains("button", "Add")
    }

    get brandSelect() {
        return cy.get("#addCarBrand")
    }

    get modelSelect() {
        return cy.get("#addCarModel")
    }


    focusMilageField() {
        this.milageField.focus()
    }

    blurMilageField() {
        this.milageField.blur()
    }

    verifyMilageRequiredMsg() {
        this.milageField.parent().next().should("have.text", "Mileage cost required")
    }

    verifyMilageBorderColor() {
        this.milageField.should("have.css", "border-color", "rgb(220, 53, 69)")
    }

    verifyAddBtnDisabled() {
        this.addButton.should("have.attr", "disabled")
    }

    closeAddCarPopUpWithIcon() {
        cy.get("button.close").click()
    }

    closeAddCarPopUpWithCancelBtn() {
        cy.contains("button", "Cancel").click()
    }

    fillMilage(mileage) {
        this.milageField.type(mileage)
    }

    selectBrand(brand) {
        this.brandSelect.select(brand)
    }

    selectModel(brand) {
        this.modelSelect.select(brand)
    }

    addButtonClick() {
        this.addButton.click()
    }

}

export default new AddCarForm();