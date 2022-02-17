<template>
  <FancyHalves class="fancy-model block-halves" ref="fancyModelWrap">
    <template v-slot:description>
      <Lerpy>
        <Appearing effect="fancyParagraphAppear">
          <FancyParagraph>
            <slot></slot>
          </FancyParagraph>
        </Appearing>
      </Lerpy>
    </template>
    <template v-slot:media>
      <Lerpy :whFull="true" :scrollWithStrength=".3" :lerpSpeed="3.5">
        <Clip :source="source" />
      </Lerpy>
    </template>
  </FancyHalves>
</template>

<script>
import Clip from '@/components/Clip.vue'
import Appearing from '@/components/effects/Appearing'
import Lerpy from '@/components/effects/Lerpy'
import FancyParagraph from '@/components/project-components/FancyParagraph'
import FancyHalves from '@/components/project-components/FancyHalves.vue'

export default {
  props: {
    source: {
      type: String,
    },
  },
  components: {
    Appearing,
    Lerpy,
    FancyParagraph,
    FancyHalves,
    Clip,
  },
}
</script>
