<template functional>
  <section
    :id="data.attrs.id"
    :data-title="data.attrs.title"
    class="flex items-center w-full h-screen ml-[794px] max-w-[450px]"
  >
    <div class="flex flex-col h-[452px]">
      <h2 class="text-[28px] font-bold uppercase tracking-[3.64px] mb-[38px] leading-none">
        {{ data.attrs.title }}
      </h2>
      <div class="flex-1" />
      <div class="text-[20px]">
        <slot />
      </div>
    </div>
  </section>
</template>
