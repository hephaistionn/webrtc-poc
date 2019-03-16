import Peer from 'simple-peer';
import io from 'socket.io-client'
import './app.scss';

const usernameList = ['Ardal', 'Alvin', 'Justine', 'Pauline', 'Yaroslav', 'Bob', 'Terika', 'Carlene', 'Jetta', 'Toya'];

let myStream;
let peer1;
let peer2;
const clientId = Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
const username = usernameList[Math.floor(Math.random() * usernameList.length * 0.99999)] + Math.floor(Math.random() * 99);

const emitterVideo = document.getElementById('emission-video');
const receptionVideo = document.getElementById('recepetion-video');
const containerWaiting = document.getElementById('waitingList')
const domRecUsername = document.getElementById('recepetion-username');
const domEmiUsername = document.getElementById('emission-username');
const domEditUsername = document.getElementById('edit-username');
const inputChat  =  document.getElementById('chat-input');
const stackChat  =  document.getElementById('chat-stack');
const senderChat  =  document.getElementById('chat-send');
document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
domEmiUsername.addEventListener('click', editUsername);
domEditUsername.firstElementChild.addEventListener('click', saveUsername);
document.getElementById('stop').style.display = 'none';
domEditUsername.style.display = 'none';
domEmiUsername.textContent = username;
senderChat.addEventListener('click', sendMessage);

const socket = io.connect('', { query: { clientId: clientId, username: username } });

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
        socket.emit('stream1Signal', data);
    })

    peer2.on('signal', function (data) {
        socket.emit('stream2Signal', data);
    });

    peer2.on('stream', function (stream) {
        displayStream(receptionVideo, stream);
    });

    peer2.on('data', function (data) {
        addNewMessage(data, 1);
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
    peer2.signal(signal);
});

socket.on('stream1Signal', (signal) => {
    peer1.signal(signal);
});


socket.on('room_started', (targetUsername) => {
    startPeer();
    domRecUsername.textContent = targetUsername;
});

socket.on('room_leaved', () => {
    stop();
})

socket.on('waitingList_updated', (list) => {
    updateWaitingList(list)
});

socket.on('room_update_username', (targetUsername) => {
    domRecUsername.textContent = targetUsername;
})

function start() {
    socket.emit('go_waitingList');
    document.getElementById('stop').style.display = '';
    document.getElementById('start').style.display = 'none';
}

function stop() {
    socket.emit('leave');
    if (peer1) {
        peer1.destroy();
        peer2.destroy();
    }
    cleanWaitingList([]);
    document.getElementById('stop').style.display = 'none';
    document.getElementById('start').style.display = '';
    domRecUsername.textContent = '';
}

function updateWaitingList(list) {
    cleanWaitingList();
    if (list.length) {
        const count = document.createElement('div');
        count.className = 'container__count';
        count.textContent = list.length + '/4';
        containerWaiting.appendChild(count);
        list.map(user => {
            const node = document.createElement('div');
            node.className = 'container__user';
            node.textContent = user;
            containerWaiting.appendChild(node);
        });
    }
}

function cleanWaitingList() {
    while (containerWaiting.firstChild) {
        containerWaiting.removeChild(containerWaiting.firstChild);
    }
}

function editUsername() {
    domEditUsername.lastElementChild.value = domEmiUsername.textContent;
    domEditUsername.style.display = '';
    domEmiUsername.style.display = 'none';
}

function saveUsername() {
    if (domEditUsername.lastElementChild.value) {
        domEmiUsername.textContent = domEditUsername.lastElementChild.value;
        domEditUsername.style.display = 'none';
        domEmiUsername.style.display = '';
        socket.emit('update_username', domEmiUsername.textContent);
    }
}

function sendMessage() {
    const message = inputChat.value;
    inputChat.value  = '';
    addNewMessage(message, 0);
    peer1.send(message)

}

function addNewMessage(message, user) {
    stackChat.textContent += 'User'+user+ ' : ' + message + ' \\n ';
}