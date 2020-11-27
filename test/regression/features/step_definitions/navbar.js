const { When, Then } = require('cucumber');
const pressKey = require('cucumber-puppeteer/features/support/action/keyboardPress');
const checkUrlContains = require('cucumber-puppeteer/features/support/check/checkUrlContains');
const { expect } = require('chai');

When('I press enter on an internal link', async function() {
    await pressKey.call(this, 'Enter', '[href="#section-4"]');
});

When('I press enter on an internal link for a different page', async function() {
    await pressKey.call(this, 'Enter', '.navbar-nav .nav-link:nth-child(2)');
});

When('I press enter on an external link', async function() {
    await pressKey.call(this, 'Enter', '[href="https://nijmegen.nl"]');
});

Then('I scroll to the correct item on the page', async function() {
    const hash = await this.page.evaluate(() => window.location.hash);
    expect(hash).to.contain('#section-4');

    await this.page.waitFor(700);
    const isVisible = await this.page.$eval('#section-4', e => {
        const top = e.getBoundingClientRect().top;
        return top >= 0 && top <= window.innerHeight;
    });

    expect(isVisible, 'The element #section-4 is not visible in the current viewport').to.be.true;
});

Then('I navigate to the external page', async function() {
    await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    await checkUrlContains.call(this, false, 'nijmegen.nl');
});

Then('I navigate to the other internal page', async function() {
    await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    await checkUrlContains.call(this, false, 'navbar--no-search');
});
