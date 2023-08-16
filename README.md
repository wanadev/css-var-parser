# CSS Var Parser

## Install

```sh
npm install <package-name>
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
const fs = require("fs");
const cssVariablesParser = require("css-var-parser");

const cssContent = fs.readFileSync("index.css", "utf-8");
const variables = cssVariablesParser.parse(cssContent);

console.log(variables);
```

Output:

```js
{
  '#element.disabled': {
    'border-left-width': [
      '--Element_border-left-width--disabled',
      '--Radio_border-width--disabled',
      '--LC-border-width--disabled'
    ]
  }
}
```
