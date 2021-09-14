<template>
    <div class="milkglass-wrap wh-full">
        <div ref="milkglass" class="milkglass wh-full" style="opacity:0">

        </div>
    </div>      
</template>

<style scoped>
    .wh-full {
        width: 100%;
        height: 100%;
    }
</style>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const FOCAL_LENGTH = 30
const CAMERA_DISTANCE = .03 * FOCAL_LENGTH

// function getBackgroundColor() {
//     const stylings = window.getComputedStyle(document.body)
//     const rgb = stylings.getPropertyValue('background-color')

//     return rgb
// }

export default {
    data(){
        return {
            startPositionModel: null,
            lerpStart: null,
            lerpEnd: null,
            t: 1,
            moveSpeed: 0.003,
        }
    },
    mounted(){
        // Not using data on purpose (workaround for three js in vue)
        // Scene
        const wrap = this.$refs.milkglass
        const rect = wrap.getBoundingClientRect()
        const gltfLoader = new GLTFLoader()
        
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( FOCAL_LENGTH, rect.width / rect.height, 0.1, 1000 )

        const backColor = this.getBackgroundColor()

        this.renderer = new THREE.WebGLRenderer( { antialias: true } )
        this.renderer.setSize( rect.width, rect.height )
        this.renderer.setClearColor(new THREE.Color(backColor))
        wrap.appendChild( this.renderer.domElement )

        // Materials
        const materials = [
            new THREE.MeshPhysicalMaterial({ 
                color: 0xdadadf,
                // specular: 0xffffff,
                transparent: true,
                opacity: .5,
                roughness: 0,
                reflectivity: 1,
                depthTest: true,
                // side: THREE.DoubleSide
            }),
            new THREE.MeshStandardMaterial({ 
                color: 0xee6a7c,
                roughness: .1,
            }),
            new THREE.MeshStandardMaterial({ 
                color: 0xfafaff
            })
        ]

        // Model
        gltfLoader.load( '/glb/glass_milk.glb', function ( gltf ) {
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

            this.model = gltf.scene
            this.model.translateY(-.17)
            this.scene.add( this.model )

            let i = 0
            this.model.traverse((o) => {
                if (o.isMesh) {
                    o.material = materials[ Math.min(i, 2) ]
                    ++i
                }
            })

            wrap.style.opacity = '1'

            this.lerpStart = this.model.position.clone()
            this.lerpEnd = this.model.position.clone()
            this.startPositionModel = this.model.position.clone()

            this.renderCascade()
        }.bind(this), undefined, function ( error ) {
            console.error( error )
        } ); 

        // const geometry = new THREE.BoxGeometry()
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        // this.cube = new THREE.Mesh( geometry, material )
        // this.scene.add( this.cube )

        this.camera.position.z = CAMERA_DISTANCE
    },
    methods: {
        renderCascade() {
            const wrap = this.$refs.milkglass
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

            this.renderer.setSize( rect.width, rect.height );

            // Rotate around itself
			this.model.rotation.y += 0.01

            // Rotate with scroll
            // const viewHeight = window.innerHeight
            // const viewMid = viewHeight / 2
            // const canvasRect = this.$refs.milkglass.getBoundingClientRect()
            // const canvasMid = canvasRect.top + canvasRect.height / 2

            // const midDelta = canvasMid - viewMid
            // const effectDampener = .15

            // this.model.rotation.x = midDelta / canvasRect.height
            //     * effectDampener * Math.PI
            // this.camera.rotation.x = -Math.atan(CAMERA_DISTANCE * midDelta * 10)
            // this.camera.position.y = midDelta

            // Keep rendering
            this.renderer.render( this.scene, this.camera )
            window.requestAnimationFrame(this.renderCascade.bind(this))
        },
        getBackgroundColor(){
            const stylings = window.getComputedStyle(document.body)
            const color = stylings.getPropertyValue('background-color')
            return color
        },
        moveTo(x, y, z){
            console.log('move to', x, y, z)
            this.t = 0
            this.lerpStart = this.model.position
            this.lerpEnd = new THREE.Vector3(x, y, z)
        },
    }
}
</script>