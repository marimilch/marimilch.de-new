<template>
    <video ref="videoStream" playinline muted>
        <source :src="`${movieSlug}.webm`" type="video/webm">
        <source :src="`${movieSlug}.mp4`" type="video/mp4">
    </video>
    <canvas ref="videoMirror"></canvas>
    <div ref="vintageEffect" class="vintage-effect"></div>
    <FancyModel
        ref="model"
        modelPath="/glb/tv.glb" 
        :rotationEffectStrength="1.25" 
        :flip="true"
        :rotate="false"
        :initialRotationRad="{x:0, y:-.35, z:0}"
        :autoInitialize="false"
        :distance="-.03"
        :pixelateOnClick="false"
        :pixelationTarget="5"
        v-on:click="switchChannel()"
    >
        <slot></slot>
    </FancyModel>
</template>

<style lang="scss" scoped>
    video, .vintage-effect, canvas {
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
            t: 0,
            t2: 0,
            textureX: 2,
            textureY: -1.5,
        }
    },
    mounted(){
        // this.initVintageEffect()
        this.$nextTick(function() {
            this.initVintageEffect()
            this.initMaterials()
            this.initVideoMirror()
            this.$refs.model.initialize()
        })
    },
    methods: {
        vintageFrame() {
            const viewH = this.viewRect.height
            const rectangleH = this.viewRect.height/2
            this.rectangle.translation.set(
                this.viewRect.width / 2, 
                this.t * (viewH + rectangleH * 2) - rectangleH
            )

            const fps = 30
            this.rectangleBack.fill = `rgba(0, 0, 0, ${(this.t * fps % 1) * .075})`

            this.t += 1/120
            this.t %= 1

            if (this.vintageTexture) this.vintageTexture.needsUpdate = true
        },
        textureInit(textureName){
            this[textureName].rotation = -Math.PI / 2
            const inverseScaleX = 4
            const inverseScaleY = 4
            this[textureName].offset = new THREE.Vector2(
                this.textureX, 
                this.textureY
            )
            this[textureName].repeat = new THREE.Vector2(inverseScaleX, inverseScaleY)
            // this.wrapS = THREE.MirroredRepeatWrapping
            // this.wrapT = THREE.MirroredRepeatWrapping
        },
        initMaterials(){
            this.videoTexture = new THREE.CanvasTexture( this.$refs.videoMirror )
            this.vintageTexture = new THREE.CanvasTexture( 
                this.$refs.vintageEffect.querySelector('canvas')
            )

            this.textureInit('videoTexture')
            this.textureInit('vintageTexture')

            this.$refs.model.materials = [
                new THREE.MeshStandardMaterial({ 
                    color: 0xEA3863,
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
        videoLoopCascade(){
            if (!this.$refs.videoStream) return

            // needed to catch loop and indcue effects
            if (this.$refs.videoStream.paused) {
                this.switchChannel()
                this.$refs.videoStream.play()
            }

            window.requestAnimationFrame(this.videoLoopCascade.bind(this))
        },
        videoMirrorCascade(){
            if (!this.$refs.videoStream) return

            const context = this.videoMirrorContext
            context.drawImage(this.$refs.videoStream, 0, 0, 300, 200)
            this.videoTexture.needsUpdate = true

            window.requestAnimationFrame(this.videoMirrorCascade.bind(this))
        },
        tubeWave(){
            this.t2 = 0
            this.tubeWaveCascade()
        },
        tubeWaveCascade(){
            const t = this.t2
            const yOffset = Math.sin(40*t) * Math.max(1 - t, 0)

            if (this.videoTexture){
                this.videoTexture.offset = new THREE.Vector2(
                    this.textureX, 
                    this.textureY + yOffset
                )

                this.t2 += 1/30

                if (this.t2 >= 1) {
                    this.videoTexture.offset = new THREE.Vector2(
                        this.textureX, 
                        this.textureY
                    )
                    return
                }
            }

            window.requestAnimationFrame(this.tubeWaveCascade.bind(this))
        },
        switchChannel(){
            // Show channel number
            if (this.channelTimeout) clearTimeout(this.channelTimeout)

            this.tubeWave()
            this.channel.scale = new Two.Vector(-1, 1)
            this.channelTimeout = setTimeout(this.hideChannel.bind(this), 5000)
        },
        hideChannel(){
            this.channel.scale = 0
        },
        initVideoMirror(){
            this.$refs.videoMirror.width = 300
            this.$refs.videoMirror.height = 200

            this.videoMirrorContext = this.$refs.videoMirror.getContext('2d')
            this.videoMirrorContext.translate(300, 0)
            this.videoMirrorContext.scale(-1, 1)

            this.videoMirrorCascade()

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

            // Bright Rectangle
            this.rectangle = this.two.makeRectangle(
                this.viewRect.width / 2,
                this.viewRect.height / 2, 
                this.viewRect.width, 
                this.viewRect.height / 2, 
            )
            this.rectangle.fill = 'rgba(255, 255, 255, 0.05)'
            this.rectangle.stroke = 'transparent'

            // Channel number
            this.channel = new Two.Text('AV2', 245, 25, {
                family: 'PressStart2P',
                fill: '#ee6a7c',
                size: 30
            })
            this.channel.scale = new Two.Vector(-1, 1)
            this.channel.addTo(this.two)

            // Decreasing light intervals
            this.rectangleBack = this.two.makeRectangle(
                this.viewRect.width / 2,
                this.viewRect.height / 2, 
                this.viewRect.width, 
                this.viewRect.height, 
            )
            
            // Scanlines
            const nLines = 45
            for (let i = 0; i < nLines; i++) {
                const scanline = this.two.makeRectangle(
                    this.viewRect.width / 2,
                    this.viewRect.height / nLines * i, 
                    this.viewRect.width, 
                    this.viewRect.height / nLines / 2, 
                )

                scanline.fill = 'rgba(0, 0, 0, 0.25)'
                scanline.stroke = 'transparent'
            }
            
            this.videoLoopCascade()
            this.two.bind('update', this.vintageFrame.bind(this))
            this.two.play()
        }
    },
    components: {
        FancyModel
    }
}
</script>