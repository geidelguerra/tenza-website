<template>
  <footer class="bg-[#f5f5f5] relative min-h-screen flex overflow-hidden w-screen">
    <div class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden">
      <img src="/footer_bg.jpg" class="w-full h-full object-cover bg-[#f5f5f5]">
      <div class="absolute top-0 bottom-0 left-0 right-0 bg-black bg-blend-luminosity opacity-80" />
    </div>
    <div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full h-full">
      <div class="flex items-center justify-center flex-1 w-full h-full">
        <div class="text-white px-[45px] mt-[150px] lg:mt-0 mb-[40px]">
          <div class="flex">
            <div>
              <h1 class="text-[20px] lg:text-[28px] uppercase leading-[34px] tracking-[3.6px] font-bold mb-[15px] lg:mb-[23px]">
                Ernesto Anton
              </h1>
              <div class="font-semibold text-[17px] mb-[30px] lg:mb-[69px] tracking-[0.17px]">
                Partner and Founder
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center lg:flex-row-reverse">
            <div class="hidden lg:block lg:ml-[124px] rounded-full overflow-hidden w-[160px] h-[160px] lg:w-[260px] lg:h-[260px] border-2 border-[#f5f5f5] mb-[20px] lg:mb-0">
              <img class="object-cover w-full h-full" src="~/assets/images/studio/studio_02.jpg" alt="Ernesto Anton">
            </div>

            <div class="lg:w-[500px] text-[15px] leading-[30px] lg:text-[20px] tracking-[0.2px] lg:leading-[27px] text-justify">
              Ernesto founded the practice on 2020 after moving to Miami from New York City. With the believe that the quality of our surroundings affects the quality of our lives and driven by his passion for timeless design and innovation he has stablished a sustainable approach to the architecture exercise. Anton is also a passionate soccer and racquetball player who enjoys good storytelling in any shape or form.
            </div>
          </div>
        </div>
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
