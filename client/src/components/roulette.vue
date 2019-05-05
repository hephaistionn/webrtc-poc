<template>
  <div class='roulette'>
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
    <div class='roulette__container' v-if='!live'>
      <div class='roulette__list' 
        v-bind:style='{transform: translate}'>
          <participant 
            v-bind:username='item.username'
            v-bind:avatar='item.avatar'
            :key='index' v-for='(item, index) in computedList'/>
      </div>
    </div>
    <div 
      class='roulette__focus' 
      v-show='!live && target'
      v-bind:style='{left: focusPosition}'>
    </div>
  </div>
</template>

<script>
import participant from './participant.vue';
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
      translate: 'translateX(0px)',
      focusPosition: '0px',
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
        this.centerfocus();
        this.$store.dispatch('initSocket');
      } else {
        this.moveTarget(0);
      }
    }
  },
  methods: {
    roulette : function(clientId) {
      this.centerfocus();
      const tileSize = 150+10;
      const startIndexMid = Math.floor(this.computedList.length/2);
      const part2 = this.computedList.slice(startIndexMid);
      const index = startIndexMid + part2.map(a=>a.id).indexOf(clientId);
      const offset = - index * tileSize + this.focusPosition; 
      this.moveTarget(offset);
    },
    moveTarget: function(x) {
      this.translate = `translateX(${x}px)`;
    },
    centerfocus: function() {
      const tileSize = 150+10;
      const tileIndex = Math.floor(window.innerWidth/2/tileSize);
      this.focusPosition = tileIndex * tileSize;
    }
  }
};
</script>

<style lang='sass'>
  .roulette {
    display: inline-block;
    width: 100%;
    height: 100%;
    &__title {
      position: absolute;
      font-size: 2.0rem;
      text-transform: UPPERCASE;
      text-align: center;
      width: 100%;
      top: 25%;
    }
    &__waiting {
      position: absolute;
      font-size: 1.5rem;
      text-transform: UPPERCASE;
      text-align: center;
      width: 100%;
      top: 41%;
    }
    &__container {
      display: inline-block;
      position: absolute;
      top: 50%;
      height: 150px;
      width: 100%;
      overflow: hidden;
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
      top: 50%;
      left: 0;
      width: 150px;
      height: 150px;
      border: solid 5px #01acca;
      z-index: 2;
      box-sizing: border-box;
    }
    &__starting {
      position: absolute;
      font-size: 3rem;
      text-transform: UPPERCASE;
      text-align: center;
      width: 100%;
      top: 30%;
    }
  }
</style>