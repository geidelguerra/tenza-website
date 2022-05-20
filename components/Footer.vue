<template>
  <div class="h-[222px] bg-[#efefef] w-full flex items-center justify-between pl-[88px] pr-[194px]">
    <div class="text-[14px] text-[#111111] font-bold flex flex-col space-y-[1.625rem]">
      <div>Copyright &copy; Tenza {{ new Date().getFullYear() }}</div>
      <div>
        <nuxt-link to="our-team" class="border-b-[2px] hover:border-black" exact-active-class="border-black">
          Our team
        </nuxt-link>
      </div>
    </div>
    <Networks :networks="networks" :light-mode="true" />
  </div>
</template>

<script>
import Networks from '~/components/Networks.vue'

export default {
  components: {
    Networks
  },
  computed: {
    networks () {
      return this.$store.state.networks
    }
  }
}
</script>
