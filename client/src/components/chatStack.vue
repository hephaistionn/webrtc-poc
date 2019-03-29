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
    display: block;
    width: 715px;
    height: 100px;
    border: solid;
    margin: 5px 0 0 20px;
}
</style>