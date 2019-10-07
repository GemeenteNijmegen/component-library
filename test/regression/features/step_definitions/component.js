const { When } = require('cucumber');
const openUrl = require('cucumber-puppeteer/features/support/action/openUrl');

When('I open the component {string}', async function(componentName) {
    const ext = process.env.COMPONENT_EXT ? process.env.COMPONENT_EXT : '';
    const url = `/components/preview/${componentName}${ext}`;
    await openUrl.call(this, url);
});
