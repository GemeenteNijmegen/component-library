const assetPath = process.env.NODE_ENV !== 'development' ? '%%HOSTNAME%%' : '';
$('#mdb-lightbox-ui').load(`${assetPath}/mdb-addons/mdb-lightbox-ui.html`);
