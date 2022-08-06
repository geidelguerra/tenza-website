<template>
  <button
    v-bind="$attrs"
    class="w-[40px] h-[40px] flex flex-col justify-center items-center relative overflow-hidden"
    v-on="$listeners"
  >
    <div
      :class="{
        'bg-black': lightMode,
        'bg-white': !lightMode,
        '-rotate-45': expanded,
        'mb-[6px]': !expanded
      }"
      style="transform-origin: 50% 50%"
      class="transition-all duration-500 w-[24px] h-[2px] absolute"
    />
    <div
      :class="{
        'bg-black': lightMode,
        'bg-white': !lightMode,
        '-rotate-[135deg]': expanded,
        'mt-[6px]': !expanded
      }"
      style="transform-origin: 50% 50%"
      class="transition-all duration-500 w-[24px] h-[2px] absolute"
    />
  </button>
</template>

<script>
export default {
  props: {
    expanded: Boolean,
    lightMode: Boolean
  }
}
</script>
