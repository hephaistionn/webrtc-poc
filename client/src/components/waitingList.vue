<template>
  <div class="waitingList">
    <waitingItem v-bind:username="item" :key="item" v-for="item in $store.state.waitingList"/>
  </div>
</template>

<script>
import waitingItem from "./waitingItem.vue";
export default {
  name: "waitingList",
  components: {
    waitingItem
  }
};
</script>

<style lang="sass">
  .waitingList {
      display: inline_block;
  }
</style>