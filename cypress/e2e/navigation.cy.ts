describe("navgation", () => {
  beforeEach(() => {
    cy.intercept("/api/auth/user", (req) => {
      req.reply({ isLoggedIn: true });
    });
    cy.visit("/");
    cy.findByRole("button", { name: /show both movies and tv series/i }).as(
      "showAll"
    );
    cy.findByRole("button", { name: /show only movies/i }).as("onlyMovies");
    cy.findByRole("button", { name: /show only tv series/i }).as(
      "onlyTvSeries"
    );
    cy.findByRole("button", {
      name: /show bookmarked tv series and movies/i,
    }).as("onlyBookmarked");
  });
  it("should navigate to the movies section", () => {
    cy.get("@onlyMovies").click();
    cy.location("pathname").should("equal", "/movies");
  });
  it("should navigate to the tv series section", () => {
    cy.get("@onlyTvSeries").click();
    cy.location("pathname").should("equal", "/tv_series");
  });
  it("should navigate to the bookmarked section", () => {
    cy.get("@onlyBookmarked").click();
    cy.location("pathname").should("equal", "/bookmarked");
  });

  it.only("should go back to the home where all movies and tv series are displayed", () => {
    cy.get("@onlyMovies").click();
    cy.location("pathname").should("equal", "/movies");
    cy.get("@showAll").click();
    cy.location("pathname").should("equal", "/");
  });
});

export {};
