<template>
  <div class="header"> 
    <div class="header__container">
      <img class="header__container__icon" src="./../../assets/logo.png"> 
      <button class="header__container__button" v-show="$store.state.break" @click="start">start</button>
      <button class="header__container__button" v-show="!$store.state.break" @click="stop">stop</button>
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
    background: green;
    &__container {
      margin: auto;
      width: 100%;
      max-width: 1700px;
      height: 60px;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      &__icon {
        display: inline-block;
        width: 264px;
        height: 40px;
        background: blue;
        margin: 4px;
      }
      &__button {
        display: inline-block;
        height: 40px;
        background: blue;
        margin: 4px;
        padding: 0 16px;
        border: none;
        font-size: 2rem;
        color: white;
      }
    }
  }
</style>