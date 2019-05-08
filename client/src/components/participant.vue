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
      this.avatarX = -(index % col) * 120 + 'px';
      this.avatarY = -Math.floor(index / row) * 120 + 'px';
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
      top: 0px;
      left: 0px;
      width: 112px;
      background-color: #ffffff5c;
      color: #00335d;
      padding: 4px;
      white-space: normal;
    }
    &__avatar {
      display: inline-block;
      width: 120px;
      height: 120px;
      background-size: 1200px;
      background-repeat: no-repeat;
      background-position: -120px -120px;
      box-sizing: border-box;
      border: solid 2px #87c9ff;
      border-left-width: 1px;
      border-right-width: 1px;
      @media (max-aspect-ratio: 1/1) {
        border-bottom-width: 1px;
        border-top-width: 1px;
      }
    }
  }
</style>