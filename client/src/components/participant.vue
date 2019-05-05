<template>
  <div class='waitingItem'>
    <div class='waitingItem__avatar avatar'
       v-bind:style='{backgroundPositionX: avatarX, backgroundPositionY: avatarY}'>
    </div>
    <div class='waitingItem__username'>
      {{username}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'waitingItem',
  props: {
    username: String,
    avatar: Number
  },
  data() {
    return {
      avatarX: 0,
      avatarY: 0
    };
  },
  mounted() {
    this.updateAvatar();
  },
  watch: {
    avatar: function(index) {
      this.updateAvatar();
    }
  },
  methods: {
    updateAvatar: function() {
      const index = this.avatar;
      const col = 10;
      const row = 10;
      this.avatarX = -(index % col) * 150 + 'px';
      this.avatarY = -Math.floor(index / row) * 150 + 'px';
    }
  }
};
</script>

<style lang='sass'>
  .waitingItem {
    position: relative;
    display: inline-block;
    &__username {
      position: absolute;
      display: inline-block;
      top: 5px;
      left: 10px;
    }
    &__avatar {
      display: inline-block;
      margin-right: 10px;
      width: 150px;
      height: 150px;
      background-size: 1500px;
      background-repeat: no-repeat;
      background-position: -150px -150px;
      border: solid #01abca;
      box-sizing: border-box;
    }  
  }
</style>