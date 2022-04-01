<template>
  <div class="h-[130px] bg-black w-full text-white flex items-center justify-between pl-[324px] pr-[194px]">
    <Logo class="h-[30px]" />
    <div>Copyright &copy; Tenza {{ new Date().getFullYear() }}</div>
    <div>Privacy policy</div>
    <nuxt-link to="meet-our-team" exact-active-class="border-b-[2px] border-white">
      Meet our team
    </nuxt-link>
    <Networks :networks="networks" />
  </div>
</template>

<script>
import Logo from '~/assets/images/logo.svg?inline'
import Networks from '~/components/Networks.vue'

export default {
  components: {
    Logo,
    Networks
  },
  computed: {
    networks () {
      return this.$store.state.networks
    }
  }
}
</script>
