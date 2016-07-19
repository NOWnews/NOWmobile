import express from 'express';

const controllers = require('./mobile_web/controllers');
const middlewares = require('./mobile_web/middlewares');
const errorHandlers = require('./mobile_web/errorHandlers');

let app = express();

// middlewares
app.use(middlewares(app));

// controllers
app.use(controllers(app));

// errorHandles
app.use(errorHandlers(app));

module.exports = app;
