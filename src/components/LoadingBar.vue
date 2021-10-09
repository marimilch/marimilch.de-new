<template>
    <div class="wrap">
        <div class="bar" :style="`opacity: ${opacity}; width: ${percentage}%`"></div>
    </div>
</template>

<script>
import {TimedFrames} from '@/assets/js/timed-frames.js'

export default {
    data() { 
        return {
            loadingSpeed: 10,
            finishSpeed: 150,
            finish: true,
            percentage: 0,
            opacity: 0,
        }
    },
    mounted(){
        this.timedFrames = new TimedFrames(this.renderCascade.bind(this))
    },
    methods: {
        startLoading(){
            this.finish = false
            this.percentage = 0
            this.opacity = 1

            this.timedFrames.requestReset()
            this.timedFrames.requestFrame()
        },
        finishLoading(){
            this.finish = true
        },
        renderCascade(dt){
            if (this.finish){
                this.percentage += dt * this.finishSpeed
                this.percentage = Math.min(this.percentage, 100)
            } else {
                this.percentage += dt * this.loadingSpeed
                this.percentage = Math.min(this.percentage, 75)
            }

            if (this.percentage < 100) {
                this.timedFrames.requestFrame()
                return
            }
            this.opacity = 0
        }
    }
}
</script>

<style scoped lang="scss">
.wrap {
    position: absolute;
    height: 5px;
    width: 100%;
}
.bar {
    height: 100%;
    width: 100%;
    transition: opacity .5s ease;
    background: var(--primary);

    @media (prefers-color-scheme: dark) {
        background: var(--dark-pink);
    }
}
</style>