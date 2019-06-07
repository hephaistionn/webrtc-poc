exports.isHeroku = !!process.env.HEROKU;
exports.isProd = process.env.NODE_ENV === 'production';
exports.port = process.env.PORT || 3000;
exports.waintingRoomSize = 4; // must be an even number

console.info('[ENV] isHeroku : ', exports.isHeroku);
console.info('[ENV] isProd : ', exports.isProd);
console.info('[ENV] port : ', exports.port);
console.info('[ENV] waintingRoomSize : ', exports.waintingRoomSize);
