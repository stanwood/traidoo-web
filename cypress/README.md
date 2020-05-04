# Cypress

- https://cypress.io
- https://docs.cypress.io

# Installation

```sh
yarn
```

## Environment variables

The following environment variables are required to run the tests.

| Name            | Description          | Example                   |
| --------------- | -------------------- | ------------------------- |
| URL             | Website URL          | `httpss://example.com`    |
| API             | API URL              | `https://api.example.com` |
| SELLER_EMAIL    | Seller user e-mail   | `test@example.com`        |
| SELLER_PASSWORD | Seller user password | `password`                |
| REGION          | Region               | `region`                  |

You can use different ways to set environment variables, read more [here](https://docs.cypress.io/guides/guides/environment-variables.html).

## Run Cypress GUI

```sh
npm run cypress:open
```

## Command line tests

```sh
npm run cypress:run:headless
```

## Chrome

```sh
npm run cypress:run:chrome
```

## Firefox

```sh
npm run cypress:run:firefox
```

## Viewports

Test sets the width to 1920px and the height to 1080px by default. To use custom viewport, use `--config` parameter.

```sh
npm run cypress -- run -b firefox --config viewportWidth=1280,viewportHeight=720
```

## Testing API requests

The website use the Fetch API which is not supported by Cypress - https://docs.cypress.io/api/commands/route.html
