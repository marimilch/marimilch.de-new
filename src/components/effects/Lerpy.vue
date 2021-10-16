<template>
    <div :class="whFull ? 'wh-full' : ''" ref="target">
        <div 
            :class="whFull ? 'wh-full' : ''" 
            ref="content" 
            :style="`transform: translateY(${dy}px);`"
        >
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
.wh-full {
    width: 100%;
    height: 100%;
}
</style>

<script>
import { onVisible } from '@/assets/js/on-visible.js'
import { TimedFrames } from '@/assets/js/timed-frames.js'

export default {
    props: {
        lerpSpeedInit: {
            default: 4.5,
            type: Number
        },
        scrollWithStrength: {
            default: .2,
            type: Number
        },
        deltaMax: {
            default: 400,
            type: Number
        },
        whFull: {
            default: false,
            type: Boolean
        }
    },
    computed: {
        tenPow(){
            return Math.pow(10, this.prec)
        },
        tenNegPow(){
            return Math.pow(10, -this.prec)
        }
    },
    data(){
        return {
            dy: 0,
            lastScrollPosition: 0,
            scrollTarget: null,
            timedFrames: null,
            lerpSpeed: 0,
            minDelta: 2,
            prec: 2,
            enabled: false
        }
    },
    mounted(){
        if (this.scrollWithStrength === 0) return
        this.enabled = true

        this.scrollTarget = document.querySelector('html')
        this.lerpSpeed = Math.max(0, this.lerpSpeedInit)

        this.$nextTick(function(){
            this.timedFrames = new TimedFrames(this.renderCascade.bind(this))
            this.timedFrames.requestFrame()
        })

        onVisible([this.$refs.content], {
            onElemVisible: this.setVisible.bind(this),
            onElemHidden: this.setHidden.bind(this),
        })
    },
    methods: {
        setVisible(){
            this.enabled = true
        },
        setHidden(){
            this.enabled = false
        },
        precision(x){
            const x_ = Math.round( x * this.tenPow ) / this.tenPow

            return x_
        },
        renderCascade(dt){
            if (!this.enabled){
                this.timedFrames.requestFrame()
                return
            }

            const currentScrollTop = this.scrollTarget.scrollTop
            const scrollDelta = currentScrollTop - this.lastScrollPosition
            let dy_ = this.dy

            dy_ += scrollDelta * this.scrollWithStrength
            dy_  = Math.sign(dy_) * Math.min(Math.abs(dy_), this.deltaMax)

            const dy_0 = dy_
            dy_ = dy_ / (1 + this.lerpSpeed * dt)
            dy_ = this.precision(dy_)

            if ( Math.abs(dy_) < this.tenNegPow){
                dy_ = 0
            }

            this.dy = dy_


            // console.log('this.dy', this.dy)

            this.lastScrollPosition = currentScrollTop

            this.timedFrames.requestFrame()
        }
    }
}
</script>