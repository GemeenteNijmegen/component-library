/* eslint-env jest */
require('regenerator-runtime/runtime');
const validator = require('html-validator');
const glob = require('glob');
const { readFileSync } = require('fs');
const handlebars = require('handlebars');

const { mock, mockContext } = require('./validateHtml.setup');

describe('Validate html for every component', () => {
    mock();
    const files = glob.sync('components/!(_includes|templates)/**/!(_preview*).hbs');
    it.each(files)('The file %s should not have validation errors', async file => {
        const hbs = readFileSync(file).toString();
        const template = handlebars.compile(hbs);
        const html = template(mockContext);
        const result = JSON.parse(
            await validator({
                isFragment: true,
                data: html,
                validator: process.env.HTML_VALIDATOR_URL,
            })
        );
        expect(result.messages).toHaveLength(0);
    });
});
