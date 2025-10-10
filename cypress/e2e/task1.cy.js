/// <reference types="cypress" />

function getRandomMilage() {
    return Math.floor(Math.random() * 200) * 1000 + 1000
}

describe("Expenses API tests [/expenses/]", () => {
    let sid
    let carId
    let carMilage = getRandomMilage()
    let today = new Date().toISOString().slice(0, 10)
    let expenseId1car
    before(() => {
        cy.request("POST", "api/auth/signin", {
            "email": "mirhaiazov@gmail.com",
            "password": "PassWord1",
            "remember": false
        }).then((response) => {
            sid = String(response.headers["set-cookie"]).split(";")[0]

            expect(response.status).to.eq(200)
            expect(sid).to.contain("sid")
        })
        cy.request({
            method: "POST",
            url: "api/cars",
            body: {
                "carBrandId": 4,
                "carModelId": 18,
                "mileage": carMilage
            },
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.data.brand).to.eq("Porsche")
            expect(response.body.data.model).to.eq("Panamera")
            expect(response.body.data.mileage).to.eq(carMilage)
            carId = response.body.data.id
        })
    })

    it("Add one expense to car", () => {
        carMilage += 3000
        cy.request({
            method: "POST",
            url: "api/expenses",
            body: {
                "carId": carId,
                "reportedAt": today,
                "mileage": carMilage,
                "liters": 10,
                "totalCost": 100,
                "forceMileage": false
            },
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.liters).to.eq(10)
            expect(response.body.data.mileage).to.eq(carMilage)
            expect(response.body.data.totalCost).to.eq(100)
            expect(response.body.data.reportedAt).to.eq(today)
        })
    })

    it("Add multiple expense to car", () => {
        carMilage += 5000
        cy.request({
            method: "POST",
            url: "api/expenses",
            body: {
                "carId": carId,
                "reportedAt": today,
                "mileage": carMilage,
                "liters": 77.9,
                "totalCost": 209.85,
                "forceMileage": false
            },
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.liters).to.eq(77.9)
            expect(response.body.data.mileage).to.eq(carMilage)
            expect(response.body.data.totalCost).to.eq(209.85)
            expect(response.body.data.reportedAt).to.eq(today)

            carMilage += 7000
            cy.request({
                method: "POST",
                url: "api/expenses",
                body: {
                    "carId": carId,
                    "reportedAt": today,
                    "mileage": carMilage,
                    "liters": 39.5,
                    "totalCost": 2090,
                    "forceMileage": false
                },
                headers: {
                    "Cookie": sid
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data.liters).to.eq(39.5)
                expect(response.body.data.mileage).to.eq(carMilage)
                expect(response.body.data.totalCost).to.eq(2090)
                expect(response.body.data.reportedAt).to.eq(today)
            })
        })
    })

    it("Gets all car's expenses", () => {
        carMilage += 5000
        cy.request({
            method: "POST",
            url: "api/expenses",
            body: {
                "carId": carId,
                "reportedAt": today,
                "mileage": carMilage,
                "liters": 77.9,
                "totalCost": 209.85,
                "forceMileage": false
            },
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.liters).to.eq(77.9)
            expect(response.body.data.mileage).to.eq(carMilage)
            expect(response.body.data.totalCost).to.eq(209.85)
            expect(response.body.data.reportedAt).to.eq(today)

            carMilage += 7000
            cy.request({
                method: "POST",
                url: "api/expenses",
                body: {
                    "carId": carId,
                    "reportedAt": today,
                    "mileage": carMilage,
                    "liters": 39.5,
                    "totalCost": 2090,
                    "forceMileage": false
                },
                headers: {
                    "Cookie": sid
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data.liters).to.eq(39.5)
                expect(response.body.data.mileage).to.eq(carMilage)
                expect(response.body.data.totalCost).to.eq(2090)
                expect(response.body.data.reportedAt).to.eq(today)
            })
        })
        cy.request({
            method: "GET",
            url: "api/expenses?carId=" + carId + "&page=1",
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.have.length(2)
            for (let expense of response.body.data) {
                expect(expense.carId).to.eq(carId)
                expect(expense.reportedAt).to.eq(today)
                expect(expense).to.haveOwnProperty("mileage")
                expect(expense).to.haveOwnProperty("liters")
                expect(expense).to.haveOwnProperty("totalCost")
            }
        })
    })

    it("Gets car's expense by expenseId", () => {
        carMilage += 3000
        cy.request({
            method: "POST",
            url: "api/expenses",
            body: {
                "carId": carId,
                "reportedAt": today,
                "mileage": carMilage,
                "liters": 10,
                "totalCost": 100,
                "forceMileage": false
            },
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.liters).to.eq(10)
            expect(response.body.data.mileage).to.eq(carMilage)
            expect(response.body.data.totalCost).to.eq(100)
            expect(response.body.data.reportedAt).to.eq(today)
            expenseId1car = response.body.data.id
            cy.request({
                method: "GET",
                url: "api/expenses/" + expenseId1car,
                headers: {
                    "Cookie": sid
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data.id).to.eq(expenseId1car)
                expect(response.body.data.reportedAt).to.eq(today)
                expect(response.body.data).to.haveOwnProperty("mileage")
                expect(response.body.data).to.haveOwnProperty("liters")
                expect(response.body.data).to.haveOwnProperty("totalCost")
            })
        })
    })

    it("Edit car's expense", () => {
        carMilage += 3000
        cy.request({
            method: "POST",
            url: "api/expenses",
            body: {
                "carId": carId,
                "reportedAt": today,
                "mileage": carMilage,
                "liters": 10,
                "totalCost": 100,
                "forceMileage": false
            },
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.liters).to.eq(10)
            expect(response.body.data.mileage).to.eq(carMilage)
            expect(response.body.data.totalCost).to.eq(100)
            expect(response.body.data.reportedAt).to.eq(today)
            expenseId1car = response.body.data.id
            cy.request({
                method: "PUT",
                url: "api/expenses/" + expenseId1car,
                body: {
                    "carId": carId,
                    "reportedAt": today,
                    "mileage": carMilage + 1000,
                    "liters": 10,
                    "totalCost": 7.77,
                    "forceMileage": false
                },
                headers: {
                    "Cookie": sid
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data.liters).to.eq(10)
                expect(response.body.data.mileage).to.eq(carMilage + 1000)
                expect(response.body.data.totalCost).to.eq(7.77)
                expect(response.body.data.reportedAt).to.eq(today)
            })
        })
    })

    it("Delete car's expense", () => {
        carMilage += 3000
        cy.request({
            method: "POST",
            url: "api/expenses",
            body: {
                "carId": carId,
                "reportedAt": today,
                "mileage": carMilage,
                "liters": 10,
                "totalCost": 100,
                "forceMileage": false
            },
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.liters).to.eq(10)
            expect(response.body.data.mileage).to.eq(carMilage)
            expect(response.body.data.totalCost).to.eq(100)
            expect(response.body.data.reportedAt).to.eq(today)
            expenseId1car = String(response.body.data.id)
            cy.request({
                method: "DELETE",
                url: "api/expenses/" + expenseId1car,
                headers: {
                    "Cookie": sid
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data.expenseId).to.eq(expenseId1car)
            })
        })
    })

    afterEach(() => {
        cy.request({
            method: "GET",
            url: "api/expenses?carId=" + carId + "&page=1",
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            let expenses = response.body.data
            expenses.forEach((expense) => {
                cy.request({
                    method: "DELETE",
                    url: `api/expenses/${expense.id}`,
                    headers: {
                        "Cookie": sid
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        })
    })

    after(() => {
        cy.request({
            method: "GET",
            url: "api/cars",
            headers: {
                "Cookie": sid
            }
        }).then((response) => {
            let carList = response.body.data
            carList.forEach((car) => {
                cy.request({
                    method: "DELETE",
                    url: `api/cars/${car.id}`,
                    headers: {
                        "Cookie": sid
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        })
    })
})