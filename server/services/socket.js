const socketio = require('socket.io');
const redis = require('./redis');
const redisAdapter = require('socket.io-redis');
const config = require('./../config');
const waitingList = redis.waitingList;
const rooms = redis.rooms;
let timer;


module.exports = async function socket(serveur) {

  await redis.launch();
  const io = socketio(serveur, { cookie: false });
  io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
  console.info('[SOCKET] started with Redis server');

  async function timeout() {
    await rouletteProcess();
  }

  if (config.instance === 0) {
    redis.nrp.on('refresh', () => {
      clearTimeout(timer);
      timer = setTimeout(timeout, config.timeoutRoulette);
    });
  }

  io.on('connection', async (socket) => {
    const userId = socket.handshake.query.userId;
    const user = socket.handshake.query.userData;

    socket.on('stream1Signal', async (signal) => {
      socket.leave('waitingRoom');
      const targetId = await rooms.get(userId);
      io.sockets.to(targetId).emit('stream2Signal', signal);
    });

    socket.on('stream2Signal', async (signal) => {
      const targetId = await rooms.get(userId);
      io.sockets.to(targetId).emit('stream1Signal', signal);
    });

    socket.on('disconnect', async () => {
      await rooms.remove(userId);
      await waitingList.remove(user);
      redis.nrp.emit('refresh', 0);
      emitWaitingList();
    });

    socket.join(userId);

    await waitingList.push(user);

    socket.join('waitingRoom');

    await emitWaitingList();

    redis.nrp.emit('refresh', 0);

    await rouletteProcess(true);
  });

  async function rouletteProcess(afterPush) {
    const oldStatus = await waitingList.busy('true');
    if (oldStatus === 'true') {
      return
    }

    const list = await waitingList.get();

    if ((!afterPush && list.length > 1) || (afterPush && list.length >= config.waintingRoomSize)) {
      const length = Math.min(list.length, config.waintingRoomSize);
      const group = list.splice(0, length);
      if (length % 2 === 0) {
        console.info('[SOCKET] start Roulette ', afterPush ? 'by push' : ' by timeout');
        const sep = '¨^*';
        const parseList = [];
        for (let index in group) {
          parseList.push({
            id: group[index].split(sep)[0],
            userData: group[index]
          });
        }
        parseList.sort(function () { return 0.5 - Math.random() });
        for (let i = 0; i < length; i += 2) {
          const client1 = parseList[i];
          const client2 = parseList[i + 1];
          await rooms.set(client1.id, client2.id);
          await rooms.set(client2.id, client1.id);
          io.sockets.to(client1.id).emit('room_started', { userData: client2.userData, id: client2.id });
          io.sockets.to(client2.id).emit('room_started', { userData: client1.userData, id: client1.id });
        }
      }
    }
    await waitingList.busy('false');
  }

  async function emitWaitingList() {
    const list = await waitingList.get();
    io.sockets.to('waitingRoom').emit('waitingList_updated', list);
  }
};
