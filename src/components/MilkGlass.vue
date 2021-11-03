<template>
    <div class="milkglass-wrap">
        <Model 
            modelPath="/glb/glass_milk.glb" 
            :initialRotationRad="{x:.05, y:0, z:0}"
            :distance="0"
            :autoInitialize="false"
            :addPointPass="false"
            :pixelationTarget="7"
            ref="model"
        ></Model>
    </div>      
</template>

<style>
    .milkglass-wrap {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        overflow-x: hidden;
    }
</style>

<script>
import * as THREE from 'three'
import Model from '@/components/Model'

export default {
    components: {
        Model
    },
    mounted(){
        this.$nextTick( function() {
                    // Materials
            const materials = [
                new THREE.MeshPhysicalMaterial({ 
                    color: 0x64D9EB,
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

            this.$refs.model.materials = materials
            this.$refs.model.initialize()
        })
    },
    methods: {
        moveTo(x, y, z){
            this.$refs.model.moveTo(x,y,z)
        },
    }
}
</script>