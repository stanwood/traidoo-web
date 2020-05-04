Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  return originalFn(`${Cypress.env("URL")}${url}`, options);
});
