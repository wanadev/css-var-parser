// const postcss = require("postcss");
import postcss from "postcss";

function isVariableDeclaration(decl) {
    return Boolean(decl.value) && decl.value.startsWith("var(--");
}

function parse(css, options = {}) {
    const root = postcss.parse(css, {
        from: options.from,
        parser: options.parser,
    });

    const variables = [];
    root.walkRules((rule) => {
        rule.each((decl) => {
            if (isVariableDeclaration(decl)) {
                const name = decl.prop;
                const cssVariables = extractCssVarDeclaration(decl.value)
                const defaultCssVariables = extractDefaultValueForCssVar(decl.value)

                let variable = variables.find((element) => element.selector === rule.selector)
                if (!variable) {
                    variable = {
                        selector: rule.selector,
                        properties: []
                    }
                    variables.push(variable)
                }

                let property = variable.properties.find((element) => element.propertyName === name)
                if (!property) {
                    property = {
                        propertyName: name,
                        variables: [],
                        defaultValue: defaultCssVariables
                    }
                    variable.properties.push(property)
                }

                for (let i = 0; i < cssVariables.length; i++) {
                    const objet = {
                        name: cssVariables[i],
                        fallback: (i + 1 < cssVariables.length) ? cssVariables[i + 1] : undefined
                    }
                    property.variables.push(objet)
                }
            }
        })
    })

    return variables
}

function extractCssVarDeclaration(string) {
    const regex = /var\((--[\w-]+)(?=[,)])/g
    // .*var\(.*, ?(\w+)\)*
    //   const regex = /var\((--\w+)(?=[,)])/g;
    const matches = []
    let match
    while ((match = regex.exec(string)) !== null) {
        matches.push(match[1])
    }

    return matches
}

function extractDefaultValueForCssVar(string) {
    const regex = /var\(.*, ?(#?-?\w+)\)*/g
    let match = regex.exec(string)
    if (match ===null) {
        return undefined
    }
    return match[1]
}
const array = [];

export default {
    parse
}
