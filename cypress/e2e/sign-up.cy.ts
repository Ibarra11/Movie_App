describe("signup form", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.visit("account/signup");
    cy.findByLabelText("Email Address").as("emailInput");
    cy.findByLabelText("Password").as("passwordInput");
    cy.findByLabelText("Repeat Password").as("repeatPasswordInput");
    cy.findByRole("button", { name: /sign up/i }).as("submitBtn");
  });
  it("should be able to signup a user", () => {
    cy.intercept("/api/auth/user").as("api");
    cy.get("@emailInput").type("test12345@gmail.com");
    cy.get("@passwordInput").type("password");
    cy.get("@repeatPasswordInput").type("password");
    cy.get("@submitBtn").click();
    cy.wait("@api");
    cy.location("pathname").then((pathname) => {
      expect(pathname).equal("/");
    });
  });
});

export {};
