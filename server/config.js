exports.isHeroku = !!process.env.HEROKU;
exports.isProd = process.env.NODE_ENV === 'production';
exports.port = process.env.PORT || 3000;
exports.instance = process.env.NODE_APP_INSTANCE ? parseInt(process.env.NODE_APP_INSTANCE, 10) : 0;
exports.waintingRoomSize = 9; // must be an even number
exports.timeoutRoulette = 8000; // must be an even number

console.info('[ENV] isHeroku : ', exports.isHeroku);
console.info('[ENV] isProd : ', exports.isProd);
console.info('[ENV] port : ', exports.port);
console.info('[ENV] instance : ', exports.instance);
console.info('[ENV] waintingRoomSize : ', exports.waintingRoomSize);
