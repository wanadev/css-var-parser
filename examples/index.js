import { readFileSync } from "fs";
import css_var_parser from "../src/parser.js";


import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const cssContent = readFileSync(__dirname + "/index.css", "utf-8");
const variables = css_var_parser.parse(cssContent);

console.log(JSON.stringify(variables));
