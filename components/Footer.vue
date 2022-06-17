<template>
  <div class="w-screen h-screen bg-[#f5f5f5]">
    <img src="/footer_bg.jpg" class="absolute top-0 bottom-0 left-0 right-0 object-contain bg-[#f5f5f5] opacity-40">
    <div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full h-full">
      <div class="flex-1">
        <!--  -->
      </div>
      <div class="flex justify-between items-center h-[207px] mx-[43px] border-t border-black">
        <div class="text-[14px] text-[#111111] font-bold">
          Copyright &copy; Tenza {{ new Date().getFullYear() }}
        </div>
        <Networks :networks="networks" :light-mode="true" />
      </div>
    </div>
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
