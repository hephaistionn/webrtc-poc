<template>
  <div class='waitingItem'>{{username}}</div>
</template>

<script>
export default {
  name: 'waitingItem',
  props: {
    username: String,
    avatar: Number
  }
};
</script>

<style lang='sass'>
  .waitingItem {
      display: inline_block;
  }
</style>