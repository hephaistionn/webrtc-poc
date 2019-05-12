<template>
  <div class='waitingItem'>
    <div class='waitingItem__avatar avatar'
       v-bind:style='{backgroundPositionX: avatarX, backgroundPositionY: avatarY}'>
    </div>
    <div class='waitingItem__username'>
      {{username}}
    </div>
    <div class='waitingItem__age'>
      {{age}}
    </div>
    <div class='waitingItem__sexe icon' v-bind:class="['v'+sexe]">
    </div>
  </div>
</template>

<script>
export default {
  name: 'waitingItem',
  props: {
    profile: Object
  },
  data() {
    return {
      avatarX: 0,
      avatarY: 0,
      username: '',
      avatar: 0,
      age: 0,
      sexe: 1
    };
  },
  mounted() {
    this.updateProfile(this.profile);
  },
  watch: {
    profile: function(value){
      this.updateProfile(value);
    }
  },
  methods: {
    updateAvatar: function() {
      const index = this.avatar;
      const size = 100;
      const col = 10;
      const row = 10;
      this.avatarX = -(index % col) * size + 'px';
      this.avatarY = -Math.floor(index / row) * size + 'px';
    },
    updateProfile: function(profile) {
      this.username = profile.username;
      this.avatar = profile.avatar;
      this.age = profile.age;
      this.sexe = profile.sexe;
      this.updateAvatar();
    }
  }
};
</script>

<style lang='sass'>
  .waitingItem {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 120px;
    margin-bottom: 4px;
    margin-left: 4px;
    border: solid 2px var(--color1);
    border-radius: 12px;
    background-color: var(--color2);
    overflow: hidden;
    &__username {
      position: absolute;
      display: inline-block;
      bottom: 0px;
      left: 0px;
      width: 112px;
      color: var(--color2);
      padding: 4px;
      white-space: normal;
      background-color: var(--color1);
    }
    &__avatar {
      display: inline-block;
      position: absolute;
      top: calc(50% - 50px);
      left: calc(50% - 50px);
      background-repeat: no-repeat;
      box-sizing: border-box;
      border: solid 2px var(--color2);
      border-left-width: 1px;
      border-right-width: 1px;
      border-radius: 70px;
      &.avatar {
        width: 100px;
        height: 100px;
        background-size: 1000px;
      }
      @media (max-aspect-ratio: 8/5) {
        border-bottom-width: 1px;
        border-top-width: 1px;
      }
    }
    &__age {
      position: absolute;
      display: inline-block;
      top: 0px;
      left: 0px;
      color: var(--color1);
      margin: 6px;
      font-weight: bold;
    }
    &__sexe {
      position: absolute;
      display: inline-block;
      top: 0px;
      right: 0px;
      color: var(--color1);
      margin: 6px;
      &.v1{
        &:before {
          content: '\f222';
        }
      }
      &.v2{
        &:before {
          content: '\f221';
        }
      }
      &.v3{
        &:before {
          content: '\f22c';
        }
      }
    }

  }
</style>