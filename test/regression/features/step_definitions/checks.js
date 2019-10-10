const { Then } = require('cucumber');
const checkElementVisible = require('cucumber-puppeteer/features/support/check/checkElementVisible');
const selectors = require('./selectors');

Then('I expect the {string} to be visible', async function(element) {
    await checkElementVisible.call(this, selectors[element]);
});

Then('I expect the {string} to be not visible', async function(element) {
    await checkElementVisible.call(this, selectors[element], true);
});
