<template>
  <div class='chatStack'>
    <chatMessage 
    v-bind:message='message.content'
    v-bind:class='{current : message.author===1}'
    v-bind:author='message.author===1 ? user1 : user2'
    v-for='(message, index) in stack' :key='index'/>
  </div>
</template>

<script>
import chatMessage from './chatMessage.vue';
export default {
  name: 'chatStack',
  props: {
    stack: Array,
    user1: Object,
    user2: Object
  },
  components: {
    chatMessage
  }
};
</script>

<style lang='sass'>
  .chatStack {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - 164px);
    padding: 15px 15px 15px 15px;
  } 
</style>