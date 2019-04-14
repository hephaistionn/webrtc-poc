<template>
  <div class='roulette'>
    <div class='roulette__container' v-if='!live'>
      <div class='roulette__list' 
        v-bind:style='{transform: translate}'>
          <participant 
            v-bind:username='item.username'
            v-bind:avatar='item.avatar'
            :key='index' v-for='(item, index) in computedList'/>
      </div>
    </div>
    <div class='roulette__focus' v-if='!live && target'> </div>
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
      translate: 'translateX(0px)'
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
    }
  },
  methods: {
    roulette : function(clientId) {
      const startIndexMid = Math.floor(this.computedList.length/2);
      const part2 = this.computedList.slice(startIndexMid);
      const index = startIndexMid + part2.map(a=>a.id).indexOf(clientId);
      const offset = - index * 135; 
      this.moveTarget(offset);
    },
    moveTarget: function(x) {
      this.translate = `translateX(${x}px)`;
    }
  }
};
</script>

<style lang='sass'>
  .roulette {
    display: inline-block;
    background: blue;
    min-height: 140px;
    width: 100%;
    height: 8%;
    &__container {
      display: inline-block;
      position: absolute;
      top: 50%;
      height: 140px;
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
      top: 0;
      left: 0;
      width: 135px;
      height: 152px;
      border: solid 4px;
      box-sizing: border-box;
    }
  }
</style>