<template>
    <div class="fancy-model fancy-paragraph" ref="fancyModelWrap">
        <div class="left-side">
            <slot></slot>
        </div>
        <div class="right-side">
            <Model 
                modelPath="/glb/glass_milk.glb" 
                :rotateWithScroll="true" 
                class="fancy-model-instance"
                :distanceFraction=".025"
                :startPositionModel="startPosition"
                :autoInitialize="false"
                ref="model"
            ></Model>
        </div>
    </div>
</template>

<script>
import Model from '@/components/Model.vue'

export default {
    props: {
        title: {
            type: String,
        }
    },
    mounted(){
        this.$nextTick(function() {
            this.$refs.model.backColor = this.getBackColor()
            this.$refs.model.color = this.getTextColor()

            this.$refs.model.initialize()
        })
    },
    computed: {
        startPosition(){
            return [0,-.17,0]
        },
        model(){
            return this.$refs.model
        }
    },
    components: {
        Model
    },
    methods: {
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
        .left-side, .right-side{
            min-height: 100vh;
        }

        .right-side {
            position: sticky;
            top: 0;
            padding: 0;
            height: 100vh;
        }
    }
</style>

<style lang="scss">
    .fancy-model h2 {
        padding-bottom: 50px;
    }
</style>