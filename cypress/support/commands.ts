/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

interface Credentials {
  email: string;
  password: string;
}

declare global {
  namespace Cypress {
    interface Chainable {
      signup({ email, password }: Credentials): Chainable<void>;
      login({ email, password }: Credentials): Chainable<void>;
    }
  }
}

Cypress.Commands.add("signup", ({ email, password }) => {
  cy.visit("account/signup");
  cy.findByLabelText("Email Address").as("emailInput");
  cy.findByLabelText("Password").as("passwordInput");
  cy.findByLabelText("Repeat Password").as("repeatPasswordInput");
  cy.findByRole("button", { name: /sign up/i }).as("submitBtn");

  cy.get("@emailInput").type(email);
  cy.get("@passwordInput").type(password);
  cy.get("@repeatPasswordInput").type(password);
  cy.get("@submitBtn").click();
});

Cypress.Commands.add("login", ({ email, password }) => {
  cy.visit("account/login");
  cy.findByLabelText("Email Address").as("emailInput");
  cy.findByLabelText("Password").as("passwordInput");
  cy.findByRole("button", { name: /login to your account/i }).as("submitBtn");
  cy.get("@emailInput").type(email);
  cy.get("@passwordInput").type(password);
  cy.get("@submitBtn").click();
});
