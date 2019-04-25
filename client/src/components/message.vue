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
    margin: 0 0;
    max-width: 33%;
    align-self: flex-end;
    &__author {
      margin: 5px;
      font-size: 0.8rem;
      color: white;
      text-shadow: 0 0 3px black;
    }

    @media (min-aspect-ratio: 8/5) {
      .message {
        margin: 6px 0;
      }
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
      background: #45c0d6;
      color: white;
    }
    &.current {
      .message__content {
        text-align: right;
        background: #40c0d0;
      }
      .message__author {
        text-align: right;
      }
    }
  }
</style>