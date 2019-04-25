
<template>
  <div class='live'>
    <stream
        v-bind:stream='stream1'
        v-bind:emitter='true'
        v-bind:user='user1'/>
    <stream
        v-bind:stream='stream2'
        v-bind:emitter='false'
        v-bind:user='user2'/>
    <chat
      v-bind:user1='user1'
      v-bind:user2='user2'
      v-bind:stack='stack'/>
    <button class='live__stop button' @click='stop'></button>
    <button class='live__next button' @click='next'></button>
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
  .live {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .button {
      display: inline-block;
      position: absolute;
      cursor: pointer;
      border: none;
      top: 3%;
      background-image: url(./../../assets/icon.png);
      background-size: auto 100%;
      max-width: 90px;
      max-height: 90px;
      min-width: 30px;
      min-height: 30px;
      width: 6%;
      background-color: transparent;
      z-index: 1;
      &:after {
        content: "";
        display: block;
        padding-bottom: 122%;
      }
    }
    &__stop {
      left: 2%;
      background-position-x: 50%;
    }
    &__next {
      right: 2%;
    }
  }
</style>