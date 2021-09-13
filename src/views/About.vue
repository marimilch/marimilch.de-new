<template>
    <div>
        <h2 class="mb-5">About Me</h2>
        <p class="center">I'm a graduate in computer science and I really enjoy programming and anything involving creativity.</p>
        <p class="center"><span class="cursive">marimilch</span> is a reference to the german version of the book <em>A Shadow Like A Leopard</em> by Myron Levoy.</p>

        <p class="center project-links mb-5">
            <Button to="//instagram.com/marimilch93" :external="true">Instagram</Button>
            <!-- <button href="//twitter.com/marimilch93">Twitter</button> -->
            <Button to="//github.com/marimilch" :external="true">GitHub</Button>
            <!-- <Button to="//www.linkedin.com/in/marimilch" :external="true">LinkedIn</Button> -->
            <!-- <button href="//dank-games.com">Dank-Games</button> -->
        </p>
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
</template>

<style scoped>
    span {
        display: inline-block;
        margin-right: 7px;
    }
</style>

<script>
import Button from '@/components/Button'

export default {
    components: {
        Button
    }
}
</script>