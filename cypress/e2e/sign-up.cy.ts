describe("signup form", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.visit("account/login");
  });
  it("passes", () => {});
});

export {};
