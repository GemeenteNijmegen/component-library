const https = require('https');

module.exports.getCurrentVersions = callback => {
    https.get(
        {
            hostname: 'gitlab.enrise.com',
            path: '/api/v4/projects/102/snippets/1/raw',
            method: 'GET',
            headers: {
                'Private-Token': process.env.GITLAB_TOKEN,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        },
        response => {
            let body = '';
            response.on('data', data => {
                body += data;
            });
            response.on('end', data => {
                callback(JSON.parse(body));
            });
        },
    );
};

module.exports.updateReleases = releases => {
    const updateRequest = https.request(
        {
            hostname: 'gitlab.enrise.com',
            path: '/api/v4/projects/102/snippets/1',
            method: 'PUT',
            headers: {
                'Private-Token': process.env.GITLAB_TOKEN,
                'Content-Type': 'application/json',
            },
        },
        response => {
            let body = '';
            response.on('data', data => {
                body += data;
            });
            response.on('end', data => {
                console.log(body);
            });
        },
    );
    const data = JSON.stringify({
        code: JSON.stringify(releases),
    });
    updateRequest.write(data);
    updateRequest.end();
};
