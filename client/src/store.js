import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
import Peer from 'simple-peer';

let id = localStorage.getItem('clientId');
id = id ? id : new Uint8Array(10).reduce(id => id + Math.random().toString(36).substr(2, 9));
const usernameList = ['Ardal', 'Alvin', 'Justine', 'Pauline', 'Yaroslav', 'Bob', 'Terika', 'Carlene', 'Jetta', 'Toya'];
const username = usernameList[Math.floor(Math.random() * usernameList.length * 0.99999)] + Math.floor(Math.random() * 99);
const avatar = Math.floor(Math.random() * 99.99);
const age = 25;
const sexe = 1;
const HOME = 0;
const LIVE = 1;
const CGU = 3;
const WAITING = 2;
let timerStack;


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
  status: HOME,
  edit: false,
};

const store =  new Vuex.Store({
  state,
  getters: {},
  actions: {
    showHome({commit}) {
      commit('setStatus', HOME);
    },
    showCGU({commit}) {
      commit('setStatus', CGU);
    },
    initUser({commit, dispatch}) {
      commit('setUser1', {username, avatar, id, age, sexe});
      dispatch('startCam');
    },
    startCam({ commit }) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      .then(function(stream) {
        commit('setStream1', stream);
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    stopCam({state }) {
      if(state.stream1) {
        const track = state.stream1.getTracks()[0];
        track.stop();
      }
    },
    initSocket({ commit, dispatch, state}) {
      if(state.socket) {
        state.socket.disconnect();
      }
      const sep = '¨^*';
      const userId = state.user1.id;
      const username = state.user1.username;
      const avatar = state.user1.avatar;
      const age = state.user1.age;
      const sexe = state.user1.sexe;
      const userData = `${username}${sep}${avatar}${sep}${age}${sep}${sexe}`;
      const socket = io.connect('', { query: {userId, userData} });
      socket.on('stream2Signal', (signal) => {
        commit('setSignal2', signal);
      });
      socket.on('stream1Signal', (signal) => {
        commit('setSignal1', signal);
      });
      socket.on('room_started', async (profile) => {
        const datas = profile.userData.split(sep);
        const username = datas[0]||'unknown';
        const avatar = datas[1]||0;
        const age = datas[2]||99;
        const sexe = datas[3]||3;
        commit('setUser2', {
          username: username,
          avatar:  parseInt(avatar, 10),
          age:  parseInt(age, 10),
          sexe:  parseInt(sexe, 10),
          id: profile.id
        });
        await dispatch('initPeers');
        await dispatch('initPeersListener');
        setTimeout(async ()=> {
          commit('setStatus', LIVE);
        },5000);
      });
      socket.on('waitingList_updated', (waitingList) => {
        const list = [];
        for(let id in waitingList) {
          const datas = waitingList[id].split(sep);
          const username = datas[0]||'unknown';
          const avatar = datas[1]||0;
          const age = datas[2]||99;
          const sexe = datas[3]||3;
          list.push({
            username: username,
            avatar:  parseInt(avatar, 10),
            age:  parseInt(age, 10),
            sexe:  parseInt(sexe, 10),
            id
          });
        }
        commit('updateWaitingList', list);
      });
      commit('setSocket', socket);
    },
    closeSocket({ commit, dispatch, state}) {
      setTimeout(()=> {
        commit('setSocket', null);
      },1000)
    },
    initPeers({ commit, state, dispatch }) {
      commit('setPeer1', new Peer({ initiator: true, stream: state.stream1, trickle: false }));
      commit('setPeer2', new Peer({ initiator: false, trickle: false }));
    },
    initPeersListener({ commit, state, dispatch}) {
      let connected = false;
      state.peer1.on('signal', function (data) {
        commit('emitSocket', { key: 'stream1Signal', data });
        if(connected) {
          dispatch('closeSocket');
        }
        connected = true;
      })
      state.peer2.on('signal', function (data) {
        commit('emitSocket', { key: 'stream2Signal', data });
        if(connected) {
          dispatch('closeSocket');
        }
        connected = true;
      });
      state.peer2.on('stream', function (stream) {
        commit('setStream2', stream);
      });
      state.peer1.on('data', function (message) {
        commit('addMessage1', message);
        dispatch('depilator'); 
      });
      state.peer2.on('data', function (message) {
        commit('addMessage2', message);
      });
      state.peer1.on('close', function () {
        if(state.status === LIVE) {
          dispatch('stop'); 
        }
      })
      state.peer2.on('close', function () {
        if(state.status === LIVE) {
          dispatch('next'); 
        }
      })
      state.peer1.on('error', err => console.log(err));
      state.peer2.on('error', err => console.log(err));
    },
    start({ commit }, profile) {
      commit('setUser1', profile);
      commit('setStatus', WAITING);
    },
    stop({ commit, dispatch}) {
      commit('deletePeer1');
      commit('deletePeer2');
      dispatch('stopCam');
      commit('cleanWaitingList');
      commit('setUser2', null);
      commit('setStatus', HOME);
      commit('cleanStack');
    },
    next({commit, dispatch}) {
      commit('deletePeer1');
      commit('deletePeer2');
      dispatch('stopCam');
      commit('cleanWaitingList');
      commit('setUser2', null);
      commit('setStatus', WAITING);
      commit('cleanStack');
    },
    cancel({commit, dispatch}) {
      dispatch('closeSocket');
      dispatch('stop');
    },
    sendMessage({ commit, dispatch}, message) {
      commit('addMessage1', message);
      commit('emitPeer1', message);
      dispatch('depilator'); 
    },
    enableAudio({ commit }, value) {
      state.stream1.getAudioTracks()[0].enabled = value;
    },
    enableVideo({ commit }, value) {
      state.stream1.getVideoTracks()[0].enabled = value;
    },
    depilator({commit, state, dispatch}) {
      clearTimeout(timerStack);
      timerStack = setTimeout(() => {
          commit('removeMessage');
          if(state.stack.length) {
            dispatch('depilator'); 
          }
      }, 30000);
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
      if(state.stack.length>6) {
        state.stack.splice(0, 1);
      }
    },
    addMessage2(state, message) {
      state.stack.push({author: 2, content: message});
      if(state.stack.length>4) {
        state.stack.splice(0, 1);
      }
    },
    removeMessage(state) {
      if(state.stack.length) {
        state.stack.splice(0, 1);
      }
    },
    setSocket(state, socket) {
      if(socket) {
        state.socket = socket;
      } else {
        state.socket.disconnect();
        state.socket = null;
      }
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
          id: user.id || state.user1.id,
          sexe: user.sexe,
          age: user.age
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
          id: user.id,
          sexe: user.sexe,
          age: user.age
        };
      } else {
        state.user2 = user;
      } 
    },
    setStatus(state, value) {
      state.status = value;
    },
    updateWaitingList(state, list) {
      state.waitingList = list;
    },
    cleanWaitingList(state) {
      state.waitingList = [];
    },
    cleanStack() {
      state.stack = [];
    }
  }
});

export default store;

window.onbeforeunload = function (event) {
  store.dispatch('stop');
};
