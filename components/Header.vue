<template>
  <header class="fixed z-40 flex justify-between w-full">
    <NuxtLink to="/" class="block bg-transparent absolute left-[45px] top-[45px] z-30">
      <Logo
        class="w-[42px] transition-colors duration-500"
        :class="lightMode || menuOpen ? 'text-black' : 'text-white'"
      />
    </NuxtLink>

    <button
      class="absolute top-[45px] right-[45px] z-30 flex w-[24px] h-[24px] items-center justify-center lg:hidden"
      @click.stop="menuOpen = !menuOpen"
    >
      <MenuExpanded v-if="menuOpen" class="text-black" />
      <MenuCollapsed
        v-else
        class="transition-colors duration-500"
        :class="lightMode ? 'text-black' : 'text-white'"
      />
    </button>

    <div v-if="menuOpen" class="absolute top-0 pt-[142px] left-0 w-screen h-screen bg-[#f7f7f7] flex flex-col lg:hidden">
      <ul class="flex flex-col justify-center flex-1">
        <template v-for="(item, i) in menu">
          <li :key="i" :class="{'mt-[93px]': i > 0}">
            <NuxtLink
              :to="item.url"
              active-class="font-bold"
              exact-active-class="font-bold"
              class="transition-colors duration-500 text-center uppercase block text-[15px] tracking-[7.5px] text-black"
            >
              {{ item.text }}
            </NuxtLink>
          </li>
        </template>
      </ul>
      <div class="flex justify-center w-full p-[32px]">
        <Networks :light-mode="true" />
      </div>
    </div>

    <ul class="lg:absolute lg:top-[45px] lg:right-[45px] flex-col hidden lg:flex">
      <template v-for="(item, i) in menu">
        <li :key="i" :class="{'mt-[18px]': i > 0}">
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
  </header>
</template>

<script>
import Logo from '~/assets/images/logo.svg?inline'
import MenuCollapsed from '~/assets/images/menu_collapsed.svg?inline'
import MenuExpanded from '~/assets/images/menu_expanded.svg?inline'
import Networks from '~/components/Networks.vue'

export default {
  components: {
    Logo,
    MenuCollapsed,
    MenuExpanded,
    Networks
  },
  props: {
    route: { type: Object, required: true },
    lightMode: Boolean
  },
  data () {
    return {
      menuOpen: false,
      menu: [
        { text: 'Projects', url: '/projects' },
        { text: 'Studio', url: '/studio' }
      ]
    }
  },
  watch: {
    'route.fullPath' (val) {
      // eslint-disable-next-line no-console
      console.log(val)
      this.menuOpen = false
    }
  }
}
</script>
