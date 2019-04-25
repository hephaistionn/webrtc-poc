<template>
  <div class='submitter'>
    <textarea class='submitter__input' 
      rows="1"
      v-on:keyup.enter.prevent='send'
      v-on:keyup='autogrow()'
      ref='textarea'
      v-model='message'></textarea>
    <button class='submitter__send'  v-on:click='send'></button>
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
      this.$refs.textarea.style.height = "34px";
    },
    autogrow : function () {
      if(!this.message) {
        this.$refs.textarea.style.height = "34px";
      } else {
        this.$refs.textarea.style.height = "5px";
        this.$refs.textarea.style.height = (this.$refs.textarea.scrollHeight)+"px";
      }
    }
  }
};
</script>

<style lang='sass'>
  .submitter {
    position: absolute;
    width: 100%;
    max-width: 500px;
    bottom: 0.9%;
    right: 0.45%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    &__input {
      position: relative;
      display: inline-block;
      flex-grow: 5;
      font-size: 1.4rem;
      padding: 6px;
      resize: none;
      overflow: hidden;
      min-height: 2rem;
      max-height: 100px;
      border: none;
      margin: 0 0 5px 10px;
      z-index: 3;
    }
    &__send {
      position: relative;
      display: inline-block;
      margin: 0px 5px 5px 10px;
      border: none;
      background-color: transparent;
      background-image: url(./../../assets/icon.png);
      background-size: auto 100%;
      background-position-x: 100%;
      width: 35px;
      height: 35px;
      z-index: 1;
    }
  }
</style>