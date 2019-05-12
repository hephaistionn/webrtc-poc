<template>
  <div class='home'>
    <div class='home__header'>
      <div class='home__header__pic'></div>
      <h1 class='home__header__title'>CAMROULETTE</h1>
    </div>
    <div class='home__profile'>
      <avatar
        class='home__profile__avatar'
        v-bind:avatar='avatar'
        v-on:click.native='edit = true'/>
      <div class='home__profile__username'> 
        <input v-model='username' maxlength='40'>
        <div class='icon'></div>
      </div>
      <div class='home__profile__age'> 
        <input v-model='age' maxlength='3' type="number" min=0 max=999>
        <div class='icon'></div>
      </div>
      <div class='home__profile__sexe'>
        <div class='home__profile__sexe__v1 icon' v-on:click='sexe = 1' v-bind:class='{selected: sexe===1}'></div>
        <div class='home__profile__sexe__v2 icon' v-on:click='sexe = 2' v-bind:class='{selected: sexe===2}'></div>
        <div class='home__profile__sexe__v3 icon' v-on:click='sexe = 3' v-bind:class='{selected: sexe===3}'></div>
      </div>
      <button class='home__profile__start' v-on:click='start'  v-bind:disabled="!checked||age<18">start</button>
      <div class='home__profile__terms'>
        <div class='home__profile__terms__input icon'  v-on:click='checked  = !checked' v-bind:class='{checked: checked}'></div>
        <label>You must be over 18 and agree to the terms</label>
      </div>
    </div>
    <avatars v-show='edit' @select="select"/>
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
      edit: false,
      checked: false
    };
  },
  watch: {
    user: function(user) {
      if(user) {
        this.avatar = user.avatar;
        this.username = user.username;
        this.age = user.age;
        this.sexe = user.sexe;
      }
    }
  },
  methods: {
    start: function() {
      this.$store.dispatch('start', {username: this.username, avatar: this.avatar, age: this.age, sexe: this.sexe});
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
      background: #22262A;
      &__header {
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        min-height: 230px;
        background-color: #fff9f2;
        border-bottom: solid 3px var(--color1);
        &__pic {
          position:absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url(./../../assets/people4.jpg);
          background-size: cover;
          // filter: blur(3px);
          opacity: 0.8;
        }
        &__title {
          position: relative;
          font-size: 2.3rem;
          text-align: center;
          font-weight: bold;
          color: #fff;
          text-shadow: 3px 0 0 var(--color2), -3px 0 0 var(--color2), 0 3px 0 var(--color2), 0 -3px 0 var(--color2), 2px 2px var(--color2), -2px -2px 0 var(--color2), 2px -2px 0 var(--color2), -2px 2px 0 var(--color2);
          font-family: 'Xirod';
        }
        @media (max-aspect-ratio: 1/1) {
          .home__header__pic {
            background-position-x: -173px;
          }
          .home__header__title {
            font-size: 1.5rem;
          }
        }
      }
      &__profile {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: 1.8rem;
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
          border: solid 3px var(--color1);
        }
        .icon {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 1.5rem;
          color: var(--color1);
        }
        &__avatar {
          position: absolute;
          top: -75px;
          left: calc(50% - 63px);
          border-radius: 70px;
          border: solid 3px var(--color1);
          cursor: pointer;
          width: 120px;
          height: 120px;
          margin-right: 10px;
          background-size: 1200px;
          background-repeat: no-repeat;
          background-position: -120px -120px;
        }
        &__username {
          position: relative;
          display: block;
          width: 100%;
          height: 41px;
          margin: 3.5rem 0 0 0;
          .icon {
            &:before {
              content: '\f007';
            }
          }
        }
        &__age {
          position: relative;
          display: block;
          width: calc(50% - 1.5rem);
          height: 41px;
          margin: 2rem 3rem 0 0;
          input {
            padding-left: 43%;
          }
          .icon {
            &:before {
              content: '\f1fd';
            }
          }
        }
        &__sexe {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 43px;
          margin: 2rem 0 0 0;
          background: white;
          border-radius: 10px;
          width: calc(50% - 1.5rem);
          box-sizing: border-box;
          border: solid 3px var(--color1);
          .icon {
            position: relative;
            display: inline-block;
            top: inherit;
            left: inherit;
            margin: 6px 8px;
            cursor: pointer;
          }
          .selected {
            color: var(--selected);
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
          width: 100%;
          cursor: pointer;
          font-size: 1.5rem;
          background: var(--color1);
          margin: 35px auto 0 auto;
          padding: 7px 5px 8px 5px;
          border-radius: 10px;
          border: none;
          text-transform: uppercase;
        }
        &__terms {
          display: flex;
          align-items: center;
          position: relative;
          margin: 1.3rem 0;
          width: 100%;
          &__input {
            &.icon {
              position: relative;
              top: inherit;
              left:inherit;
              font-size: 1.5rem;
              color: var(--color1);
              margin-right: 0.5rem;
              width: 1.2rem;
              height: 1.2rem;
              box-sizing: border-box;
              border: solid 1px;
              border-radius: 10px;
            }
            &.checked {
              &:before {
                content: '\f00c';
                font-size: 0.5em;
                position: absolute;
                margin: 3px;
              }  
            }
          }
          label {
            display: inline-block;
            position: relative;
            color: #ffcd15;
            font-size: 0.8rem;
          }
        }
      }
  }
</style>