import Promise from 'bluebird';
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const config = require('../config');

/*
 * 利用 bluebird 將 mongoose 轉換成可以使用 promise
 */
Promise.promisifyAll(mongoose);

mongoose.connectAsync(`${config.mongodb.host}/${config.mongodb.dbName}`);
const connection = mongoose.connection;
console.log(`mongodb connect to: ${config.mongodb.host}/${config.mongodb.dbName}`);
autoIncrement.initialize(connection);

const user = require('./user');

module.exports = {
    // 後台管理者
    user: user
};
