<template>
  <div class='stream' v-bind:class='{emitter: emitter}'>
    <video ref='videoRef'></video>
    <username v-if='actived && user' v-bind:editable='emitter' v-bind:username='user.username' v-bind:avatar='user.avatar' />
    <div v-show='emitter && mute' class='stream__mute' v-on:click='toggleMute'></div>
    <div v-show='emitter && !mute' class='stream__unmute' v-on:click='toggleMute'></div>
  </div>
</template>

<script>
import username from './username.vue';
export default {
  name: 'stream',
  props: ['stream', 'emitter', 'user', 'actived'],
  components: {
    username
  },
  data() {
    return {
      mute: false
    };
  },
  watch: {
    stream: function(newVal, oldVal) {
      this.$refs.videoRef.srcObject = newVal;
      this.$refs.videoRef.volume = 0;
      this.$refs.videoRef.play();
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
    cursor: pointer;
  }
  .stream {
    position: relative;
    width: 100%;
    height:  0;
    padding-top: 75%;
    background: #9C27B0;
    flex-basis: 100%;
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &__unmute,
    &__mute {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      color: grey;
      display: none;
      &:before {
          @include icon;
          content: '\f131';
      }
    }
    &__mute {
      color: yellow;
    }

    &:hover {
      .stream__unmute,
      .stream__mute {
        display: block;
      }
    }
  }
</style>