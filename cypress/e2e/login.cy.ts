import { buildUser } from "../utils";
describe("login", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });
  it("should log in a user successfully", () => {
    const testUser = buildUser();
    cy.intercept("/api/graphql").as("api");
    cy.intercept("/api/auth/user").as("isLoggedIn");
    cy.intercept("/api/auth/logout").as("logout");
    cy.signup(testUser);
    cy.wait("@api");
    cy.findByRole("button", { name: /logout/i }).click();
    cy.wait("@logout");
    cy.wait("@isLoggedIn");
    cy.location("pathname").should("equal", "/account/login");
    cy.login(testUser);
    cy.wait("@api");
    cy.location("pathname").should("equal", "/");
  });
});

export {};
