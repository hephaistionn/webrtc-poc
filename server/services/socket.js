const socketio = require('socket.io');

const users = new Map();
const rooms = new Map();

const AVAILABLE = 0;
const BUSY = 1;
const BREAK = 2;

const waintingRoomSize = 2;

let waitingList = [];

module.exports = function socket(serveur) {
    const io = socketio(serveur);

    io.on('connection', (socket) => {

        const clientId = socket.handshake.query.clientId;
        users.set(clientId, BREAK);
        socket.join(clientId);

        socket.on('stream1Signal', (signal) => {
            const targetId = rooms.get(clientId);
            io.sockets.to(targetId).emit('stream2Signal', signal);
        });

        socket.on('stream2Signal', (signal) => {
            const targetId = rooms.get(clientId);
            io.sockets.to(targetId).emit('stream1Signal', signal);
        });

        socket.on('go_waitingList', () => {
            socket.join('waitingRoom');
            users.set(clientId, AVAILABLE);
            updateWaitingList();
            rouletteProcess();
        });

        socket.on('leave_waitingList', () => {
            socket.leave('waitingRoom');
            users.set(clientId, BREAK);
            updateWaitingList();
        });

        socket.on('leave_room', () => {
            users.set(clientId, AVAILABLE);
            const targetId = rooms.get(clientId);
            rooms.delete(clientId);
            io.sockets.to(targetId).emit('room_leaved');
        });

        socket.on('disconnect', function () {
            const targetId = rooms.get(clientId)
            if(targetId) {
                io.sockets.to(targetId).emit('room_leaved');
            }
            users.delete(clientId);
            rooms.delete(clientId);
            updateWaitingList();
        });
    });

    function rouletteProcess() {
        const length = waitingList.length;
        if (waitingList.length >= waintingRoomSize && waitingList.length % 2 === 0) {
            waitingList.sort(function () { return 0.5 - Math.random() });
            for (let i = 0; i < length; i += 2) {
                const client1 = waitingList[i];
                const client2 = waitingList[i + 1];
                users.set(client1, BUSY);
                users.set(client2, BUSY);
                rooms.set(client1, client2);
                rooms.set(client2, client1);
                io.sockets.to(client1).emit('room_started', client2);
                io.sockets.to(client2).emit('room_started', client1);
            }
        }
        updateWaitingList();
    }

    function updateWaitingList() {
        waitingList = [];
        for (var [id, status] of users) {
            if (status === AVAILABLE) {
                waitingList.push(id);
            }
        }
        io.sockets.to('waitingRoom').emit('waitingList_updated', waitingList);
    }

};
