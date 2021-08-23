<template>
    <div>
        <h2>Projects</h2>
        <Project 
            :project="project" 
            v-for="(project, key) in projects"
            v-bind:key="key"
        ></Project>
    </div>
</template>

<script>
import Project from '@/components/Project'
import projectsJson from '@/assets/json/projects.json'
import anime from 'animejs/lib/anime.es.js';

export default {
    data() {
        return {
            projects: projectsJson,
            observer: null
        }
    },
    beforeUnmount() {
        this.observer.disconnect();
    },
    animateScrolls() {
        
    },
    mounted(){
        anime({
            targets: '.scroll-vids',
            letterSpacing: '3px',
            loop: true,
            durataion: 500,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });

        const options = {
            rootMargin: '0px',
            threshold: .6
        }

        const vids = document.querySelectorAll('video')

        this.observer = new IntersectionObserver(
            this.observeCallback.bind(this), 
            options
        );

        for (const vid of vids){
            this.observer.observe(vid)
        }
    },
    methods: {
        observeCallback(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting){
                    entry.target.play()
                    return
                }

                entry.target.pause()
            })
        }
    },
    components: {
        Project
    }
}
</script>