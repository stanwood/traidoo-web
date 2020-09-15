const fs = require("fs");
const favicons = require("favicons");

const source = "public/favicon.png";
const faviconsPath = "public";
const faviconsHtmlPath = "public/favicons.html";

const configuration = {
  path: "%PUBLIC_URL%/",
  appName: process.env.REACT_APP_CLIENT_NAME,
  appShortName: null,
  appDescription: null,
  dir: "auto",
  lang: "de-DE",
  background: process.env.REACT_APP_THEME_PALETTE_PRIMARY_COLOR,
  theme_color: process.env.REACT_APP_THEME_PALETTE_SECONDARY_COLOR,
  appleStatusBarStyle: "black-translucent",
  display: "standalone",
  orientation: "any",
  scope: "/",
  start_url: "/",
  version: "1.0",
  logging: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
  icons: {
    android: true,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: true,
  },
};

const callback = function (error, response) {
  if (error) {
    console.log(error.message);
    return;
  }

  if (!fs.existsSync(faviconsPath)) {
    fs.mkdirSync(faviconsPath);
  }

  response.images.forEach((element) => {
    fs.writeFileSync(`${faviconsPath}/${element.name}`, element.contents);
  });

  response.files.forEach((element) => {
    fs.writeFileSync(`${faviconsPath}/${element.name}`, element.contents);
  });

  fs.writeFileSync(faviconsHtmlPath, response.html.join("\n"));
};

favicons(source, configuration, callback);
