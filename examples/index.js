const fs = require("fs");
const cssVariablesParser = require("../src/parser");

const cssContent = fs.readFileSync("./index.css", "utf-8");
const variables = cssVariablesParser.parse(cssContent);

console.log(variables);
