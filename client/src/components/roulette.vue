<template>
  <div class='roulette' ref='screen'>
    <video v-show='show' ref='videoRef'></video>
    <div class='roulette__container' v-if='!live'>
      <div class='roulette__list' 
        v-bind:style='{transform: translate}'>
          <participant 
            v-bind:profile='item'
            :key='index' v-for='(item, index) in computedList'/>
      </div>
    </div>
    <div class='roulette__focus' v-show='!live && target'>
      <div class='roulette__focus__pointer1'></div>
    </div>
    <div class='roulette__modal'>
      <div 
        class='roulette__title'
        v-show='!target'>
        WAITING FOR PARTICIPANTS  {{participantIndicator}}
      </div>
      <div 
        class='roulette__title' 
        v-show='target'>
        STARTING
      </div>
      <button class='roulette__cancel button' @click='cancel' v-show='!target'>Cancel</button>
    </div>
  </div>
</template>

<script>
import participant from './participant.vue';
import { mapActions } from 'vuex';
export default {
  name: 'roulette',
  props: {
    list: Array,
    target: String,
    show: Boolean,
    stream: Object
  },
  data() {
    return {
      computedList: [],
      minLength: 40,
      translate: 'translate(0px, 0px)',
      participantMin: '/2',
      slotNumber: 9,
      participantIndicator: ''
    };
  },
  components: {
    participant
  },
  watch: {
    list: function(list) {
      if(list.length)  {
        const computedList = [];
        let i = 0;
        for(i=0; i<this.slotNumber; i++) {
          computedList.push({});
        }
        for(i=0; i<list.length; i++) {
          computedList[i] = list[i];
        }
        this.computedList = computedList;
      } else {
        this.computedList = [];
      }
    },
    target: function(target) {
      if(target) {
        this.roulette(target.id);
      }
    },
    show: function(displayed) {
      if(displayed) {
        this.$store.dispatch('initSocket');
      } else {
        this.moveTarget(0);
      }
    },
    stream: function(stream) {
      this.$refs.videoRef.srcObject = stream;
      this.$refs.videoRef.volume = 0;
      this.$refs.videoRef.play();
    }
  },
  methods: {
    ...mapActions(['cancel']),
    roulette : function(clientId) {
      const tileSize = 120 + 8; //border + margin
      const startIndexMid = Math.floor(this.computedList.length/2);
      const part2 = this.computedList.slice(startIndexMid);
      const index = startIndexMid + part2.map(a=>a.id).indexOf(clientId);
      let screenMid;
      if(window.innerWidth/window.innerHeight < 8/5) {
        screenMid = Math.floor(this.$refs.screen.offsetHeight/2);
      } else {
        screenMid = Math.floor(this.$refs.screen.offsetWidth/2);
      }
      const offset = - ( (index * (tileSize)) - (screenMid - tileSize/2) ); 
      this.moveTarget(offset);
    },
    moveTarget: function(offset) {
      if(window.innerWidth/window.innerHeight < 8/5) {
        this.translate = `translate(0px,${offset}px)`;
      } else {
        this.translate = `translate(${offset}px,0px)`;
      }
    }
  }
};
</script>

<style lang='sass'>
  .roulette {
    position: absolute;
    display: flex;
    justify-content: center;
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
      overflow: auto;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      max-width: 400px;
      height: calc(100% - 90px);
    }
    &__list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    &__focus {
      position: absolute;
      top: calc(50% - 90px);
      left: calc(50% - 90px);
      width: 180px;
      height: 180px;
      z-index: 2;
      box-sizing: border-box;
      &__pointer1{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 15px;
        clip-path: polygon(50% 100%, 0 0, 100% 0);
        background-color: var(--color1);
      }
      &__pointer2{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 15px;
        clip-path: polygon(0 100%, 50% 0, 100% 100%);
        background-color: var(--color1);
      }
    }
    video {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
</style>