<template>
  <div class="text-black bg-[#F5F5F5] min-h-screen">
    <Header :light-mode="$store.state.lightMode" />

    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
