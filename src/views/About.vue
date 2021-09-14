<template>
    <div class="about">
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

        <div class="background-zoom"></div>
    </div>
</template>

<style lang="scss" scoped>
    .wrap {
        display: flex;
    }
    .cursive, p, span, h2, h3 {
        color: var(--canvas);
    }
    .background-zoom {
        position: absolute;
        background: var(--dark-pink);
        width: calc( 1 * max( 100vw, 100vh ) );
        height: calc( 1 * max( 100vw, 100vh ) );
        top: -100%;
        left: -200%;
        transform: scale(2);
        z-index: -1;
        border-radius: 99999px;
    }
    .about {
        width: 50%;

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