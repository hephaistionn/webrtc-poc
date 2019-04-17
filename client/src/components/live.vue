
<template>
  <div class='live'>
    <div class='live__adv'> </div>
    <div class='live__stream'>
      <stream
          v-bind:stream='stream2'
          v-bind:emitter='false'
          v-bind:user='user2'/>
      <stream
          v-bind:stream='stream1'
          v-bind:emitter='true'
          v-bind:user='user1'/>
    </div>
    <chat
      v-bind:user1='user1'
      v-bind:user2='user2'
      v-bind:stack='stack'/>
    <div class='live__adv'> </div>
    <div class='live__action'>
      <button class='live__action__stop' @click='stop'>stop</button>
      <button class='live__action__next' @click='next'>next</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import chat from './chat.vue';
import stream from './stream.vue';
export default {
  name: 'live',
  components: {
    chat,
    stream
  },
  props: {
    stream1: Object,
    stream2: Object,
    user1: Object,
    user2: Object,
    stack: Array
  },
  methods: mapActions(['stop', 'next'])
};
</script>

<style lang='sass'>
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
  .live {
    position: fixed;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    &__stream {
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      position: relative;
      height: 100%;
      padding: 0;
      box-sizing: border-box;
      margin-left: 20px;
    }
    &__action {
      display: flex;
      position: absolute;
      top: calc(50% - 40px);
      left: calc(50% - 0px);
      button {
        cursor: pointer;
        border: none;
        padding: 29px 19px;
        color: white;
        font-size: 1.3rem;
      }
      &__stop {
        display: inline-block;
        background-color: #ff9c3a;
      }
      &__next {
        display: inline-block;
        background-color: #3f51b5;
      }
    }
    &__adv {
      display: inline-block;
      position: relative;
      height: 100%;
      width: 15%;
      background-color: brown;
      background-image: url(./../../assets/ads.jpg);
      background-size: 40px;
    }
  }
</style>