const { When } = require('cucumber');
const openUrl = require('cucumber-puppeteer/features/support/action/openUrl');

const noCaretStyle = { content: '* { caret-color: transparent !important; }' };

When('I open the component {string}', async function(componentName) {
    const url = `/components/preview/${componentName}`;
    await openUrl.call(this, url);
    await this.page.addStyleTag(noCaretStyle);
});