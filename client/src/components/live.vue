
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
    <div class='live__tools'>  
      <chat
        v-bind:user1='user1'
        v-bind:user2='user2'
        v-bind:stack='stack'/>
      <button class='live__tools__stop button' @click='stop'></button>
      <button class='live__tools__next button' @click='next'></button>
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
  .live {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &__tools {
      position: absolute;
      display: flex;
      flex-direction: row;
      justify-items: center;
      align-items: center;
      bottom: 0;
      left:0;
      height: 70px;
      width: 100%;
      background: rgba(255, 255, 255, 0.30);
      z-index: 2;
      .button {
        display: inline-block;
        position: relative;
        cursor: pointer;
        border: none;
        background-image: url(./../../assets/icon.png);
        background-size: auto 100%;
        max-width: 55px;
        max-height: 55px;
        min-width: 45px;
        min-height: 45px;
        width: 6%;
        margin-left: 1rem;
        background-color: transparent;
        z-index: 1;
        &:after {
          content: "";
          display: block;
          padding-bottom: 122%;
        }
      }
      &__stop {
        background-position-x: 50%;
      }
    }
  }
</style>