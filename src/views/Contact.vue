<template>
    <div class="default-padding fade-wrap">
        <p class="center project-links">
            <!-- <button href="//instagram.com/marimilch93">Instagram</button> -->
            <!-- <button href="//twitter.com/marimilch93">Twitter</button> -->
            <Button to="//github.com/marimilch" :external="true">GitHub</Button>
            <Button to="//www.linkedin.com/in/marimilch" :external="true">LinkedIn</Button>
            <!-- <button href="//dank-games.com">Dank-Games</button> -->
        </p>
        <p class="center">
            <object class="star-box"></object>
        </p>
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