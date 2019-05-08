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
      this.$refs.textarea.style.height = "45px";
    },
    autogrow : function () {
      if(!this.message) {
        this.$refs.textarea.style.height = "45px";
      } else {
        this.$refs.textarea.style.height = "5px";
        const height = Math.max(this.$refs.textarea.scrollHeight, 45);
        this.$refs.textarea.style.height = height+"px";
      }
    }
  }
};
</script>

<style lang='sass'>
  .submitter {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    &__input {
      position: relative;
      display: inline-block;
      flex-grow: 5;
      font-size: 1.4rem;
      line-height: 2rem;
      padding: 6px;
      resize: none;
      overflow: hidden;
      min-height: 2rem;
      max-height: 100px;
      border: none;
      margin: 0 1rem;
      height: 45px;
      align-self: flex-end;
      background: #3bb8ff54;
      color: white;
      z-index: 3;
    }
    &__send {
      position: relative;
      display: inline-block;
      flex-basis: 45px;
      flex-shrink: 0;
      border: none;
      background-color: transparent;
      background-image: url(./../../assets/icon.png);
      background-size: auto 100%;
      background-position-x: 100%;
      width: 45px;
      height: 45px;
      z-index: 2;
    }
  }
</style>