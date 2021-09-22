<template>
    <div class="default-padding about-wrap">
        <div class="about fade-wrap">
            <h2>About Me</h2>
            <p>I'm a graduate in computer science and I really enjoy programming and anything involving creativity.</p>
            <p><span class="cursive">marimilch</span> is a reference to the german version of the book <em>A Shadow Like A Leopard</em> by Myron Levoy.</p>

            <p class="project-links mb-5">
                <!-- <Button :alt="true" to="//instagram.com/marimilch93" :external="true">Instagram</Button> -->
                <!-- <button href="//twitter.com/marimilch93">Twitter</button> -->
                <Button :alt="true" to="//github.com/marimilch" :external="true">GitHub</Button>
                <!-- <Button to="//www.linkedin.com/in/marimilch" :external="true">LinkedIn</Button> -->
                <!-- <button href="//dank-games.com">Dank-Games</button> -->
            </p>

            <div>
                <h3>I would like to thank</h3>

                <span>My mother, </span>
                <span>my father, </span>
                <span>Arkady, </span>
                <span>Felix, </span>
                <span>Renyo, </span>
                <span>Marko, </span>
                <span>Batiste, </span>
                <span>Cedric, </span>
                <span>Sev, </span>
                <span>Yamina</span>
            </div>

            <div class="background-zoom-wrap">
                <div class="background-zoom"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .about-wrap {
        position: relative;
    }
    .cursive, p, span, h2, h3 {
        color: var(--canvas);
    }
    .background-zoom-wrap {
        transform-origin: top left;
        position: absolute;
        top: 50%;
        left: 0;
        z-index: -1;
    }
    .background-zoom {
        width: calc( 1 * max( 100vw, 100vh ) );
        height: calc( 1 * max( 100vw, 100vh ) );
        transform: translate(-50%, -50%);
        background: var(--dark-pink);
        transform-origin: center;
        border-radius: 99999px;
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

export default {
    components: {
        Button,
    }
}
</script>