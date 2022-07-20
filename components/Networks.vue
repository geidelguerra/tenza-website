<template>
  <div
    v-bind="$attrs"
    class="flex items-center space-x-[1.5625rem]"
    :class="{
      'text-black': lightMode,
      'text-white': !lightMode
    }"
  >
    <template v-for="(network, i) in networks">
      <a
        :key="i"
        :href="network.url"
        target="_blank"
        rel="noopener noreferrer"
        @click="$emit('click')"
      >
        <component :is="network.icon" class="border-none" />
      </a>
    </template>
  </div>
</template>

<script>
import TwitterIcon from '~/assets/images/twitter_alt.svg?inline'
import InstagramIcon from '~/assets/images/instagram_alt.svg?inline'
import LinkedInIcon from '~/assets/images/linkedin_alt.svg?inline'
import EmailIcon from '~/assets/images/email.svg?inline'

export default {
  components: {
    TwitterIcon,
    InstagramIcon,
    LinkedInIcon,
    EmailIcon
  },
  props: {
    lightMode: Boolean
  },
  data () {
    return {
      networks: [
        { icon: 'TwitterIcon', url: 'https://twitter.com/tenzastudio' },
        { icon: 'InstagramIcon', url: 'https://instagram.com/tenza.inc' },
        { icon: 'LinkedInIcon', url: 'https://linkedin.com/company/tenza-inc' },
        { icon: 'EmailIcon', url: 'mailto:anton@tenza.us' }
      ]
    }
  }
}
</script>
