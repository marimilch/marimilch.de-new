<template>
  <div class="home-wrap">
    <div class="home">
        <h2 class="huge">Welcome!</h2>
        <p class="nice-to-see-you">Nice to see you here :)</p>
      </div>
  </div>
</template>

<style lang="scss" scoped>
  .home-wrap {
    display: flex;
    justify-content: flex-end;
  }
  .home {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    padding: 15px var(--content-padding-x);
  }
  .nice-to-see-you {
  //   font-family: Manrope, sans-serif;
  //   font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 3px;
  //   text-shadow: none;
  //   color: var(--primary);
  //   animation: none;
  //   font-weight: normal;
  }
  .huge {
    font-size: 100px;
  }
</style>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>
