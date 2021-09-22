<template>
  <div class="home default-padding fade-wrap">
    <h2 class="huge">Welcome!</h2>
    <h3 class="nice-to-see-you">Nice to see you here :)</h3>
  </div>
</template>

<style scoped>
  .home {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .nice-to-see-you {
    font-family: Manrope, sans-serif;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: center;
  }
  .huge {
    font-size: 160px;
  }
</style>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>
