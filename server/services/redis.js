const redis = require('redis');
const Promise = require('bluebird');
Promise.promisifyAll(redis);
let client;
const config = require('../config.js');
let noRedis = true;
let waiting = [];
let rooms = {};

module.exports.launch = function () {

  return new Promise(function (resolve) {
    client = redis.createClient({ retry_strategy });
    client.on('connect', async function () {
      console.info('[Redis] client connected');
      noRedis = true;
      await module.exports.clearAll();
      resolve(true);
    });
    client.on('error', function (err) {
      console.info('[Redis] something went wrong ', err.code);
    });

    function retry_strategy(options) {
      if (options.attempt > 2) {
        console.info('[Redis] redis disabled, use of local memory');
        noRedis = true;
        module.exports.clearAll();
        resolve(false);
        return undefined;
      }
      if (options.error && (options.error.code === 'ECONNREFUSED' || options.error.code === 'NR_CLOSED')) {
        console.error('[Redis] The server refused the connection. Retrying connection...');
        return 300;
      }
      return Math.min(options.attempt * 100, 3000);
    }
  });
}

module.exports.clearAll = async function () {
  console.info('[Redis] Erasing all data');
  if (!noRedis) {
    return await client.flushallAsync();
  } else {
    waiting = [];
    rooms = {};
  }
}

module.exports.setKeyValue = async function (key, value) {
  return await client.setAsync(key, value);
}

module.exports.getKeyValue = async function (key) {
  return client.getAsync(key);
}

module.exports.pushArrayValue = async function (key, value) {
  return client.rpushAsync(key, value);
}

module.exports.getArraySize = async function (key) {
  return client.llenAsync(key);
}

module.exports.getArray = async function (key, size) {
  if (size === undefined) size = -1;
  size--
  return client.lrangeAsync(key, 0, size);
}

module.exports.removeArray = async function (key) {
  return await client.delAsync(key);
}

module.exports.removeArrayValue = async function (key, value) {
  return await client.lremAsync(key, 0, value);
}

module.exports.waitingList = {};
module.exports.waitingList.push = async function (user) {
  let index = 0;
  if (!noRedis) {
    index = await client.rpushAsync('waiting', user);
  } else {
    waiting.push(user);
    index = waiting.indexOf(user) + 1;
  }

  if (index < config.waintingRoomSize) { //temps que la waitingList n'est pas complete
    return false;
  } else if (index === config.waintingRoomSize) {
    return true;
  } else { // temps que waitingList n'a pas été vidé
    const value = await module.exports.pushInWaitingList(user);
    return value;
  }
}

module.exports.waitingList.get = async function () {
  if (!noRedis) {
    return client.lrangeAsync('waiting', 0, (config.waintingRoomSize - 1));
  } else {
    return waiting.slice(0, config.waintingRoomSize);
  }
}

module.exports.waitingList.remove = async function (user) {
  if (!noRedis) {
    return await client.lremAsync('waiting', 0, user);
  } else {
    const index = waiting.indexOf(user);
    waiting.splice(index, 1);
  }
}

module.exports.waitingList.clear = async function () {
  if (!noRedis) {
    return client.delAsync('waiting');
  } else {
    waiting.splice(0, waiting.length);
  }
}
module.exports.rooms = {};
module.exports.rooms.set = async function (userId1, userId2) {
  if (!noRedis) {
    return await client.setAsync(userId1, userId2);
  } else {
    return rooms[userId1] = userId2;
  }
}

module.exports.rooms.get = async function (userId1) {
  if (!noRedis) {
    return client.getAsync(userId1);
  } else {
    return rooms[userId1];
  }
}

module.exports.rooms.remove = async function (userId1) {
  if (!noRedis) {
    return client.delAsync(userId1);
  } else {
    delete rooms[userId1];
  }
}
