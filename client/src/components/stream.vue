<template>
  <div class='stream' v-bind:class='{emitter: emitter}'>
    <video ref='videoRef'></video>
    <div class='stream__profile' v-bind:class='{emitter: emitter}'>
      <div
        class='stream__profile__avatar avatar'
        v-bind:style='{backgroundPositionX: avatarX, backgroundPositionY: avatarY}'>
      </div>
      <div v-if='user' class='stream__profile__username'>{{ user.username }}</div>
    </div>
    <div  
      class='stream__button__audio controle'
      v-bind:class='{disabled: mute}'
      v-on:click='toggleAudio'></div>
    <div 
      v-show='emitter'
      class='stream__button__video controle'
      v-bind:class='{disabled: hidden}'
      v-on:click='toggleVideo'></div>
  </div>
</template>

<script>
export default {
  name: 'stream',
  props: ['stream', 'emitter', 'user'],
  data() {
    return {
      mute: true,
      hidden: false,
      avatarX: 0,
      avatarY: 0
    };
  },
  watch: {
    stream: function(newVal, oldVal) {
      this.$refs.videoRef.srcObject = newVal;
      if (this.emitter) {
        this.$refs.videoRef.volume = 0;
      } else {
        this.$refs.videoRef.volume = 1;
      }
      this.$refs.videoRef.muted = this.mute;
      this.$refs.videoRef.play();
    },
    user: function(user) {
      if(user) {
        const index = user.avatar;
        const col = 4;
        const row = 4;
        this.avatarX = -(index % col) * 50 + 'px';
        this.avatarY = -Math.floor(index / row) * 55 + 'px';
      }
    }
  },
  methods: {
      toggleAudio: function() {
        this.mute = !this.mute; 
        this.$refs.videoRef.muted = this.mute;
        if (this.emitter) {
          this.$store.dispatch('enableAudio', !this.mute);
        }
      },
      toggleVideo: function() {
        this.hidden = !this.hidden;
        if (this.emitter) {
          this.$store.dispatch('enableVideo', !this.hidden);
        }
      }
  }
};
</script>

<style lang='sass'>
  @mixin icon {
    position: absolute;
    bottom: calc(42% + 45px);
    left: calc(1% + 13px);
    width: 40px;
    font-size: 2rem;
    text-align: center;
    cursor: pointer;
    color: #01acca;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    font-family: 'Font Awesome 5 Free';
  }

  .stream {
    position: relative;
    display: inline-block;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 1;
    video {
      position: relative;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    &.emitter {
      position: absolute;
      display: inline-block;
      width: 36%;
      height: 36%;
      left: 1.5%;
      bottom: 1.5%;
      max-width: 600px;
      max-height: 600px;
      z-index: 2;
    }
    &__profile {
      position: absolute;
      display: flex;
      bottom: 38%;
      left: 1.5%;
      margin: 5px 5px;
      color: white;
      text-shadow: 0 0 5px black;
      align-items: center;
      &__avatar {
        display: inline-block;
        margin-right: 10px;
        width: 50px;
        height: 55px;
        background-color: yellow;
        background-size: 195px;
        background-repeat: no-repeat;
        background-position: -50px -55px;
      }
      &__username {
        display: inline-block;
        font-size: 1.5rem;
        @media (max-aspect-ratio: 8/5) {
          font-size: 1rem;
        }
      }
      &.emitter {
        left: 0;
        top: 1%;
        bottom: auto;
      }
    }

    .controle {
      display:none; 
    }
    &:hover {
      .controle {
        display: block;
      }
    }

    &.emitter {
      .controle {
        bottom: 20px;
        left: 35px;
      }
      .stream__button__video {
        left: 80px;
      }
    }

    &__button  {
      &__audio {
        @include icon;
        &.disabled:before {
          content: '\f131';
        }
        &:before {
          content: '\f3c9';
        }
      }
      &__video {
        @include icon;
        right: 80px;
        &.disabled:before {
          content: '\f4e2';
        }
        &:before {
          content: '\f03d';
        }
      }
    }
  }
</style>