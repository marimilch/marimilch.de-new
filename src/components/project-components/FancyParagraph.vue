<template>
    <div class="fancy-paragraph">
        <div class="left-side">
            <h2>{{title}}</h2>
        </div>
        <div class="right-side">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>