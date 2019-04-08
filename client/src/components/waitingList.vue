<template>
  <div class='waitingList'>
    <div class='waitingList__container'>
      <div class='waitingList__list' 
        v-bind:style='{transform: translate}'
        v-show='!$store.state.break'>
          <waitingItem 
            v-bind:username='item.username'
            v-bind:avatar='item.avatar'
            :key='index' v-for='(item, index) in computedList'/>
      </div>
    </div>
  </div>
</template>

<script>
import waitingItem from './waitingItem.vue';
export default {
  name: 'waitingList',
  props: {
    list: Array,
    target: String
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
      this.translate = 'translateY(0px)'
    },
    target: function(target) {
      this.roulette(target);
    }
  },
  methods: {
    roulette  : function(clientId) {
      const startIndexMid = Math.floor(this.computedList.length/2);
      const part2 = this.computedList.slice(startIndexMid);
      const index = startIndexMid + part2.map(a=>a.id).indexOf(clientId);
      const offset = - index * 152; 
      this.translate = `translateY(${offset}px)`;
      console.log( this.translate);
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
      transition: transform 1s;
    }
  }
</style>