/// <reference types="cypress" />
import React from 'react';
import Button from '@app/components/formInputField/Button';
import FloatingPlaceholder from '@app/components/formInputField/FloatingPlaceholder';
import SocialLoginBtn from '@app/components/formInputField/socialLoginBtn';
import SignUpOption from '@app/cleanerPages/signUpOptions/signUpOption';
import { MemoryRouter } from 'react-router-dom';

it('button', () => {
  cy.mount(
    <Button
      text="Button"
      backgroundColor="#0E82F6"
      color="white"
      type="submit"
      borderRadius="22px"
    />
  );
  cy.contains('Button').should('be.visible');
});

it('floating placeholder', () => {
  cy.mount(
    <FloatingPlaceholder
      name="firstName"
      type="text"
      text="First Name"
      onChange={() => console.log('')}
    />
  );
  cy.contains('First Name').should('be.visible');
});

it('social login button', () => {
  cy.mount(
    <SocialLoginBtn text="Continue with apple" image="./images/apple.svg" />
  );
  cy.contains('Continue with apple').should('be.visible');
});

it('sign up option', () => {
  cy.mount(
    <MemoryRouter>
      <SignUpOption />
    </MemoryRouter>
  );
  cy.contains('Don’t just clean, grow with Spritz.').should('be.visible');
});
