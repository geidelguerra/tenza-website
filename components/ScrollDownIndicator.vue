<template>
  <div
    v-bind="$attrs"
    class="flex flex-col items-center text-white transition-colors duration-500"
    :class="lightMode ? 'text-black' : 'text-white'"
  >
    <Mouse />
    <ArrowDown class="mt-[11px]" />
  </div>
</template>

<script>
import Mouse from '~/assets/images/mouse.svg?inline'
import ArrowDown from '~/assets/images/arrow_down.svg?inline'

export default {
  components: { Mouse, ArrowDown },
  props: {
    lightMode: Boolean
  }
}
</script>
