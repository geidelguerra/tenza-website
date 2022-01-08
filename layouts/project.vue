<template>
  <div class="flex flex-col h-screen text-black">
    <div class="fixed top-[36px] left-[36px] z-40">
      <NuxtLink to="/" class="bg-transparent block">
        <Logo class="w-[42px] transition-colors duration-500" />
      </NuxtLink>
    </div>
    <Nuxt />
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
