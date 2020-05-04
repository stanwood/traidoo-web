import SellerProductDetailsPage from "../../../elements/pages/SellerProductDetailsPage";

const page = new SellerProductDetailsPage();

describe("Open the first product from the list", () => {
  before(() => {
    cy.login(Cypress.env("SELLER_EMAIL"), Cypress.env("SELLER_PASSWORD"));
  });

  after(() => {
    cy.logout();
  });

  it("Visit the seller products list", () => {
    page.visit();
  });

  it("Open the first product details page", () => {
    page.getFirstProduct().click();
  });

  it("Edit button is visible", () => {
    page.getEditButton().should("exist");
  });

  it("Add items button is visible", () => {
    page.getAddItemsButton().should("exist");
  });
});
