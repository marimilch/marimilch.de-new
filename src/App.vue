<template>
    <div>
        <nav>
            <div>
                <h1><router-link to="/">marimilch</router-link></h1>
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
                    to: '/aboutme',
                    label: 'About Me'
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
            const targets = this.toAnimate(el)

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
        toAnimate(el){
            const children = el.children
            const targets = []

            for (const child of children){
                if (child.tagName == 'ARTICLE' || child.tagName == 'UL') {
                    const articleChildren = child.children
                    for (const articleChild of articleChildren){
                        if (articleChild.classList.contains('videos')){
                            const videos = articleChild.querySelectorAll('video')
                            for (const child of videos){
                                targets.push(child)
                            }
                            continue
                        }
                        targets.push(articleChild)
                    }
                    continue
                }
                targets.push(child)
            }

            return targets
        },
        enter(el, done){
            this.updateHeight(el)

            anime({
                targets: this.toAnimate(el),
                opacity: {
                    value: 1,
                    duration: 200,
                    easing: 'linear'
                },
                scale: [
                    {
                        value: 1.1,
                        duration: 300,
                        easing: 'easeInOutQuad'
                    },
                    {
                        value: 1,
                        duration: 1800,
                        easing: 'easeOutElastic(1, .33)'
                    }
                ],
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
    @import 'assets/scss/style.scss';
    @import 'assets/scss/style-tablet.scss';
    @import 'assets/scss/style-phone.scss';
    // @import 'assets/scss/style-dark.css';
</style>
