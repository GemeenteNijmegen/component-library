const getCurrentVersions = require('./common.js').getCurrentVersions;

const prepareDeploymentFiles = () => {
  console.log('======================');
  console.log('Prepare deployment');
  console.log("======================\n");

  getCurrentVersions((releases) => {
    let dockerCompose =
`version: '3.3'
services:
  nginx-proxy:
    image: upstreamable/nginx-proxy:alpine-0.7.0
    ports:
      - "8083:80"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
`;

    for (const release in releases) {
      let virtualPath = `/v${release}`;
      if (release === process.env.STABLE_RELEASE) {
        virtualPath = `~^/(v${release}|$$)`;
      }
      dockerCompose = dockerCompose +
`  componentlibrary-${release}:
    image: ${process.env.CI_REGISTRY_IMAGE}:${releases[release]}
    environment:
      VIRTUAL_HOST: ${process.env.CI_ENVIRONMENT_URL.replace(/https:\/\//, '')}
      VIRTUAL_PATH: ${virtualPath}
    deploy:
      replicas: 2
      update_config:
        parallelism: 1
        delay: 5s
        monitor: 2s
`;
    }

    const fs = require('fs');
    fs.writeFile('docker-compose-stack.yml', dockerCompose, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log('File written');
    });
  });
};

(() => {
  try {
    prepareDeploymentFiles();
  } catch (e) {
    const process = require('process');
    process.exit(1);
  }
})();
