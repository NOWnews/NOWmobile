import express from 'express';

const controllers = require('./mobile/controllers');
const middlewares = require('./mobile/middlewares');
const errorHandlers = require('./mobile/errorHandlers');

let app = express();

// middlewares
app.use(middlewares(app));

// controllers
app.use(controllers(app));

// errorHandles
app.use(errorHandlers(app));

module.exports = app;
