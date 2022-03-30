<template>
  <button
    v-bind="$attrs"
    :class="{
      'text-white': !active && !light,
      'text-black border-black': light,
      'text-black bg-white': active
    }"
    class="uppercase text-[11px] p-2 border-2 tracking-[0.5em] transition-colors duration-500"
    @click="active = !active"
    @blur="onBlur"
  >
    Get in touch
    <Networks
      v-show="active"
      :networks="networks"
      class="absolute right-[100%] mr-[25px] top-0 bottom-0"
      :light-mode="light"
    />
  </button>
</template>

<script>
import Networks from '~/components/Networks.vue'

export default {
  components: {
    Networks
  },
  props: {
    light: Boolean
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    networks () {
      return this.$store.state.networks
    }
  },
  methods: {
    onBlur () {
      setTimeout(() => {
        this.active = false
      }, 100)
    }
  }
}
</script>
