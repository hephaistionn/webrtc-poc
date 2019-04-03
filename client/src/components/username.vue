<template>
  <div class="username">
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
    username: String
  },
  data() {
    return {
      editing: false,
      editUsername: ""
    };
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
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    margin: 10px 10px;
    color: white;
    text-shadow: 0 0 5px black;
    &__value {
      display: flex;
      align-content: baseline;
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