<template>
  <footer class="bg-[#f5f5f5] relative min-h-screen flex overflow-hidden w-screen">
    <div class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden">
      <img src="/footer_bg.jpg" class="w-full h-full object-cover bg-[#f5f5f5]">
      <div class="absolute top-0 bottom-0 left-0 right-0 bg-black bg-blend-luminosity opacity-80" />
    </div>
    <div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full h-full pt-[75px]">
      <div class="flex flex-col items-center h-full">
        <div class="flex flex-col justify-center items-center text-[#f5f5f5] text-center text-[20px] font-bold flex-1">
          <div class="whitespace-nowrap mb-[5px]">
            <a href="mailto:anton@tenza.us" class="hover:underline">anton@tenza.us</a>
          </div>
          <div class="mb-[5px]">
            300 Bayview Dr. Suite 1202 Sunny Isles, FL 33160
          </div>
          <div class="whitespace-nowrap">
            +1 (305) 606-2800
          </div>
        </div>
        <Networks class="mb-[20px]" />
      </div>
      <div class="w-full text-[14px] text-[#f5f5f5] font-bold text-center mb-[20px]">
        Copyright &copy; Tenza {{ new Date().getFullYear() }}
      </div>
    </div>
  </footer>
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
