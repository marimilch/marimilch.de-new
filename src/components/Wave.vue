<template>
    <div id="wave-mask" ref="twoContainer" class="two-container">

    </div>
</template>

<style scoped>
.two-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
</style>

<script>
import Two from 'two.js'

export default {
    data() {
        return {
            resolution: 50,
            t: 0,
            tStep: 50,
            maxHeight: 125,
            sustain: 200,
            decay: 4800,
            waveLength: 100,
        }
    },
    mounted(){
        const rect = this.$refs.twoContainer.getBoundingClientRect()
        this.two = new Two({
            width: rect.width,
            height: rect.height,
        }).appendTo(this.$refs.twoContainer)

        this.wavePath = this.two.makePath(false)
        this.wavePath.clip = true
        // this.wavePath.stroke = 'transparent'
        // this.wavePath.fill = '#ee6a7c'
        // this.wavePath.linewidth = 0

        // const maybeClipPath = this.$refs.twoContainer.querySelector('clipPath')
        // if (maybeClipPath){
        //     maybeClipPath.id = 'wave-mask-clip-path'
        // }

        this.two.bind('update', this.renderFrame.bind(this))

        window.addEventListener('resize', this.onResize.bind(this));
    },
    methods: {
        onResize(){
            this.two.update()
        },
        wave(t, {
            sustain = 0,
            decay = 1,
            maxHeight = 1,
            waveLength = 1
        }){
            if (t < 0) return 0
            const wavePos = this.linearThanFlatten(t, {flattenAt: sustain, decay: decay})
            const waveHeightFraction = t < sustain ? 1 : Math.max(-Math.pow(t - sustain, 2) / decay / decay + 1, 0)

            return Math.sin(wavePos/waveLength) * maxHeight * waveHeightFraction
        },
        linearThanFlatten(t, {
            flattenAt = 1,
            decay = 1
        }){
            if (t < flattenAt) return t

            const t_ = Math.min(t - flattenAt, decay)
            const decay2 = decay * 2
            const curveVal = (decay2 - t_)/decay2 * t_

            return flattenAt + curveVal
        },
        play(){
            this.t = 0
            this.two.play()
        },
        pointArray(){
            const len = this.resolution + 1
            const arr = new Array(this.resolution + 3)
            const vw = this.getVW()
            const vh = this.getVH()
            const step = vw / this.resolution

            const pouringCenter = vw / 3
            const fillTarget = vh + 2 * this.maxHeight

            for (let i = 0; i < len; ++i){
                const t = i * step - pouringCenter
                const t_ = Math.abs(t)
                arr[i] = new Two.Anchor(t + pouringCenter, this.wave(-t_ + this.t, {
                    maxHeight: this.maxHeight,
                    sustain: this.sustain,
                    decay: this.decay,
                    waveLength: this.waveLength,
                }) + fillTarget - this.easing() * fillTarget)
            }

            arr[len] = new Two.Anchor(vw, vh)
            arr[len+1] = new Two.Anchor(0, vh)

            return arr
        },
        easing(){
            // From 0 to 1
            const duration = this.sustain + this.decay/2
            const linear = Math.min(this.t, duration)/duration

            return -Math.pow(linear - 1, 2) + 1
        },
        getVW(){
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        },
        getVH(){
            return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        },
        renderFrame(){
            this.wavePath.vertices = this.pointArray()

            this.t += this.tStep

            if (this.t >= this.decay + this.sustain + this.resolution * 60) this.two.pause()
        }
    }
}
</script>