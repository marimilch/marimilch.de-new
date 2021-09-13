<template>
    <div>
        <nav>
            <div>
                <h1>marimilch</h1>
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
                    @enter="enter" 
                    @leave="leave" 
                    :name="route.meta.transition"
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
import * as transitions from './assets/js/transitions'

export default {
    data() {
        return {
            navigationPoints: {
                home: {
                    to: '/',
                    label: 'Home',
                },
                projects: {
                    to: '/projects',
                    label: 'Projects',
                },
                thanks: {
                    to: '/aboutme',
                    label: 'About Me'
                },
            },
            contentHeight: 0,
        }
    },
    computed: {
        routeTransition(){
            return this.$route.meta.transition || 'Fade'
        },
    },
    methods: {
        getCurrentHeight(el){
            return el.getBoundingClientRect().height
        },
        getCurrentContentElement(){
            return document.querySelector('main div')
        },
        updateHeight(el) {
            this.contentHeight = this.getCurrentHeight(el)
        },
        contentLoadedAsync(){
            const el = this.getCurrentContentElement()
            this.enter(el)
        },
        enter(el, done){
            return transitions[this.routeTransition].enter.bind(this)(el, done)
        },
        leave(el, done){
            return transitions[this.routeTransition].leave.bind(this)(el, done)
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

    #app {
        overflow: hidden;
    }
</style>
