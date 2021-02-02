module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    es6: true,
    node: true,
    browser: true,
    ecmaVersion: 7,
    sourceType: "module"
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017
  }
};
