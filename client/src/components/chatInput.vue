<template>
  <div class='chatInput'>
    <textarea class='chatInput__input' rows='5' cols='33' v-model='message'></textarea>
    <button class='chatInput__send' v-on:click='sendMessage(message);message=""'>send</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'chatInput',
  data() {
    return {
      message: ''
    };
  },
  methods: mapActions(['sendMessage'])
};
</script>

<style lang='sass'>
  .chatInput {
    position: relative;
    display: flex;
    height: 100px;
    padding: 15px 15px 15px 15px;
    flex-direction: row;
    justify-content: flex-start;
    &__input {
      position: relative;
      display: inline-block;
      flex-grow: 5;
    }

    &__send {
      display: inline-block;
      flex-grow: 1;
      padding: 0 5px;
      width: 100px;
      height: 100px;
      margin: 0 0 0 10px;
      border: none;
      font-size: 1.5rem;
    }
  }
</style>