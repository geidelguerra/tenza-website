<template>
  <video
    v-bind="$attrs"
    :loop="loop"
    autoplay
    muted
    playsinline
    preload="auto"
  >
    <source src="~/assets/splash.webm" type="video/webm">
  </video>
</template>

<script>
export default {
  props: {
    loop: { type: Boolean, default: true }
  }
}
</script>
