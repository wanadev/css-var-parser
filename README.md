# CSS Var Parser

## Install

```sh
npm install @wanadev/css_var_parser
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
