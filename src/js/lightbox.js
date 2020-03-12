const getVersion = require('../../helpers/getVersion');

const assetPath = process.env.NODE_ENV !== 'development' ? '/v' + getVersion() : '';
$('#mdb-lightbox-ui').load(`${assetPath}/mdb-addons/mdb-lightbox-ui.html`);
