<template>
  <div class='message' v-bind:class='{current}'>
    <div class='message_author'>{{author.username}}</div>
    <div class='message_content'>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    message: String,
    author: String,
    current: Boolean
  }
};
</script>

<style lang='sass'>
  .message {
    display: block;
    align-self: flex-start;
    &.current {
      align-self: flex-end;
    }
  }
</style>