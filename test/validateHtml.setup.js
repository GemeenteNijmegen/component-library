const handlebars = require('handlebars');

const mockPartials = ['@tpl-popover', '@progressbar-example-scripts'];
const mockHelpers = [
    { name: 'render', return: '' },
    { name: 'mdbootstrapPath', return: 'http://mock/' },
    { name: 'assetPath', return: 'http://mock/' },
];
const mockContext = { searchAction: '/' };
const mock = () => {
    mockPartials.map(partialName => handlebars.registerPartial(partialName, ''));
    mockHelpers.map(helper => handlebars.registerHelper(helper.name, () => helper.return));
};

module.exports = { mockContext, mock };
