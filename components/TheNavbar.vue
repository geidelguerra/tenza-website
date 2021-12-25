<template>
  <nav class="flex justify-center w-full">
    <ul class="flex items-center my-4 space-x-3">
      <template v-for="(item, i) in menu">
        <li :key="i">
          <NuxtLink
            :to="item.url"
            class="p-2 text-black transition-colors duration-500 bg-transparent rounded"
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
        { text: 'Studio', url: '/studio' },
        { text: 'Projects', url: '/projects' },
        { text: 'Contact', url: '/contact' }
      ]
    }
  }
}
</script>
