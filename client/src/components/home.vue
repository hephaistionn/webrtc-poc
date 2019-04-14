<template>
  <div class='home'>
    <div class='home__container'>
      <div class='home__container__helper'>your profile</div>
      <input v-model='username' class='home__container__input' maxlength='40'>
      <div
        v-show='edit === false'
        v-on:clickj='edit = true'
        class='home__container__avatar avatar'
        v-bind:style='{backgroundPositionX: avatarX, backgroundPositionY: avatarY}'>
      </div>
      <div class='home__container__avacontainer' v-show='edit === true'>
        <div
          class='home__container__avacontainer__avatar avatar'
          v-for='(item, index) in avatars'
          v-bind:key='index'
          v-bind:class='{selected: avatar===index}'
          v-on:click='select(index)'
          v-bind:style='{backgroundPositionX: item.x, backgroundPositionY: item.y}'
        ></div>
      </div>
      <button class='home__container__start' v-on:click='start'>start</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'home',
  props: {
    user: Object
  },
  data() {
    return {
      username: '',
      avatar: 0,
      nbAvatars: 16,
      avatars: [],
      avatarX: 0,
      avatarY: 0,
      edit: false
    };
  },
  watch: {
    user: function(user) {
      if(user) {
        const col = 4;
        const row = 4;
        this.avatarX = -(user.avatar % col) * 80 + 'px';
        this.avatarY = -Math.floor(user.avatar / row) * 85 + 'px';
        this.avatar = user.avatar;
        this.username = user.username;
      }
    }
  },
  methods: {
    start: function() {
      this.$store.dispatch('start', {username: this.username, avatar: this.avatar })
    },
    select: function(index) {
      this.selectAvatar = index;
      this.edit = false;
    }
  },
  
  mounted() {
    this.editUsername = this.username;
    this.selectAvatar = this.avatar;
    let x;
    let y;
    const col = 4;
    const row = 4;
    const avatars = [];
    for (let i = 0; i < this.nbAvatars; i++) {
      x = -(i % col) * 80 + 'px';
      y = -Math.floor(i / row) * 85 + 'px';
      avatars.push({ x, y });
    }
    this.avatars = avatars;
  }
};
</script>

<style lang='sass'>
    @mixin icon {
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      font-family: 'Font Awesome 5 Free';
      margin: 0 5px;
      cursor: pointer;
    }
    .home {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      &__container {
        position: fixed;
        display: inline-block;
        width: 800px;
        background-color: gray;
        &__helper {
          position: relative;
          display: block;
          margin: 30px;
          font-size: 1.5rem;
        }
        &__input {
          position: relative;
          margin: 30px;
          display: block;
          font-size: 2rem;
          width: calc(100% - 60px);
          height: 100px;
        } 
        &__avatar {
          display: inline-block;
          margin-right: 10px;
          width: 80px;
          height: 90px;
          background-color: yellow;
          background-size: 320px;
          background-repeat: no-repeat;
          min-width: 80px;
          background-position: -84px -86px;
        }
        &__avacontainer {
          position: relative;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: calc(100% - 60px);
          margin: 30px;
          height: 117px;
          overflow-y: hidden;
          overflow-x: scroll;
          &__avatar {
            display: inline-block;
            margin-right: 10px;
            width: 80px;
            height: 90px;
            background-color: yellow;
            background-size: 320px;
            background-repeat: no-repeat;
            min-width: 80px;
            background-position: -84px -86px;
          }
        }
        &__start {
          position: absolute;
          bottom:: 10px;
          right: 30px;
          display: inline-block;
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 2.5rem;
          &:before {
              @include icon;
              content: '\f0c7';
          }
        }
      }
  }
</style>