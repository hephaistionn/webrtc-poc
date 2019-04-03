<template>
  <div class="chatStack">
    <chatMessage v-bind:message="message" v-for="message in $store.state.stack" :key="message"/>
  </div>
</template>

<script>
import chatMessage from "./chatMessage.vue";
export default {
  name: "chatStack",
  components: {
    chatMessage
  }
};
</script>

<style lang="sass">
  .chatStack {
    position: relative;
    display: flex;
    height: calc(100% - 164px);
    padding: 15px 15px 15px 15px;
  } 
</style>