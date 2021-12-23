<template>
  <button :type="type" :class="style" v-on="$listeners">
    <slot v-if="!isLoading"></slot>
    <span v-else>Loading...</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    /**
     * @type {string<normal | green | red>}
     */
    variant: {
      type: String,
      default: 'normal',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    style() {
      if (this.variant.toLowerCase() === 'red') return 'btn btn-delete'
      if (this.variant.toLowerCase() === 'green') return 'btn btn-complete'
      return 'btn'
    },
  },
}
</script>

<style scoped>
.btn {
  border: none;
  outline: none;
  color: white;
  border-radius: 5px;
  background: gray;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}

.btn:hover {
  filter: brightness(80%);
}

.btn:focus {
  outline: none;
}

.btn-delete {
  background: crimson;
}

.btn-complete {
  background: green;
}
</style>
