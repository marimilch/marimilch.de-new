<template>
    <div class="fancy-paragraph">
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
    </div>
</template>

<script>
export default {
    props: {
        clipSrc: {
            type: String,
            required: true,
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.initObserver()
        })
    },
    methods: {
        initObserver(){
            const options = {
                rootMargin: '0px',
                threshold: .25
            }

            const observer = new IntersectionObserver((entries, observer) => {
                for (const entry of entries){
                    if (!entry.isIntersecting) {
                        entry.target.pause()
                        continue
                    }
                    
                    entry.target.play()
                }
            }, options)

            observer.observe(this.$refs.video)
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