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
      const col = 4;
      const row = 4;
      this.avatarX = -(index % col) * 135 + 'px';
      this.avatarY = -Math.floor(index / row) * 135 + 'px';
    }
  }
};
</script>

<style lang='sass'>
  .waitingItem {
    position: relative;
    display: inline_block;
    &__username {
      position: absolute;
      display: inline-block;
      top: 0;
      left: 0;
    }
    &__avatar {
      display: inline-block;
      margin-right: 10px;
      width: 135px;
      height: 152px;
      background-color: yellow;
      background-size: 538px;
      background-repeat: no-repeat;
      background-position: -135px -152px;
    }  
  }
</style>