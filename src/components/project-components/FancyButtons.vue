<template>
    <div class="fancy-buttons">

        <Appearing class="left" effect="fadeIn">
            <Lerpy>
                <slot></slot>
            </Lerpy>
        </Appearing>

        <Appearing class="right" effect="fadeIn">
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
.fancy-buttons {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    padding: 50px var(--content-padding-x) 0;
}

.left {
    width: 50%;
    display: flex;
    justify-content: flex-end; 
}

.right {
    width: 50%;
    display: flex;
    justify-content: flex-start; 
}

:deep(.button){
    margin: 10px;
}
</style>