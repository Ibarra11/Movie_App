describe("logout", () => {
  beforeEach(() => {
    cy.intercept("/api/auth/user").as("USER");
    cy.intercept("/api/auth/logout").as("LOGOUT");
    cy.login({ email: "test@example.com", password: "password123" });
  });
  it.only("should destroy session and logout user", () => {
    cy.wait("@USER");
    cy.findByRole("button", { name: /logout/i }).click();
    cy.wait("@LOGOUT");
    cy.location("pathname").should("equal", "/account/login");
    cy.visit("/");
    cy.wait("@USER");
    cy.location("pathname").should("equal", "/account/login");
  });
});

export {};
