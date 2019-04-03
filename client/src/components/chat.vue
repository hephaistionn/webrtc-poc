<template>
  <div class="chat">
    <chatStack/>
    <chatInput/>
  </div>
</template>

<script>
import chatStack from "./chatStack.vue";
import chatInput from "./chatInput.vue";
export default {
  name: "chat",
  components: {
    chatStack,
    chatInput
  }
};
</script>

<style lang="sass">
  .chat {
    position: relative;
    display: inline-block;
    width: 34%;
    min-width: 300px;
    height: 100%;
    background: yellow;
  }
</style>