<template>
  <div v-click-outside="{ callback: () => active = false}" v-bind="$attrs" class="relative">
    <button
      v-bind="$attrs"
      :class="{
        'text-white': !active && !lightMode,
        'text-black border-black': lightMode,
        'text-black bg-white': active
      }"
      class="uppercase text-[11px] p-2 border-2 tracking-[0.5em] transition-colors duration-500"
      @click="active = !active"
    >
      Get in touch
    </button>
    <div v-show="active" class="absolute right-[100%] mr-[25px] top-0 bottom-0 flex items-center">
      <Networks
        :networks="networks"
        :light-mode="lightMode"
        @click="active = false"
      />
    </div>
  </div>
</template>

<script>
import Networks from '~/components/Networks.vue'

export default {
  components: {
    Networks
  },
  props: {
    lightMode: Boolean
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
