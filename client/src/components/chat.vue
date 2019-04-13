<template>
  <div class='chat'>
    <chatStack v-show='actived' 
    v-bind:user1='$store.state.user1'
    v-bind:user2='$store.state.user2'
    v-bind:stack='$store.state.stack'/>
    <chatInput v-show='actived'
    v-bind:user1='$store.state.user1'
    v-bind:user2='$store.state.user2'
    v-bind:stack='$store.state.stack'/>
  </div>
</template>

<script>
import chatStack from './chatStack.vue';
import chatInput from './chatInput.vue';
export default {
  name: 'chat',
  props: {
    actived: Boolean
  },
  components: {
    chatStack,
    chatInput
  }
};
</script>

<style lang='sass'>
  .chat {
    position: relative;
    display: inline-block;
    width: 34%;
    min-width: 300px;
    height: 100%;
    background: yellow;
  }
</style>