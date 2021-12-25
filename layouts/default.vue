<template>
  <div class="flex flex-col min-h-screen text-black bg-[#EBEAE5]">
    <TheNavbar />
    <Nuxt class="flex-1 py-6" />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
export default {
  components: { TheNavbar }
}
</script>
