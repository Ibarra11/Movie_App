import { faker } from "@faker-js/faker";

function buildUser() {
  const email = faker.internet.email();
  const password = faker.internet.password();
  return { email, password };
}
describe("signup form", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });
  it("should be able to signup a user", () => {
    const testUser = buildUser();
    cy.intercept("/api/auth/user").as("api");
    cy.signup(testUser);
    cy.wait("@api");
    cy.location("pathname").then((pathname) => {
      expect(pathname).equal("/");
    });
  });
});

export {};
