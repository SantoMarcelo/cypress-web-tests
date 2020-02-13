/// <reference types="Cypress" />

function rand(valMin, valMax) {
    return Math.floor(Math.random() * (valMax - valMin));
}
const random = rand(1000, 9999)

describe('Test for evaluation', () => {
    context('Register a new user', () => {
        const user = {
            firstName: 'Teste',
            lastName: `Test ${random}`,
            address: 'Rua teste sem nummero',
            email: `teste.${random}@teste.io`,
            phone: `345255${random}`,
            gender: 'Male',
            country: 'Brazil',
            birth: {
                year: '1986',
                month: 'October',
                day: '17'
            },
            pass: '1234@Teste',
            confirmPass: '1234@Teste'
        }
        it('check create a new user', () => {
            cy.server()
            cy.route('POST', '**/databases/userdetails/**').as('getdatabaseData')
            cy.visit('/Register.html')
            cy.fixture('header_name_list.json').as('headerList')
            cy.get("input[placeholder='First Name']").type(user.firstName)
            cy.get('input[placeholder="Last Name"]').type(user.lastName)
            cy.get('textarea.form-control').type(user.address)
            cy.get('input[type="email"]').type(user.email)
            cy.get('input[type="tel"]').type(user.phone)
            cy.get('[type="radio"]').check(user.gender)
            cy.get('#countries').select(user.country)
            cy.get('#yearbox').select(user.birth.year)
            cy.get(':nth-child(11) > :nth-child(3) > .form-control').select(user.birth.month)
            cy.get('#daybox').select(user.birth.day)
            cy.get('#firstpassword').type(user.pass)
            cy.get('#secondpassword').type(user.confirmPass)
            cy.get('#submitbtn').click()
        })
    })
})