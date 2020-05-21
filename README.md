[![Netlify Status](https://api.netlify.com/api/v1/badges/d06b16cc-fdd2-48b4-893b-b7ab4082aa45/deploy-status)](https://app.netlify.com/sites/elated-saha-4047e5/deploys)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Commits

This project uses Conventional Commits. Use `git commit` and follow the instructions.

- https://www.conventionalcommits.org/en/v1.0.0/
- https://github.com/conventional-changelog
- https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular

## Release

Use Standard Version to automatically update the version, generate changelog, create a commit and a tag.

```sh
npm run release
```

- https://github.com/conventional-changelog/standard-version

## Docstrings

Use https://github.com/microsoft/tsdoc.

## i18n

```sh
npm run i18next
```

## TODO

- Try to use react-hook-from `Controller`: https://react-hook-form.com/api/#Controller
- Try to implement route-based code splitting: https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
- Get rid of all `any` in types
- Context for each page
