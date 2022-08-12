import { aliasMutation, aliasQuery } from "../utils";
import { server } from "../../lib/test/server";
import MovieData from "../../data.json";
describe("bookmark functionality", () => {
  beforeEach(() => {
    cy.intercept("/api/auth/user").as("USER");
    cy.intercept("POST", "http://localhost:3000/api/graphql", (req) => {
      aliasQuery(req, "getBookmarkedMovies");
      aliasMutation(req, "addBookmark");
    });
  });

  it("Should send the correct movieId when user bookmarks movie", () => {
    cy.wait("@USER");
    cy.get('[data-test="thumbnail"').first().as("thumbnail");
    cy.get("@thumbnail").findByRole("heading").as("movieTitle");
    cy.get("@thumbnail").findByRole("button").click();
    cy.wait("@addBookmarkMutation");
    // cy.wait("@addBookmarkMutation").then((req) => {
    //   console.log(req)
    // });
  });
});

export {};
