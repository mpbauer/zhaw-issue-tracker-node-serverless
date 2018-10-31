var express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var projectRouter = require('./routes/projectRouter');
var cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.disable('etag'); // Sets ‘Last-Modified’ to now to avoid 304 Not Modified

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(cookieParser());
app.use('/api/projects', projectRouter);

module.exports = app;
