<template>
  <div class="h-screen overflow-hidden bg-white">
    <!-- Section 1 -->
    <section class="relative h-screen overflow-hidden text-white bg-black">
      <div
        class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-none"
        :style="{backgroundImage: `url(${require('~/assets/images/studio/studio_01.jpg')})`}"
      >
        <div class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-radial from-white to-black mix-blend-multiply opacity-80" />
      </div>
      <div class="pl-[88px] pr-[118px] absolute top-0 left-0 w-full flex justify-between h-full items-center">
        <h1 class="font-bold text-[82px] w-[616px]">
          We design and  help you build  your legacy.
        </h1>
        <div class="w-[587px] text-[24px]">
          <span class="font-bold">Tenza</span> is a small architectural design firm who puts forward a modern, innovative and sustainable approach to residential and commercial buildings alike. We bring to our clients a tailored experience that hopefully will remain their families for generations
        </div>

        <GetInTouchButton class="absolute bottom-[45px] right-[45px]" />
      </div>
    </section>
    <!-- Section 2 -->
    <section />
    <Mouse class="w-4 fixed bottom-[45px] left-[45px] text-white border-white" />
  </div>
</template>

<script>
import Mouse from '~/assets/images/mouse.svg?inline'
import GetInTouchButton from '~/components/GetInTouchButton.vue'

export default {
  components: {
    Mouse,
    GetInTouchButton
  }
}
</script>
