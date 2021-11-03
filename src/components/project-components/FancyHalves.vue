<template>
    <div class="block-halves" :data-flip="flip">
        <div class="media-side">
            <slot name="media"></slot>
        </div>
        <div class="desc-side">
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

    &[data-flip="true"]{
        flex-direction: row-reverse;
    }

    .media-side, 
    .desc-side {
        width: 50%;
        height: 100vh;

        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
    }

    .desc-side {
        padding: 100px 50px;
    }
}

@media (max-width: $tabletWidth) {
    .block-halves {
        flex-direction: column;
        
        .media-side, 
        .desc-side {
            width: 100%;
            max-width: 600px;
        }

        .desc-side {
            padding: 50px 25px;
            height: auto;
        }


        .media-side {
            height: 600px;
        }
    }
}
</style>