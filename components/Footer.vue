<template>
  <div class="h-[222px] bg-[#efefef] w-full flex items-center justify-between pl-[88px] pr-[194px]">
    <div class="text-[14px] text-[#111111] font-bold flex flex-col space-y-[26px]">
      <div>Copyright &copy; Tenza {{ new Date().getFullYear() }}</div>
      <nuxt-link to="privacy">
        Privacy policy
      </nuxt-link>
      <nuxt-link to="meet-our-team" exact-active-class="border-b-[2px] border-white">
        Meet our team
      </nuxt-link>
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
