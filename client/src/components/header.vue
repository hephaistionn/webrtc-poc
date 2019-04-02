<template>
  <div class="header"> 
    <div class="header__container">
      <img class="header__container__icon" src="./../../assets/avatar3.png"> 
      <h1  class="header__container__title" >Demo WebRTC</h1>
      <button v-show="$store.state.break" @click="start">start</button>
      <button v-show="!$store.state.break" @click="stop">stop</button>
    </div>  
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import chatStack from "./chatStack.vue";
  import chatInput from "./chatInput.vue";
  export default {
    name: "header",
    methods: mapActions(["start", "stop"])
  };
</script>

<style lang="sass">
  .header {
    display: flex;
    position: relative;
    margin: auto;
    width: 100%;
    height: 60px;
    background: red;
    &__container {
      margin: auto;
      width: 100%;
      max-width: 1700px;
      height: 60px;
      background: orange;
      &__icon {
        display: inline-block;
        position: relative;
      }

      &__title {
        display: inline-block;
        position: relative;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
</style>