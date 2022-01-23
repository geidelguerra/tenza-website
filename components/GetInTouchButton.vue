<template>
  <button
    v-bind="$attrs"
    :class="light ? 'text-black border-black' : 'text-white border-white'"
    class="uppercase text-[11px] p-2 border-2 tracking-[0.5em] transition-colors duration-500"
  >
    Get in touch
  </button>
</template>

<script>
export default {
  props: {
    light: Boolean
  }
}
</script>
