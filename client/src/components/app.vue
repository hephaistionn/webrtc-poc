<template>
  <div class='app' v-bind:class="['v'+$store.state.status]">
    <div class='adv'></div>
    <div class='screen'>
      <home 
        v-show='$store.state.status === 0'
        v-bind:user='$store.state.user1'/>
      <roulette 
        v-show='$store.state.status === 2'
        v-bind:stream='$store.state.stream1'
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
      <cguterms v-if='$store.state.status === 3'/>
    </div>
    <div class='adv large'></div>  
  </div>
</template>

<script>
import live from './live.vue';
import roulette from './roulette.vue';
import home from './home.vue';
import cguterms from './cguterms.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    live,
    roulette,
    home,
    cguterms
  },
  methods: mapActions(['startCam', 'initSocket', 'stop']),
  mounted() {
    this.$store.dispatch('initUser');
  }
};
</script>

<style lang='sass'>
  :root {
    --color1: #ffcd15;
    --color2: #22262A;
    --color3: #5eeaf3;
    --selected: #000;
  }
  body {
    margin: 0;
    font-family: sans-serif;
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
    background: var(--color2);
    .screen {
      position: absolute;
      display: inline-block;
      top: 0;
      left: 10%;
      width: 80%;
      height: 100%;
      margin: 0;
    }
    .adv {
      position: absolute;
      display: inline-block;
      height: 100%;
      width: 10%;
      top: 0;
      left: 0;
      margin: 0;
      background-color: var(--color2);
      // background-image: url(./../../assets/ads.jpg);
      background-size: 40px;
      &.large {
        left: 90%;
      }
    }
    @media (max-aspect-ratio: 8/5) {
      .screen {
        // top: 10%;
        top: 0;
        left: 0;
        width: 100%;
        // height: 90%;
        height: 100%;
      }
      .adv {
        top: 0;
        left: 0;
        width: 100%;
        height: 10%;
        display: none;
        &.large {
          display: none;
        }
      }
      &.v0 {
        .screen {
          top:0;
        }
        .adv {
          top: 90%;
        }
      }
    }
  }

  button {
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
    &:disabled {
      opacity: 0.6;
      &:hover {
        transform: scale(1);
      }
    }
  }

  .avatar {
    background-image: url('./../../assets/avatars.jpg');
  }

 @font-face {
    font-family: 'Xirod';
    src: url('./../../assets/xirod.ttf'); 
  }
  @font-face {
    font-family: 'Font Awesome 5 Free';
    font-style: normal;
    font-weight: 900;
    src: url('./../../assets/fa-solid-900.woff') format('woff'); 
  }

  .icon {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    font-family: 'Font Awesome 5 Free';
  }
</style>