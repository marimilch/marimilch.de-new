<template>
    <div class="fancy-paragraph">
        <div class="left-side">
            <slot name="side1"></slot>
        </div>
        <div class="right-side">
            <slot name="side2"></slot>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .fancy-paragraph {
        display: flex;
        align-items: center;
        align-content: center;
        min-height: 100vh;
    }
</style>