<template>
    <div class="fancy-paragraph">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.fancy-paragraph {
    p, h2, a {
        color: var(--neutral);
    }

    p {
        padding-bottom: 50px;
        line-height: 1.8;
    }

    p:first-of-type, 
    h1 + p, 
    h2 + p {
        &::first-letter {
            text-transform: uppercase;
            font-family: Pacifico, cursive;
            font-size: 64px;
            padding: 19px 24px 19px 10px;
            margin-right: 7px;
            float: left;
            background: var(--primary);
            color: var(--canvas);
            border-radius: 5px;
            line-height: .9;
        }
    }
}
</style>