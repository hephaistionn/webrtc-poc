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
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - 164px);
    padding: 15px 15px 15px 15px;
    overflow-y: scroll;
  } 
</style>