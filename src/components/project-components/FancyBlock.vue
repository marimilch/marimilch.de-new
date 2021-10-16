<template>
    <div class="fancy-block">
        <slot></slot>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.fancy-block {
    position: relative;
    z-index: 5;

    background: var(--canvas);
    position: relative;
    min-height: 100vh;
    font-size: 28px;

    &:nth-of-type(2n-1){
        &, & * {
            --primary: var(--style2-primary); // main color
            --neutral: var(--style2-neutral); // text color
            --canvas: var(--style2-canvas); // background color
        } 
    }
}
</style>