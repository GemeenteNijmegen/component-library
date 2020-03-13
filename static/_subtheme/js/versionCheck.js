(function() {
    function setNotLatestMessage(latest) {
        var element = document.querySelector('.Header-version');
        element.classList.remove('Header-version--latest');
        element.querySelector('.Header-latest-version').innerHTML = latest;
    }

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            var version = JSON.parse(httpRequest.responseText);
            if (version.latest !== window.frctl.version) {
                setNotLatestMessage(version.latest);
            }
        }
    };
    httpRequest.open('GET', '/version.json', true);
    httpRequest.send();
})();
