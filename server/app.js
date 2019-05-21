const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')();
const bodyParser = require('body-parser').json()
const middlewareError = require('./middleware/error');
const isBot = require('./middleware/isBot');
const socket = require('./services/socket');
const http = require('http');
const https = require('https');
const production = process.env.NODE_ENV === 'production';
let server = null;

// loading middleware
app.use(cookieParser, bodyParser);

// loading routes
app.get('/', isBot);
app.use('/', express.static('client/.dist'));

// loading api
//app.use('/api/', apiArticle, apiMember, apiComment, apiMessage, apiDocument)

// loading error middleware
app.use(middlewareError);

if (production) {
  console.info('--- ssl enabled ----')
  const sslConfig = require('./ssl-config');
  const options = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate,
  };
  app.set('port', 443);
  server = https.createServer(options, app);
  express.get('*', function(req, res) {  
      res.redirect('https://' + req.headers.host + req.url);
  });
  http.createServer(express).listen(80);
} else {
  app.set('port', process.env.PORT || 3000);
  server = http.createServer(app);
}

server.listen(app.get('port'), function() {
  const baseUrl = (production ? 'https://' : 'http://') + app.get('host') + ':' + app.get('port');
  console.info('Server listening ', baseUrl);
});

socket(server);
