<template>
    <router-link :to="to" :class="'button' + (alt ? ' alt' : '')" v-if="!external">
        <span :class="icon ? 'desktop-only' : ''"><slot></slot></span>
        <i class="mobile-only" v-if="icon" :data-feather="icon"></i>
    </router-link>
    <a :href="to" :class="'button' + (alt ? ' alt' : '')" v-else target="_blank">
        <span :class="icon ? 'desktop-only' : ''"><slot></slot></span>
        <i class="mobile-only" v-if="icon" :data-feather="icon"></i>
    </a>
</template>

<style lang="scss" scoped>
// separate on purpose (easier to read)
.button {
    --text:   var(--beige);
    --shade0: var(--pink);
    --shade1: var(--dark-pink);
    --shade2: var(--light-brown);
    --shade3: var(--brown);
    --shade4: var(--brown);

    @media (prefers-color-scheme: dark) {
        --text:   var(--beige);
        --shade0: var(--pink);
        --shade1: var(--magenta);
        --shade2: var(--med-magenta);
        --shade3: var(--dark-magenta);
        --shade4: var(--black-magenta);
    }
}

$buttonOuterSpread: 2px;
$buttonOuterBlur: 10px;

.button {
    display: inline-block;
    top: calc( -1 * var(--button-height) ); 
    position: relative;
    content: " ";
    text-decoration: none;
    border: none;
    padding: 15px 35px;
    margin: 10px 15px;
    border-radius: 9999px;
    font-size: 20px;
    text-transform: uppercase;
    transition: 
        background-color var(--timing) ease,
        box-shadow var(--timing) ease,
        color var(--timing) ease, 
        top var(--timing) ease
    ;
    cursor: pointer;
    color: var(--text);
    background: var(--shade2);
    box-shadow: 
        0 var(--button-height) 0 0 var(--shade3),
        0 calc( var(--button-height) * .5 ) 0 0 var(--shade3),
        0 var(--button-height) $buttonOuterBlur $buttonOuterSpread var(--shade3)
    ;
}
.button:hover, .router-link-exact-active.button {
    background: var(--shade1);
    box-shadow: 
        0 var(--button-height) 0 0 var(--shade2), 
        0 calc( var(--button-height) * .5 ) 0 0 var(--shade2),
        0 var(--button-height) $buttonOuterBlur $buttonOuterSpread var(--shade2)
    ;
}
.button:active, .button.pressed {
    background: var(--shade1);
    box-shadow: 
        0 0px 0 0 var(--shade3),
        0 3px 15px var(--shade1),
        0 0 0 0 var(--shade1)
    ;
    top: 0;
}

/* 
 * ensures the space above the
 * button is still active
 * when it's pushed down
 *
 */
.button:active::before, 
.button.pressed::before {
    content: ' ';
    width: 100%;
    height: var(--button-height);
    display: block;
    position: absolute;
    left: 0;
    top: calc( var(--button-height) * -1 );
}

// Alternative design
.button.alt {
    color: var(--blue);
    background: var(--beige);
    box-shadow: 
        0 var(--button-height) 0 0 var(--blue), 
        0 var(--button-height) var(--inset-shadow) var(--dark-pink)
}
.button.alt:hover {
    background: var(--beige);
    box-shadow: 
        0 var(--button-height) 0 var(--green),
        0 var(--button-height) var(--inset-shadow) var(--dark-pink),
        0 2px 15px var(--beige)
    ;
}
.button.alt:active, nav .button.pressed {
    background: var(--beige);
    box-shadow: 
        0 0 0 var(--dark-pink), 
        0 2px 15px var(--beige)
    ;
}
</style>

<script>
export default {
    name: 'Button',
    props: {
        external: {
            type: Boolean,
            default: false
        },
        alt: {
            type: Boolean,
            default: false
        },
        to: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: null
        },
    }
}
</script>