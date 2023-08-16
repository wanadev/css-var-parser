const postcss = require("postcss");

function isVariableDeclaration(decl) {
    return Boolean(decl.value) && decl.value.startsWith("var(--");
}

function parse(css, options = {}) {
    const root = postcss.parse(css, {
        from: options.from,
        parser: options.parser,
    });

    const variables = {};
    root.walkRules((rule) => {
        rule.each((decl) => {
            if (isVariableDeclaration(decl)) {
                const name = decl.prop;
                const meh = extractCssVarDeclaration(decl.value);
                if (!variables[rule.selector]) {
                    variables[rule.selector] = {};
                }
                variables[rule.selector][name] = meh;
            }
        });
    });

    return variables;
}

function extractCssVarDeclaration(string) {
    const regex = /var\((--[\w-]+)(?=[,)])/g;
    //   const regex = /var\((--\w+)(?=[,)])/g;
    matches = [];
    while ((match = regex.exec(string)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}
const array = [];

module.exports = {
    parse,
};
