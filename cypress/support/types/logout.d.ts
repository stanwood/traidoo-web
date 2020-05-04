declare namespace Cypress {
  interface Chainable {
    logout(): Chainable<Element>;
  }
}
