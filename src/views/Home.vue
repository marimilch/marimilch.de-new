<template>
  <div class="home">
    <h2>Welcome!</h2>
    <h3>Nice to see you here :)</h3>
    <p class="center"><MilkGlass></MilkGlass></p>
    <p class="center">You can check out all my <br>projects on this website.</p>
    <p class="center">Please have a sip of milk, lol.</p>
  </div>
</template>

<script>
// @ is an alias to /src
import MilkGlass from '@/components/MilkGlass'

export default {
  name: 'Home',
  components: {
    MilkGlass
  }
}
</script>
