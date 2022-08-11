<template>
  <footer class="bg-[#f5f5f5] relative min-h-screen flex overflow-hidden w-screen">
    <div class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden">
      <img src="/footer_bg.jpg" class="w-full h-full object-cover bg-[#f5f5f5]">
      <div class="absolute top-0 bottom-0 left-0 right-0 bg-black bg-blend-luminosity opacity-80" />
    </div>
    <div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full h-full">
      <div class="flex-1">
        <!--  -->
      </div>
      <div class="flex flex-wrap justify-center px-[45px] py-[20px] lg:p-0 lg:justify-between items-center lg:h-[207px] lg:mx-[45px] border-t border-[#f5f5f5]">
        <div class="hidden lg:block text-[12px] lg:text-[14px] text-[#f5f5f5] font-bold mb-[20px] lg:mb-0">
          Copyright &copy; Tenza {{ new Date().getFullYear() }}
        </div>
        <div class="lg:flex-1 text-[#f5f5f5] text-center text-[12px] lg:text-[14px] font-bold flex justify-center mb-[20px] lg:mb-0">
          <div class="whitespace-nowrap">
            anton@tenza.us
          </div>
          <div class="mx-[25px]">
            300 Bayview Dr. Suite 1202 Sunny Isles, FL 33160
          </div>
          <div class="whitespace-nowrap">
            +1 (305) 606-2800
          </div>
        </div>
        <Networks class="mb-[20px] lg:mb-0" />
        <div class="lg:hidden w-full text-[12px] lg:text-[14px] text-[#f5f5f5] font-bold text-center">
          Copyright &copy; Tenza {{ new Date().getFullYear() }}
        </div>
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
