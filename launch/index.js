const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has('id')) {
    const launchID = urlParams.get('id');
}