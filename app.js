var express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var projectRouter = require('./routes/projectRouter');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());

app.use('/api/projects', projectRouter);

module.exports = app;
