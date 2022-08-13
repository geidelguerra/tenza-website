<template>
  <transition
    appear
    enter-active-class="transition-all duration-700"
    leave-active-class="transition-all duration-700"
    leave-to-class="opacity-0"
  >
    <div v-if="loading" class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-white">
      <svg class="w-[200px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.99 20.18" fill="currentColor">
        <polygon class="splash-letter splash-letter-1" points="0 0 0 1.76 2.46 1.76 2.46 7.08 2.46 8.05 2.46 9 4.37 9 4.37 8.05 4.37 7.08 4.37 1.76 6.83 1.76 6.83 0 0 0" />
        <path class="splash-letter splash-letter-2" d="M9.19,3.57a2.69,2.69,0,0,1,2.52-1.81,2.57,2.57,0,0,1,2.55,1.81ZM13.39.32A4.53,4.53,0,0,0,11.78,0h-.06A4.32,4.32,0,0,0,11,.05,4.43,4.43,0,0,0,7.32,4.46a4.44,4.44,0,0,0,4.4,4.46h.34a4,4,0,0,0,1.81-.44l.07,0a4.56,4.56,0,0,0,1.33-1L14.2,6.11a4.07,4.07,0,0,1-.6.52,3.87,3.87,0,0,1-.44.23,3.3,3.3,0,0,1-1.26.29h-.18a2.64,2.64,0,0,1-2-.93h0a2.74,2.74,0,0,1-.51-.89h6.93V4.46A4.28,4.28,0,0,0,13.39.32" />
        <path class="splash-letter splash-letter-3" d="M21.58,0a4.44,4.44,0,0,0-4.4,4.46V9h1.74V4.46a2.67,2.67,0,1,1,5.33,0V9H26V4.46A4.44,4.44,0,0,0,21.58,0" />
        <polygon class="splash-letter splash-letter-4" points="9.07 11.26 9.07 13.04 13.64 13.04 9.27 18.74 9.07 18.99 9.07 20.18 16.28 20.18 16.28 18.42 11.7 18.42 16.09 12.68 16.28 12.43 16.28 11.26 9.07 11.26" />
        <path class="splash-letter splash-letter-5" d="M24.23,18.42H21.61a2.63,2.63,0,0,1-2.7-2.65A2.7,2.7,0,0,1,21.61,13a2.63,2.63,0,0,1,2.62,2.73Zm-2.6-7.12a4.44,4.44,0,0,0-4.44,4.49,4.33,4.33,0,0,0,4.44,4.37H26V15.79a4.34,4.34,0,0,0-4.32-4.49" />
      </svg>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      threshold: 0,
      duration: 3000,
      timeout: null
    }
  },
  methods: {
    start () {
      this.timeout = setTimeout(() => {
        this.loading = true
      }, this.threshold)
    },
    finish () {
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.loading = false
      }, this.duration)
    }
  }
}
</script>

<style>
.splash-letter {
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: backwards;
  animation-direction: normal;
  animation-iteration-count: infinite;
  transform-origin: bottom right;
}

.splash-letter-1 {
  animation-name: letter-1;
  animation-delay: .2s;
}

.splash-letter-2 {
  animation-name: letter-2;
  animation-delay: 0.4s;
}

.splash-letter-3 {
  animation-name: letter-3;
  animation-delay: 0.8s;
}

.splash-letter-4 {
  animation-name: letter-4;
  animation-delay: 1s;
}

.splash-letter-5 {
  animation-name: letter-5;
  animation-delay: 0s;
  transform-origin: bottom right;
}

@keyframes letter-1 {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(90deg) translate(19px, 11px);
  }

  20%,80% {
    opacity: 1;
    transform: scale(1) rotate(0) translate(0, 0);
  }

  100% {
    opacity: 0;
  }
}

@keyframes letter-2 {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(90deg) translate(10px, 11px);
  }

  20%,80% {
    opacity: 1;
    transform: scale(1) rotate(0) translate(0, 0);
  }

  100% {
    opacity: 0;
  }
}

@keyframes letter-3 {
  from {
    opacity: 0;
    transform: translate(0, 11px);
  }

  20%,80% {
    opacity: 1;
    transform: translate(0, 0);
  }

  100% {
    opacity: 0;
  }
}

@keyframes letter-4 {
  from {
    opacity: 0;
    transform: translate(9px, 0);
  }

  20%,80% {
    opacity: 1;
    transform: translate(0, 0);
  }

  100% {
    opacity: 0;
  }
}

@keyframes letter-5 {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  10% {
    opacity: 1;
    transform: scale(1.1);
  }

  20% {
    transform: scale(1);
  }
}
</style>
