require('babel-core/register');
require('babel-polyfill');

let mobile = require('../mobile.js');
let http = require('http');

let env = process.env.NODE_ENV;
let port = process.env.PORT || '8700';
mobile.set('port', port);

var server = http.createServer(mobile);
server.listen(port);
console.log(`-------------------------------`);
console.log(`Start NOWmobile`);
console.log(`Listen Port ${port}`);
console.log(`${env} mode`);
console.log(`-------------------------------`);
