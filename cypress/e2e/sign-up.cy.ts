import { buildUser } from "../utils/utils";
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
