const { When } = require('cucumber');
const clickElement = require('cucumber-puppeteer/features/support/action/clickElement');
const selectors = require('./selectors');

When('I click on the {string}', async function(element) {
    await clickElement.call(this, selectors[element]);
});
