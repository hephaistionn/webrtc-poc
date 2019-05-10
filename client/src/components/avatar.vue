<template>
  <div class='avatar' v-bind:style='{backgroundPositionX: avatarX, backgroundPositionY: avatarY}'>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    avatar: Number
  },
  data() {
    return {
      nbAvatars: 100,
      avatars: [],
      avatarX: 0,
      avatarY: 0
    };
  },
  methods: {
    computeAvatar: function(index) {
        const col = 10;
        const row = 10;
        this.avatarX = -(index % col) * 120 + 'px';
        this.avatarY = -Math.floor(index / row) * 120 + 'px';
    }
  },
  watch:{
   avatar: function(index) {
       this.computeAvatar(index);
   } 
  },
  mounted() {
    this.computeAvatar(this.avatar);
  }
};
</script>

<style lang='sass'>
    .avatar {
        display: inline-block;
        width: 120px;
        height: 120px;
        background-size: 1200px;
        background-repeat: no-repeat;
        background-position: -120px -120px;
        cursor: pointer;
    }   
</style>