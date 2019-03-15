import Peer from 'simple-peer';
import io from 'socket.io-client'
import './app.scss';

let waitingList;
let myStream;
let peer1;
let peer2;
const clientId = Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
const emitterVideo = document.getElementById('emission-video');
const receptionVideo = document.getElementById('recepetion-video');
document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('leave').addEventListener('click', leaveRoom);
document.getElementById('stop').style.display = 'none';
document.getElementById('leave').style.display = 'none';

const socket = io.connect('', { query: { clientId: clientId } });

navigator.getUserMedia({
    video: true,
    audio: true
}, stream => {
    myStream = stream;
    displayStream(emitterVideo, myStream);
}, err => console.log(err));

function startPeer() {
    peer1 = new Peer({ initiator: true, stream: myStream, trickle: false });
    peer2 = new Peer({ initiator: false, trickle: false });

    peer1.on('signal', function (data) {
        console.log('peer1 signal');
        socket.emit('stream1Signal', data);
    })

    peer2.on('signal', function (data) {
        console.log('peer2 signal');
        socket.emit('stream2Signal', data);
    });

    peer2.on('stream', function (stream) {
        displayStream(receptionVideo, stream);
    });

    peer1.on('error', err => console.log(err));
    peer2.on('error', err => console.log(err));
}

function displayStream(player, stream) {
    player.srcObject = stream;
    player.volume = 0;
    player.play();
}

socket.on('stream2Signal', (signal) => {
    console.log('on stream2Signal');
    peer2.signal(signal);
});

socket.on('stream1Signal', (signal) => {
    console.log('on stream1Signal');
    peer1.signal(signal);
});


socket.on('room_started', (targetClientId) => {
    console.log('=======room_started=======');
    console.log(targetClientId);
    startPeer();
    document.getElementById('leave').style.display = '';
});

socket.on('room_leaved', ()=> {
    leaveRoom();
})

socket.on('waitingList_updated', (list) => {
    console.log('=======waitingList_updated=======');
    console.log(list);
    waitingList = list;
});

function start() {
    console.log('=======start=======');
    socket.emit('go_waitingList');
    document.getElementById('stop').style.display = '';
    document.getElementById('start').style.display = 'none';
}

function stop() {
    console.log('=======stop=======');
    socket.emit('leave_waitingList');
    peer1.destroy();
    peer2.destroy();
    document.getElementById('stop').style.display = 'none';
    document.getElementById('start').style.display = '';
}

function leaveRoom() {
    console.log('=======leaveRoom=======');
    socket.emit('leave_room');
    stop();
    document.getElementById('leave').style.display = 'none';
}
