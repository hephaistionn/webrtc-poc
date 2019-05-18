<template>
  <div class='waitingItem' v-bind:class='{empty: !username, dummyItem: profile.dummyItem, focus: focus}'>
    <div class='waitingItem__avatar avatar'
       v-bind:style='{backgroundPositionX: avatarX, backgroundPositionY: avatarY}'>
    </div>
    <div class='waitingItem__username'>
      <span class='waitingItem__username__sexe icon' v-bind:class="['v'+sexe]"> </span><span>{{username}}</span> 
    </div>
    <div class='waitingItem__age'>
      {{age}}
    </div>
    <div class='waitingItem__over'></div>
  </div>
</template>

<script>
export default {
  name: 'waitingItem',
  props: {
    profile: Object,
    focus: Boolean
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
      const size = 110;
      const col = 10;
      const row = 10;
      this.avatarX = -(index % col) * size + 'px';
      this.avatarY = -Math.floor(index / row) * size + 'px';
    },
    updateProfile: function(profile) {
      if(this.profile.username) {
        this.username = profile.username;
        this.avatar = profile.avatar;
        this.age = profile.age;
        this.sexe = profile.sexe;
        this.updateAvatar();
      }
    }
  }
};
</script>

<style lang='sass'>
  .waitingItem {
    position: relative;
    display: inline-block;
    width: 110px;
    height: 110px;
    margin-bottom: 4px;
    margin-left: 4px;
    border: solid 2px var(--color1);
    background-color: var(--color2);
    &__username {
      position: absolute;
      display: inline-block;
      bottom: 0px;
      left: 0px;
      width: 102px;
      color: #ffcd15;
      padding: 4px;
      font-size: 0.8rem;
      white-space: normal;
      background-color: rgba(34, 38, 42, 0.5);
      &__sexe {
        display: inline-block;
        margin-right: 5px;
        margin-left: 2px;
        font-size: 1.2rem;
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
    &__avatar {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      background-repeat: no-repeat;
      box-shadow: 0px 0px 10px 2px rgba(34, 38, 42, 0.55) inset;
      &.avatar {
        width: 110px;
        height: 110px;
        background-size: 1100px;
      }
    }
    &__age {
      position: absolute;
      display: inline-block;
      top: 0px;
      right: 0px;
      color: var(--color1);
      font-weight: bold;
      background: rgba(34, 38, 42, 0.3);
      padding: 4px 3px 6px 6px;
      border-bottom-left-radius: 15px;
    }
    &__over {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      //background: rgba(255, 255, 255, 0.4);
      display: none;
      border: solid 3px var(--color1);
      box-sizing: border-box;
    }
    &.focus {
      .waitingItem__over {
        display: block;
      }
      .waitingItem__avatar.avatar {
        box-shadow: 0px 0px 10px 3px #ffffff inset;
      }
    }
    &.dummyItem {
      width: 114px;
      height: 0px;
      border: none;
      .waitingItem__age,
      .waitingItem__avatar,
      .waitingItem__username {
        display: none;
      }
    }
    &.empty {
      background-color: rgba(34, 38, 42, 0.6);
      border-color: black;
      .waitingItem__age,
      .waitingItem__avatar,
      .waitingItem__username {
        display: none;
      }
    }
  }
</style>