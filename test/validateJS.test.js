/* eslint-env jest */
const { JSHINT } = require('jshint');
const jquery = require('jquery');
const glob = require('glob');
const { readFileSync } = require('fs');

describe('Validate js for all scripts', () => {
    const jshintConfig = JSON.parse(readFileSync('components/_includes/scripts/.jshintrc'));
    const files = glob.sync('components/_includes/scripts/**/*.hbs');
    it.each(files)('The script %s should be valid es5', file => {
        const contents = readFileSync(file).toString();
        const html = jquery.parseHTML(contents, null, true);
        const errors = html.reduce((errors, element) => {
            if (element.type == '' || element.type == 'text/javascript') {
                JSHINT(element.text, jshintConfig, {});
                return errors.concat(
                    JSHINT.errors.map(error => ({
                        line: error.line,
                        reason: error.reason,
                        code: error.evidence,
                        errorType: error.code,
                    })),
                );
            }
            return errors;
        }, []);

        expect(errors).toHaveLength(0);
    });
});
