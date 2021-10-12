<template>
  <nuxt-link
    :to="project.url"
    class="flex flex-col"
  >
    <div class="transition-colors duration-500 bg-gray-800 rounded-lg aspect-w-16 aspect-h-9 hover:bg-gray-600">
      <div class="flex items-center justify-center font-bold text-center uppercase text-gray-50">
        image placeholder
      </div>
    </div>
    <div>{{ project.name }}</div>
    <div>{{ project.year }}</div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    project: { type: Object, required: true }
  }
}
</script>
