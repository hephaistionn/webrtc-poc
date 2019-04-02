<template>
  <div class="videoUsername">
    <div v-if="editing === false" v-on:click="edit" class="videoUsername__value">{{ username }}</div>
    <div v-else class="videoUsername__edit">
      <div class="videoUsername__edit__icon" v-on:click="save"></div>
      <input v-model="editUsername" class="videoUsername__edit__input">
    </div>
  </div>
</template>

<script>
export default {
  name: "videoUsername",
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
    margin: 0 5px;
    cursor: pointer;
  }

  .videoUsername {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    background: darkseagreen;
    &__value {
      display: block;
    }
    &__edit {
      display: block;
      &__icon {
        display: block;
        cursor: pointer;
        &:before {
            @include icon;
            content: "\f044";
        }
      }
      &__input {
        display: block;
      }
    }
  }
</style>