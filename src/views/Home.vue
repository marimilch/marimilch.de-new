<template>
  <div class="home">
    <h2>Welcome!</h2>
    <p class="center">Nice to see you here :)</p>
    <p class="center">Have a sip of milk, lol</p>
    <p class="center"><MilkGlass></MilkGlass></p>
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
