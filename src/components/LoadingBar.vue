<template>
    <div class="loading-bar wrap" :style="`opacity: ${opacity};`">
        <div 
            class="bar background-rainbow" 
            :style="`width: ${percentage}%`"
        ></div>
        <div class="star" :style="`filter: blur(${blurStar}px);`"></div>
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
            blurStar: 0,
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
            // this.blurStar = 0

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
            // this.blurStar = 20
        }
    }
}
</script>

<style scoped lang="scss">
.wrap {
    position: absolute;
    height: 5px;
    width: 100%;
    z-index: 200;
    display: flex;
    align-items: center;
    align-content: center;
    transition: opacity .5s ease;
}

.star {
    background: white;
    border-radius: 99px;
    width: 7px;
    height: 7px;
    box-shadow: 
        white 0 0 3px 1px,
        var(--dark-magenta) 0 0 3px 1px,
        white 0 0 5px 5px,
        var(--magenta) 0 0 10px 10px,
        var(--cyan) 0 0 20px 20px,
        white 0 0 60px 20px
    ;
    // transition: filter 1s ease;
    animation: .125s FlangerAnimation cubic-bezier(.65,.05,.36,1) infinite alternate;
}

.bar {
    height: 100%;
    width: 100%;
    animation: 2s RainbowAnimation linear infinite;
}
</style>