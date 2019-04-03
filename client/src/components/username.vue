<template>
  <div class="username">
    <div
      class="username__avatar avatar"
      v-bind:style="{backgroundPositionX: avatarX, backgroundPositionY: avatarY}"
    ></div>
    <div v-if="editing === false" class="username__value">
      <div class="username__value__content">{{ username }}</div>
      <div class="username__value__icon" v-show="editable" v-on:click="edit"></div>
    </div>
    <div v-else class="username__edit">
      <input v-model="editUsername" class="username__edit__input" maxlength="40">
      <div class="username__edit__icon" v-on:click="save"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "username",
  props: {
    editable: Boolean,
    username: String,
    avatar: Number
  },
  data() {
    return {
      editing: false,
      editUsername: "",
      avatarX: 0,
      avatarY: 0
    };
  },
  watch: {
    avatar: function(index) {
      const col = 4;
      const row = 4;
      this.avatarX = -(index % col) * 80 + "px";
      this.avatarY = -Math.floor(index / row) * 85 + "px";
    }
  },
  methods: {
    edit: function() {
      if (this.editable) {
        this.editUsername = this.username;
        this.editing = true;
      }
    },
    save: function() {
      this.editing = false;
      this.$store.dispatch("saveUsename", this.editUsername);
    }
  }
};
</script>

<style lang="sass">
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

  .username {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    margin: 10px 10px;
    color: white;
    text-shadow: 0 0 5px black;
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
    &__value {
      display: flex;
      align-content: baseline;
      width: calc(100% - 100px);
      &__icon {
        display: none;
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 2.5rem;
        &:before {
            @include icon;
            content: "\f044";
        }
      }
      &__content {
        display: inline-block;
        max-width: 50%;
        font-size: 2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &__edit {
      display: flex;
      align-content: baseline;
      &__icon {
        display: inline-block;
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 2.5rem;
        &:before {
            @include icon;
            content: "\f0c7";
        }
      }
      &__input {
        display: block;
        font-size: 2rem;
      }
    }
  }

  .stream:hover {
    .username__value__icon {
      display: inline-block;
    }
  }
</style>