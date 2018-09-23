var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/projects', function (req, res) {
    res.send('GET: /api/projects');
});

app.post('/api/projects', function (req, res) {
    res.send('POST: /api/projects');
});

app.get('/api/projects/:project_id', function (req, res) {
    res.send('GET: /api/projects/:project_id');
});

app.put('/api/projects/:project_id', function (req, res) {
    res.send('PUT: /api/projects/:project_id');
});

app.delete('/api/projects/:project_id', function (req, res) {
    res.send('DELETE: /api/projects/:project_id');
});

app.get('/api/projects/:project_id/issues', function (req, res) {
    res.send('GET: /api/projects/:project_id/issues');
});

app.post('/api/projects/:project_id/issues', function (req, res) {
    res.send('POST: /api/projects/:project_id/issues');
});

app.put('/api/projects/:project_id/issues/:id', function (req, res) {
    res.send('PUT: /api/projects/:project_id/issues/:id');
});

app.delete('/api/projects/:project_id/issues/:id', function (req, res) {
    res.send('DELETE: /api/projects/:project_id/issues/:id');
});

module.exports = app;
