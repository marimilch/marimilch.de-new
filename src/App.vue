<template>
  <div>
    <LoadingBar ref="loadingBar"></LoadingBar>
    <nav>
        <div>
            <Logo></Logo>

            <!-- <div class="logo">
                <h1>marimilch</h1>
                <h2 class="sub">too poor for cereal</h2>
            </div> -->
            <div class="nav-buttons">
                <Button 
                    v-for="(value, key) in navigationPoints" 
                    v-bind:key="key"
                    :to="value.to"
                    :beforeTrigger="startLoading"
                    :afterTrigger="finishLoading"
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
        <p class="center footer-content">
            © marimilch. all rights reserved or something. i don't know, i'm just a footer, lol.
        </p>
    </footer>

    <div class="milkglass-background">
        <MilkGlass ref="milkglass"></MilkGlass>
    </div>
  </div>
</template>

<script>
import Button from './components/Button'
import Logo from './components/Logo'
import MilkGlass from '@/components/MilkGlass'
import LoadingBar from '@/components/LoadingBar'
import Wave from '@/components/Wave'
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
    startLoading(){
      if (this.$refs.loadingBar) this.$refs.loadingBar.startLoading()
    },
    finishLoading(){
      if (this.$refs.loadingBar) this.$refs.loadingBar.finishLoading()
    },
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
    async enter(el, done){
      return transitions[this.routeTransition].enter.bind(this)(el, done)
    },
    async leave(el, done){
      return transitions[this.routeTransition].leave.bind(this)(el, done)
    },
  },
  components: {
    Button,
    MilkGlass,
    Wave,
    LoadingBar,
    Logo,
  },
  watch: {
    contentHeight(val){
      this.$refs.main.style.height = val + 'px'
    }
  }
}
</script>

<style lang="scss">
body {
    font-family: Manrope, sans-serif;
    font-size: 22px;
    background: var(--canvas);
    color: var(--neutral);
}

h1 {
    margin: 0;
}

.nav-buttons > *{
    margin-left: 25px;
}

.sub {
    font-size: 11px;
    font-family: Manrope, sans-serif;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: center;
}

.milkglass-background {
    z-index: -2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width:100%;
    height: 100vh;
}

.waves-background {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
}
</style>
