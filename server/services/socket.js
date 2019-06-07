const socketio = require('socket.io');
const redis = require('./redis');
const redisAdapter = require('socket.io-redis');
const waitingList = redis.waitingList;
const rooms = redis.rooms;

module.exports = async function socket(serveur) {

    const ok = await redis.launch();

    console.info('[SOCKET] started');
    const io = socketio(serveur, { cookie: false });
    //if redis is enabled
    if (ok) {
        console.info('[SOCKET] linked to Redis server');
        io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
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
            emitWaitingList();
        });

        socket.join(userId);

        const full = await waitingList.push(user);

        socket.join('waitingRoom');

        await emitWaitingList();

        if (full) {
            await rouletteProcess();
        }
    });

    async function rouletteProcess() {
        const list = await waitingList.get();
        const length = list.length;

        const sep = '¨^*';
        const parseList = [];
        for (let index in list) {
            parseList.push({
                id: list[index].split(sep)[0],
                userData: list[index]
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
        await waitingList.clear();
    }

    async function emitWaitingList() {
        const list = await waitingList.get();
        io.sockets.to('waitingRoom').emit('waitingList_updated', list);
    }

};
