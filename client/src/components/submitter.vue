<template>
  <div class='submitter'>
    <textarea class='submitter__input' 
      rows="1"
      v-on:keyup.enter.prevent='send'
      v-on:keyup='autogrow(this)'
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
    },
    autogrow : function (element) {
      this.$refs.textarea.style.height = "5px";
      this.$refs.textarea.style.height = (this.$refs.textarea.scrollHeight)+"px";
    }
  }
};
</script>

<style lang='sass'>
  .submitter {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    &__input {
      position: relative;
      display: inline-block;
      flex-grow: 5;
      font-size: 1.2rem;
      padding: 6px;
      resize: none;
      overflow: hidden;
      min-height: 2rem;
      max-height: 100px;
      border: none;
      margin: 0 0 3px 3px;
    }
    &__send {
      position: relative;
      display: inline-block;
      flex-grow: 1;
      padding: 7px 5px;
      margin: 0px 5px 5px 5px;
      border: none;
      font-size: 1.2rem;
      background: #3F51B5;
      color: white;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      font-family: 'Font Awesome 5 Free';
      &:before {
        content: '\f144';
      } 
    }
  }
</style>