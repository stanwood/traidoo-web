export default class SellerProductDetailsPage {
  constructor() {}

  visit() {
    cy.visit("/seller/products");
  }

  getFirstProduct() {
    return cy.get("[data-testid=product-link]").first();
  }

  getEditButton() {
    return cy.get("[data-testid=edit-button]");
  }

  getAddItemsButton() {
    return cy.get("[data-testid=add-items-button]");
  }

  getQuantityInput() {
    return cy.get("[data-testid=input-product-item-quantity]");
  }

  getBestBeforeInput() {
    return cy.get("[data-testid=input-product-item-latest-delivery-date]");
  }

  getCalendarSelectedValue() {
    return cy.get(".MuiPickersDay-daySelected");
  }

  getAddItemButton() {
    return cy.get("[data-testid=product-item-add-button]");
  }

  getAllProductItems() {
    return cy.get("[data-testid=product-item]");
  }

  getProductItemByQuantity(quantity: string) {
    return cy.get("[data-testid=product-item-quantity]").contains(quantity);
  }

  getProductItemByLatestDeliveryDate(latestDelivertDate: string) {
    return cy
      .get("[data-testid=product-item-latest-delivery-date]")
      .contains(latestDelivertDate);
  }

  getDeleteByttonByLatestDeliveryDate(latestDelivertDate: string) {
    return cy
      .get("[data-testid=product-item]")
      .contains(latestDelivertDate)
      .parent()
      .find("[data-testid=product-item-delete-button]");
  }
}
