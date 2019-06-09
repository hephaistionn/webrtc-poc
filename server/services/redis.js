const redis = require('redis');
const Promise = require('bluebird');
const NRP = require('node-redis-pubsub');
const config = require('../config.js');
Promise.promisifyAll(redis);
let client;


module.exports.launch = function () {

  return new Promise(function (resolve, reject) {
    client = redis.createClient({ retry_strategy });

    client.on('connect', async function () {
      console.info('[Redis] client connected');
      await module.exports.clearAll();
      const config = {
        emitter: redis.createClient(),
        receiver: redis.createClient()
      }
      module.exports.nrp = new NRP(config);
      resolve();
    });

    client.on('error', function (err) {
      console.info('[Redis] something went wrong ', err.code);
    });

    function retry_strategy(options) {
      if (options.attempt > 2) {
        console.info('[Redis] redis is disabled');
        reject(false);
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

module.exports.clearAll = async function clearAll() {
  console.info('[Redis] Erasing all data');
  return await client.flushallAsync();
}

const waitingList = {};
waitingList.push = async function push(user) {
  await client.lremAsync('waiting', 0, user);
  await client.rpushAsync('waiting', user);
  const l = await client.llenAsync('waiting');
  console.info('[Redis] push ', user);
  if (l === 0) { // a competing action to clear the list
    await client.rpushAsync('waiting', user);
  }
}

waitingList.pushQuick = async function pushQuick(user) {
  console.info('[Redis] pushq ', user);
  client.rpushAsync('waiting', user);
}

waitingList.get = async function get() {
  return client.lrangeAsync('waiting', 0, (config.waintingRoomSize - 1));
}

waitingList.remove = async function remove(user) {
  return await client.lremAsync('waiting', 0, user);
}

waitingList.clear = async function clear() {
  return client.delAsync('waiting');
}

waitingList.busy = async function (value) {
  return client.getsetAsync('busy', value);
}

module.exports.waitingList = waitingList;

const rooms = {};
rooms.set = async function (userId1, userId2) {
  return await client.setAsync(userId1, userId2);
}

rooms.get = async function (userId1) {
  return client.getAsync(userId1);
}

rooms.remove = async function (userId1) {
  return client.delAsync(userId1);
}

module.exports.rooms = rooms;
