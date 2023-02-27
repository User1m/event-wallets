/// <reference types="cypress" />
import 'cypress-if';

describe('Already existing user', () => {
  it('passes', () => {
    cy.visit('/');
    cy.contains('Spritz');
    cy.contains('Create an account').click();
    // fill input fields
    cy.get('input[name="firstName"]').type('John').should('have.value', 'John');

    cy.get('input[name="lastName"]').type('Doe').should('have.value', 'Doe');
    cy.get('input[name="phoneNumber"]')
      .type('7039883568')
      .should('have.value', '7039883568');

    cy.get('input[name="email"]')
      .type('elias@gmail.com')
      .should('have.value', 'elias@gmail.com');

    cy.get('input[name="dob"]')
      .type('1990-01-01')
      .should('have.value', '1990-01-01');
    cy.contains('Next').click();
  });
});

describe('forgot password', () => {
  it('reset password', () => {
    cy.visit('/forgot-password');
    cy.contains('Forgot password');

    cy.get('[name="username"]')
      .type('eliasi@decagonhq.com')
      .should('have.value', 'eliasi@decagonhq.com');
    cy.contains('Next').click();

    const newOtp = ['2', '3', '4', '5', '6', '7'];
    for (let i = 0; i < newOtp.length; i++) {
      cy.get(`[name=otp${i}]`).if().type(newOtp[i]);
    }
    cy.contains('Next').click();
  });
});

describe('Login', () => {
  it('logs in', () => {
    cy.visit('/');
    cy.get('[data-cy="login"]').click();
    cy.get('[name="username"]')
      .type('elias@gmail.com')
      .should('have.value', 'elias@gmail.com');

    cy.get('[name="password"]')
      .type('more4jesusJ')
      .should('have.value', 'more4jesusJ');
    cy.contains('Login').click();
  });
});
