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
                <Model
                    v-on:click="pixelateOnClick ? resetPixelation() : null"
                    :modelPath="modelPath" 
                    :rotateWithScroll="true" 
                    class="fancy-model-instance"
                    :autoInitialize="false"
                    :initialRotationRad="initialRotationRad"
                    :distance="distance"
                    :rotationEffectStrength="rotationEffectStrength"
                    :rotate="rotate"
                    :pixelationTarget="pixelationTarget"
                    :debug="debug"
                    ref="model"
                ></Model>
            </Lerpy>
        </template>
    </FancyHalves>
</template>

<script>
import Model from '@/components/Model.vue'
import Appearing from '@/components/effects/Appearing'
import Lerpy from '@/components/effects/Lerpy'
import FancyParagraph from '@/components/project-components/FancyParagraph'
import FancyHalves from '@/components/project-components/FancyHalves.vue'

export default {
    props: {
        title: {
            type: String,
        },
        modelPath: {
            required: true,
            type: String,
        },
        debug: {
            default: false,
            type: Boolean,
        },
        pixelationTarget: {
            default: 5,
            type: Number,
        },
        distance: {
            default: 0,
            type: Number,
        },
        rotationEffectStrength: {
            default: 1,
            type: Number,
        },
        initialRotationRad: {
            default: {x:0, y:0, z:0},
            type: Object,
        },
        flip: {
            default: false,
            type: Boolean,
        },
        rotate: {
            default: true,
            type: Boolean,
        },
        autoInitialize: {
            default: true,
            type: Boolean,
        },
        pixelateOnClick: {
            default: true,
            type: Boolean
        }
    },
    mounted(){
        if(this.autoInitialize) this.initialize()
    },
    data(){
        return {
            materials: undefined
        }
    },
    components: {
        Model,
        Appearing,
        Lerpy,
        FancyParagraph,
        FancyHalves
    },
    methods: {
        initialize(){
            this.$nextTick(function() {
                if (this.materials) this.$refs.model.materials = this.materials

                this.$refs.model.initialize()
            })
        },
        resetPixelation(){
            this.$refs.model.resetPixelation()
        },
        getWrap(){
            const maybeModel = this.$refs.fancyModelWrap

            if (!maybeModel) return console.log('no model'), null
            return maybeModel
        },
        updateModelColors(){
            const maybeModel = this.$refs.model

            if (!maybeModel) return null
        }
    },
}
</script>

<style lang="scss" scoped>
    // h2 {
    //     text-align: center;
    //     padding: 25px 0;
    //     height: 200px;
    //     display: flex;
    //     align-items: center;
    //     align-content: center;
    //     justify-content: center;
    // }

    .fancy-model-instance {
        cursor: pointer;
    }

    .fancy-model {
        display: flex;
        align-items: center;
        align-content: center;
        min-height: 100vh;

        .right-side {
            // position: sticky;
            // top: 0;
            padding: 0;
            height: 100vh;
            cursor: pointer;
        }
    }
</style>

<style lang="scss">
    .fancy-model h2 {
        padding-bottom: 50px;
    }
</style>