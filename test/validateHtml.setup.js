const handlebars = require('handlebars');

const mockPartials = ['@tpl-popover'];
const mockHelpers = [
    { name: 'render', return: '' },
    { name: 'mdbootstrapPath', return: 'http://mock/' },
    { name: 'assetPath', return: 'http://mock/' },
];

mockPartials.map(partialName => handlebars.registerPartial(partialName, ''));
mockHelpers.map(helper => handlebars.registerHelper(helper.name, () => helper.return));
