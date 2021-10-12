<template>
    <div class="about-wrap">
        <div class="about fade-wrap">
            <h2 class="style2">About Me</h2>
            <p class="style2">I'm a graduate in computer science and I really enjoy programming and anything involving creativity.</p>
            <p class="style2"><RainbowText class="cursive">marimilch</RainbowText> is a reference to the german version of the book <em>A Shadow Like A Leopard</em> by Myron Levoy.</p>

            <div class="style2">
                <h3>I would like to thank</h3>

                <span>My mother, </span>
                <span>my father, </span>
                <span>Arkady, </span>
                <span>Sev, </span>
                <span>Felix, </span>
                <span>Marko, </span>
                <span>Renyo, </span>
                <span>Cedric, </span>
                <span>Batiste, </span>
                <span>Yamina</span>
            </div>

            <div class="style2">
                <h3>Tools used</h3>

                <span>Vue.js 3, </span>
                <span>Feather Icons, </span>
                <span>anime.js, </span>
                <span>highlight.js, </span>
                <span>Normalize.css, </span>
                <span>Three.js, </span>
                <span>Two.js</span>
            </div>

            <div class="overflow-chamber style2">
                <div class="background-zoom-wrap">
                    <div class="background-zoom"></div>
                </div>
            </div>

            <p class="project-links">
                <!-- <Button :alt="true" to="//instagram.com/marimilch93" :external="true">Instagram</Button> -->
                <!-- <button href="//twitter.com/marimilch93">Twitter</button> -->
                <Button :alt="true" to="//github.com/marimilch" :external="true">GitHub</Button>
                <Button to="//www.linkedin.com/in/marimilch" :external="true">LinkedIn</Button>
                <!-- <button href="//dank-games.com">Dank-Games</button> -->
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .about-wrap {
        position: relative;
        padding: 15px var(--content-padding-x);
        height: var(--content-height);
        display: flex;
        align-content: center;
        align-items: center;
    }
    p, span, h2, h3 {
        color: var(--neutral);
    }
    .overflow-chamber {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
    .background-zoom-wrap {
        width: 100%;
        height: 100vh;
        overflow: visible;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
    }
    .background-zoom {
        width: calc( 1 * max( 100vw, 100vh ) );
        height: calc( 1 * max( 100vw, 100vh ) );
        max-width: 100%;
        transform: translate(-50%, 0);
        background: var(--canvas);
        transform-origin: center;
        border-radius: 99999px;
    }
    .project-links {
        margin-top: 50px;
    }
    .project-links > * {
        margin-right: 25px;
    }
    .about {
        width: 40%;

        h2 {
            font-size: 120px;
        }
    }
    span {
        display: inline-block;
        margin-right: 7px;
    }
</style>

<script>
import Button from '@/components/Button'
import RainbowText from '@/components/effects/RainbowText'

export default {
    components: {
        Button,
        RainbowText,
    }
}
</script>