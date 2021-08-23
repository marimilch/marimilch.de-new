<template>
    <div>
        <h2 class="mb-5">About Me</h2>
        <p class="center">I'm a graduate in computer science and I really enjoy programming, its intersection with creativity, making music and art.</p>
        <p class="center"><span class="cursive">marimilch</span> is a reference to the german version of the book <em>A Shadow Like A Leopard</em> by Myron Levoy.</p>

        <p class="center project-links mb-5">
            <Button to="//instagram.com/marimilch93">Instagram</Button>
            <!-- <button href="//twitter.com/marimilch93">Twitter</button> -->
            <Button to="//github.com/marimilch" :external="true">GitHub</Button>
            <!-- <Button to="//www.linkedin.com/in/marimilch" :external="true">LinkedIn</Button> -->
            <!-- <button href="//dank-games.com">Dank-Games</button> -->
        </p>
        <h3>I would like to thank</h3>
        <ul class="no-indicators center">
            <li>My mom for always booking my shows. You're my favorite fan!</li>
            <li>My dad for liking my music!</li>
            <li>Arkady for inspiring me to pursue my artistic dream! Thanks brother &lt;3 </li>
            <li>Felix for beating one of my games!</li>
            <li>Renyo for complimenting my games!</li>
            <li>Marko for trying my games!</li>
            <li>Batiste for giving me honest feedback and having the patience to play through everything I have made!</li>
            <li>Cedric for listening to my songs and covering them!</li>
            <li>Sev for listening to my songs and telling me to keep it up!</li>
            <li>Yamina, because of you I started all of this in the first place!</li>
        </ul>
    </div>
</template>

<script>
import Button from '@/components/Button'

export default {
    components: {
        Button
    }
}
</script>