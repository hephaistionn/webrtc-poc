const socketio = require('socket.io');

const avatars = new Map();
const usernames = new Map();
const rooms = new Map();

const waintingRoomSize = 2;
let waitingList = [];

module.exports = function socket(serveur) {
    const io = socketio(serveur);

    io.on('connection', (socket) => {
        const clientId = socket.handshake.query.id;
        const username = socket.handshake.query.username;
        const avatar = socket.handshake.query.avatar;
        console.log('--------connection---------');
        console.log('clientId : ', clientId);
        console.log('username : ', username);
        console.log('avatar : ', avatar);
        usernames.set(clientId, username);
        avatars.set(clientId, avatar);
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
            console.log('-------disconnect----------');
            console.log('clientId : ', clientId);
            rooms.delete(clientId);
            usernames.delete(clientId);
            avatars.delete(clientId);
            updateWaitingList();
        });

        updateWaitingList();
        rouletteProcess();
    });

    function rouletteProcess() {
        const length = waitingList.length;
        if (waitingList.length >= waintingRoomSize && waitingList.length % 2 === 0) {
            waitingList.sort(function () { return 0.5 - Math.random() });
            for (let i = 0; i < length; i += 2) {
                const client1 = waitingList[i];
                const client2 = waitingList[i + 1];
                rooms.set(client1, client2);
                rooms.set(client2, client1);
                io.sockets.to(client1).emit('room_started', {username: usernames.get(client2), avatar: avatars.get(client2), id: client2});
                io.sockets.to(client2).emit('room_started', {username: usernames.get(client1), avatar: avatars.get(client1), id: client1});
            }
        }
    }

    function updateWaitingList() {
        cientIdList = [];
        usernameList = [];
        avatarList = [];
        for (let [id, username] of usernames) {
            cientIdList.push(id);
            usernameList.push(username);
            avatarList.push(avatars.get(id));
        }
        waitingList = cientIdList;
        
        io.sockets.to('waitingRoom').emit('waitingList_updated', {
            usernameList, avatarList, cientIdList, length: cientIdList.length
        });
    }

};
