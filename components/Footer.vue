<template>
  <footer class="bg-[#f5f5f5] relative h-screen flex">
    <div class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden">
      <img src="/footer_bg.jpg" class="w-full h-full object-cover bg-[#f5f5f5]">
      <div class="absolute top-0 bottom-0 left-0 right-0 bg-black bg-blend-luminosity opacity-80" />
    </div>
    <div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full h-full">
      <div class="flex items-center justify-center flex-1 w-full h-full">
        <div class="text-white">
          <h1 class="text-[28px] uppercase leading-[34px] tracking-[3.6px] font-bold mb-[23px]">
            Ernesto Anton
          </h1>
          <div class="font-semibold text-[17px] mb-[69px] tracking-[0.17px]">
            Executive Partner and Founder
          </div>
          <div class="flex space-x-[7.75rem]">
            <div class="w-[412px] text-[20px] tracking-[0.2px] leading-[27px]">
              Ernesto founded the practice on 2020 after moving to Miami from New York City. With the believe that the quality of our surroundings affects the quality of our lives and driven by his passion for timeless design and innovation he has stablished a sustainable approach to the architecture exercise. Anton is also a passionate soccer and racquetball player who enjoys good storytelling in any shape or form.
            </div>
            <div class="rounded-full overflow-hidden w-[260px] h-[260px]">
              <img class="object-cover w-full h-full" src="~/assets/images/studio/studio_02.jpg" alt="Ernesto Anton">
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center h-[207px] mx-[43px] pr-[42px] border-t border-white">
        <div class="text-[14px] text-white font-bold">
          Copyright &copy; Tenza {{ new Date().getFullYear() }}
        </div>
        <Networks :networks="networks" />
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
