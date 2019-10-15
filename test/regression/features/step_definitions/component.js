const { When } = require('cucumber');
const openUrl = require('cucumber-puppeteer/features/support/action/openUrl');

const globalStyle = { content: '* { caret-color: transparent !important; transition: none !important }' };

When('I open the component {string}', async function(componentName) {
    const url = `/components/preview/${componentName}`;
    await openUrl.call(this, url);
    await this.page.addStyleTag(globalStyle);
});
