describe("login", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.visit("/account/login");
    cy.findByLabelText(/email address/i).as("email");
    cy.findByLabelText(/password/i).as("password");
    cy.findByRole("button", { name: /login/i }).as("submitBtn");
  });
  it("should log in a user successfully", () => {
    cy.get("@email").type("test@example.com");
    cy.get("@password").type("password123");
    cy.get("@submitBtn").click();
  });
});

export {};
