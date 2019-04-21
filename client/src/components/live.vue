
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
  @mixin icon {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    font-family: 'Font Awesome 5 Free';
    margin: 0 5px;
    cursor: pointer;
    background-color: transparent;
  }
  .live {
    position: relative;
    width: fit-content;
    min-width: 374px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    .button {
      position: absolute;
      cursor: pointer;
      border: none;
      color: white;
      font-size: 1.3rem;
      top: 3%;
    }
    &__stop {
      position: absolute;
      display: inline-block;
      left: 2%;
      @include icon;
      &:before {
        content: '\f28d';
      }
    }
    &__next {
      display: inline-block;
      right: 2%;
      @include icon;
      &:before {
        content: '\f522';
      }
    }
  }
</style>