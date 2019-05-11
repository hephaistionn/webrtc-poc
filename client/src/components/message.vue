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
    margin-top: 1rem;
    &__author {
      margin: 5px;
      font-size: 0.8rem;
      color: var(--color2);
      text-shadow: 0 0 3px black;
      display: none;
    }

    @media (min-aspect-ratio: 8/5) {
      .message__content {
        padding: 0.8rem;
        font-size: 1.4rem;
      }
      .message__author {
        font-size: 1rem;
      }
    }

    &__content {
      padding: 0.5rem;
      font-size: 0.9rem;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.3);
      color: white;
      display: inline-block;
    }
    &.current {
      .message__content {
        text-align: right;
        background: rgba(255, 205, 22, 0.5)
      }
    }
  }
</style>