/// <reference types="cypress" />

describe("User api tests with plugin", () => {
    let sid

    before(() => {
        cy.api("POST", "api/auth/signin", {
            "email": "mirhaiazov@gmail.com",
            "password": "PassWord1",
            "remember": false
        }).should((response) => {
            sid = String(response.headers["set-cookie"]).split(";")[0]
            expect(response.status).to.eq(200)
            expect(sid).to.contain("sid")
        })

    })

    it("Get current user data", () => {
        cy.api("GET", "/api/users/current").should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.currency).to.eq("usd")
            expect(response.body.data.distanceUnits).to.eq("km")
            expect(response.body.data.photoFilename).to.eq("default-user.png")
        })
    })

    it("Get current user profile data", () => {
        cy.api({
            url: "/api/users/profile",
            headers: {
                Cookie: sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.name).to.eq("Alex")
            expect(response.body.data.lastName).to.eq("Mirroff")
            expect(response.body.data.photoFilename).to.eq("default-user.png")
        })

    })

    it("Edit user's profile", () => {
        cy.api({
            method: "PUT",
            url: "/api/users/profile",
            body: {
                "name": "John",
                "lastName": "Dou",
                "dateBirth": "2020-03-17",
                "country": "Ukraine"
            },
            headers: {
                Cookie: sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.name).to.eq("John")
            expect(response.body.data.lastName).to.eq("Dou")
            expect(response.body.data.country).to.eq("Ukraine")
            expect(response.body.data.dateBirth).to.eq("2020-03-17T00:00:00.000Z")
        })
    })

    after(() => {
        cy.api({
            method: "PUT",
            url: "/api/users/profile",
            body: {
                "name": "Alex",
                "lastName": "Mirroff",
                "dateBirth": "2000-03-17",
                "country": "USA"
            },
            headers: {
                Cookie: sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.name).to.eq("Alex")
            expect(response.body.data.lastName).to.eq("Mirroff")
            expect(response.body.data.country).to.eq("USA")
            expect(response.body.data.dateBirth).to.eq("2000-03-17T00:00:00.000Z")
        })
    })
})

