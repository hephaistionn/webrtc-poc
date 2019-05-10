<template>
  <div class='home'>
    <div class='home__header'>
      <div class='home__header__title'>CHATROULETTE.IO</div>
    </div>
    <div class='home__profile'>
      <avatar
        class='home__profile__avatar'
        v-bind:avatar='avatar'
        v-on:click='edit = true'/>
      <div class='home__profile__username'> 
        <input v-model='username' maxlength='40'>
        <div class='icon'></div>
      </div>
      <div class='home__profile__age'> 
        <input v-model='age' maxlength='3' type="number" min=18 max=120>
        <div class='icon'></div>
      </div>
      <div class='home__profile__sexe'>
        <div class='home__profile__sexe__v1 icon' v-on:click='sexe = 1' v-bind:class='{selected: sexe===1}'></div>
        <div class='home__profile__sexe__v2 icon' v-on:click='sexe = 2' v-bind:class='{selected: sexe===2}'></div>
        <div class='home__profile__sexe__v3 icon' v-on:click='sexe = 3' v-bind:class='{selected: sexe===3}'></div>
      </div>
      <button class='home__profile__start' v-on:click='start'>start</button>
      <avatars v-if='edit' @select="select"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import avatar from './avatar.vue';
import avatars from './avatars.vue';
export default {
  name: 'home',
  props: {
    user: Object
  },
  components: {
    avatar,
    avatars
  },
  data() {
    return {
      username: '',
      avatar: 0,
      age: 18,
      sexe: 1,
      nbAvatars: 100,
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
      this.edit = false;
    }
  },
  
  mounted() {
    this.editUsername = this.username;
    this.selectAvatar = this.avatar;
    let x;
    let y;
    const col = 10;
    const row = 10;
    const avatars = [];
    for (let i = 0; i < this.nbAvatars; i++) {
      x = -(i % col) * 80 + 'px';
      y = -Math.floor(i / row) * 80 + 'px';
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
      background: black;
      &__header {
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 33%;
        min-height: 200px;
        background-color: #ffffff;
        background-image: url(./../../assets/banner4.png);
        &__title {
          position: relative;
          font-size: 2.0rem;
          text-align: center;
          font-weight: bold;
          color: #ffffff;
          text-shadow: 2px 0 0 #3bb8ff, -2px 0 0 #3bb8ff, 0 2px 0 #3bb8ff, 0 -2px 0 #3bb8ff, 1px 1px #3bb8ff, -1px -1px 0 #3bb8ff, 1px -1px 0 #3bb8ff, -1px 1px 0 #3bb8ff;
        }
      }
      &__profile {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: 2rem;
        max-width: 400px;
        margin: auto;
        input {
          position: absolute;
          top: 0;
          left: 0;
          padding: 5px 9px;
          font-size: 1.4rem;
          padding-left: 3rem;
          width: 100%;
          border-radius: 10px;
        }
        .icon {
            position: absolute;
            top: 8px;
            left: 8px;
            font-size: 1.5rem;
            color: black;
        }
        &__avatar {
          position: absolute;
          top: -60px;
          left: calc(50% - 60px);
          border-radius: 70px;
        }
        &__username {
          position: relative;
          display: block;
          width: 100%;
          height: 41px;
          margin: 3rem 0 0 0;
          .icon {
            &:before {
              content: '\f007';
            }
          }
        }
        &__age {
          position: relative;
          display: block;
          width: 110px;
          height: 41px;
          margin: 2rem 3rem 0 0;
          .icon {
            &:before {
              content: '\f1fd';
            }
          }
        }
        &__sexe {
          position: relative;
          display: block;
          height: 41px;
          margin: 2rem 0 0 0;
          background: white;
          border-radius: 10px;
          .icon {
            position: relative;
            display: inline-block;
            top: inherit;
            left: inherit;
            margin: 9px 10px;
          }
          .selected {
            color: #3bb8ff;
          }
          &__v1 {
            &.icon{
              margin-left: 20px;
            }
            &:before {
              content: '\f222';
            }
          }
          &__v2{
            &:before {
              content: '\f221';
            }
          }
          &__v3 {
            &.icon {
              margin-right: 20px;
            }
            &:before {
              content: '\f22c';
            }
          }
        } 
        &__start {
          position: relative;
          display: inline-block;
          width: 168px;
          cursor: pointer;
          font-size: 1.4rem;
          background: #3bb8ff;
          color: white;
          margin: 60px auto 0 auto;
          padding: 6px 5px;
          border-radius: 20px;
        }
      }
  }
</style>