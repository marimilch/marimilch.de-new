<template>
    <div class="fancy-model fancy-paragraph" ref="fancyModelWrap" :data-flip="flip">
        <Lerpy class="left-side">
            <Appearing effect="fancyParagraphAppear">
                <slot></slot>
            </Appearing>
        </Lerpy>
        <div class="right-side" v-on:click="pixelateOnClick ? resetPixelation() : null">
            <Lerpy :whFull="true" scrollWithStrength=".75" lerpSpeedInit="3">
                <Model 
                    :modelPath="modelPath" 
                    :rotateWithScroll="true" 
                    class="fancy-model-instance"
                    :autoInitialize="false"
                    :initialRotationRad="initialRotationRad"
                    :distance="distance"
                    :rotationEffectStrength="rotationEffectStrength"
                    :rotate="rotate"
                    ref="model"
                ></Model>
            </Lerpy>
        </div>
    </div>
</template>

<script>
import Model from '@/components/Model.vue'
import Appearing from '@/components/effects/Appearing'
import Lerpy from '@/components/effects/Lerpy'

export default {
    props: {
        title: {
            type: String,
        },
        modelPath: {
            required: true,
            type: String,
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
        Lerpy
    },
    methods: {
        initialize(){
            this.$nextTick(function() {
                this.$refs.model.backColor = this.getBackColor()
                this.$refs.model.color = '#ee6a7c'

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
        getCSSProp(elem, prop){
            const stylings = window.getComputedStyle(elem)
            const res = stylings.getPropertyValue(prop)

            return res
        },
        getBackColor(){
            const maybeWrap = this.getWrap()
            if (!maybeWrap) return '#000000'

            return this.getCSSProp(
                maybeWrap,
                'background-color'
            )
        },
        getTextColor(){
            const maybeWrap = this.getWrap()
            if (!maybeWrap) return '#000000'

            const maybeText = maybeWrap.querySelector('h2')
            if (!maybeText) return '#000000'

            return this.getCSSProp(
                maybeText,
                'color'
            )
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

    .fancy-model {
        display: flex;
        align-items: center;
        align-content: center;
        min-height: 100vh;

        &[data-flip="true"]{
            flex-direction: row-reverse;
        }

        .right-side {
            position: sticky;
            top: 0;
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