/// <reference types="cypress" />
import 'cypress-if';

describe('Get instant quote', () => {
  it('passes', () => {
    cy.visit('/cp/12fd7971-25d1-4db7-b312-9a3c01d4618e');
    cy.get('select[name="serviceCategory"]')
      .select('deepService')
      .should('have.value', 'deepService');
    cy.get('select[name="cleanFrequency"]')
      .select('DAILY')
      .should('have.value', 'DAILY');
    cy.get('input[name="zip"]').type('10001').should('have.value', '10001');
    cy.wait(5000);
    cy.get('button').contains('Get an instant quote').click();
    cy.contains('Property Details');
    cy.contains('Next').click();
    cy.contains('Next').click();
    cy.contains('Next').click();
    cy.get('select[name="title"]').select('Mr').should('have.value', 'mr');
    cy.get('input[name="firstName"]')
      .type('Ciara')
      .should('have.value', 'Ciara');
    cy.get('input[name="lastName"]')
      .type('Bravo')
      .should('have.value', 'Bravo');
    cy.get('input[name="phoneNumber"]')
      .type('1234567890')
      .should('have.value', '1234567890');
    cy.get('input[name="email"]')
      .type('ciarabravo@gmail.com')
      .should('have.value', 'ciarabravo@gmail.com');
    cy.contains('Next').click();
    cy.contains('Yay! Schedule Ciara Bravo now!');
  });
});
