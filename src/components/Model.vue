<template>
    <div class="model-wrap">
        <div ref="modelRef" class="model wh-full">

        </div>
    </div>      
</template>

<style scoped>
    .model-wrap {
        width: 100%;
        height: 100%;
    }

    .model {
        width: 100%;
        height: 100%;
    }

    .three-js {
        width: 100% !important;
        height: 100% !important;

        image-rendering: optimizeSpeed;             /* Older versions of FF          */
        image-rendering: -moz-crisp-edges;          /* FF 6.0+                       */
        image-rendering: -webkit-optimize-contrast; /* Safari                        */
        image-rendering: -o-crisp-edges;            /* OS X & Windows Opera (12.02+) */
        image-rendering: pixelated;                 /* Awesome future-browsers       */
        -ms-interpolation-mode: nearest-neighbor;   /* IE                            */
    }
</style>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// function getBackgroundColor() {
//     const stylings = window.getComputedStyle(document.body)
//     const rgb = stylings.getPropertyValue('background-color')

//     return rgb
// }

export default {
    props: {
        startPositionModel: {
            default: [0,0,0],
        },
        rotateWithScroll: {
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
    },
    data(){
        return {
            lerpStart: null,
            lerpEnd: null,
            t: 1,
            moveSpeed: 0.003,
            pixelation: 1,
            antialias: true,
            pixelationT: 0,
            pixelationSpeed: .02,
            pixelationTarget: 1,
            pixelationStart: 100,
            defaultColor: '#000000',
            defaultBackColor: '#000000',
            color: '#000000',
            backColor: '#000000',
            distanceFractionOrigin: .11,
            materials: [
                new THREE.MeshStandardMaterial({ 
                    color: 0xee6a7c,
                    roughness: 0,
                }),
            ]
        }
    },
    computed: {
        cameraDistance(){
            return (this.distanceFractionOrigin + this.distance) * this.focalLength
        },
    },
    mounted(){
        if (this.autoInitialize) this.initialize()
    },
    methods: {
        initialize(){
            // Not using data on purpose (workaround for three js in vue)
            // Scene
            const wrap = this.$refs.modelRef
            const rect = wrap.getBoundingClientRect()
            const gltfLoader = new GLTFLoader()
            
            this.scene = new THREE.Scene()
            this.camera = new THREE.PerspectiveCamera( 
                this.focalLength, 
                rect.width / rect.height, 
                0.001, 
                10
            )

            this.renderer = new THREE.WebGLRenderer( { antialias: this.antialias } )
            this.updateSize(rect)

            this.clearColor = new THREE.Color(this.backColor)
            this.renderer.setClearColor(this.clearColor)

            wrap.appendChild( this.renderer.domElement )
            this.renderer.domElement.classList.add('three-js')

            // Model
            gltfLoader.load( this.modelPath, function ( gltf ) {
                this.model = gltf.scene
                // this.model.translateY(-.17)
                // this.model.position.set(...this.startPositionModel)
                this.scene.add( this.model )

                this.material = new THREE.MeshStandardMaterial({ 
                    color: this.color,
                    roughness: 0,
                })

                this.updateMaterials()

                this.containInViewport()

                wrap.style.opacity = '1'

                this.lerpStart = this.model.position.clone()
                this.lerpEnd = this.model.position.clone()

                this.model.rotation.set(
                    this.initialRotationRad.x * Math.PI,
                    this.initialRotationRad.y * Math.PI,
                    this.initialRotationRad.z * Math.PI,
                ) 

                this.addLights()

                this.camera.position.setZ(this.cameraDistance)

                this.renderCascade()
            }.bind(this), undefined, function ( error ) {
                console.error( error )
            } ); 

        },
        containInViewport(){
            const wrap = this.$refs.modelRef
            const boundingBox = new THREE.Box3().setFromObject(this.model)
            const size = new THREE.Vector3()
            const center = new THREE.Vector3()
            
            boundingBox.getSize(size)
            boundingBox.getCenter(center)

            const scaleFactor = size.x

            this.model.scale.set(
                1 / scaleFactor,
                1 / scaleFactor,
                1 / scaleFactor
            )
            this.model.position.sub(center.divideScalar(scaleFactor))
            
        },
        updateMaterials(){
            // const materialsInit = this.materialsInit

            // prevents reactivity (maybe add later)
            // this.materials = []

            // for (const matDesc of materialsInit){
            //     this.materials.push(
            //         new THREE[matDesc.name](matDesc.attributes)
            //     )
            // }

            let i = 0
            this.model.traverse((o) => {
                if (!o.isMesh) return

                o.material = this.materials[i % this.materials.length] 
                ++i
            })

        },
        updateSize(rect){
            this.renderer.setSize( 
                rect.width / this.pixelation, 
                rect.height / this.pixelation
            )
        },
        resetPixelation(){
            this.pixelationT = 0
        },
        updatePixelation(){
            const delta = this.pixelationTarget - this.pixelationStart
            this.pixelationT = Math.min(1, this.pixelationT + this.pixelationSpeed)

            this.pixelation = this.pixelationStart + this.pixelationT * delta
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
        renderCascade() {
            const wrap = this.$refs.modelRef
            if (!wrap) return

            // Move to target position
            if (this.t < 1){
                this.t += this.moveSpeed
                this.lerpStart.lerp(this.lerpEnd, this.t)
            }

            // Handle resize
            const rect = wrap.getBoundingClientRect()
            this.camera.aspect = rect.width / rect.height;
            this.camera.updateProjectionMatrix();
            
            this.updateSize(rect)
            
            // Rotate around itself
			if (this.rotate) this.model.rotation.y = (this.model.rotation.y + 0.01) % 360

            // Increase transform T
            this.updatePixelation()

            // Rotate with scroll
            if (this.rotateWithScroll){
                const viewHeight = window.innerHeight
                const viewMid = viewHeight / 2
                const canvasRect = this.$refs.modelRef.getBoundingClientRect()
                const canvasMid = canvasRect.top + canvasRect.height / 2

                const effectStrength = this.rotationEffectStrength
                const midDelta = 2 * (canvasMid - viewMid)/canvasRect.height
                const midDelta_ = midDelta * effectStrength

                // this.model.rotation.x = midDelta / canvasRect.height
                //     * effectDampener * Math.PI
                // this.camera.rotation.x = angle

                this.camera.position.setY(midDelta_)
                this.camera.lookAt(0,0,0)
            }

            // Keep rendering
            this.renderer.render( this.scene, this.camera )
            window.requestAnimationFrame(this.renderCascade.bind(this))
        },
        getCSSProp(elem, prop){
            const stylings = window.getComputedStyle(elem)
            const res = stylings.getPropertyValue(prop)

            return res
        },
        moveTo(x, y, z){
            this.t = 0
            this.lerpStart = this.model.position
            this.lerpEnd = new THREE.Vector3(x, y, z)
        },
        easeInOutCubic(x){
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        },
        changeModelColor(color){
            this.material.color.setColor(color)
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