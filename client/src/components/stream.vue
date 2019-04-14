<template>
  <div class='stream' v-bind:class='{emitter: emitter}'>
    <video ref='videoRef'></video>
    <div class='stream__profile'>
      <div
        class='stream__profile__avatar avatar'
        v-bind:style='{backgroundPositionX: avatarX, backgroundPositionY: avatarY}'>
      </div>
      <div v-if='user' class='stream__profile__username'>{{ user.username }}</div>
    </div>
    <div v-show='emitter && mute' class='stream__button  microon' v-on:click='toggleMute'></div>
    <div v-show='emitter && !mute' class='stream__button microoff' v-on:click='toggleMute'></div>
    <div v-show='!emitter && mute' class='stream__button  volumeon' v-on:click='toggleMute'></div>
    <div v-show='!emitter && !mute' class='stream__button volumeoff' v-on:click='toggleMute'></div>
  </div>
</template>

<script>
export default {
  name: 'stream',
  props: ['stream', 'emitter', 'user'],
  data() {
    return {
      mute: false,
      avatarX: 0,
      avatarY: 0
    };
  },
  watch: {
    stream: function(newVal, oldVal) {
      this.$refs.videoRef.srcObject = newVal;
      this.$refs.videoRef.volume = 0;
      this.$refs.videoRef.play();
    },
    user: function(user) {
      const index = user.avatar;
      const col = 4;
      const row = 4;
      this.avatarX = -(index % col) * 80 + 'px';
      this.avatarY = -Math.floor(index / row) * 85 + 'px';
    }
  },
  methods: {
     toggleMute: function() {
       this.mute = !this.mute; 
       this.$refs.videoRef.muted = this.mute;
       this.$store.dispatch('setMute', this.mute);
     }
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
  .stream {
    position: relative;
    width: 100%;
    height: 50%;
    flex-basis: 100%;
    margin-bottom: 10px;
    background: black;
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &__profile {
      position: absolute;
      display: flex;
      top: 0;
      left: 0;
      margin: 10px 10px;
      color: white;
      text-shadow: 0 0 5px black;
      width: calc(100% - 100px);
      &__avatar {
        display: inline-block;
        margin-right: 10px;
        width: 80px;
        height: 90px;
        background-color: yellow;
        background-size: 320px;
        background-repeat: no-repeat;
        background-position: -84px -86px;
      }
      &__username {
        display: inline-block;
        
      }
    }
    &__button  {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      color: grey;
      &__microon {
        &:before {
            @include icon;
            content: '\f131';
        }
      }
      &__microoff {
        &:before {
            @include icon;
            content: '\f131';
        }
      }
      &__volumeon {
        &:before {
            @include icon;
            content: '\f131';
        }
      }
      &__volumeoff {
        &:before {
            @include icon;
            content: '\f131';
        }
      }
    }
  }
</style>