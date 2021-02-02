let preloadFiles = [];

const setPreloadFiles = newPreloadFiles => (preloadFiles = newPreloadFiles);

const getPreloadFiles = () => preloadFiles;

module.exports = { getPreloadFiles, setPreloadFiles };
