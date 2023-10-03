import parser from './parser'

test('should example be successfully parsed', () => {
    const cssContent = `#element.disabled {
        border-left-width: var(--Element_border-left-width--disabled, var(--Radio_border-width--disabled, var(--LC-border-width--disabled, 1px)));
    }`

    const expectedResult = [
        {
            selector: '#element.disabled',
            properties: [
                {
                    propertyName: 'border-left-width',
                    variables: [
                        {
                            name: '--Element_border-left-width--disabled',
                            fallback: '--Radio_border-width--disabled',
                        },
                        {
                            name: '--Radio_border-width--disabled',
                            fallback: '--LC-border-width--disabled',
                        },
                        {
                            name: '--LC-border-width--disabled',
                            fallback: undefined,
                        },
                    ],
                    defaultValue: '1px',
                },
            ],
        },
    ]
    const result = parser.parse(cssContent)

    expect(result).toStrictEqual(expectedResult)
})

test('should default value be successfully parsed when it is a hexa value', () => {
    const cssContent = `#element.Element--selected {
        border-left-color: var(--Element_border-left-color--selected, var(--Element_border-color--selected, var(--LC-border-color--selected, #6441da)));
    }`

    const expectedResult = [
        {
            selector: '#element.Element--selected',
            properties: [
                {
                    propertyName: 'border-left-color',
                    variables: [
                        {
                            name: '--Element_border-left-color--selected',
                            fallback: '--Element_border-color--selected',
                        },
                        {
                            name: '--Element_border-color--selected',
                            fallback: '--LC-border-color--selected',
                        },
                        {
                            name: '--LC-border-color--selected',
                            fallback: undefined,
                        },
                    ],
                    defaultValue: '#6441da',
                },
            ],
        },
    ]
    const result = parser.parse(cssContent)

    expect(result).toStrictEqual(expectedResult)
})

test('should be successfully parsed with one variable set', () => {
    const cssContent = `
    #frame > label {
        font-size: var(--Label-label_font-size, 14px);
    }`

    const expectedResult = [
        {
            selector: '#frame > label',
            properties: [
                {
                    propertyName: 'font-size',
                    variables: [
                        {
                            name: '--Label-label_font-size',
                            fallback: undefined,
                        },
                    ],
                    defaultValue: '14px',
                },
            ],
        },
    ]
    const result = parser.parse(cssContent)

    expect(result).toStrictEqual(expectedResult)
})

test('should be successfully parsed with no default value', () => {
    const cssContent = `
    #frame > label {
        font-size: var(--Label-label_font-size);
    }`

    const expectedResult = [
        {
            selector: '#frame > label',
            properties: [
                {
                    propertyName: 'font-size',
                    variables: [
                        {
                            name: '--Label-label_font-size',
                            fallback: undefined,
                        },
                    ],
                    defaultValue: undefined,
                },
            ],
        },
    ]
    const result = parser.parse(cssContent)

    expect(result).toStrictEqual(expectedResult)
})

test('should be successfully parsed when default value is a calc css function', () => {
    const cssContent = `
    #root-element {
        width: var(--Element_width, calc(1em - 1px));
    }`

    const expectedResult = [
        {
            selector: '#root-element',
            properties: [
                {
                    propertyName: 'width',
                    variables: [
                        {
                            name: '--Element_width',
                            fallback: undefined,
                        },
                    ],
                    defaultValue: 'calc(1em - 1px)',
                },
            ],
        },
    ]
    const result = parser.parse(cssContent)

    expect(result).toStrictEqual(expectedResult)
})

test('should be successfully parsed when default value is rgba css function', () => {
    const cssContent = `
    #root-element {
        background: var(--Element_background--hover--on, var(--Element_background, rgba(100, 65, 218, 0.3)));
    }`

    const expectedResult = [
        {
            selector: '#root-element',
            properties: [
                {
                    propertyName: 'background',
                    variables: [
                        {
                            name: '--Element_background--hover--on',
                            fallback: '--Element_background',
                        },
                        {
                            name: '--Element_background',
                            fallback: undefined,
                        },
                    ],
                    defaultValue: 'rgba(100, 65, 218, 0.3)',
                },
            ],
        },
    ]
    const result = parser.parse(cssContent)

    expect(result).toStrictEqual(expectedResult)
})
