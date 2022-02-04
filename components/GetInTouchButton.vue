<template>
  <button
    v-bind="$attrs"
    :class="{
      'text-white': !active && !light,
      'text-black border-black': light,
      'text-black bg-white': active
    }"
    class="uppercase text-[11px] p-2 border-2 tracking-[0.5em] transition-colors duration-500"
    @click="active = !active"
    @blur="onBlur"
  >
    Get in touch
    <div
      v-show="active"
      class="absolute right-[100%] mr-[25px] top-0 bottom-0 flex items-center space-x-[25px]"
      :class="{
        'text-black': light,
        'text-white': !light
      }"
    >
      <template v-for="(network, i) in networks">
        <a
          :key="i"
          :href="network.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <component :is="network.icon" class="border-none" />
        </a>
      </template>
    </div>
  </button>
</template>

<script>
import TwitterIcon from '~/assets/images/twitter_alt.svg?inline'
import FacebookIcon from '~/assets/images/facebook_alt.svg?inline'
import InstagramIcon from '~/assets/images/instagram_alt.svg?inline'
import LinkedInIcon from '~/assets/images/linkedin_alt.svg?inline'

export default {
  components: {
    TwitterIcon,
    FacebookIcon,
    InstagramIcon,
    LinkedInIcon
  },
  props: {
    light: Boolean
  },
  data () {
    return {
      active: false,
      networks: [
        { icon: 'TwitterIcon', url: 'https://twitter.com/tenzastudio' },
        { icon: 'FacebookIcon', url: 'https://facebook.com/tenzastudio' },
        { icon: 'InstagramIcon', url: 'https://instagram.com/tenzastudio' },
        { icon: 'LinkedInIcon', url: 'https://linkedin.com/in/tenzastudio' }
      ]
    }
  },
  methods: {
    onBlur () {
      setTimeout(() => {
        this.active = false
      }, 100)
    }
  }
}
</script>
