<template>
  <div class='submitter'>
    <textarea class='submitter__input' rows='5' cols='33' 
    v-on:keyup.enter.prevent='send'
    v-model='message'></textarea>
    <button class='submitter__send' v-on:click='send'>send</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'submitter',
  data() {
    return {
      message: ''
    };
  },
  methods: {
    send: function () {
      let mgs = this.message.trim();
      if(mgs) {
        this.$store.dispatch('sendMessage', mgs);
      }
      this.message = '';
    }
  }
};
</script>

<style lang='sass'>
  .submitter {
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
      background: green;
      color: white;
    }
  }
</style>