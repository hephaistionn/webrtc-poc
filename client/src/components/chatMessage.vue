<template>
  <div class='chatMessage'>{{message}}</div>
</template>

<script>
export default {
  name: 'chatMessage',
  props: {
    message: String
  }
};
</script>

<style lang='sass'>
  .chatMessage {
      display: inline_block;
  }
</style>