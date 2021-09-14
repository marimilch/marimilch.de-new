<template>
  <div class="home">
    <h2 class="huge">Welcome!</h2>
    <h3 class="">Nice to see you here :)</h3>
  </div>
</template>

<style scoped>
  .home {
    width: 100%;
    height: var(--content-min-height);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
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
