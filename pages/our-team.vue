<template>
  <div class="flex items-center justify-center h-screen bg-white">
    <div>
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
        <div class="rounded-r-full rounded-bl-full overflow-hidden w-[260px] h-[260px]">
          <img class="object-cover w-full h-full" src="~/assets/images/studio/studio_02.jpg" alt="Ernesto Anton">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('showFooter', true)
    this.$store.commit('lightMode', true)
  }
}
</script>
