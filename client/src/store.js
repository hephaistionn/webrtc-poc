import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
import Peer from 'simple-peer';

let clientId1 = localStorage.getItem('clientId');
clientId1 = clientId1 ? clientId1 : new Uint8Array(10).reduce(id => id + Math.random().toString(36).substr(2, 9));
const usernameList = ['Ardal', 'Alvin', 'Justine', 'Pauline', 'Yaroslav', 'Bob', 'Terika', 'Carlene', 'Jetta', 'Toya'];
const username = usernameList[Math.floor(Math.random() * usernameList.length * 0.99999)] + Math.floor(Math.random() * 99);
const avatar = Math.floor(Math.random() * 15.99);

Vue.use(Vuex);

const state = {
  peer1: null,
  peer2: null,
  stream1: null,
  stream2: null,
  stack: [],
  socket: null,
  user1: null,
  user2: null,
  waitingList: [],
  break: true,
  live: false,
  edit: false,
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
        commit('setClientId1', clientId1);
      }, error => {
        console.log(error);
      });
    },
    initSocket({ commit, dispatch }) {
      const socket = io.connect('', { query: {clientId: clientId1, username, avatar} });
      socket.on('stream2Signal', (signal) => {
        commit('setSignal2', signal);
      });
      socket.on('stream1Signal', (signal) => {
        commit('setSignal1', signal);
      });
      socket.on('room_started', (profile) => {
        commit('setUser2', profile);
        setTimeout(()=> {
          dispatch('initPeers');
          dispatch('initPeersListener');
          commit('setLive', true);
        },5000);
      });
      socket.on('room_leaved', () => {
        dispatch('stop'); 
      });
      socket.on('waitingList_updated', (waitingList) => {
        const list = [];
        for(let i=0; i<waitingList.length; i++) {
          list.push({
            username: waitingList.usernameList[i],
            avatar:  parseInt(waitingList.avatarList[i], 10),
            id: waitingList.cientIdList[i]
          });
        }
        commit('updateWaitingList', list);
      });
      socket.on('room_update_profile', (profile) => {
        commit('setUser2', profile);
      });
      commit('setUser1', {username, avatar});
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
      commit('setUser2', null);
      commit('setLive', false);
    },
    sendMessage({ commit }, message) {
      commit('addMessage1', message);
      commit('emitPeer1', message);
    },
    saveProfile({ commit }, profile) {
      commit('setUser2', profile);
      state.socket.emit('update_profile', profile);
    },
    setMute({ commit }, value) {
      state.stream1.getAudioTracks()[0].enabled = value;
    },
    toggleEdit({ commit, state }) {
      commit('setEdit', !state.edit);
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
      state.stack.push({author: 1, content: message});
    },
    addMessage2(state, message) {
      state.stack.push({author: 2, content: message});
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
    setUser1(state, user) {
      if(user) {
        state.user1 = {
          username: user.username,
          avatar: user.avatar,
          id: user.id
        };
      } else {
        state.user1 = user;
      }
    },
    setUser2(state, user) {
      if(user) {
        state.user2 = {
          username: user.username,
          avatar: user.avatar,
          id: user.id
        };
      } else {
        state.user2 = user;
      } 
    },
    setLive(state, value) {
      state.live = value;
    },
    updateWaitingList(state, list) {
      state.waitingList = list;
    },
    cleanWaitingList(state) {
      state.waitingList = [];
    },
    setBreak(state, value) {
      state.break = value;
    },
    setEdit(state, value) {
      state.edit = value;
    }
  }
});
