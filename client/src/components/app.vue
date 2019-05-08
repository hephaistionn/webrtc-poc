<template>
  <div class='app'>
    <div class='adv'></div>
    <div class='screen'>
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
    <div class='adv large'></div>  
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
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .screen {
      position: relative;
      display: inline-block;
      width: 80%;
      height: 100%;
    }
    .adv {
      position: relative;
      display: inline-block;
      height: 100%;
      width: calc(10% - 5px);
      background-color: brown;
      background-image: url(./../../assets/ads.jpg);
      background-size: 40px;
    }
    @media (max-aspect-ratio: 8/5) {
      .screen {
        width: 100%;
        height: 90%;
      }
      .adv {
        width: 100%;
        height: calc(10% - 5px);
        &.large {
          display: none;
        }
      }
    }
  }

  button {
    cursor: pointer;
    &:hover {
      background-color: red;
    }
  }

  .avatar {
    background-image: url('./../../assets/avatars.png');
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