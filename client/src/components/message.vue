<template>
  <div class='message' v-bind:class='{current}'>
    <div class='message__author'>{{author.username}}</div>
    <div class='message__content'>{{message}}</div>
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
    margin: 7px 0;
    max-width: 70%;
    align-self: flex-start;
    &__author {
      font-size: 0.9rem;
    }
    &__content {
      padding: 15px;
      font-size: 1.2rem;
      border-radius: 20px;
      background: #cac1c1;
    }
    &.current {
      align-self: flex-end;
      .message__content {
        text-align: right;
      }
    }
  }
</style>