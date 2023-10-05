# CSS Var Parser

[![Lint and test](https://github.com/wanadev/css-var-parser/actions/workflows/tests.yml/badge.svg)](https://github.com/wanadev/css-var-parser/actions/workflows/tests.yml)
[![NPM Version](http://img.shields.io/npm/v/css-var-parser.svg?style=flat)](https://www.npmjs.com/package/css-var-parser)
[![License](http://img.shields.io/npm/l/css-var-parser.svg?style=flat)](https://github.com/wanadev/css-var-parser/blob/master/LICENSE)
[![Discord](https://img.shields.io/badge/chat-Discord-8c9eff?logo=discord&logoColor=ffffff)](https://discord.gg/BmUkEdMuFp)

## Install

```sh
npm install css-var-parser
```

## Usage

CSS Example :

```css
#element.disabled {
    border-left-width: var(--Element_border-left-width--disabled, var(--Radio_border-width--disabled, var(--LC-border-width--disabled, 1px)));
}
```

JS Example :

```js
import { readFileSync } from "fs";
import css_var_parser from "./src/parser.js";


import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const cssContent = readFileSync(__dirname + "/index.css", "utf-8");
const variables = css_var_parser.parse(cssContent);

console.log(JSON.stringify(variables));
```

Output:

```js
[
  {
    selector: "#element.disabled",
    properties: [
      {
        propertyName: "border-left-width",
        variables: [
          {
            name: "--Element_border-left-width--disabled",
            fallback: "--Radio_border-width--disabled",
          },
          {
            name: "--Radio_border-width--disabled",
            fallback: "--LC-border-width--disabled",
          },
          {
            name: "--LC-border-width--disabled",
            fallback: undefined,
          },
        ],
        defaultValue: "1px",
      }
    ]
  }
]
```

## Changelog

* **[NEXT]** (changes on master that have not been released yet):

    * Changed package name for its first public release
    * First public release
