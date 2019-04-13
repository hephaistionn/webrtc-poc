<template>
  <div class='waitingList'>
    <div class='waitingList__container' v-if='!live'>
      <div class='waitingList__list' 
        v-bind:style='{transform: translate}'>
          <waitingItem 
            v-bind:username='item.username'
            v-bind:avatar='item.avatar'
            :key='index' v-for='(item, index) in computedList'/>
      </div>
    </div>
    <div class='waitingList__focus' v-if='!live && target'> </div>
  </div>
</template>

<script>
import waitingItem from './waitingItem.vue';
export default {
  name: 'waitingList',
  props: {
    list: Array,
    target: String,
    live: Boolean
  },
  data() {
    return {
      computedList: [],
      minLength: 40,
      translate: 'translateY(0px)'
    };
  },
  components: {
    waitingItem
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
    live: function(live) {
      if(live) {
        this.moveTarget(0);
      }
    }
  },
  methods: {
    roulette  : function(clientId) {
      const startIndexMid = Math.floor(this.computedList.length/2);
      const part2 = this.computedList.slice(startIndexMid);
      const index = startIndexMid + part2.map(a=>a.id).indexOf(clientId);
      const offset = - index * 152; 
      this.moveTarget(offset);
      console.log( this.translate);
    },
    moveTarget: function(y) {
      this.translate = `translateY(${y}px)`;
    }

  }
};
</script>

<style lang='sass'>
  .waitingList {
    display: inline-block;
    background: blue;
    min-width: 100px;
    width: 8%;
    height: 100%;
    &__container {
      display: inline-block;
      position: relative;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    &__list {
      display: inline-block;
      position: absolute;
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