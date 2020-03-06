const { When } = require('cucumber');
const openUrl = require('cucumber-puppeteer/features/support/action/openUrl');
const waitFor = require('cucumber-puppeteer/features/support/action/waitFor');
const { expect } = require('chai');

const globalStyle = { content: '* { caret-color: transparent !important; transition: none !important }' };

When('I open the component {string}', async function(componentName) {
    const url = `/components/preview/${componentName}.html`;
    const [, response] = await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        openUrl.call(this, url),
    ]);
    await this.page.addStyleTag(globalStyle);
    await waitFor.call(this, 0.5);
    expect(response.status(), `Loading url: ${url} failed`).to.be.within(200, 299);
});
