<template>
  <div class="flex flex-col h-screen text-black">
    <div class="fixed top-[36px] left-[36px] z-40">
      <NuxtLink to="/" class="bg-transparent block">
        <Logo class="w-[42px] transition-colors duration-500" :class="lightMode ? 'text-black' : 'text-white'" />
      </NuxtLink>
    </div>
    <TheNavbar />
    <Nuxt />
    <!-- <Mouse
      :class="lightMode ? 'text-black border-black' : 'text-white border-white'"
      class="w-4 absolute bottom-8 left-8 transition-colors duration-500"
    /> -->
    <button
      :class="lightMode ? 'text-black border-black' : 'text-white border-white'"
      class="uppercase text-[11px] p-2 border-2 absolute bottom-[36px] right-[36px] tracking-[0.5em] transition-colors duration-500"
    >
      Get in touch
    </button>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import Logo from '~/assets/images/logo.svg?inline'

export default {
  components: {
    Logo,
    TheNavbar
  },
  computed: {
    lightMode () {
      return this.$route.path !== '/'
    }
  }
}
</script>
