import Peer from 'simple-peer';
import io from 'socket.io-client'
import './app.scss';

let receptionVideo;
let emitterVideo;
let peer1;
let peer2;
let socket;
let emitSignal;

emitterVideo = document.getElementById('emission-video');
receptionVideo = document.getElementById('recepetion-video');
document.getElementById('button').addEventListener('click', synchro);

navigator.getUserMedia({
    video: true,
    audio: true
}, mediaReady, err => console.log(err));

socket = io.connect('', { query: `room=1` });

function mediaReady(myStream) {
    peer1 = new Peer({ initiator: true, stream: myStream, trickle: false });
    peer2 = new Peer({ initiator: false, trickle: false });

    peer1.on('signal', function (data) {
        emitSignal = data;
    })

    peer2.on('signal', function (data) {
        socket.emit('stream2Signal', data);
    });

    socket.on('stream2Signal', (signal) => {
        peer2.signal(signal);
    });

    socket.on('stream1Signal', (signal) => {
        peer1.signal(signal);
    });

    peer2.on('stream', function (stream) {
        displayStream(receptionVideo, stream);
    });

    displayStream(emitterVideo, myStream);

    peer1.on('error', err => console.log(err));
    peer2.on('error', err => console.log(err));
}

function synchro() {
    socket.emit('stream1Signal', emitSignal);
}

function displayStream(player, stream) {
    player.srcObject = stream;
    player.volume = 0;
    player.play();
}
