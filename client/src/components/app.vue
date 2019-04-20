<template>
  <div class='app'>
    <home 
      v-show='$store.state.status === 0'
      v-bind:user='$store.state.user1'/>
    <roulette 
      v-show='$store.state.status === 2'
      v-bind:show='$store.state.status === 2'
      v-bind:list='$store.state.waitingList'
      v-bind:target='$store.state.user2'/>
    <live
      v-show='$store.state.status === 1'
      v-bind:stream2='$store.state.stream2'
      v-bind:user2='$store.state.user2'
      v-bind:stream1='$store.state.stream1'
      v-bind:user1='$store.state.user1'
      v-bind:stack='$store.state.stack'/>
  </div>
</template>

<script>
import live from './live.vue';
import roulette from './roulette.vue';
import home from './home.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    live,
    roulette,
    home
  },
  methods: mapActions(['startCam', 'initSocket', 'stop']),
  mounted() {
    this.$store.dispatch('initUser');
  }
};
</script>

<style lang='sass'>
  body {
    margin: 0;
  }
  .app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .content {
    display: flex;
    position: relative;
    width: 100%;
    height: calc(100% - 60px);
    margin: auto;
    max-width: 1700px;
    max-height: 1000px;
  }

  button {
    cursor: pointer;
    &:hover {
      background-color: red;
    }
  }

  .avatar {
    background-image: url('./../../assets/avatars.jpg');
  }

  @font-face {
    font-family: 'Font Awesome 5 Free';
    font-style: normal;
    font-weight: 900;
    src: url('./../../assets/fa-solid-900.woff2') format('woff2'), url('./../../assets/fa-solid-900.woff') format('woff'); 
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