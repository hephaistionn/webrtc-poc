<template>
  <div class='chat'>
    <stack 
      v-bind:user1='user1'
      v-bind:user2='user2'
      v-bind:stack='stack'/>
    <submitter/>
  </div>
</template>

<script>
import stack from './stack.vue';
import submitter from './submitter.vue';
export default {
  name: 'chat',
  props: {
    user1: Object,
    user2: Object,
    stack: Array
  },
  components: {
    stack,
    submitter
  }
};
</script>

<style lang='sass'>
  .chat {
    position: absolute;
    display: inline-block;
    width: 100%;
    min-width: 345px;
    height: calc(100% -  100px);
    right: 0;
    z-index: 2;
    bottom: 0;
  }
</style>