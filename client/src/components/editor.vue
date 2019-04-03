<template>
  <div class='editor'>
    <div class='editor__modal'>
      <div class='editor__avatar avatar'></div>
      <input v-model='editUsername' class='editor__input' maxlength='40'>
      <div class='editor__icon' v-on:click='save'></div>
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
      avatarX: 0,
      avatarY: 0
    };
  },
  watch: {
    avatar: function(index) {
      const col = 4;
      const row = 4;
      this.avatarX = -(index % col) * 80 + 'px';
      this.avatarY = -Math.floor(index / row) * 85 + 'px';
    }
  },
  methods: {
    save: function() {
      this.editing = false;
      this.$store.dispatch('saveUsename', this.editUsername);
      this.$store.dispatch('toggleEdit');
    }
  },
  mounted() {
    this.editUsername = this.username;
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
        display: flex;
        width: 800px;
        height: 600px;
        background-color: gray;
    }
    &__avatar {
      display: inline-block;
      margin-right: 10px;
      width: 80px;
      height: 90px;
      background-color: yellow;
      background-size: 320px;
      background-repeat: no-repeat;
      background-position: -84px -86px;
    }
    &__icon {
        display: inline-block;
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 2.5rem;
        &:before {
            @include icon;
            content: '\f0c7';
        }
    }
    &__input {
        display: block;
        font-size: 2rem;
        height: 100px;
    } 
  }

</style>