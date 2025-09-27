/// <reference types="cypress" />


describe('registration negative cases', () => {
    beforeEach(() => {

        cy.visit("/")
    })

    context("Name field negative", () => {

        it('Name required msg', () => {

            cy.contains('Sign up').click()
            cy.get("#signupName").focus()
            cy.get("#signupName").blur()
            cy.get("#signupName").next().should("have.text", "Name required")
        })

        it('Name with space', () => {

            cy.contains('Sign up').click()
            cy.get("#signupName")
                .click()
                .type("Space inside name")
                .blur()
                .next()
                .should("have.text", "Name is invalid")
        })

        it('Name with digits', () => {

            cy.contains('Sign up').click()
            cy.get("#signupName")
                .click()
                .type("Digit7")
                .blur()
                .next()
                .should("have.text", "Name is invalid")
        })

        it('Name with cyrillic', () => {

            cy.contains('Sign up').click()
            cy.get("#signupName")
                .click()
                .type("Дратути")
                .blur()
                .next()
                .should("have.text", "Name is invalid")
        })

        it('Name with symbols', () => {

            cy.contains('Sign up').click()
            cy.get("#signupName")
                .click()
                .type("Name+-")
                .blur()
                .next()
                .should("have.text", "Name is invalid")
        })

        it('Name length is less than min', () => {

            cy.contains('Sign up').click()
            cy.get("#signupName")
                .click()
                .type("A")
                .blur()
                .next()
                .should("have.text", "Name has to be from 2 to 20 characters long")
        })

        it('Name length is more than max', () => {

            cy.contains('Sign up').click()
            cy.get("#signupName")
                .click()
                .type("ProfessionalDeveloper")
                .blur()
                .next()
                .should("have.text", "Name has to be from 2 to 20 characters long")
        })

        it('Invalid Name length & spaces', () => {

            cy.contains('Sign up').click()
            cy.get("#signupName")
                .click()
                .type("Professional Developer")
                .blur()
                .get(".invalid-feedback > p:first-child")
                .should("have.text", "Name is invalid")
            cy.get("#signupName")
                .get(".invalid-feedback > p:last-child")
                .should("have.text", "Name has to be from 2 to 20 characters long")
        })

        it('Border color for name is red', () => {

            cy.contains('Sign up').click()
            cy.get("#signupName")
                .focus()
                .blur()
                .should("have.css", "border-color", "rgb(220, 53, 69)")
        })

    })

    context("Last Name field negative", () => {


        it('Last Name required msg', () => {

            cy.contains('Sign up').click()
            cy.get("#signupLastName")
                .focus()
                .blur()
                .get("#signupLastName")
                .next()
                .should("have.text", "Last name required")
        })

        it('Last Name with space', () => {

            cy.contains('Sign up').click()
            cy.get("#signupLastName")
                .click()
                .type("Spaces in last name")
                .blur()
                .next()
                .should("have.text", "Last name is invalid")
        })

        it('Last Name with digits', () => {

            cy.contains('Sign up').click()
            cy.get("#signupLastName")
                .click()
                .type("Digit8")
                .blur()
                .next()
                .should("have.text", "Last name is invalid")
        })

        it('Last Name with cyrillic', () => {

            cy.contains('Sign up').click()
            cy.get("#signupLastName")
                .click()
                .type("Тест")
                .blur()
                .next()
                .should("have.text", "Last name is invalid")
        })

        it('Last Name with symbols', () => {

            cy.contains('Sign up').click()
            cy.get("#signupLastName")
                .click()
                .type("Name!;")
                .blur()
                .next()
                .should("have.text", "Last name is invalid")
        })

        it('Last Name length is less than min', () => {

            cy.contains('Sign up').click()
            cy.get("#signupLastName")
                .click()
                .type("C")
                .blur()
                .next()
                .should("have.text", "Last name has to be from 2 to 20 characters long")
        })

        it('Last Name length is more than max', () => {

            cy.contains('Sign up').click()
            cy.get("#signupLastName")
                .click()
                .type("ProfessionalDeveloper")
                .blur()
                .next()
                .should("have.text", "Last name has to be from 2 to 20 characters long")
        })

        it('Invalid Last Name length & spaces', () => {

            cy.contains('Sign up').click()
            cy.get("#signupLastName")
                .click()
                .type("Professional Developer")
                .blur()
                .get(".invalid-feedback > p:first-child")
                .should("have.text", "Last name is invalid")
            cy.get("#signupLastName")
                .get(".invalid-feedback > p:last-child")
                .should("have.text", "Last name has to be from 2 to 20 characters long")
        })

        it('Border color for last name is red', () => {

            cy.contains('Sign up').click()
            cy.get("#signupLastName")
                .focus()
                .blur()
                .should("have.css", "border-color", "rgb(220, 53, 69)")
        })

    })

    context("Email field negative", () => {


        it('Email required msg', () => {

            cy.contains('Sign up').click()
            cy.get("#signupEmail")
                .focus()
                .blur()
                .get("#signupEmail")
                .next()
                .should("have.text", "Email required")
        })

        it('Email with space', () => {

            cy.contains('Sign up').click()
            cy.get("#signupEmail")
                .click()
                .type("test test@gmail.com")
                .blur()
                .next()
                .should("have.text", "Email is incorrect")
        })

        it('Email with digits', () => {

            cy.contains('Sign up').click()
            cy.get("#signupEmail")
                .click()
                .type("test@gmail.com77")
                .blur()
                .next()
                .should("have.text", "Email is incorrect")
        })

        it('Email with cyrillic', () => {

            cy.contains('Sign up').click()
            cy.get("#signupEmail")
                .click()
                .type("test@кирилл.com")
                .blur()
                .next()
                .should("have.text", "Email is incorrect")
        })

        it('Email with symbols', () => {

            cy.contains('Sign up').click()
            cy.get("#signupEmail")
                .click()
                .type("test@gmail.co+m")
                .blur()
                .next()
                .should("have.text", "Email is incorrect")
        })



        it('Border color for email  is red', () => {

            cy.contains('Sign up').click()
            cy.get("#signupEmail")
                .focus()
                .blur()
                .should("have.css", "border-color", "rgb(220, 53, 69)")
        })


    })


    context("Password field negative", () => {

        it('Empty password', () => {

            cy.contains('Sign up').click()
            cy.get("#signupPassword")
                .focus()
                .blur()
                .next()
                .should("have.text", "Password required")
        })

        it('Password without digits', () => {

            cy.contains('Sign up').click()
            cy.get("#signupPassword")
                .type("Abcdefghijk")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

        it('Password without CAPITAL letter', () => {

            cy.contains('Sign up').click()
            cy.get("#signupPassword")
                .type("8bcdefghijk")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

        it('Password without small letter', () => {

            cy.contains('Sign up').click()
            cy.get("#signupPassword")
                .type("8BCDEFGHIJK")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

        it('Password wit less than 8 symbols', () => {

            cy.contains('Sign up').click()
            cy.get("#signupPassword")
                .type("Aa34567")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

        it('Password wit more than 15 symbols', () => {

            cy.contains('Sign up').click()
            cy.get("#signupPassword")
                .type("Aa34567890123456")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

        it('Border color for password  is red', () => {

            cy.contains('Sign up').click()
            cy.get("#signupPassword")
                .focus()
                .blur()
                .should("have.css", "border-color", "rgb(220, 53, 69)")
        })



    })

    context("Re-enter password field negative", () => {

        it('Border color for re-enter password  is red', () => {

            cy.contains('Sign up').click()
            cy.get("#signupRepeatPassword")
                .focus()
                .blur()
                .should("have.css", "border-color", "rgb(220, 53, 69)")
        })

        it('Empty re-entry password', () => {

            cy.contains('Sign up').click()
            cy.get("#signupRepeatPassword")
                .focus()
                .blur()
                .next()
                .should("have.text", "Re-enter password required")
        })

        it('Passwords do not match', () => {

            cy.contains('Sign up').click()
            cy.get("#signupPassword")
                .type("validPassword1")
            cy.get("#signupRepeatPassword")
                .type("validPassword2")
                .blur()
                .next()
                .should("have.text", "Passwords do not match")
        })

        it('Re-password without digits', () => {

            cy.contains('Sign up').click()
            cy.get("#signupRepeatPassword")
                .type("Abcdefghijk")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

        it('Re-password without CAPITAL letter', () => {

            cy.contains('Sign up').click()
            cy.get("#signupRepeatPassword")
                .type("8bcdefghijk")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

        it('Re-password without small letter', () => {

            cy.contains('Sign up').click()
            cy.get("#signupRepeatPassword")
                .type("8BCDEFGHIJK")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

        it('Re-password wit less than 8 symbols', () => {

            cy.contains('Sign up').click()
            cy.get("#signupRepeatPassword")
                .type("Aa34567")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

        it('Re-password wit more than 15 symbols', () => {

            cy.contains('Sign up').click()
            cy.get("#signupRepeatPassword")
                .type("Aa34567890123456")
                .blur()
                .next()
                .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        })

    })




})