<template>
    <div class="fancy-buttons">
        <Appearing class="half" effect="fadeIn">
            <Lerpy class="left-inner">
                <slot></slot>
            </Lerpy>
        </Appearing>

        <Appearing class="half right" effect="fadeIn">
            <Lerpy :scrollWithStrength=".3" :lerpSpeed="3.5">
                <h3>{{ label }}</h3>
            </Lerpy>
        </Appearing>
    </div>
</template>

<script>
import Lerpy from '@/components/effects/Lerpy'
import Appearing from '@/components/effects/Appearing'

export default {
  props: {
    label: {
      required: true,
      type: String,
    }
  },
  components: {
    Lerpy,
    Appearing
  },
}
</script>

<style lang="scss" scoped>
.half {
    width: 50%;
}

h3 {
    padding-left: 25px;
}

.fancy-buttons {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    padding: 50px var(--content-padding-x) 0;
}

.left-inner :deep(.lerpy-content) {
    display: flex;
    justify-content: flex-end; 
    flex-wrap: wrap;
}

.right {
    display: flex;
    justify-content: flex-start; 
    flex-wrap: wrap;
}

:deep(.button){
    margin: 10px;
}

@media (max-width: $tabletWidth) {
    .fancy-buttons {
        flex-direction: column-reverse;
    }

    .left-inner :deep(.lerpy-content) {
        justify-content: flex-start; 
    }

    .right {
        justify-content: flex-start; 
    }

    h3 {
        padding-bottom: 15px;
    }

    .half {
        width: 100%;
    }
}
</style>