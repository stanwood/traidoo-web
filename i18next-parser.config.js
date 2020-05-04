module.exports = {
  locales: ["en", "de"],
  output: "src/locales/$LOCALE/$NAMESPACE.json",
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  defaultValue: "__MISSING__",
  sort: true,
  createOldCatalogs: false,
};
