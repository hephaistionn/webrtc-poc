<template>
  <div class="roulette" ref="screen">
    <video v-show="show" ref="videoRef"></video>
    <div class="roulette__container" v-if="!live" v-bind:class={overflow:overflow}>
      <div class="roulette__list" v-bind:style="{transform: translate}">
        <participant
          v-bind:profile="item"
          v-bind:focus="item.focus"
          :key="index"
          v-for="(item, index) in computedList"
        />
      </div>
    </div>
    <div class="roulette__focus" v-show="!live && target">
      <div class="roulette__focus__pointer1"></div>
    </div>
    <div class="roulette__modal">
      <div class="roulette__title" v-show="!target">WAITING FOR PARTICIPANTS</div>
      <div class="roulette__title" v-show="target">STARTING</div>
      <button class="roulette__cancel button" @click="cancel" v-show="!target">Cancel</button>
    </div>
    <audio ref="sound1Ref" preload="">
      <source src="./../../assets/bip.mp3" type="audio/mp3">
    </audio>
    <audio ref="sound2Ref" preload="">
      <source src="./../../assets/gong.mp3" type="audio/mp3">
    </audio>
  </div>
</template>

<script>
import participant from "./participant.vue";
import { mapActions } from "vuex";
export default {
  name: "roulette",
  props: {
    list: Array,
    target: String,
    show: Boolean,
    stream: Object
  },
  data() {
    // serie sum == 1
    const rouletteStep = 20;
    const serie = [1];
    for (let i = 1; i < rouletteStep; i++) {
      serie[i] = serie[i - 1] * 1.1;
    }
    let sum = 0;
    for (let i = 1; i < rouletteStep; i++) {
      sum += serie[i];
    }
    for (let i = 1; i < rouletteStep; i++) {
      serie[i] /= sum;
    }
    return {
      computedList: [],
      slotNumber: 9,
      serie: serie,
      rouletteDuration: 3200,
      rouletteStep: rouletteStep,
      timer: null,
      overflow: false
    };
  },
  components: {
    participant
  },
  watch: {
    list: function(list) {
      if (list.length) {
        const computedList = [];
        let i = 0;
        for (i = 0; i < this.slotNumber; i++) {
          computedList.push({});
        }
        for (i = 0; i < list.length; i++) {
          computedList[i] = list[i];
        }
        for (i = 0; i < 4; i++) {
          computedList.push({ dummyItem: true });
        }
        this.computedList = computedList;
      } else {
        this.computedList = [];
      }
    },
    target: function(target) {
      if (target) {
        this.startRoulette(target.id);
      }
    },
    show: function(displayed) {
      if (displayed) {
        const tileSize = 114;
        const margin = 30;
        const capacity = Math.floor((document.body.offsetHeight-margin)/tileSize) * 
        Math.floor((document.body.offsetWidth-margin)/tileSize);
        this.overflow = capacity<this.slotNumber;
        this.$store.dispatch("initSocket");
      }else {
        if(this.target) {
          this.$refs.sound2Ref.play();
        }
        clearTimeout(this.timer);
      }
    },
    stream: function(stream) {
      this.$refs.videoRef.srcObject = stream;
      this.$refs.videoRef.volume = 0;
      this.$refs.videoRef.play();
    }
  },
  methods: {
    ...mapActions(["cancel"]),
    startRoulette: function(clientId) {
      this.$refs.sound1Ref.loop = false;
      this.$refs.sound1Ref.volume = 0.3;
      this.$refs.sound2Ref.loop = false;
      this.$refs.sound2Ref.volume = 0.3;
      const index = this.list.map(a => a.id).indexOf(clientId);
      const pathSize = this.rouletteStep - index;
      const target = Math.floor(pathSize / this.list.length) * this.list.length + index;
      this.roulette(0, target);
    },
    roulette: function(counter, target) {
      const k1 = Math.max(counter - 1, 0) % this.list.length;
      const k2 = counter % this.list.length;
      this.refreshList(k1, k2);
      if (counter === target) {
        this.blink(k2);
      } else {
        counter++;
        this.timer = setTimeout(() => {
          this.roulette(counter, target);
        }, this.serie[counter] * this.rouletteDuration);
      }
    },
    blink: function(k) {
      this.timer = setTimeout(() => {
        if (this.show) {
          this.computedList[k].focus = !this.computedList[k].focus;
          if(this.computedList[k].focus) {
            this.$refs.sound1Ref.currentTime=0;
            this.$refs.sound1Ref.play();
          }
          this.$forceUpdate();
          this.blink(k);
        }
      }, 450);
    },
    refreshList: function(k1, k2) {
      this.$refs.sound1Ref.currentTime=0;
      this.$refs.sound1Ref.play();
      this.computedList[k1].focus = false;
      this.computedList[k2].focus = true;
      this.$forceUpdate();
    }
  }
};
</script>

<style lang='sass'>
  .roulette {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &__modal {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0.5rem 1rem;
      box-sizing: border-box;
      width: 100%;
      background: var(--color2);
      border-top: solid 2px var(--color1);
    }
    &__title {
      position: relative;
      font-size: 1rem;
      text-transform: UPPERCASE;
      text-align: center;
      color: white;
      margin: 0.2rem 0 0.5rem 0;
    }
    &__cancel {
      position: relative;
      display: block;
      width: 70%;
      cursor: pointer;
      font-size: 1.6rem;
      background: var(--color1);
      margin: 1px auto 0 auto;
      margin: 11px auto 7px auto;
      border-radius: 10px;
      border: none;
      text-transform: uppercase;
      max-width: 210px;
    }
    &__container {
      position: relative;
      margin: 10px auto;
      overflow: auto;
      display: flex;
      align-items: center;
      &.overflow {
        align-items: start;
      } 
      box-sizing: border-box;
      padding: 0.8rem 0.1rem;
      width: 100%;
      max-width: 600px;
      height: calc(100% - 90px);
    }
    &__list {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
    video {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
</style>