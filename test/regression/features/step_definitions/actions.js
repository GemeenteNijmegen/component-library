const { When } = require('cucumber');
const clickElement = require('cucumber-puppeteer/features/support/action/clickElement');
const selectors = require('./selectors');

When('I click on the {string}', async function(element) {
    await clickElement.call(this, selectors[element]);
});

When('I type {string} in the {string}', async function(text, element) {
    await typeAString.call(this, text, selectors[element]);
});

const typeAString = async function(text, selector) {
    if (selector) {
        await this.page.focus(selector);
    }
    await this.page.keyboard.type(text, { delay: 50 });
};
