<template>
  <div class='home'>
    <div class='home__title'>CHATROULETTE.IO</div>
    <div class='home__helper'>Press button to start the roulette</div>
    <div class='home__profile'>
      <div
        v-on:click='edit = true'
        class='home__profile__avatar avatar'
        v-bind:style='{backgroundPositionX: avatarX, backgroundPositionY: avatarY}'>
      </div>
      <input v-model='username' class='home__profile__input' maxlength='40'>
      <button class='home__profile__start' v-on:click='start'>start</button>
      <div class='home__profile__block'>
        <div class='home__profile__avacontainer' v-show='edit === true' ref='list'>
          <div
            class='home__profile__avacontainer__avatar avatar'
            v-for='(item, index) in avatars'
            v-bind:key='index'
            v-bind:class='{selected: avatar===index}'
            v-on:click='select(index)'
            v-bind:style='{backgroundPositionX: item.x, backgroundPositionY: item.y}'>
          </div>
        </div>
      </div>
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
        this.avatar = user.avatar;
        this.computeAvatar(this.avatar);
        this.username = user.username;
      }
    }
  },
  methods: {
    start: function() {
      this.$store.dispatch('start', {username: this.username, avatar: this.avatar })
    },
    select: function(index) {
      this.avatar = index;
      this.computeAvatar(index);
      this.edit = false;
    },
    computeAvatar: function(index) {
        const col = 4;
        const row = 4;
        this.avatarX = -(index % col) * 60 + 'px';
        this.avatarY = -Math.floor(index / row) * 60 + 'px';
        this.scrollAvatar(index);
    },
    scrollAvatar: function(index){
      this.$refs.list.scrollLeft = (index * 80);
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
    .home {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &__title {
        position: relative;
        font-size: 3rem;
        text-align: center;
      }
      &__helper {
        position: relative;
        display: block;
        margin: 30px;
        font-size: 1.5rem;
      }
      &__profile {
        position: relative;
        bottom: 0;
        display: flex;
        flex-wrap: wrap;
        width: 404px;
        background: #a7a1a1;
        padding: 10px;
        border-radius: 5px;
        &__start {
          position: relative;
          display: inline-block;
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 2.5rem;
        }
        &__input {
          position: relative;
          display: block;
          margin-right: 10px;
          font-size: 1.4rem;
          width: 260px;
          padding: 5px 9px;
          height: 60px;
        } 
        &__avatar {
          display: inline-block;
          width: 60px;
          height: 60px;
          margin-right: 10px;
          background-color: yellow;
          background-size: 240px;
          background-repeat: no-repeat;
          background-position: -60px -60px;
          cursor: pointer;
          &:hover {
            opacity: 0.5;;
          }
        }
        &__block {
          position: relative;
          width: 100%;
          height: 0;
        }
        &__avacontainer {
          position: relative;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: 404px;
          overflow-y: auto;
          padding: 5px 10px;
          left: -10px;
          background: #a7a1a1;
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
            &.selected {
              border: solid;
              box-sizing: border-box;
            }
          }
        }
      }
  }
</style>