const socketio = require('socket.io');

let waitingList = {};
const rooms = new Map();

module.exports = function socket(serveur) {
    const io = socketio(serveur, {
        cookie: false
    });
    io.on('connection', (socket) => {
        const clientId = socket.handshake.query.userId;
        waitingList[clientId] = socket.handshake.query.userData;
        socket.join(clientId);
        socket.join('waitingRoom');

        socket.on('stream1Signal', (signal) => {
            socket.leave('waitingRoom');
            const targetId = rooms.get(clientId);
            io.sockets.to(targetId).emit('stream2Signal', signal);
        });

        socket.on('stream2Signal', (signal) => {
            const targetId = rooms.get(clientId);
            io.sockets.to(targetId).emit('stream1Signal', signal);
        });

        socket.on('disconnect', function () {
            rooms.delete(clientId);
            delete waitingList[clientId];
            updateWaitingList();
        });

        updateWaitingList();
        rouletteProcess();
    });

    function rouletteProcess() {
        const length = Object.keys(waitingList).length
        const waintingRoomSize = 4;
        if (length >= waintingRoomSize && length % 2 === 0) {
            const ids = [];
            for (let cliId in waitingList) {
                ids.push(cliId);
            }
            ids.sort(function () { return 0.5 - Math.random() });
            for (let i = 0; i < length; i += 2) {
                const client1 = ids[i];
                const client2 = ids[i + 1];
                rooms.set(client1, client2);
                rooms.set(client2, client1);
                io.sockets.to(client1).emit('room_started', {userData: waitingList[client2], id: client2});
                io.sockets.to(client2).emit('room_started', {userData: waitingList[client1], id: client1});
            }
            waitingList = {};
        }
    }

    function updateWaitingList() {
        io.sockets.to('waitingRoom').emit('waitingList_updated', waitingList);
    }

};
