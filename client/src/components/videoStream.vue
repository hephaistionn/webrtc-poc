<template>
  <div class="videoStream" v-bind:class="{emitter: emitter}">
    <videoUsername v-bind:editable="emitter" v-bind:username="username"/>
    <video controls ref="videoRef"></video>
  </div>
</template>

<script>
import videoUsername from "./videoUsername.vue";
export default {
  name: "videoStream",
  props: ["stream", "emitter", "username"],
  components: {
    videoUsername
  },
  watch: {
    stream: function(newVal, oldVal) {
      this.$refs.videoRef.srcObject = newVal;
      this.$refs.videoRef.volume = 0;
      this.$refs.videoRef.play();
    }
  }
};
</script>

<style lang="sass">
  .videoStream {
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
  }
</style>