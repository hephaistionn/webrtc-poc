
<template>
  <div class='live'>
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
    <button class='live__stop' @click='stop'>stop</button>
    <button class='live__next' @click='next'>next</button>
    <chat
      v-bind:user1='user1'
      v-bind:user2='user2'
      v-bind:stack='stack'/>
    <div class='content__adv'> </div>
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    &__stream {
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
</style>