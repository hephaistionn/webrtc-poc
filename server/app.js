const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')();
const bodyParser = require('body-parser').json()
const middlewareError = require('./middleware/error');
const socket = require('./services/socket');

// loading middleware
app.use(cookieParser, bodyParser);

// loading routes
app.use('/', express.static('client/.dist'));

// loading api
//app.use('/api/', apiArticle, apiMember, apiComment, apiMessage, apiDocument)

// loading error middleware
app.use(middlewareError);

const PORT = process.env.PORT || 3000;

const serveur = app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT} !`);
});

socket(serveur);
