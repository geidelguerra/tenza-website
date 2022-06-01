<template>
  <button
    v-bind="$attrs"
    class="flex flex-col items-center text-white transition-colors duration-500"
    :class="light ? 'text-black' : 'text-white'"
    v-on="$listeners"
  >
    <ArrowDown class="mt-[11px]" />
  </button>
</template>

<script>
import ArrowDown from '~/assets/images/arrow_down.svg?inline'

export default {
  components: { ArrowDown },
  props: {
    light: Boolean
  }
}
</script>
