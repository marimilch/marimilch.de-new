<template>
    <div :class="'fancy-block' + (centerDown ? ' center-down' : '')">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    centerDown: {
      default: false,
      type: Boolean,
    }
  }
}
</script>

<style>
/* .fancy-block .block-halves:nth-of-type(2n-1) {
    flex-direction: row-reverse;
} */
</style>

<style lang="scss" scoped>
.center-down {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: column;
}

.fancy-block {
    position: relative;

    background: var(--canvas);
    position: relative;
    min-height: 100vh;
    font-size: 28px;

    counter-increment: fancy-block-counter -1;
    z-index: counter(fancy-block-counter);

    &:nth-of-type(2n-1){
        &, & * {
            --primary: var(--style2-primary); // main color
            --neutral: var(--style2-neutral); // text color
            --canvas: var(--style2-canvas); // background color
            color: var(--neutral);
        }
    }

    @media (max-width: $phoneWidth){
        font-size: 24px;
    }
}
</style>