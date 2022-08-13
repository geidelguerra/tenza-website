<template>
  <div v-scroll="{ onScroll }" class="bg-white">
    <section id="intro" class="flex items-center justify-center w-full lg:h-screen pt-[95px] l:pb-0 lg:pt-0 lg:px-[200px] mb-[80px] lg:mb-0">
      <div class="lg:flex justify-between w-full px-[20px] lg:px-0">
        <div class="w-full lg:pr-[100px] mb-[40px] lg:mb-0">
          <h1 class="font-bold text-[40px] mb-[40px] lg:text-[70px] lg:tracking-[0.7px] lg:leading-[70px] lg:mb-[97px]">
            We design and  help you build  your legacy.
          </h1>
          <div class="w-full text-[20px] leading-[22px] text-justify">
            Tenza is a Miami based studio for sustainable architectural and interior design. Founded by Ernesto Anton in 2020 with built projects in Havana and New York the practice works as an ethnically diverse and cultural bridge between both countries. Though a young practice, Tenza is the result of our independent efforts over the years to create and innovate in the design field with a sustainable approach.
          </div>
        </div>
        <div class="flex justify-center lg:pl-[100px]">
          <div class="w-full overflow-hidden bg-black rounded-r-full rounded-bl-full aspect-1">
            <img src="~assets/images/studio/studio_01.jpg" class="object-cover object-center w-full h-full">
          </div>
        </div>
      </div>
    </section>

    <section id="me" class="flex justify-center w-full lg:items-center lg:h-screen mb-[80px] lg:mb-0">
      <div class="text-black px-[20px]">
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

        <div class="flex flex-col lg:items-center lg:flex-row-reverse">
          <div class="hidden lg:block lg:ml-[124px] rounded-full overflow-hidden w-[160px] h-[160px] lg:w-[260px] lg:h-[260px] border-2 border-[#f5f5f5] mb-[20px] lg:mb-0">
            <img class="object-cover w-full h-full" src="~/assets/images/studio/ernesto_02.jpg" alt="Ernesto Anton">
          </div>

          <div class="lg:w-[500px] text-[20px] leading-[30px] lg:text-[20px] tracking-[0.2px] lg:leading-[27px] text-justify mb-[40px] lg:mb-0">
            Ernesto founded the practice on 2020 after moving to Miami from New York City. With the believe that the quality of our surroundings affects the quality of our lives and driven by his passion for timeless design and innovation he has stablished a sustainable approach to the architecture exercise. Anton is also a passionate soccer and racquetball player who enjoys good storytelling in any shape or form.
          </div>

          <div class="lg:hidden">
            <img class="object-cover w-full h-full" src="~/assets/images/studio/ernesto_02.jpg" alt="Ernesto Anton">
          </div>
        </div>
      </div>
    </section>

    <div ref="sections" class="relative flex px-[20px] lg:px-0">
      <div class="hidden sticky top-0 left-0 lg:ml-[430px] z-10 lg:flex items-center h-screen">
        <studio-sections-navigator :items="sections" />
      </div>

      <div class="lg:ml-[200px] lg:max-w-[500px]">
        <studio-section
          id="architecture"
          title="Architecture"
        >
          It is our believe that the best architecture comes from the symbiotic interaction of all the elements that form a building: the envelope that gives the shape, the structure that holds it up, the function that brings it to live, the quality of natural light and shades, the symbolism, the relationship of the building to its surroundings; the way you move through or around it; and finally its ability to lift the spirits and inspire. By working together with our clients from the start of a project we devise integrated and sustainable design solutions.
        </studio-section>

        <studio-section
          id="interiors"
          title="Interiors"
        >
          We design every building from the inside-out as much as from the outside-in. Crafting a sense of continuity to their surroundings. The starting point is to gain an understanding of our client’s needs and the way in which the space will be used. But our architecture is not a machine. The goal is to design interiors that are both functional and elegant, simple while still evoking a sense of uniqueness that complements the building’s outward concept.
        </studio-section>

        <studio-section
          id="modeling-3d"
          title="Specialist 3D Modeling"
        >
          Tenza while not looking expressly on crafting complex shapes it is often, we found that the building, the environment or program requires it. We are capable of complex geometrical modeling. Our team looks at the movement of natural light, air and sound, while focusing on maximizing the occupant's comfort. These innovative projects require collaboration with vendors, contractors and other industry partners.
        </studio-section>

        <studio-section
          id="visualization"
          title="Visualization"
        >
          When required, we offer high quality architectural visualizations: renderings, animations, and or motion graphics for all our projects at various stages including concept, construction, marketing and final presentations.
        </studio-section>

        <studio-section
          id="modelmaking"
          title="Modelmaking"
        >
          Our workshop is equipped with an array of digital and traditional machinery for the construction of presentation models, sketch models and mock-ups of all styles, sizes and scales. Parallel to our traditional handcraft skills we maintain an up-to-date knowledge of all modelmaking skills, from techniques and styles, to innovative new technologies .
        </studio-section>

        <studio-section
          id="project-management"
          title="Project Management"
        >
          We work closely with the client and other design professionals to identify project objectives at the earliest stages. We support and empower teams to deliver their design objectives, while helping to maintain positive, long-lasting client relationships.
        </studio-section>

        <studio-section
          id="construction-overview"
          title="Construction Overview"
        >
          Tenza is fully committed to ensure that the construction quality and technical detailing are present in all the stages of the project. We carry out technical reviews of the projects at regular intervals, from schematic design until completion. This ensures that high standards of technical quality are maintained in every project.
        </studio-section>
      </div>
    </div>

    <transition
      appear
      enter-active-class="transition-all duration-700"
      leave-active-class="transition-all duration-700"
      enter-class="translate-y-full opacity-0"
      leave-to-class="translate-y-full opacity-0"
    >
      <ScrollDownIndicator
        v-if="showScrollIndicator"
        class="fixed bottom-[45px] left-[50%] translate-x-[-50%]"
        :light-mode="true"
        @click="$scrollTo('#me')"
      />
    </transition>
  </div>
</template>

<script>
import ScrollDownIndicator from '~/components/ScrollDownIndicator.vue'
import StudioSection from '~/components/StudioSection.vue'
import StudioSectionsNavigator from '~/components/StudioSectionsNavigator.vue'

export default {
  components: {
    ScrollDownIndicator,
    StudioSection,
    StudioSectionsNavigator
  },
  data () {
    return {
      sections: [],
      showScrollIndicator: true
    }
  },
  computed: {
    lightMode: {
      get () {
        return this.$store.state.lightMode
      },
      set (val) {
        this.$store.commit('lightMode', val)
      }
    }
  },
  mounted () {
    this.$store.commit('showHeader', true)
    this.$store.commit('showFooter', true)

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })

    this.$images.loaded(() => {
      this.$nuxt.$loading.finish()
    })

    this.sections = Array.from(this.$refs.sections.querySelectorAll('section'))

    this.$store.commit('lightMode', true)
  },
  methods: {
    onScroll (scrollTop, scrollHeight, progress) {
      this.showScrollIndicator = scrollTop === 0
      this.lightMode = scrollTop < this.$el.scrollHeight
    }
  }
}
</script>
