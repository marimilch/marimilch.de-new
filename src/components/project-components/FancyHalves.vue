<template>
    <div class="block-halves" :data-flip="flip">
        <div class="left-side" data-sticky="true">
            <slot name="media"></slot>
        </div>
        <div class="right-side">
            <slot name="description"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            flip: false,
            // sticky: false,
        }
    }
}
</script>

<style lang="scss" scoped>
.block-halves {
    display: flex;
    align-items: center;
    align-content: center;
    min-height: 100vh;

    &[data-flip="true"]{
        flex-direction: row-reverse;
    }

    .left-side, 
    .right-side {
        width: 50%;
        padding-top: 100px;
        padding-bottom: 100px;
        min-height: 100vh;

        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
    }

    .left-side[data-sticky="true"]{
        position: sticky;
        top: 0;
        padding: 0;
        height: 100vh;
        cursor: pointer;
    }


}
</style>