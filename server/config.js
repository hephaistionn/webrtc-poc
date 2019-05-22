exports.isHeroku = !!process.env.HEROKU;
exports.isProd = process.env.NODE_ENV === 'production';
exports.port = process.env.PORT || 3000;

console.log('config.isHeroku : ', exports.isHeroku);
console.log('config.isProd : ', exports.isProd);
console.log('config.port : ', exports.port);
