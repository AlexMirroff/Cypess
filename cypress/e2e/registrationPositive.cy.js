/// <reference types="cypress" />

function getUniqEmail() {

    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `fake-${result}@gmail.com`
}


describe('Sign up positive', () => {
    beforeEach(() => {

        cy.visit("/")
    })

    it('Successful sign up with valid data', () => {

        cy.contains('Sign up').click()
        cy.get("#signupName").type("Alex")
        cy.get("#signupLastName").type("Mirroff")
        cy.get("#signupEmail").type(getUniqEmail())
        cy.get("#signupPassword").type("Aa34567890", { sensitive: true })
        cy.get("#signupRepeatPassword").type("Aa34567890", { sensitive: true })
        cy.contains("Register").click()
        cy.get("h1").should("have.text", "Garage")
    })

    it.only('Close sign up pop up', () => {

        cy.contains('Sign up').click()
        cy.get("h4.modal-title").should("be.visible")
        cy.get('button.close').click()
        cy.get("h4.modal-title").should("not.be.visible")

    })
})
