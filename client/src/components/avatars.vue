<template>
  <div class="avatars">
    <div class="avatars__container">
      <div
        class="avatars__container__avatar avatar"
        v-for="(item, index) in avatars"
        v-bind:key="index"
        v-bind:class="{selected: avatar===index}"
        v-on:click="select(index)"
        v-bind:style="{backgroundPositionX: item.x, backgroundPositionY: item.y}"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'avatars',
  props: {
    user: Object
  },
  data() {
    return {
      avatar: 0,
      nbAvatars: 100,
      avatars: [],
      avatarX: 0,
      avatarY: 0
    };
  },
  methods: {
    select: function(index) {
      this.$emit('select', index);
    },
    computeAvatar: function(index) {
        const col = 10;
        const row = 10;
        this.avatarX = -(index % col) * 120 + 'px';
        this.avatarY = -Math.floor(index / row) * 120 + 'px';
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
      x = -(i % col) * 120 + 'px';
      y = -Math.floor(i / row) * 120 + 'px';
      avatars.push({ x, y });
    }
    this.avatars = avatars;
  }
};
</script>

<style lang='sass'>
    .avatars {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color2);
        overflow: hidden scroll;
        z-index: 2;
        &__container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          &__avatar {
            padding: 6px;
            transform: scale(1);
            transition: transform 300ms;
            box-sizing: border-box;
            border: solid 2px var(--color2);
            &:hover {
              z-index:4;
              border: solid 2px var(--color1);
              transform: scale(1.1);
            }
          }
        }
    }   
</style>