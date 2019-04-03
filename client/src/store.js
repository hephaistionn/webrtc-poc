import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
import Peer from 'simple-peer';

let clientId = localStorage.getItem('clientId');
clientId = clientId ? clientId : new Uint8Array(10).reduce(id => id + Math.random().toString(36).substr(2, 9));
const usernameList = ['Ardal', 'Alvin', 'Justine', 'Pauline', 'Yaroslav', 'Bob', 'Terika', 'Carlene', 'Jetta', 'Toya'];
const username = usernameList[Math.floor(Math.random() * usernameList.length * 0.99999)] + Math.floor(Math.random() * 99);

Vue.use(Vuex);

const state = {
    clientId,
    peer1: null,
    peer2: null,
    stream1: null,
    stream2: null,
    stack: [],
    socket: null,
    username1: 'Username1',
    username2: 'Username2',
    waitingList: [],
    break: true,
};

export default new Vuex.Store({
    state,
    getters: {},
    actions: {
        startCam({ commit }) {
            navigator.getUserMedia({
                video: true,
                audio: true
            }, stream => {
                commit('setStream1', stream);
            }, error => {
                console.log(error);
            });
        },
        initSocket({ commit, dispatch }) {
            const socket = io.connect('', { query: { clientId: clientId, username: username } });
            socket.on('stream2Signal', (signal) => {
                commit('setSignal2', signal);
            });
            socket.on('stream1Signal', (signal) => {
                commit('setSignal1', signal);
            });
            socket.on('room_started', (targetUsername) => {
                dispatch('initPeers');
                dispatch('initPeersListener');
                commit('setUsername2', targetUsername);
            });
            socket.on('room_leaved', () => {
                dispatch('stop');
            });
            socket.on('waitingList_updated', (list) => {
                commit('updateWaitingList', list);
            });
            socket.on('room_update_username', (targetUsername) => {
                commit('setUsername2', targetUsername);
            });
            commit('setUsername1', username);
            commit('setSocket', socket);
        },
        initPeers({ commit, state }) {
            commit('setPeer1', new Peer({ initiator: true, stream: state.stream1, trickle: false }));
            commit('setPeer2', new Peer({ initiator: false, trickle: false }));
        },
        initPeersListener({ commit, state }) {
            state.peer1.on('signal', function (data) {
                commit('emitSocket', { key: 'stream1Signal', data });
            })
            state.peer2.on('signal', function (data) {
                commit('emitSocket', { key: 'stream2Signal', data });
            });
            state.peer2.on('stream', function (stream) {
                commit('setStream2', stream);
            });
            state.peer1.on('data', function (message) {
                commit('addMessage1', message);
            });
            state.peer2.on('data', function (message) {
                commit('addMessage2', message);
            });
            state.peer1.on('error', err => console.log(err));
            state.peer2.on('error', err => console.log(err));
        },
        start({ commit, state }) {
            commit('emitSocket', { key: 'go_waitingList' });
            commit('setBreak', false);
        },
        stop({ commit }) {
            commit('emitSocket', { key: 'leave' });
            commit('deletePeer1');
            commit('deletePeer2');
            commit('cleanWaitingList');
            commit('setBreak', true);
            commit('setUsername2', '');
        },
        sendMessage({ commit }, message) {
            commit('addMessage1', message);
            commit('emitPeer1', message);
        },
        saveUsename({ commit }, username) {
            commit('setUsername1', username);
            state.socket.emit('update_username', username);
        },
        setMute({commit}, value) {
            state.stream1.getAudioTracks()[0].enabled = value;
        }
    },
    mutations: {
        setStream1(state, stream) {
            state.stream1 = stream;
        },
        setStream2(state, stream) {
            state.stream2 = stream;
        },
        setPeer1(state, peer) {
            state.peer1 = peer;
        },
        setPeer2(state, peer) {
            state.peer2 = peer;
        },
        deletePeer1(state) {
            if (state.peer1) {
                state.peer1.destroy();
                state.peer1 = null;
            }
        },
        deletePeer2(state) {
            if (state.peer2) {
                state.peer2.destroy();
                state.peer2 = null;
            }
        },
        emitPeer1(state, message) {
            state.peer1.send(message);
        },
        addMessage1(state, message) {
            state.stack.push(`user1 : ${message}`);
        },
        addMessage2(state, message) {
            state.stack.push(`user2 : ${message}`);
        },
        setSocket(state, socket) {
            state.socket = socket;
        },
        emitSocket(state, event) {
            state.socket.emit(event.key, event.data);
        },
        setSignal1(state, signal) {
            state.peer1.signal(signal);
        },
        setSignal2(state, signal) {
            state.peer2.signal(signal);
        },
        setUsername1(state, username) {
            state.username1 = username;
        },
        setUsername2(state, username) {
            state.username2 = username;
        },
        updateWaitingList(state, list) {
            state.waitingList = list;
        },
        cleanWaitingList(state) {
            state.waitingList = [];
        },
        setBreak(state, value) {
            state.break = value;
        }
    }
});
