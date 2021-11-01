<template>
    <div class="model-wrap">
        <div ref="modelRef" class="model wh-full">

        </div>
    </div>      
</template>

<style lang="scss" scoped>
.model-wrap {
    width: 100%;
    height: 100%;
}

.model {
    width: 100%;
    height: 100%;
}

::v-deep {
    .three-js {
        width: 100% !important;
        height: 100% !important;

        // image-rendering: optimizeSpeed;             /* Older versions of FF          */
        // image-rendering: -moz-crisp-edges;          /* FF 6.0+                       */
        // image-rendering: -webkit-optimize-contrast; /* Safari                        */
        // image-rendering: -o-crisp-edges;            /* OS X & Windows Opera (12.02+) */
        // image-rendering: pixelated;                 /* Awesome future-browsers       */
        // -ms-interpolation-mode: nearest-neighbor;   /* IE                            */
    }
}
</style>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { HalftonePassAlpha } from '@/assets/js/HalftonePassAlpha.js'

import { prefersDark } from '@/assets/js/prefers-dark.js'
import { onVisible } from '@/assets/js/on-visible.js'
import { TimedFrames } from '@/assets/js/timed-frames.js'
import { distanceToCenter } from '@/assets/js/distance-to-center.js'


// function getBackgroundColor() {
//     const stylings = window.getComputedStyle(document.body)
//     const rgb = stylings.getPropertyValue('background-color')

//     return rgb
// }

export default {
    props: {
        rotateWithScroll: {
            type: Boolean,
            default: false
        },
        debug: {
            type: Boolean,
            default: false
        },
        distance: {
            type: Number,
            default: 0
        },
        focalLength: {
            type: Number,
            default: 40
        },
        modelPath: {
            type: String,
            required: true
        },
        autoInitialize: {
            type: Boolean,
            default: true
        },
        rotate: {
            type: Boolean,
            default: true
        },
        rotationEffectStrength: {
            type: Number,
            default: 1
        },
        initialRotationRad: {
            type: Object,
            default: {x:0, y:0, z:0}
        },
        // if set to zero render as crisp as possible
        pixelationTarget: {
            type: Number,
            default: 5
        },
        setVisibilityManually: {
            type: Boolean,
            default: false
        },
        rotationSpeed: {
            type: Number,
            default: 1
        },

    },
    data(){
        return {
            isVisible: false,
            lerpStart: null,
            lerpEnd: null,
            // translation: new THREE.Vector3(0,0,0),
            // startPositionModel: null,
            t: 1,
            t2: 0,
            moveSpeed: .45,
            pixelation: 1,
            antialias: true,
            pixelationT: 0,
            pixelationSpeed: .6,
            pixelationStart: 75,

            distanceFractionOrigin: .11,
            materials: [
                new THREE.MeshStandardMaterial({ 
                    color: prefersDark() ? 0xEA3863 : 0xee6a7c ,
                    roughness: 0,
                }),
            ]
        }
    },
    computed: {
        cameraDistance(){
            return (this.distanceFractionOrigin + this.distance) * this.focalLength
        },
        pixelation_(){
            return this.pixelation * window.devicePixelRatio + 1
        },
    },
    mounted(){
        if (this.autoInitialize) this.initialize()
    },
    beforeUnmount(){
        this.scene.traverse( child => {
            if ( !child.isMesh ) return

            child.geometry.dispose()
        })

        for (const material of this.materials){
            material.dispose()
        }

        this.renderer.dispose()
    },
    methods: {
        setVisible(){
            this.isVisible = true
        },
        setHidden(){
            this.isVisible = false
        },
        initialize(){
            // Timed frames
            this.timedFrames = new TimedFrames(this.renderCascade.bind(this))

            // Observe for sensible resource use
            if (!this.setVisibilityManually){
                // Check if canvas in viewport
                onVisible([this.$refs.modelRef], {
                    onElemVisible: this.setVisible.bind(this),
                    onElemHidden: this.setHidden.bind(this),
                })
            }

            // Not using data on purpose (workaround for three js in vue)
            // Scene
            // const wrap = this.$refs.modelRef
            // const rect = wrap.getBoundingClientRect()
            const wrap = this.$refs.modelRef
            const gltfLoader = new GLTFLoader()

            const near = 0.001
            const far = 10
            
            // Correct aspect ratio is calculated in update size
            this.scene = new THREE.Scene()
            this.camera = new THREE.PerspectiveCamera( 
                this.focalLength, 
                1, 
                near, 
                far
            )

            this.renderer = new THREE.WebGLRenderer( { 
                // antialias: this.antialias,
                // devicePixelRatio: window.devicePixelRatio,
                alpha: true
            } )

            this.addPasses()

            // this.clearColor = new THREE.Color(this.backColor)
            // this.renderer.setClearColor(this.clearColor)
            this.renderer.setClearColor( 0x000000, 0 ); // the default

            wrap.appendChild( this.renderer.domElement )
            this.renderer.domElement.classList.add('three-js')

            // Model
            gltfLoader.load( this.modelPath, function ( gltf ) {
                this.gltf = gltf
                this.model = gltf.scene
                // this.model.translateY(-.17)
                // this.model.position.set(...this.startPositionModel)
                this.scene.add( this.model )

                this.updateMaterials()

                this.containInViewport()

                wrap.style.opacity = '1'

                this.lerpStart = this.model.position.clone()
                this.lerpEnd = this.model.position.clone()
                this.translation = new THREE.Vector3()
                this.startPositionModel = this.model.position.clone()

                this.model.rotation.set(
                    this.initialRotationRad.x * Math.PI,
                    this.initialRotationRad.y * Math.PI,
                    this.initialRotationRad.z * Math.PI,
                ) 

                this.addLights()

                this.camera.position.setZ(this.cameraDistance)

                this.requestNewFrame()
            }.bind(this), undefined, function ( error ) {
                console.error( error )
            } ); 

        },
        addPasses(){
            this.effectComposer = new EffectComposer(
                this.renderer
            )

            const renderPass = new RenderPass( this.scene, this.camera )
            this.effectComposer.addPass( renderPass )

            const filmPass = new FilmPass(.2, .5, 200, 0)
            this.effectComposer.addPass( filmPass )
        },
        containInViewport(){
            const boundingBox = new THREE.Box3().setFromObject(this.model)
            const size = new THREE.Vector3()
            this.boxSize = size
            const center = new THREE.Vector3()
            
            boundingBox.getSize(size)
            boundingBox.getCenter(center)
            this.modelCenter = center

            const scaleFactor = size.x

            this.model.scale.set(
                1 / scaleFactor,
                1 / scaleFactor,
                1 / scaleFactor
            )
            this.model.position.sub(center.divideScalar(scaleFactor))
            
        },
        updateMaterials(){
            let i = 0
            this.model.traverse((o) => {
                if (!o.isMesh) return

                o.material = this.materials[i % this.materials.length] 
                ++i
            })

        },
        resetPixelation(){
            this.pixelationT = 0
        },
        updatePixelation(dt){
            const delta = this.pixelationTarget - this.pixelationStart
            this.pixelationT = Math.min(1, this.pixelationT + this.pixelationSpeed * dt)

            this.pixelation = this.pixelationStart
                + this.easeOutCubic(this.pixelationT) * delta
        },
        addLights(){
            const light1 = new THREE.DirectionalLight( 0xffffff, .4, .05, .05 ) // soft white light
                light1.position.set(
                    1,
                    1,
                    1
                )

                const light2 = new THREE.DirectionalLight( 0xffffff, .4, .05, .05 ) // soft white light
                light2.position.set(
                    -1,
                    3,
                    1
                )

                const light3 = new THREE.DirectionalLight( 0xffffff, .4, .05, .05 ) // soft white light
                light3.position.set(
                    0,
                    .1,
                    1
                )

                const ambientLight = new THREE.AmbientLight( 0x888888 ) // soft white light
                ambientLight.position.set(
                    0,
                    10,
                    0
                )

                this.scene.add( light1 )
                this.scene.add( light2 )
                this.scene.add( light3 )
                this.scene.add( ambientLight )
        },
        easing(x){
            const f1 = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

            return f1
        },
        handleMovement(dt){
            // Move to target position
            this.t += this.moveSpeed * dt
            this.t = Math.min(1, this.t)
            this.translation = this.lerpStart.clone()
            this.translation.lerp(this.lerpEnd, this.easing(this.t))

            const target = this.startPositionModel.clone()
            target.add(this.translation)



            this.model.position.set(target.x, target.y, target.z)
        },
        handleResize(){
            // Handle resize
            const rect = this.rect
            this.camera.aspect = rect.width / rect.height;
            this.camera.updateProjectionMatrix();
            
            this.renderer.setSize( 
                rect.width * window.devicePixelRatio / this.pixelation_, 
                rect.height * window.devicePixelRatio / this.pixelation_
            )
        },
        modelIsInView(){
            // @TODO correctly calculate this
            if (!this.boxSize) return false

            const modelZ = Math.abs(this.model.position.z)
            const dist = 
                modelZ
                - this.boxSize.z / 2
                + this.cameraDistance
            
            const maxDistX = dist + this.boxSize.x
            if ( Math.abs(this.model.position.x) > maxDistX ) return false

            const maxDistY = dist + this.boxSize.y
            if ( Math.abs(this.model.position.y) > maxDistY ) return false

            return true
        },
        viewportDependantPosition(){
            // position depending on window size
            const x = this.model.position.x
            this.model.position.setX(
                (575 / this.rect.height * this.rect.width / 1440) * x,
            )
        },
        renderCascade(dt) {
            const wrap = this.$refs.modelRef
            if ( !wrap ) return

            // Make Bounding Client Rect available
            this.rect = wrap.getBoundingClientRect()
            if (this.debug) console.log('this.rect', this.rect)

            // Handle movement here, so the model can
            // return to the view and be rendered again
            this.handleMovement(dt)

            if ( this.isVisible ){
                this.handleResize()

                this.viewportDependantPosition()

                // Only render if model is in view
                if ( !this.modelIsInView() ) {
                    this.requestNewFrame()
                    return
                }

                // Rotate around itself
                if ( this.rotate ) this.model.rotation.y = 
                    (this.model.rotation.y + this.rotationSpeed * dt) % 360

                // "Pixelate" in
                this.updatePixelation(dt)

                // Distance to center
                const dtc = distanceToCenter(this.$refs.modelRef)
                const midDelta = dtc.fractionY

                // Rotate with scroll
                if ( this.rotateWithScroll ){
                    const effectStrength = this.rotationEffectStrength
                    const midDelta_ = midDelta * effectStrength
                    this.camera.position.setY(midDelta_)
                    this.camera.lookAt(0,0,0)
                }

                this.effectComposer.render()
            }

            // Keep rendering and/or checking for change
            this.requestNewFrame()
        },
        requestNewFrame(){
            this.timedFrames.requestFrame()
        },
        getCSSProp(elem, prop){
            const stylings = window.getComputedStyle(elem)
            const res = stylings.getPropertyValue(prop)

            return res
        },
        moveTo(x, y, z){
            if (!this.model) return

            this.lerpStart = this.translation.clone()
            this.lerpEnd = new THREE.Vector3(x, y, z)
            this.t = 0
        },
        easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3)
        },
        changeCanvasColor(color){
            this.clearColor.set(color)
        }
    },
    watch: {
        // color(val){
        //     console.log('color changed')
        //     // this.changeModelColor(val)
        // },
        // backColor(val){
        //     console.log('backcolor changed')
        //     // this.changeCanvasColor(val)
        // }
    }
}
</script>