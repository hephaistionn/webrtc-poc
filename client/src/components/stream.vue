<template>
  <div class='stream' v-bind:class='{emitter: emitter}'>
    <video ref='videoRef'></video>
    <div class='stream__profile' v-bind:class='{emitter: emitter}'>
      <div
        class='stream__profile__avatar avatar'
        v-bind:style='{backgroundPositionX: avatarX, backgroundPositionY: avatarY}'>
      </div>
      <div v-if='user'
        v-bind:class='{emitter: emitter}'
        class='stream__profile__username'>{{ user.username }}</div>
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
        const col = 10
        const row = 10;
        this.avatarX = -(index % col) * 45 + 'px';
        this.avatarY = -Math.floor(index / row) * 45 + 'px';
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
    top: 1rem;
    right: 1rem;
    width: 45px;
    font-size: 2rem;
    text-align: center;
    cursor: pointer;
    color: #3bb8ff;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    font-family: 'Font Awesome 5 Free';
  }

  .stream {
    position: absolute;
    display: inline-block;
    height: 100%;
    width: 100%;
    overflow: visible;
    z-index: 1;
    &.emitter {
      width: 33%;
      height: 36%;
      right: 0;
      bottom: 0;
      max-width: 300px;
      max-height: 600px;
      z-index: 2;
    }
    video {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    &__profile {
      position: absolute;
      display: flex;
      align-items: start;
      top: 0;
      left: 0;
      color: white;
      text-shadow: 0 0 5px black;
      &__avatar {
        display: inline-block;
        margin: 1rem;
        width: 45px;
        height: 45px;
        background-size: 450px;
        background-repeat: no-repeat;
        background-position: -45px -45px;
        border-radius: 60px;
      }
      &__username {
        display: inline-block;
        margin: 1rem 0px;
        font-size: 1.5rem;
        width: 500px;
        &.emitter {
          text-align: right;
        }
        @media (max-aspect-ratio: 1/1) {
          font-size: 1rem;
          width: 250px;
          &.emitter {
            display: none;
          }
        }
      }
      &.emitter {
        flex-direction: row-reverse;
        align-items: flex-end;
        left: inherit;
        right: 0;
        top: -70px;
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
        right: 4rem;
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