<template>
  <div class="flex flex-col h-screen text-black">
    <div class="fixed top-8 left-8 z-40">
      <NuxtLink to="/" class="bg-transparent block">
        <Logo class="h-5 text-black" />
      </NuxtLink>
    </div>
    <Nuxt />
    <nuxt-link
      to="/projects"
      class="uppercase font-semibold text-sm p-2 border-2 absolute bottom-8 left-8 tracking-widest transition-colors duration-500 text-black border-black"
    >
      Back
    </nuxt-link>
  </div>
</template>

<script>
import Logo from '~/assets/images/logo.svg?inline'

export default {
  components: {
    Logo
  }
}
</script>
