/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage"
import LogInForm from "../../pom/forms/LogInForm"
import GaragePage from "../../pom/pages/GaragePage"


describe("Intercepting", () => {

    beforeEach(() => {
        cy.visit("/")
        HomePage.openSignInForm()
        LogInForm.signInWithCredentials(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"))
        GaragePage.verifyPageHeaderIsVisible()
    })

    it("Polar Bear user", () => {

        let user = {
            "status": "ok",
            "data": {
                "userId": 265538,
                "photoFilename": "default-user.png",
                "name": "Polar",
                "lastName": "Bear"
            }
        }
        cy.intercept("GET", '/api/users/profile', user)
        cy.visit("/panel/profile")
        cy.get("app-profile div.panel-page_content p").should("have.text", "Polar Bear")
    })
})