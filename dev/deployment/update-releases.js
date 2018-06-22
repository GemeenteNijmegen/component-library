const getCurrentVersions = require('./common.js').getCurrentVersions;
const updateReleases = require('./common.js').updateReleases;

const update = () => {
  console.log('======================');
  console.log('Update releases');
  console.log("======================\n");

  getCurrentVersions((currentReleases) => {
    const branch = process.env.CI_COMMIT_REF_NAME === 'master' ?
      'latest' : process.env.CI_COMMIT_REF_NAME.split('/').pop();

    const newRelease = { [branch]: process.env.DOCKER_TAG};
    currentReleases = {
      ...currentReleases,
      ...newRelease
    };
    updateReleases(currentReleases);
  });

};

(() => {
  try {
    update();
  } catch (e) {
    console.error(e);
    const process = require('process');
    process.exit(1);
  }
})();
