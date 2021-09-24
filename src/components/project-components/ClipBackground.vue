<template>

<div class="project-video">
    <video loop autoplay playinline muted>
        <source :src="`${movieSlug}.webm`" type="video/webm">
        <source :src="`${movieSlug}.mp4`" type="video/mp4">
    </video>
</div> 

</template>

<script>
export default {
    props: {
        src: {
            type: String,
            required: true
        }
    },
    computed: {
        movieSlug(){
            return this.src
        }
    }
}
</script>

<style lang="scss" scoped>
    // .project-video::before {
    //     z-index: 2;
    //     // content: ' ';
    //     width: 100%;
    //     height: 100%;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     background: var(--canvas);
    //     mix-blend-mode: multiply;
    // }

    .project-video {
        position: absolute;
        top: 0;
        z-index: -1;

        width: 100%;
        max-width:100%;
        height: 100vh;
    }

    video {
        object-fit: cover;
        width: 100%;
        height: 100%;
        opacity: .25;

        filter: grayscale(1);

        image-rendering: optimizeSpeed;             /* Older versions of FF          */
        image-rendering: -moz-crisp-edges;          /* FF 6.0+                       */
        image-rendering: -webkit-optimize-contrast; /* Safari                        */
        image-rendering: -o-crisp-edges;            /* OS X & Windows Opera (12.02+) */
        image-rendering: pixelated;                 /* Awesome future-browsers       */
        -ms-interpolation-mode: nearest-neighbor;   /* IE                            */
    }
</style>