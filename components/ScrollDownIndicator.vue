<template>
  <button
    v-bind="$attrs"
    class="flex flex-col items-center text-white transition-colors duration-500"
    :class="lightMode ? 'text-black' : 'text-white'"
    v-on="$listeners"
  >
    <ArrowDown class="mt-[11px] w-[11px] lg:w-[23px]" />
  </button>
</template>

<script>
import ArrowDown from '~/assets/images/arrow_down.svg?inline'

export default {
  components: { ArrowDown },
  props: {
    lightMode: Boolean
  }
}
</script>
