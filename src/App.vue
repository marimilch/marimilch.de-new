<template>
    <div>
        <nav>
            <div>
                <h1><router-link to="/">Marimilch</router-link></h1>
                <div class="nav-buttons">
                    <Button 
                        v-for="(value, key) in navigationPoints" 
                        v-bind:key="key"
                        :to="value.to"
                    >
                        {{ value.label }}
                    </Button>
                </div>
            </div>
        </nav>

        <main ref="main">
            <router-view v-slot="{ Component, route }">
                <transition 
                    name="fade" 
                    @leave="leave" 
                    @beforeEnter="beforeEnter"
                    @enter="enter"
                >
                    <component :is="Component" :key="route.path"/>
                </transition>
            </router-view>
        </main>

        <footer>
            <p class="heart air-bottom">
                ❤️
            </p>
            <p class="center">
                © marimilch. all rights reserved or something. i don't know, i'm just a footer, lol.
            </p>
        </footer>
    </div>
</template>

<script>
import Button from './components/Button'
import anime from 'animejs/lib/anime.es.js';

export default {
    data() {
        return {
            navigationPoints: {
                projects: {
                    to: '/projects',
                    label: 'Projects',
                },
                thanks: {
                    to: '/about',
                    label: 'About'
                },
            },
            contentHeight: 0
        }
    },
    methods: {
        getCurrentHeight(el){
            return el.getBoundingClientRect().height
        },
        getCurrentContentElement(){
            return document.querySelector('main div')
        },
        getMainImmediates(el){
            return el.children
        },
        beforeEnter(el){
            const targets = this.getMainImmediates(el)

            const videos = el.querySelectorAll('video')

            for (const t of targets){
                t.style.opacity = '0'
            }

            for (const v of videos){
                v.style.opacity = '0'
            }
        },
        contentLoadedAsync(){
            const el = this.getCurrentContentElement()
            this.enter(el)
        },
        updateHeight(el){
            this.contentHeight = this.getCurrentHeight(el)
        },
        enter(el, done){
            this.updateHeight(el)

            anime({
                targets: this.getMainImmediates(el),
                opacity: {
                    value: 1,
                    duration: 200,
                    easing: 'linear'
                },
                delay: anime.stagger(100),
                complete: done
            })

            anime({
                targets: el.querySelectorAll('.button'),
                translateY: [
                    {
                        value: '-50px',
                        duration: 300,
                        easing: 'easeInOutQuad'
                    },
                    {
                        value: 0,
                        duration: 1800,
                        easing: 'easeOutElastic(1, .33)'
                    },
                ],
                delay: anime.stagger(100),
            })

            anime({
                targets: el.querySelectorAll('video'),
                opacity: {
                    value: 1,
                    duration: 200,
                    easing: 'linear'
                },
                delay: anime.stagger(100, {start: 500}),
            })
        },
        leave(el, done){
            anime({
                targets: this.getMainImmediates(el),
                opacity: {
                    value: 0,
                    duration: 200,
                    easing: 'linear'
                },
                delay: anime.stagger(100),
                complete: done,
            })
        }
    },
    components: {
        Button
    },
    watch: {
        contentHeight(val){
            this.$refs.main.style.height = val + 'px'
        }
    }
}
</script>

<style lang="scss">
    @import 'assets/scss/style.css';
    @import 'assets/scss/style-tablet.css';
    @import 'assets/scss/style-phone.css';
    // @import 'assets/scss/style-dark.css';
</style>
