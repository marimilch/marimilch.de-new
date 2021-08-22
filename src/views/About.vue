<template>
    <div>
        <h2 class="mb-5">About</h2>
        <p class="center project-links mb-5">
            <!-- <button href="//instagram.com/marimilch93">Instagram</button> -->
            <!-- <button href="//twitter.com/marimilch93">Twitter</button> -->
            <Button to="//github.com/marimilch" :external="true">GitHub</Button>
            <Button to="//www.linkedin.com/in/marimilch" :external="true">LinkedIn</Button>
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