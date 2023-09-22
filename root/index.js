var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
        var version = JSON.parse(httpRequest.responseText);
        location.href = '/v' + version.latest + '/';
    }
};
httpRequest.open('GET', '/version.json', true);
httpRequest.send();
