<template>
  <div class='editor' v-on:click.self='close'>
    <div class='editor__modal'>
      <div class='editor__helper'>Edit yout profile</div>
      <input v-model='editUsername' class='editor__input' maxlength='40'>
      <div class='editor__avacontainer'>
        <div
          class='editor__avacontainer__avatar avatar'
          v-for='(avatar, index) in avatars'
          v-bind:key='index'
          v-bind:class='{selected: selectAvatar===index}'
          v-on:click='select(index)'
          v-bind:style='{backgroundPositionX: avatar.x, backgroundPositionY: avatar.y}'
        ></div>
      </div>

      <div class='editor__save' v-on:click='save'></div>
      <div class='editor__close' v-on:click='close'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'username',
  props: {
    username: String,
    avatar: Number
  },
  data() {
    return {
      editUsername: '',
      nbAvatars: 16,
      avatars: [],
      selectAvatar: 0
    };
  },
  methods: {
    save: function() {
      this.$store.dispatch('saveProfile', {username: this.editUsername, avatar: this.selectAvatar });
      this.$store.dispatch('toggleEdit');
    },
    close: function() {
      this.$store.dispatch('toggleEdit');
    },
    select: function(index) {
      this.selectAvatar = index;
    }
  },
  mounted() {
    this.editUsername = this.username;
    this.selectAvatar = this.avatar;
    let x;
    let y;
    const col = 4;
    const row = 4;
    const avatars = [];
    for (let i = 0; i < this.nbAvatars; i++) {
      x = -(i % col) * 80 + 'px';
      y = -Math.floor(i / row) * 85 + 'px';
      avatars.push({ x, y });
    }
    this.avatars = avatars;
  }
};
</script>

<style lang='sass'>
  @mixin icon {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    font-family: 'Font Awesome 5 Free';
    margin: 0 15px;
    cursor: pointer;
  }

  .selected {
    border: solid;
  }

  .editor {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    &__modal {
      position: fixed;
      display: inline-block;
      width: 800px;
      background-color: gray;
    }
    &__helper {
      position: relative;
      display: block;
      margin: 30px;
      font-size: 1.5rem;
    }
    &__avacontainer {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      width: calc(100% - 60px);
      margin: 30px;
      height: 117px;
      overflow-y: hidden;
      overflow-x: scroll;
      &__avatar {
        display: inline-block;
        margin-right: 10px;
        width: 80px;
        height: 90px;
        background-color: yellow;
        background-size: 320px;
        background-repeat: no-repeat;
        min-width: 80px;
        background-position: -84px -86px;
      }
    }
    &__save {
        position: absolute;
        bottom:: 10px;
        right: 30px;
        display: inline-block;
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 2.5rem;
        &:before {
            @include icon;
            content: '\f0c7';
        }
    }
    &__close {
        position: absolute;
        top:: 10px;
        right: 30px;
        display: inline-block;
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 2.5rem;
        &:before {
            @include icon;
            content: '\f410';
        }
    }
    &__input {
      position: relative;
      margin: 30px;
      display: block;
      font-size: 2rem;
      width: calc(100% - 60px);
      height: 100px;
    } 
  }

</style>