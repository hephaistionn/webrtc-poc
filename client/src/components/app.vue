<template>
  <div class="app">
    <img src="./../../assets/avatar3.png">
    <h1>Demo WebRTC</h1>
    <waitingList/>
    <div class="video-container">
      <videoStream
        v-bind:stream="$store.state.stream1"
        v-bind:emitter="true"
        v-bind:username="$store.state.username1"
      />
      <videoStream
        v-bind:stream="$store.state.stream2"
        v-bind:emitter="false"
        v-bind:username="$store.state.username2"
      />
    </div>
    <chat v-show="$store.state.peer2"/>
    <button v-show="$store.state.break" @click="start">start</button>
    <button v-show="!$store.state.break" @click="stop">stop</button>
  </div>
</template>

<script>
import videoStream from "./videoStream.vue";
import waitingList from "./waitingList.vue";
import chat from "./chat.vue";
import { mapActions } from "vuex";

export default {
  name: "app",
  components: {
    videoStream,
    waitingList,
    chat
  },
  methods: mapActions(["start", "stop", "startCam", "initSocket"]),
  mounted() {
    this.$store.dispatch("startCam");
    this.$store.dispatch("initSocket");
  }
};
</script>

<style lang="sass">
  .app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  img {
    width: 30px;
    height: 30px;
  }


  @font-face {
    font-family: 'Font Awesome 5 Free';
    font-style: normal;
    font-weight: 900;
    src: url("./../../assets/fa-solid-900.woff2") format("woff2"), url("./../../assets/fa-solid-900.woff") format("woff"); 
  }

  @mixin icon {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    font-family: 'Font Awesome 5 Free';
    margin: 0 5px;
    cursor: pointer;
  }
</style>