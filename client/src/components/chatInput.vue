<template>
  <div class="chatInput">
    <textarea class="chatInput__input" rows="5" cols="33" v-model="message"></textarea>
    <button class="chatInput__send" v-on:click="sendMessage(message);message=''">send</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "chatInput",
  data() {
    return {
      message: ""
    };
  },
  methods: mapActions(["sendMessage"])
};
</script>

<style lang="sass">
  .chatInput {
    position: relative;
    display: block;
    width: 715px;
    height: 100px;
    border: solid;
    margin: 5px 0 0 20px;
    
    &__input {
    position: relative;
    display: inline-block;
    width: 639px;
    height: 41px;
    margin: 5px 0 0 20px;
    }

    &__send {
      display: inline-block;
      padding: 0 5px;
      width: 71px;
      height: 40px;
      margin: 5px 0 0 6px;
      vertical-align: top;
    }
  }
</style>