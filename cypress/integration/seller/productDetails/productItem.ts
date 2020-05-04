import { format } from "date-fns";
import startOfTomorrow from "date-fns/startOfTomorrow";
import SellerProductDetailsPage from "../../../elements/pages/SellerProductDetailsPage";

const page = new SellerProductDetailsPage();
const quantity = "1213141516";
const deliveryDate = format(startOfTomorrow(), "yyyy-MM-dd");

describe("Add a new product item, verify if exist and delete it", () => {
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

  it("Click add item button", () => {
    page.getAddItemsButton().click();
  });

  it("Fill the quantity", () => {
    page.getQuantityInput().type(quantity);
  });

  it("Fill the best before date", () => {
    page.getBestBeforeInput().click();
  });

  it("Select the date", () => {
    page.getCalendarSelectedValue().click();
  });

  it("Add an item", () => {
    page.getAddItemButton().click();
  });

  it("Verify the new product item", () => {
    cy.wait(2000);
    page.getProductItemByQuantity(quantity).should("exist");
    page.getProductItemByLatestDeliveryDate(deliveryDate).should("exist");
  });

  it("Delete the product item", () => {
    page.getDeleteByttonByLatestDeliveryDate(deliveryDate).click();
  });

  it("Item should be removed", () => {
    page.getProductItemByQuantity(quantity).should("not.exist");
    page.getProductItemByLatestDeliveryDate(deliveryDate).should("not.exist");
  });
});
