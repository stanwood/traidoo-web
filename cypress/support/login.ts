Cypress.Commands.add("login", (email: string, password: string) => {
  Cypress.Cookies.defaults({
    whitelist: ["jwt-refresh-token", "jwt-access-token"],
  });

  cy.request({
    method: "POST",
    url: `${Cypress.env("API")}/auth/login`,
    headers: {
      "Content-Type": "application/json",
      Region: Cypress.env("REGION"),
    },
    body: {
      email,
      password,
    },
  }).then((resp) => {
    cy.setCookie("jwt-refresh-token", resp.body.refresh);
    cy.setCookie("jwt-access-token", resp.body.access);
  });
});
