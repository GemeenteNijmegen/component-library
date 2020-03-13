const { When, Given } = require('cucumber');
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

Given('I throttle the network', async function() {
    const client = await this.page.target().createCDPSession();
    await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: (4 * 1024 * 1024) / 8,
        uploadThroughput: (3 * 1024 * 1024) / 8,
        latency: 20,
    });
});

When('I wait until all navigation is done', async function() {
    await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
});
