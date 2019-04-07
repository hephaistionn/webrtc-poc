<template>
  <div class='waitingList'>
    <div class='waitingList__list' v-show='!$store.state.peer2 && !$store.state.break'>
        <waitingItem 
          v-bind:username='item.username'
          v-bind:avatar='item.avatar'
          :key='index' v-for='(item, index) in $store.state.waitingList'/>
    </div>
  </div>
</template>

<script>
import waitingItem from './waitingItem.vue';
export default {
  name: 'waitingList',
  components: {
    waitingItem
  }
};
</script>

<style lang='sass'>
  .waitingList {
    display: inline-block;
    background: blue;
    min-width: 100px;
    width: 8%;
    height: 100%;
  }
</style>