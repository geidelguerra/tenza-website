<template>
  <nav class="fixed top-[45px] right-[45px] z-40">
    <ul class="flex flex-col space-y-[18px]">
      <template v-for="(item, i) in menu">
        <li :key="i">
          <NuxtLink
            :to="item.url"
            active-class="font-bold"
            exact-active-class="font-bold"
            class="transition-colors duration-500 text-right uppercase block text-[11px] tracking-[6px]"
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
