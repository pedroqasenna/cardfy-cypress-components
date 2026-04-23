import React from 'react'
import AddCard from './AddCard'
import { cardService } from '../services/cardService'

Cypress.Commands.add('alertErrorHavetext', (expectedText) => {
  cy.contains('.alert-error', expectedText)
    .should('be.visible')
})

Cypress.Commands.add('fillCardForm', (card)=> {
cy.contains('label', 'Número do Cartão')
.parent().find('input').type(card.number)
cy.contains('label', 'Nome do Titular')
.parent().find('input').type(card.holderName)
cy.contains('label', 'Validade')
.parent().find('input').type(card.expirationDate)
cy.contains('label', 'CVV')
.parent().find('input').type(card.cvv)

})

describe('<AddCard />', () => {

    const myCard = {
      number: '2390 1823 0918 2839',
      holderName: 'Pedro Santos',
      expirationDate: '02/27',
      cvv: '496',
      bank: 'Nubank'
    }

  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.mount(<AddCard />)
  })

  it('Exibe erro ao não preencher campos', () => {
    cy.contains('button', 'Adicionar Cartão').click()

    const alerts = [
      'Número do cartão é obrigatório',
      'Nome do titular é obrigatório',
      'Data de expiração é obrigatória',
      'CVV é obrigatório',
      'Selecione um banco'
    ]

    alerts.forEach((alert) => {
      cy.alertErrorHavetext(alert)
    })
  })

  it('Não Deve Permitir número de cartão inválido', () => {

    cy.fillCardForm({...myCard, number : '0000000000001111'})

    //cy.contains('label', 'Número do Cartão')
    //  .parent().find('input').type(myCard.number)

    //cy.contains('label', 'Nome do Titular')
    //  .parent().find('input').type(myCard.holderName)

    //cy.contains('label', 'Validade')
    //  .parent().find('input').type(myCard.expirationDate)

    //cy.contains('label', 'CVV')
    //  .parent().find('input').type(myCard.cvv)

    cy.contains('button', 'Nubank').click()
    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('Número de cartão inválido').should('be.visible')
  })

  it('Não Deve Permitir Nome com menos de 2 caracteres', () => {

    cy.fillCardForm({...myCard, holderName : 'P'})

    //cy.contains('label', 'Número do Cartão')
      //.parent().find('input').type(myCard.number)

    //cy.contains('label', 'Nome do Titular')
      //.parent().find('input').type(myCard.holderName)

    //cy.contains('label', 'Validade')
      //.parent().find('input').type(myCard.expirationDate)

    //cy.contains('label', 'CVV')
      //.parent().find('input').type(myCard.cvv)

    cy.contains('button', 'Nubank').click()
    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('Nome deve ter pelo menos 2 caracteres').should('be.visible')
  })

  it('Não Deve Permitir Data inválida', () => {

    cy.fillCardForm({...myCard, expirationDate : '13/27'})

    //cy.contains('label', 'Número do Cartão')
    //  .parent().find('input').type(myCard.number)

    //cy.contains('label', 'Nome do Titular')
      //.parent().find('input').type(myCard.holderName)

    //cy.contains('label', 'Validade')
      //.parent().find('input').type(myCard.expirationDate)

    //cy.contains('label', 'CVV')
      //.parent().find('input').type(myCard.cvv)

    cy.contains('button', 'Nubank').click()
    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('Data de expiração inválida ou vencida').should('be.visible')
  })

 it('Não Deve Permitir CVV Inválido', () => {

    cy.fillCardForm({...myCard, cvv : '00'})

    //cy.contains('label', 'Número do Cartão')
    //  .parent().find('input').type(myCard.number)

    //cy.contains('label', 'Nome do Titular')
    //  .parent().find('input').type(myCard.holderName)

    //cy.contains('label', 'Validade')
    //  .parent().find('input').type(myCard.expirationDate)

    //cy.contains('label', 'CVV')
    //  .parent().find('input').type(myCard.cvv)

    cy.contains('button', 'Nubank').click()
    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('CVV deve ter 3 ou 4 dígitos').should('be.visible')
  })

  it('Deve cadastrar um novo cartão de crédito', () => {
    cy.stub(cardService, 'getCards').resolves([])
    cy.stub(cardService, 'addCard').resolves({})

    cy.mount(<AddCard />)

    const myCard = {
      number: '4024007162659428',
      holderName: 'Pedro Cypress',
      expirationDate: '02/27',
      cvv: '496',
      bank: 'Nubank'
    }

    cy.fillCardForm(myCard)

    //cy.contains('label', 'Número do Cartão')
    //  .parent().find('input').type(myCard.number)

    //cy.contains('label', 'Nome do Titular')
    //  .parent().find('input').type(myCard.holderName)

    //cy.contains('label', 'Validade')
    //  .parent().find('input').type(myCard.expirationDate)

    //cy.contains('label', 'CVV')
    //  .parent().find('input').type(myCard.cvv)

    cy.contains('button', 'Nubank').click()
    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('Cartão cadastrado com sucesso!').should('be.visible')
  })

})