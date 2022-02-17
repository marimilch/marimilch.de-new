<template>
    <div class="videos-slider">
        <div class="videos-wrap" ref="videoWrap">
            <FancyVideo 
                loop
                muted
                preload="metadata"
                playinline
                v-for="(slug, index) in slugs"
                v-bind:key="index"
                :srcPrefix="srcPrefix"
                :slug="slug"
                :position="index - activeIndex"
            >
            </FancyVideo>
        </div>
    </div>
</template>

<script>
import FancyVideo from '@/components/project-components/fancy-videos/FancyVideo'

export default {
  props: {
    srcPrefix: {
      type: String,
      required: true,
    },
    slugs: {
      type: Array,
      required: true,
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  mounted(){
    this.$nextTick(function(){
      // onVisible( this.$refs.videoWrap.children, {
      //     // onElemVisible: el => {el.play()},
      //     onElemHidden: el => {el.pause()},
      //     options: {
      //         threshold: .25
      //     }
      // })
    })
  },
  methods: {
    initObserver(){
            
    }
  },
  components: {
    FancyVideo
  }
}
</script>

<style lang="scss" scoped>
.videos-slider {
    overflow-x: auto;
    overflow-y: visible;
}
.videos-wrap {
    display: flex;
    flex-wrap: nowrap;
}
video {
    width: 100%;
    height: 100vh;
    position: sticky;
    top: 0;
    opacity: .9;
    object-fit: cover;
}
</style>