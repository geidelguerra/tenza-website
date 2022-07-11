<template>
  <section v-bind="$attrs" class="h-screen flex items-center justify-end bg-[#F5F5F5]">
    <div class="lg:mr-[208px] lg:w-[615px]">
      <TextAnimator
        tag="h2"
        :text="header"
        class="text-[#111111] font-extrabold lg:text-[82px] tracking-[0.82px] leading-[98px]"
        :animate-on-mounted="false"
        :animate-on-visibility="true"
        :animate-once="true"
      />

      <TextAnimator
        :text="text"
        class="text-[15px] text-[#111] leading-[30px] tracking-[0.15px]"
        :delay="200"
        :animate-on-mounted="false"
        :animate-on-visibility="true"
        :animate-once="true"
      />
    </div>
  </section>
</template>

<script>
import TextAnimator from '~/components/TextAnimator.vue'

export default {
  components: { TextAnimator },
  props: {
    header: { type: String, required: true },
    text: { type: String, required: true }
  }
}
</script>
