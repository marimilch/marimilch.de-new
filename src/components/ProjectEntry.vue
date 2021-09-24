<template>
    <div :id="project.slug" class="project-wrap w-full" ref="projectWrapElem">
        <router-link 
            :to="{ path: `/projects/${project.slug}`}" 
            append 
            class="no-underline inline-block project-link"
            @mouseenter="projectMouseEnter"
            @mouseleave="projectMouseLeave"
        >
            <article class="project w-full" ref="projectElem">
                <div class="project-thumb">
                    <video 
                        loop
                        muted
                        v-if="project.clips"
                        preload="metadata"
                    >
                        <source 
                            :src="`/clips/${project.slug}/entry.mp4#t=.1`" 
                            type="video/mp4"
                        >
                        <source 
                            :src="`/clips/${project.slug}/entry.webm#t=.1`" 
                            type="video/webm"
                        >
                    </video>
                </div>
                
                <div class="project-description">
                    <h3 class="project-title">
                        <!-- <a class="hook-link" :href="'#' + project.slug">#</a> -->
                        <span>
                            {{ project.name }}
                        </span>
                    </h3>
                    <p>
                        {{ project.teaser }}
                    </p>
                </div>
            </article>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        project: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            staggerWidth: 15, // dont forget to change scss as well
            staggerHeight: 15
        }
    },
    methods: {
        projectMouseEnter(ev){
            const elem = ev.target.closest('.project-wrap')
            const video = elem.querySelector('.project-thumb video')

            video.classList.add('playing')
            video.play();
        },
        projectMouseLeave(ev){
            const elem = ev.target.closest('.project-wrap')
            const video = elem.querySelector('.project-thumb video')

            video.classList.remove('playing')
            video.pause()
        },
    }
}
</script>

<style lang="scss" scoped>
$projectWidth: 450px;

.project-thumb {
    opacity: .5;
    filter: grayscale(1);
    transition: filter var(--timing) ease,
                transform var(--timing) ease,
                opacity var(--timing) ease;
    transform-origin: top left;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        image-rendering: optimizeSpeed;             /* Older versions of FF          */
        image-rendering: -moz-crisp-edges;          /* FF 6.0+                       */
        image-rendering: -webkit-optimize-contrast; /* Safari                        */
        image-rendering: -o-crisp-edges;            /* OS X & Windows Opera (12.02+) */
        image-rendering: pixelated;                 /* Awesome future-browsers       */
        -ms-interpolation-mode: nearest-neighbor;   /* IE                            */
    }
}

a {
    position: absolute;
    pointer-events: all;

    &:hover {
        .project-thumb {
            filter: none;
            opacity: 1;
            box-shadow: var(--pink) 0 0 10px;
        }
    }
}

.w-full {
    width: 100%;
}
.no-underline {
    &:link,
    &:visited,
    &:hover,
    &:active {
        text-decoration: none;
    }
}
.project-wrap {
    width: 100%;
    display: flex;
    height: 400px;
    overflow: visible;
    pointer-events: none;


    &:nth-of-type(2n - 1) {
        justify-content: flex-end;
    }
}
.inline-block {
    display: inline-block;
}
.project-title {
    padding-top: 10px;
    font-size: 80px;
}
.project {
    display: flex;
    flex-direction: column;
    width: $projectWidth;

    border-radius: 25px;
    transition: box-shadow var(--timing) ease-in-out;

    .project-description {
        margin: 1rem 2rem;
        transform-origin: left;

        h3 {
            text-align: left;
            margin: 0;
            font-size: 40px;
        }

        .button {
            margin-left: 0;
            margin-bottom: 0;
        }

        p {
            text-decoration: none;
            color: var(--brown);
            margin: 10px 0 0;
        }
    }

    .project-thumb {
        transform-origin: right;
        border-radius: 9999px;
        height: $projectWidth;
        width: $projectWidth;
        overflow: hidden;
        position: relative;
    }
}
</style>
