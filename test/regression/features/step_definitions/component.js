const { When } = require('cucumber');
const openUrl = require('cucumber-puppeteer/features/support/action/openUrl');
const waitFor = require('cucumber-puppeteer/features/support/action/waitFor');

const globalStyle = {
    content: `
*,
*::after,
*::before {
    transition-delay: 0s !important;
    transition-duration: 0s !important;
    animation-delay: -0.0001s !important;
    animation-duration: 0s !important;
    animation-play-state: paused !important;
    caret-color: transparent !important;
    color-adjust: exact !important;
    transition: none !important;
}`,
};

When('I open the component {string}', async function(componentName) {
    const url = `/components/preview/${componentName}`;
    await Promise.all([this.page.waitForNavigation({ waitUntil: 'networkidle0' }), openUrl.call(this, url)]);
    await this.page.addStyleTag(globalStyle);
    await waitFor.call(this, 0.5);
});
