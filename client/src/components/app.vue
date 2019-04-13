<template>
  <div class='app'>
    <mainHeader /> 
    <div class='content'>
      <waitingList 
        v-bind:list='$store.state.waitingList'
        v-bind:live='$store.state.live'
        v-bind:target='$store.state.clientId2'/>
      <div class='content__videos'>  
        <stream
          v-bind:stream='$store.state.stream2'
          v-bind:emitter='false'
          v-bind:actived='$store.state.live'
          v-bind:avatar='$store.state.avatar2'
          v-bind:username='$store.state.username2'/>
        <stream
          v-bind:stream='$store.state.stream1'
          v-bind:emitter='true'
          v-bind:actived='true'
          v-bind:avatar='$store.state.avatar1'
          v-bind:username='$store.state.username1'/>
      </div>
      <chat v-bind:actived='$store.state.live'/>
      <div class='content__adv'> </div>
      <editor  
        v-if='$store.state.edit' 
        v-bind:avatar='$store.state.avatar1'
        v-bind:username='$store.state.username1' />
    </div>
  </div>
</template>

<script>
import stream from './stream.vue';
import waitingList from './waitingList.vue';
import mainHeader from './header.vue';
import editor from './editor.vue';
import chat from './chat.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    stream,
    waitingList,
    chat,
    mainHeader,
    editor
  },
  methods: mapActions(['startCam', 'initSocket']),
  mounted() {
    this.$store.dispatch('startCam');
    this.$store.dispatch('initSocket');
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
    &__videos {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      position: relative;
      background-color: beige;
      height: 100%;
      width: 38%;
      min-width: 400px;
    }
    &__adv {
      display: inline-block;
      position: relative;
      height: 100%;
      width: 20%;
      background-color: brown;
    }
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