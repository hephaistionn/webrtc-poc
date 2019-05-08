<template>
  <div class='stack'>
    <message 
    v-bind:message='message.content'
    v-bind:current='message.author===1'
    v-bind:author='message.author===1 ? user1 : user2'
    v-for='(message, index) in stack' :key='index'/>
  </div>
</template>

<script>
import message from './message.vue';
export default {
  name: 'stack',
  props: {
    stack: Array,
    user1: Object,
    user2: Object
  },
  components: {
    message
  }
};
</script>

<style lang='sass'>
  .stack {
    position: absolute;
    width: 100%;
    bottom: 60px;
    left: 0px;
    height: 400px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    justify-content: flex-end;
    overflow: hidden;
    z-index: 2;
  } 
</style>