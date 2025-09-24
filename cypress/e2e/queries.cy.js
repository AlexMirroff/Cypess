/// <reference types="cypress" />

describe("queries", () => {
    beforeEach(() => {

        cy.visit("/")
    })

    it("get()", () => {

        cy.get(".hero-descriptor_btn.btn.btn-primary").should("be.visible")
    })

    it("contains()", () => {

        cy.contains("Sign up").should("be.visible")
        cy.contains("h1", "Do more").should("be.visible")

    })

    it("find()", () => {

        cy.get("div.contacts_socials").find("a").should("be.visible")

    })

    it("children()", () => {

        cy.get("div").children("p").should("be.visible")

    })

    it("parent()", () => {

        cy.get("a.socials_link").parent("div").should("be.visible")

    })

    it("closest()", () => {

        cy.get("button").closest(".header_nav").should("be.visible")

    })

    it("within()", () => {

        cy.get("#contactsSection").within(() => {
            cy.get("a.socials_link").should("have.length", 5)
        })

    })

    it("first()", () => {

        cy.get("#contactsSection").within(() => {
            cy.get("a.socials_link").first().should("have.attr", "href", "https://www.facebook.com/Hillel.IT.School")
        })

    })

    it("each()", () => {

        cy.get("#contactsSection").each(() => {
            cy.get("a.socials_link").should("have.attr", "href")
        })

    })

    it("filter()", () => {

        cy.get("span").filter(".icon-telegram").should("be.visible")
    })

    it("pev()", () => {

        cy.contains("Sign up").prev("p").should("be.visible")

    })

})
