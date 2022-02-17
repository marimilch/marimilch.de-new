<template>
  <OnVisible @on-visible="videoVisible" @on-hidden="videoHidden" class="on-visible">
    <div 
        class="video-wrap"
        :class="`${wobbleInited ? 'wobble-init' : ''} ${wobbling ? 'wobbling' : ''}`"
        @animationend="wobbling = false"
        @mousedown="wobbleInit"
        @mouseup="wobble"
    >
      <video 
        loop
        muted
        preload="metadata"
        ref="video"
        playinline
        class="video"
      >
        <source 
          :src="`/clips/${source}.webm\#t=.1`" 
          type="video/mp4"
        >
        <source 
          :src="`/clips/${source}.mp4\#t=.1`" 
          type="video/webm"
        >
      </video>
    </div>
  </OnVisible>
</template>

<script>
import OnVisible from '@/components/OnVisible.vue'

export default {
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      wobbleInited: false,
      wobbling: false,
    }
  },
  methods: {
    videoVisible() {
      const video = this.$refs.video
      if (!video) return

      video.play()
    },
    videoHidden() {
      const video = this.$refs.video
      if (!video) return

      video.pause()
    },
    wobbleInit() {
      this.wobbleInited = true
    },
    wobble() {
      if (!this.wobbleInited) return
      this.wobbleInited = false
      this.wobbling = true
    }
  },
  components: {
    OnVisible
  }
}
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0% {
    transform: scale(.9);
  }
  25% {
    transform: scale(1.09);
  }
  50% {
    transform: scale(.955);
  }
  75% {
    transform: scale(1.0225);
  }
  100% {
    transform: scale(1);
  }
}
.wobble-init {
  transform: scale(.9);
}
.wobbling {
  animation: pulse .5s linear 0s 1 normal;
}
.on-visible {
  height: 100%;
}
.video-wrap {
  transition: transform .2s ease;
  padding: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  cursor: pointer;
}
.video {
  width: 100%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, .4) 0 20px 30px;
}
</style>