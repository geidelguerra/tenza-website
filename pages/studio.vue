<template>
  <div>
    <Scroller
      ref="rootScroller"
      class="relative h-screen overflow-hidden"
      :sync-to-route="true"
      :disabled="rootScrollerDisabled"
      @activeIndexChanged="onRootScrollerActiveIndexChanged"
    >
      <!-- Section 1 -->
      <section id="intro" class="flex items-center justify-center w-full h-screen px-[240px]">
        <div class="flex space-x-[275px]">
          <div class="flex flex-col justify-between">
            <h1 class="font-bold text-[82px] w-[616px] tracking-[0.82px] leading-[98px]">
              We design and  help you build  your legacy.
            </h1>
            <div class="w-[587px] text-[18px] leading-[22px]">
              <span class="font-bold">Tenza</span> is a Miami based studio for sustainable architectural and interior design. Founded by Ernesto Anton in 2020 with built projects in Havana and New York the practice works as an ethnically diverse and cultural bridge between both countries. Though a young practice, Tenza is the result of our independent efforts over the years to create and innovate in the design field with a sustainable approach.
            </div>
          </div>
          <div class="w-[547px] h-[547px] bg-black rounded-r-full rounded-bl-full">
            <img src="" alt="">
          </div>
        </div>
      </section>
      <Scroller
        ref="nestedScroller"
        class="relative h-screen overflow-hidden bg-white"
        @activeIndexChanged="onNestedScrollerActiveIndexChanged"
      >
        <template #nav="{ elements, progress, activeElementIndex, scrollToElement }">
          <div class="absolute top-0 bottom-0 left-0 right-[1344px] flex items-center z-10">
            <div class="h-[452px] flex w-full">
              <ul class="w-full text-right pr-[52px] flex flex-col justify-between">
                <template v-for="(elm, idx) in elements">
                  <li
                    v-if="elm.dataset.title"
                    :key="idx"
                  >
                    <a
                      class="select-none font-bold text-[14px] transition-all duration-200 block hover:text-[#111]"
                      :class="activeElementIndex >= idx ? 'text-[#111]' : 'text-[#ccc]'"
                      :href="`#${elm.id}`"
                      @click.prevent="scrollToElement(elm)"
                    >{{ elm.dataset.title }}</a>
                  </li>
                </template>
              </ul>
              <ProgressBar :progress="progress" />
            </div>
          </div>
        </template>

        <section
          id="architecture"
          data-title="Architecture"
          class="flex items-center w-full h-screen pl-[794px] pr-[703px]"
        >
          <div class="flex flex-col h-[452px]">
            <h2 class="text-[28px] font-bold uppercase tracking-[3.64px] mb-[38px]">
              Architecture
            </h2>
            <div class="flex-1" />
            <div class="text-[20px]">
              It is our believe that the best architecture comes from the symbiotic interaction of all the elements that form a building: the envelope that gives the shape, the structure that holds it up, the function that brings it to live, the quality of natural light and shades, the symbolism, the relationship of the building to its surroundings; the way you move through or around it; and finally its ability to lift the spirits and inspire. By working together with our clients from the start of a project we devise integrated and sustainable design solutions.
            </div>
          </div>
        </section>
        <section
          id="interiors"
          data-title="Interiors"
          class="flex items-center w-full h-screen pl-[794px] pr-[703px]"
        >
          <div class="flex flex-col h-[452px]">
            <h2 class="text-[28px] font-bold uppercase tracking-[3.64px] mb-[38px]">
              Interiors
            </h2>
            <div class="flex-1" />
            <div class="text-[20px]">
              We design every building from the inside-out as much as from the outside-in. Crafting a sense of continuity to their surroundings. The starting point is to gain an understanding of our client’s needs and the way in which the space will be used. But our architecture is not a machine. The goal is to design interiors that are both functional and elegant, simple while still evoking a sense of uniqueness that complements the building’s outward concept.
            </div>
          </div>
        </section>
        <section
          id="modeling-3d"
          data-title="Specialist 3D Modeling"
          class="flex items-center w-full h-screen pl-[794px] pr-[703px]"
        >
          <div class="flex flex-col h-[452px]">
            <h2 class="text-[28px] font-bold uppercase tracking-[3.64px] mb-[38px]">
              Specialist 3D modeling
            </h2>
            <div class="flex-1" />
            <div class="text-[20px]">
              Tenza while not looking expressly on crafting complex shapes it is often, we found that the building, the environment or program requires it. We are capable of complex geometrical modeling. Our team looks at the movement of natural light, air and sound, while focusing on maximizing the occupant's comfort. These innovative projects require collaboration with vendors, contractors and other industry partners.
            </div>
          </div>
        </section>
        <section
          id="visualization"
          data-title="Visualization"
          class="flex items-center w-full h-screen pl-[794px] pr-[703px]"
        >
          <div class="flex flex-col h-[452px]">
            <h2 class="text-[28px] font-bold uppercase tracking-[3.64px] mb-[38px]">
              Visualization
            </h2>
            <div class="flex-1" />
            <div class="text-[20px]">
              When required, we offer high quality architectural visualizations: renderings, animations, and or motion graphics for all our projects at various stages including concept, construction, marketing and final presentations.
            </div>
          </div>
        </section>
        <section
          id="modelmaking"
          data-title="Modelmaking"
          class="flex items-center w-full h-screen pl-[794px] pr-[703px]"
        >
          <div class="flex flex-col h-[452px]">
            <h2 class="text-[28px] font-bold uppercase tracking-[3.64px] mb-[38px]">
              Modelmaking
            </h2>
            <div class="flex-1" />
            <div class="text-[20px]">
              Our workshop is equipped with an array of digital and traditional machinery for the construction of presentation models, sketch models and mock-ups of all styles, sizes and scales. Parallel to our traditional handcraft skills we maintain an up-to-date knowledge of all modelmaking skills, from techniques and styles, to innovative new technologies .
            </div>
          </div>
        </section>
        <section
          id="project-management"
          data-title="Project Management"
          class="flex items-center w-full h-screen pl-[794px] pr-[703px]"
        >
          <div class="flex flex-col h-[452px]">
            <h2 class="text-[28px] font-bold uppercase tracking-[3.64px] mb-[38px]">
              Project Management
            </h2>
            <div class="flex-1" />
            <div class="text-[20px]">
              We work closely with the client and other design professionals to identify project objectives at the earliest stages. We support and empower teams to deliver their design objectives, while helping to maintain positive, long-lasting client relationships.
            </div>
          </div>
        </section>
        <section
          id="construction-overview"
          data-title="Construction Overview"
          class="flex items-center w-full h-screen pl-[794px] pr-[703px]"
        >
          <div class="flex flex-col h-[452px]">
            <h2 class="text-[28px] font-bold uppercase tracking-[3.64px] mb-[38px]">
              Construction Overview
            </h2>
            <div class="flex-1" />
            <div class="text-[20px]">
              Tenza is fully committed to ensure that the construction quality and technical detailing are present in all the stages of the project. We carry out technical reviews of the projects at regular intervals, from schematic design until completion. This ensures that high standards of technical quality are maintained in every project.
            </div>
          </div>
        </section>
      </Scroller>
    </Scroller>
    <GetInTouchButton
      :light="lightMode"
      class="absolute bottom-[45px] right-[45px]"
    />
    <transition name="slide-up">
      <ScrollDownIndicator
        v-if="showScrollableIndicator"
        class="absolute bottom-[45px] left-[45px]"
        :light="lightMode"
      />
    </transition>
  </div>
</template>

<script>
import Scroller from '~/components/Scroller.vue'
import ScrollDownIndicator from '~/components/ScrollDownIndicator.vue'
import GetInTouchButton from '~/components/GetInTouchButton.vue'
import ProgressBar from '~/components/ProgressBar.vue'

export default {
  components: {
    Scroller,
    ScrollDownIndicator,
    GetInTouchButton,
    ProgressBar
  },
  data () {
    return {
      rootScrollerIndex: 0,
      nestedScrollerIndex: 0,
      numberOfSections: 0,
      rootScrollerDisabled: false
    }
  },
  computed: {
    activeScrolledIndex () {
      return this.rootScrollerIndex + this.nestedScrollerIndex
    },
    lightMode () {
      return true
    },
    showScrollableIndicator () {
      return this.activeScrolledIndex < this.numberOfSections - 2
    },
    nestedScrollerProgress () {
      if (!this.$refs.nestedScroller) {
        return 0
      }

      return this.nestedScrollerIndex * 100 / (this.$refs.nestedScroller.numberOfElements - 1)
    }
  },
  methods: {
    onRootScrollerActiveIndexChanged (idx, numberOfSections) {
      this.rootScrollerIndex = idx
      this.numberOfSections = this.$refs.rootScroller.numberOfElements + this.$refs.nestedScroller.numberOfElements
    },
    onNestedScrollerActiveIndexChanged (idx) {
      this.nestedScrollerIndex = idx
      this.rootScrollerDisabled = idx > 0
    }
  }
}
</script>
