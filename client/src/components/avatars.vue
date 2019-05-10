<template>
  <div class="selector">
    <div class="selector__container">
      <div
        class="selector__container__avatar avatar"
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
        this.avatarX = -(index % col) * 60 + 'px';
        this.avatarY = -Math.floor(index / row) * 60 + 'px';
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