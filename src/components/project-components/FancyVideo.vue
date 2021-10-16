<template>
    <video 
        loop
        muted
        preload="metadata"
        playinline
        ref="video"
    >
        <source 
            :src="`/clips/${clipSrc}.webm#t=.1`" 
            type="video/mp4"
        >
        <source 
            :src="`/clips/${clipSrc}.mp4#t=.1`" 
            type="video/webm"
        >
    </video>
</template>

<script>
import {onVisible} from '@/assets/js/on-visible.js'

export default {
    props: {
        clipSrc: {
            type: String,
            required: true,
        }
    },
    mounted(){
        this.$nextTick(function(){
            onVisible([this.$refs.video], {
                onElemVisible: el => {el.play()},
                onElemHidden: el => {el.pause()},
                options: {
                    threshold: .25
                }
            })
        })
    },
    methods: {
        initObserver(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
video {
    width: 100%;
    height: 100vh;
    position: sticky;
    top: 0;
    opacity: .9;
    object-fit: cover;
}
</style>