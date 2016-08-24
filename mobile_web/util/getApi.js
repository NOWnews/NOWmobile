import fetch from 'node-fetch';

module.exports = function(url) {
  let fetchUrl = `${config.apiServer}/${url}`;
  return fetch(fetchUrl, {
      timeout: 3000
  }).then((res) => res.json())
  .then((json) => Promise.resolve(json));
}
