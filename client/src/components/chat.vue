<template>
  <div class="chat">
    <h2>chat</h2>
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
    display: inline_block;
  }
</style>