<template>
    <video ref="videoStream" loop autoplay playinline muted>
        <source :src="`${movieSlug}.webm`" type="video/webm">
        <source :src="`${movieSlug}.mp4`" type="video/mp4">
    </video>
    <div ref="vintageEffect" class="vintage-effect">

    </div>
    <FancyModel
        ref="model"
        modelPath="/glb/tv.glb" 
        :rotationEffectStrength="1.25" 
        :flip="true"
        :rotate="false"
        :initialRotationRad="{x:0, y:-.3, z:0}"
        :autoInitialize="false"
    >
        <slot></slot>
    </FancyModel>
</template>

<style lang="scss" scoped>
    video, .vintage-effect {
        display: none;
    }
</style>

<script>
import * as THREE from 'three'
import Two from 'two.js'
import FancyModel from '@/components/project-components/FancyModel.vue'

export default {
    props: {
        movieSlug: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            materials: null,
            t: 0
        }
    },
    mounted(){
        // this.initVintageEffect()
        this.$nextTick(function() {
            this.initVintageEffect()
            this.initMaterials()
            this.$refs.model.initialize()
        })
    },
    methods: {
        vintageFrame() {
            const viewH = this.viewRect.height
            const rectangleH = this.viewRect.height/2
            this.rectangle.translation.set(
                this.viewRect.width / 2, 
                (this.t * 2 % 1) * (viewH + rectangleH * 2) - rectangleH
            )

            const fps = 10
            this.rectangleBack.fill = `rgba(0, 0, 0, ${(this.t * fps % 1) * .5})`

            this.t += 1/60
            this.t %= 1

            if (this.vintageTexture) this.vintageTexture.needsUpdate = true
        },
        textureInit(textureName){
            this[textureName].rotation = -Math.PI / 2
            const inverseScaleX = 4
            const inverseScaleY = 4
            this[textureName].offset = new THREE.Vector2(
                2, 
                -1.5
            )
            this[textureName].repeat = new THREE.Vector2(inverseScaleX, inverseScaleY)
            this[textureName].flipX = false
        },
        initMaterials(){
            this.videoTexture = new THREE.VideoTexture( this.$refs.videoStream )
            this.vintageTexture = new THREE.CanvasTexture( 
                this.$refs.vintageEffect.querySelector('canvas')
            )

            this.textureInit('videoTexture')
            this.textureInit('vintageTexture')

            this.$refs.model.materials = [
                new THREE.MeshStandardMaterial({ 
                    color: 0xee6a7c,
                    roughness: 0,
                }),
                new THREE.MeshBasicMaterial({ 
                    map: this.videoTexture
                }),
                new THREE.MeshStandardMaterial({ 
                    map: this.vintageTexture,
                    transparent: true
                }),
            ]
        },
        initVintageEffect(){
            this.viewRect = {
                width: 300,
                height: 200
            }
            this.two = new Two({
                width: this.viewRect.width,
                height: this.viewRect.height,
                type: Two.Types.canvas
            }).appendTo(this.$refs.vintageEffect)

            this.rectangle = this.two.makeRectangle(
                this.viewRect.width / 2,
                this.viewRect.height / 2, 
                this.viewRect.width, 
                this.viewRect.height / 2, 
            )
            this.rectangle.fill = 'rgba(255, 255, 255, 0.25)'
            this.rectangle.stroke = 'transparent'

            this.rectangleBack = this.two.makeRectangle(
                this.viewRect.width / 2,
                this.viewRect.height / 2, 
                this.viewRect.width, 
                this.viewRect.height, 
            )
            this.rectangleBack.fill = 'rgba(0, 0, 0, 0.5)'
            this.rectangleBack.stroke = 'transparent'
            // this.wavePath.stroke = 'transparent'
            // this.wavePath.fill = '#ee6a7c'
            // this.wavePath.linewidth = 0

            // const maybeClipPath = this.$refs.twoContainer.querySelector('clipPath')
            // if (maybeClipPath){
            //     maybeClipPath.id = 'wave-mask-clip-path'
            // }

            this.two.bind('update', this.vintageFrame.bind(this))
            this.two.play()
        }
    },
    components: {
        FancyModel
    }
}
</script>