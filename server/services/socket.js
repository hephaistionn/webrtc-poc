const socketio = require('socket.io');

const users = new Map();
const rooms = new Map();
const usernames = new Map();

const AVAILABLE = 0;
const BUSY = 1;
const BREAK = 2;

const waintingRoomSize = 4;

let waitingList = [];

module.exports = function socket(serveur) {
    const io = socketio(serveur);

    io.on('connection', (socket) => {

        const clientId = socket.handshake.query.clientId;
        const username = socket.handshake.query.username;
        users.set(clientId, BREAK);
        usernames.set(clientId, username);
        socket.join(clientId);

        socket.on('stream1Signal', (signal) => {
            socket.leave('waitingRoom');
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

        socket.on('leave', () => {
            socket.leave('waitingRoom');
            const targetId = rooms.get(clientId);
            users.set(clientId, BREAK);
            rooms.delete(clientId);
            io.sockets.to(targetId).emit('room_leaved');
            updateWaitingList();
        });

        socket.on('update_username', (newUsername) => {
            usernames.set(clientId, newUsername);
            const status = users.get(clientId);
            const targetId = rooms.get(clientId)
            if (status === AVAILABLE) {
                updateWaitingList();
            } else if (targetId) {
                io.sockets.to(targetId).emit('room_update_username', newUsername);
            }
        });

        socket.on('disconnect', function () {
            const targetId = rooms.get(clientId)
            if (targetId) {
                io.sockets.to(targetId).emit('room_leaved');
            }
            users.delete(clientId);
            rooms.delete(clientId);
            usernames.delete(clientId);
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
                io.sockets.to(client1).emit('room_started', usernames.get(client2));
                io.sockets.to(client2).emit('room_started', usernames.get(client1));
            }
        }
        updateWaitingList();
    }

    function updateWaitingList() {
        waitingList = [];
        nameList = [];
        for (let [id, status] of users) {
            if (status === AVAILABLE) {
                waitingList.push(id);
                nameList.push(usernames.get(id));
            }
        }
        io.sockets.to('waitingRoom').emit('waitingList_updated', nameList);
    }

};
