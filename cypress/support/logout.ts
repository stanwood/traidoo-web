Cypress.Commands.add("logout", () => {
  after(() => {
    cy.clearCookies();
  });
});
