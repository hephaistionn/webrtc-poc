const socketio = require('socket.io');

module.exports = function socket(serveur) {
    const io = socketio(serveur);

    io.on('connection', (socket) => {
        const room = socket.handshake.query.room;
        
        socket.join(room);

        socket.on('stream1Signal', (signal) => {
            socket.to(room).emit('stream2Signal', signal);
        });

        socket.on('stream2Signal', (signal) => {
            socket.to(room).emit('stream1Signal', signal);
        });
    });
};
