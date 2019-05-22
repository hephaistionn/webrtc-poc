
const path = require('path');
const fs = require("fs");
const config = require('../config.js');
if(config.isProd) {
  exports.key = fs.readFileSync(path.join(__dirname, './dev/key.pem')).toString();
  exports.cert = fs.readFileSync(path.join(__dirname, './dev/cert.pem')).toString();
  exports.passphrase = 'This is my project';
} else {
  exports.key = fs.readFileSync(path.join(__dirname, './dev/key.pem')).toString();
  exports.cert = fs.readFileSync(path.join(__dirname, './dev/cert.pem')).toString();
  exports.passphrase = 'This is my project';
}
