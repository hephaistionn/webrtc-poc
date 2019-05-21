const path = require('path');
module.exports = function (req, res, next) {
  const ua = req.headers['user-agent'];
  if (!/facebook|bot|Validator|Share|preview/i.test(ua)) {
    return next();
  }
  res.sendFile(path.resolve(__dirname, '../../client/assets/prerender.html'));
}