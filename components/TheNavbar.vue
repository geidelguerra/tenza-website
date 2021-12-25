<template>
  <nav class="fixed top-8 right-8 z-40">
    <ul>
      <template v-for="(item, i) in menu">
        <li :key="i">
          <NuxtLink
            :to="item.url"
            class="p-1 transition-colors duration-500 text-right uppercase block text-sm font-medium tracking-wide"
            :class="lightMode ? 'text-black' : 'text-white'"
          >
            {{ item.text }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        { text: 'Projects', url: '/projects' },
        { text: 'Studio', url: '/studio' }
      ]
    }
  },
  computed: {
    lightMode () {
      return this.$route.path !== '/'
    }
  }
}
</script>
