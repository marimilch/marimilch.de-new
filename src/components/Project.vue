<template>
    <div :id="project.slug" class="project-wrap w-full" ref="projectWrapElem" @mouseenter="projectMouseEnter" @mouseleave="projectMouseLeave">
        <router-link :to="{ path: `/project/${project.slug}`}" append class="no-underline inline-block project-link">
            <article class="project w-full" ref="projectElem">
                <div class="project-thumb">
                    <div class="overlay">
                        <div v-for="i in staggerWidth * staggerHeight" v-bind:key="i" class="pixel"></div>
                    </div>

                    <div class="entry-to-details"></div>

                    <video 
                        loop
                        muted
                        v-if="project.clips"
                        preload="metadata"
                    >
                        <source 
                            :src="`/clips/${project.slug}/${project.clips[0].url}.mp4#t=.1`" 
                            type="video/mp4"
                        >
                        <source 
                            :src="`/clips/${project.slug}/${project.clips[0].url}.webm#t=.1`" 
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
import anime from 'animejs/lib/anime.es.js';

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
            anime({
                targets: elem.querySelectorAll('.project-thumb .overlay .pixel'),
                width: [
                    {value: '100%', easing: 'easeOutCubic', duration: 0},
                    {value: '0%', easing: 'easeOutCubic', duration: 250}
                ],
                height: [
                    {value: '100%', easing: 'easeOutCubic', duration: 0},
                    {value: '0%', easing: 'easeOutCubic', duration: 250}
                ],
                marginTop: [
                    {value: '50%', easing: 'easeOutCubic', duration: 250}
                ],
                marginLeft: [
                    {value: '50%', easing: 'easeOutCubic', duration: 250}
                ],
                borderRadius: [
                    {value: 50, easing: 'easeOutCubic', duration: 250}
                ],
                delay: anime.stagger(25, {
                    grid: [this.staggerWidth, this.staggerHeight],
                    from: 'center'
                })
            })

            const video = elem.querySelector('.project-thumb video')

            video.classList.add('playing')
            video.play();
        },
        projectMouseLeave(ev){
            const elem = ev.target.closest('.project-wrap')

            anime({
                targets: elem.querySelectorAll('.project-thumb .overlay .pixel'),
                width: [
                    {value: '100%', easing: 'easeOutCubic', duration: 250}
                ],
                height: [
                    {value: '100%', easing: 'easeOutCubic', duration: 250}
                ],
                marginTop: [
                    {value: '0', easing: 'easeOutCubic', duration: 250}
                ],
                marginLeft: [
                    {value: '0', easing: 'easeOutCubic', duration: 250}
                ],
                borderRadius: [
                    {value: 0, easing: 'easeOutCubic', duration: 250}
                ],
                delay: anime.stagger(25, {
                    grid: [this.staggerWidth, this.staggerHeight]
                    ,
                    from: 'center'
                })
            })

            const video = elem.querySelector('.project-thumb video')

            video.classList.remove('playing')
            video.pause();
        },
        projectDetailsEnter(ev){
            const wrap = ev.target.closest('.project-wrap')
            const enterElem = wrap.querySelector('.entry-to-details')
            const video = enterElem.querySelector('video')
            const overlay = enterElem.querySelector('.overlay')

            anime({
                target: [overlay, video],
                opacity: 0,
                easing: 'easeOutCubic', 
                duration: 250,
                complete: () => {
                    overlay.style.display = 'none'
                    video.style.display = 'none'
                }
            })


        }
    }
}
</script>

<style lang="scss" scoped>
$projectWidth: 450px;

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
    // margin: 160px 0;
    width: 100%;
    display: flex;
    height: 400px;
    overflow: visible;

    &:nth-child(2n) {
        justify-content: flex-end;

        // .project-thumb {
        //     transform-origin: left;
        // }

        // .project-description {
        //     transform-origin: right;
        //     text-align: right;
        // }

        // .project-title span {
        //     text-align: right;
        // }
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
        line-height: 1.5;

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
        background: black;
        overflow: hidden;
        position: relative;

        .overlay {
            position: absolute;
            mix-blend-mode: multiply;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            overflow: hidden;
            display: grid;
            grid-template-columns: repeat(15, auto);

            .pixel {
                background: var(--pink);
                width: 100%;
                height: 100%;
            }
        }

        .entry-to-details {
            background: var(--dark-pink);
            width: 100%;
            height: 100%;
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
        }

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: filter var(--timing) ease-in-out;

            &:not(.playing){
                filter: contrast(1.5) grayscale(.5);
            }
        }
    }
}
</style>
