import fetch from 'node-fetch';

module.exports = function(url) {
    let fetchUrl = `${config.apiServer}/${url}`;

    return fetch(fetchUrl, {
            timeout: 5000,
            headers: {
                'X-NOWnews-API': 'NOWnewsTaiwanNumberOne'
            }
        })
        .then((res) => res.json())
        .then((json) => Promise.resolve(json));
};
