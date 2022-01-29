<template>
  <Scroller class="relative h-screen overflow-hidden bg-white">
    <div>
      <!--  -->
    </div>
    <!-- Section 1 -->
    <section class="w-full h-screen overflow-hidden text-white bg-black">
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
    <section title="" class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div class="text-[30px]">
        <span class="font-bold">Tenza</span> is a Miami based studio for sustainable architectural and interior design. Founded by Ernesto Anton in 2020 with built projects in Havana and New York the practice works as an ethnically diverse and cultural bridge between both countries. Though a young practice, Tenza is the result of our independent efforts over the years to create and innovate in the design field with a sustainable approach.
      </div>
    </section>
    <section class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div>
        <h2 class="text-[28px] font-extrabold uppercase">
          Ernesto Anton
        </h2>
        <p class="text-[17px] font-semibold mb-[38px]">
          Executive Partner and Founder
        </p>
        <div class="flex">
          <div class="text-[20px]">
            Ernesto founded the practice on 2020 after moving to Miami from New York City. With the believe that the quality of our surroundings affects the quality of our lives and driven by his passion for timeless design and innovation he has stablished a sustainable approach to the architecture exercise. Anton is also a passionate soccer and racquetball player who enjoys good storytelling in any shape or form
          </div>
          <img class="w-[332px] h-auto" src="~/assets/images/studio/studio_02.jpg" alt="Ernesto Anton">
        </div>
      </div>
    </section>
    <section class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div>
        <h2 class="text-[28px] font-extrabold uppercase">
          Jose Carlos Toral
        </h2>
        <p class="text-[17px] font-semibold mb-[38px]">
          Partner
        </p>
        <div class="flex">
          <div class="text-[20px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, dolorem ex itaque eligendi quam aliquam tempore, ab in, fugiat ratione ducimus at suscipit et rerum temporibus similique iure architecto optio.
          </div>
          <img class="w-[332px] h-auto" src="~/assets/images/studio/studio_03.jpg" alt="Ernesto Anton">
        </div>
      </div>
    </section>
    <section class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div>
        <h2 class="text-[28px] font-extrabold uppercase mb-[38px]">
          Architecture
        </h2>
        <div class="text-[20px]">
          It is our believe that the best architecture comes from the symbiotic interaction of all the elements that form a building: the envelope that gives the shape, the structure that holds it up, the function that brings it to live, the quality of natural light and shades, the symbolism, the relationship of the building to its surroundings; the way you move through or around it; and finally its ability to lift the spirits and inspire. By working together with our clients from the start of a project we devise integrated and sustainable design solutions.
        </div>
      </div>
    </section>
    <section class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div>
        <h2 class="text-[28px] font-extrabold uppercase mb-[38px]">
          Interiors
        </h2>
        <div class="text-[20px]">
          We design every building from the inside-out as much as from the outside-in. Crafting a sense of continuity to their surroundings. The starting point is to gain an understanding of our client’s needs and the way in which the space will be used. But our architecture is not a machine. The goal is to design interiors that are both functional and elegant, simple while still evoking a sense of uniqueness that complements the building’s outward concept.
        </div>
      </div>
    </section>
    <section class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div>
        <h2 class="text-[28px] font-extrabold uppercase mb-[38px]">
          Specialist 3D modeling
        </h2>
        <div class="text-[20px]">
          Tenza while not looking expressly on crafting complex shapes it is often, we found that the building, the environment or program requires it. We are capable of complex geometrical modeling. Our team looks at the movement of natural light, air and sound, while focusing on maximizing the occupant's comfort. These innovative projects require collaboration with vendors, contractors and other industry partners.
        </div>
      </div>
    </section>
    <section class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div>
        <h2 class="text-[28px] font-extrabold uppercase mb-[38px]">
          Visualization
        </h2>
        <div class="text-[20px]">
          When required, we offer high quality architectural visualizations: renderings, animations, and or motion graphics for all our projects at various stages including concept, construction, marketing and final presentations.
        </div>
      </div>
    </section>
    <section class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div>
        <h2 class="text-[28px] font-extrabold uppercase mb-[38px]">
          Modelmaking
        </h2>
        <div class="text-[20px]">
          Our workshop is equipped with an array of digital and traditional machinery for the construction of presentation models, sketch models and mock-ups of all styles, sizes and scales. Parallel to our traditional handcraft skills we maintain an up-to-date knowledge of all modelmaking skills, from techniques and styles, to innovative new technologies .
        </div>
      </div>
    </section>
    <section class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div>
        <h2 class="text-[28px] font-extrabold uppercase mb-[38px]">
          Project Management
        </h2>
        <div class="text-[20px]">
          We work closely with the client and other design professionals to identify project objectives at the earliest stages. We support and empower teams to deliver their design objectives, while helping to maintain positive, long-lasting client relationships.
        </div>
      </div>
    </section>
    <section class="flex items-center w-full h-screen bg-white pl-[794px] pr-[434px]">
      <div>
        <h2 class="text-[28px] font-extrabold uppercase mb-[38px]">
          Construction Overview
        </h2>
        <div class="text-[20px]">
          Tenza is fully committed to ensure that the construction quality and technical detailing are present in all the stages of the project. We carry out technical reviews of the projects at regular intervals, from schematic design until completion. This ensures that high standards of technical quality are maintained in every project.
        </div>
      </div>
    </section>
    <Mouse class="w-4 fixed bottom-[45px] left-[45px] text-white border-white" />
  </Scroller>
</template>

<script>
import Scroller from '~/components/Scroller.vue'
import Mouse from '~/assets/images/mouse.svg?inline'
import GetInTouchButton from '~/components/GetInTouchButton.vue'

export default {
  components: {
    Scroller,
    Mouse,
    GetInTouchButton
  },
  computed: {
    slides () {
      return this.$refs.sectionSlider.slides
    }
  }
}
</script>
