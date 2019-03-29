<template>
  <div class="videoStream">
    <h2>Recepetion</h2>
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
      display: inline_block;
  }
</style>