<template>
  <OnVisible @on-visible="videoVisible" @on-hidden="videoHidden" class="on-visible">
    <div 
        class="video-wrap" 
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
  },
  components: {
    OnVisible
  }
}
</script>

<style lang="scss" scoped>
.on-visible {
  height: 100%;
}
.video-wrap {
  padding: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.video {
  width: 100%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, .4) 0 20px 30px;
}
</style>