const express = require('express');
const app = express();
const compression = require('compression');
const cookieParser = require('cookie-parser')();
const bodyParser = require('body-parser').json()
const middlewareError = require('./middleware/error');
const isBot = require('./middleware/isBot');
const socket = require('./services/socket');
const https = require('https');
const http = require('http');
const sslConfig = require('./certificates/ssl-config');
const config = require('./config.js');

app.use(compression());
app.use(cookieParser, bodyParser);
app.get('/', isBot);
app.use('/', express.static('client/.dist'));
app.use(middlewareError);

let server;
if (config.isProd && !config.isHeroku) {
  server = https.createServer(sslConfig, app).listen(config.port, function () {
    console.info("[Express] server listening on port " + config.port + " with ssl");
    onStart();
  });
} else {
  server = http.createServer(app).listen(config.port, function () {
    console.info("[Express] server listening on port " + config.port);
    onStart();
  });
}

function onStart() {
  socket(server);
}
