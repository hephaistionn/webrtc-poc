<template>

  <div class='chatMessage' v-bind:class='{current}'>
    <div class='chatMessage_author'>{{author.username}}</div>
    <div class='chatMessage_message'>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'chatMessage',
  props: {
    message: String,
    author: String,
    current: Boolean
  }
};
</script>

<style lang='sass'>
  .chatMessage {
      display: block;
      align-self: flex-start;
      &.current {
        align-self: flex-end;
      }
  }
</style>