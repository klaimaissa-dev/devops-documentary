const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        require:   "readonly",
        module:    "readonly",
        exports:   "readonly",
        process:   "readonly",
        __dirname: "readonly",
        console:   "readonly",
      },
    },
  },
  {
    files: ["src/__tests__/**/*.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it:       "readonly",
        expect:   "readonly",
        jest:     "readonly",
        beforeAll:"readonly",
        afterAll: "readonly",
        require:  "readonly",
      },
    },
  },
];
