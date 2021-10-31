<template>
    <div class="fancy-paragraph">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.fancy-paragraph {
    p, h2, a {
        // color: var(--neutral);
    }

    p {
        padding-bottom: 50px;
        line-height: 1.8;
    }

    p:first-of-type, 
    h1 + p, 
    h2 + p {
        &::first-letter {
            // text-transform: uppercase;
            font-family: Comfortaa, sans-serif;
            font-size: 64px;
            font-weight: 900;
            padding: 19px 12px;
            margin: 7px 7px 0 0;
            float: left;
            background: var(--primary);
            color: var(--canvas);
            border-radius: 5px;
            line-height: .9;
            // animation: .125s TextGlowAnimaton cubic-bezier(.65,.05,.36,1) infinite alternate;
        }
    }
}
</style>