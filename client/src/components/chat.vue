<template>
  <div class='chat' v-if='false'>
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
    position: relative;
    display: inline-block;
    width: 30%;
    height: 100%;
  }
</style>