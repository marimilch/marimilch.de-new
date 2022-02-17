<template>
<Lerpy 
    class="video-wrap" 
    :scrollWithStrength=".4 - positionAbsMin * .5" 
    :lerpSpeed="2.5 + positionAbsMin * .5"
>
    <video 
        loop
        muted
        preload="metadata"
        ref="video"
        playinline
        :class="'video ' + (isActive ? 'is-active' : '')"
    >
        <source 
            :src="`/clips/${srcPrefix}/${slug}.webm#t=.1`" 
            type="video/mp4"
        >
        <source 
            :src="`/clips/${srcPrefix}/${slug}.mp4#t=.1`" 
            type="video/webm"
        >
    </video>
</Lerpy>
</template>

<script>
import Lerpy from '@/components/effects/Lerpy'

export default {
  props: {
    srcPrefix: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    rotationStrengthX: {
      type: Number,
      default: .25,
    },
    position: {
      type: Number,
      default: 1
    },
  },
  data(){
    return {
      perspectiveY: 0
    }
  },
  mounted(){
    // this.timedFrames = new TimedFrames(this.renderCascade.bind(this))
    // this.timedFrames.requestFrame()

  },
  methods: {
    renderCascade(dt){
      console.log(dt) // TODO
      // this.perspectiveY = distanceToCenter(this.$refs.video).top
      // this.timedFrames.requestFrame()
    }
  },
  computed: {
    positionAbsMin() {return Math.min( Math.abs( this.position ), 3 )},
    isActive() {return this.position === 0}
  },
  components: {
    Lerpy
  }
}
</script>

<style lang="scss" scoped>
$videoPadding: 25px;
$videoWidth: min( 900px, 100vw );

.video-wrap {
    padding: $videoPadding;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-height: 100vh;
    min-width: $videoWidth;

    &:first-of-type {
        margin-left: calc( calc( $videoWidth / 2 ) - $videoPadding );
    }
}
:deep(.lerpy-content){
    z-index: 2;
    width: 100%;
}
.video {
    border-radius: 25px;
    width: 100%;

    &:not(.is-active) {
        filter: grayscale(1);
    }
}
</style>