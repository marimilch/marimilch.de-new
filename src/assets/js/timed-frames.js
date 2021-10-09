export class TimedFrames {
    constructor(renderCallback){
        this.reset = true
        this.tPrev = undefined
        this.renderCallback = renderCallback
    }

    requestReset(){
        this.reset = true
    }

    requestFrame(){
        window.requestAnimationFrame(this._renderFrame.bind(this))
    }

    _renderFrame(t) {
        if (this.reset) {
            this.reset = false
            this.tPrev = t
        }

        const dt = (t - this.tPrev) / 1000 // in seconds
        // console.log('dt', dt)
        this.renderCallback(dt)

        this.tPrev = t
    }
}
