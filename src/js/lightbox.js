const assetPath = process.env.NODE_ENV !== 'development' ? '/' + process.env.npm_package_version : '';
$('#mdb-lightbox-ui').load(`${assetPath}/mdb-addons/mdb-lightbox-ui.html`);
