module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          "{}": false,
        },
      },
    ],
    // 'vue/multi-word-component-names': "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "no-unused-vars": "off",
  },
};
