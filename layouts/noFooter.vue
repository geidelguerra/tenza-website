<template>
  <Base class="text-black bg-[#F5F5F5] min-h-screen">
    <Header :route="$route" :light-mode="$store.state.lightMode" />

    <main>
      <Nuxt />
    </main>
  </Base>
</template>

<script>
import Base from './base.vue'
import Header from '~/components/Header.vue'

export default {
  components: {
    Header,
    Base
  }
}
</script>
