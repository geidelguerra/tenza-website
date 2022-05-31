<template>
  <div v-if="underConstruction" class="flex items-center justify-center w-screen h-screen bg-white">
    <div class="flex flex-col items-center">
      <Logo class="text-black w-[100px] mb-[100px]" />
      <div class="text-lg">
        Site under construction
      </div>
    </div>
  </div>
  <home v-else />
</template>

<script>
import Home from './home.vue'
import Logo from '~/assets/images/logo.svg?inline'

export default {
  components: {
    Logo,
    Home
  },
  data () {
    return {
      underConstruction: process.env.underConstruction
    }
  }
}
</script>
