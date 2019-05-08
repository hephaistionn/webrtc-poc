<template>
  <div class='roulette' ref='screen'>
    <div class='roulette__container' v-if='!live'>
      <div class='roulette__list' 
        v-bind:style='{transform: translate}'>
          <participant 
            v-bind:username='item.username'
            v-bind:avatar='item.avatar'
            :key='index' v-for='(item, index) in computedList'/>
      </div>
    </div>
    <div class='roulette__focus' v-show='!live && target'>
      <div class='roulette__focus__pointer1'></div>
      <div class='roulette__focus__pointer2'></div>
    </div>
    <div class='roulette__modal'>
      <div 
        class='roulette__title'
        v-show='!target'>
        WAITING FOR PARTICIPANTS
      </div>
      <div 
        class='roulette__waiting'
        v-show='!target'>
        {{participantIndicator}}
      </div>
      <div 
        class='roulette__starting' 
        v-show='target'>
        STARTING
      </div>
    </div>
    <button class='roulette__cancel button' @click='cancel' v-show='!target'>Cancel</button>
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
    show: Boolean
  },
  data() {
    return {
      computedList: [],
      minLength: 40,
      translate: 'translate(0px, 0px)',
      participantMin: '/2',
      participantIndicator: ''
    };
  },
  components: {
    participant
  },
  watch: {
    list: function(list) {
      if(list.length)  {
        let computedList = list.slice(0);
        computedList = computedList.concat(list);
        computedList = computedList.concat(list);
        let i = 0;
        while(computedList.length < this.minLength) {
          computedList.push(list[i]);
          i++;
          if(i >= list.length) {
            i = 0;
          }
        }
        this.computedList = computedList;
        this.participantIndicator = `${list.length}${this.participantMin}`;
      } else {
        this.computedList = [];
        this.participantIndicator = `0${this.participantMin}`;
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
    }
  },
  methods: {
    ...mapActions(['cancel']),
    roulette : function(clientId) {
      const tileSize = 120;
      const startIndexMid = Math.floor(this.computedList.length/2);
      const part2 = this.computedList.slice(startIndexMid);
      const index = startIndexMid + part2.map(a=>a.id).indexOf(clientId);
      let screenMid;
      if(window.innerHeight > window.innerWidth) {
        screenMid = Math.floor(this.$refs.screen.offsetHeight/2);
      } else {
        screenMid = Math.floor(this.$refs.screen.offsetWidth/2);
      }
      const offset = - ( (index * (tileSize)) - (screenMid - tileSize/2) ); 
      this.moveTarget(offset);
    },
    moveTarget: function(offset) {
      if(window.innerHeight > window.innerWidth) {
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
    display: inline-block;
    width: 100%;
    height: 100%;
    &__modal {
      position: relative;
      margin: 110px auto 0 auto;
      padding: 1rem 0;
      width: 100%;
      max-width: 400px;
      background-color: #008cff78;
    }
    &__title {
      position: relative;
      font-size: 1.5rem;
      text-transform: UPPERCASE;
      text-align: center;
      color: white;
      margin: 0 0 0.5rem 0;
    }
    &__waiting {
      position: relative;
      font-size: 1.2rem;
      text-transform: UPPERCASE;
      text-align: center;
      color: white;
    }
    &__cancel {
      position: absolute;
      bottom: 2rem;
      left: calc(50% - 40px);
      display: block;
      cursor: pointer;
      font-size: 1.4rem;
      background: transparent;
      border: none;
      color: #87c9ff;
      margin: 0 auto;
      margin-top: 14px;
    }
    &__starting {
      font-size: 3rem;
      text-transform: UPPERCASE;
      text-align: center;
      color: white;
    }
    &__container {
      display: inline-block;
      position: absolute;
      top: calc(50% - 60px);
      left: 0;
      height: 120px;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }
    &__list {
      display: inline-block;
      position: absolute;
      white-space: nowrap;
      top: 0;
      left: 0;
      transition: transform 4.5s;
      transition-timing-function: ease;
    }
    &__focus {
      position: absolute;
      top: calc(50% - 60px);
      left: calc(50% - 60px);
      width: 120px;
      height: 120px;
      z-index: 2;
      box-sizing: border-box;
      &__pointer1{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 15px;
        clip-path: polygon(50% 100%, 0 0, 100% 0);
        background-color: #87c9ff;
      }
      &__pointer2{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 15px;
        clip-path: polygon(0 100%, 50% 0, 100% 100%);
        background-color: #87c9ff;
      }
    }
    @media (max-aspect-ratio: 1/1) {
      .roulette__container {
        top: 0;
        left: calc(50% - 60px);
        height: 100%;
        width: 120px;
      }
      .roulette__list {
        display: inline-block;
        white-space: normal;
      }
      .roulette__focus__pointer1 {
        top: 0;
        left: 0;
        width: 15px;
        height: 100%;
        clip-path: polygon(0 100%, 0 0, 100% 50%);
      }
      .roulette__focus__pointer2 {
        top: 0;
        right: 0;
        left: initial;
        bottom: initial;
        width: 15px;
        height: 100%;
        clip-path: polygon(100% 100%, 100% 0, 0 50%);
      }
      .roulette__cancel {
        left: 20px;
        bottom: 13px;
      }
    }
  }
</style>