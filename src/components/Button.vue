<template>
    <!-- <router-link :to="to" :class="'button' + (alt ? ' alt' : '')" v-if="!external">
        <i v-if="icon" :data-feather="icon"></i>
        <span><slot></slot></span>
        <i class="external-link-icon" v-if="external" data-feather="external-link"></i>
    </router-link> -->

    <router-link 
        :to="to" 
        v-if="!external" 
        custom 
        v-slot="{ navigate, href, isActive }"
    >
        <i v-if="icon" :data-feather="icon"></i>
        <a 
            :href="href" 
            @click.prevent="async ()=>{
                await beforeTrigger(), 
                await navigate(), 
                await afterTrigger()
            }" 
            :class="'button' + (alt ? ' alt' : '') + (isActive ? ' router-link-active' : '')"
        >
            <span><slot></slot></span>
        </a>
        <i class="external-link-icon" v-if="external" data-feather="external-link"></i>
    </router-link>

    <a :href="to" :class="'button' + (alt ? ' alt' : '')" v-else target="_blank">
        <i v-if="icon" :data-feather="icon"></i>
        <span><slot></slot></span>
        <i class="external-link-icon" v-if="external" data-feather="external-link"></i>
    </a>
</template>

<style lang="scss" scoped>
// separate on purpose (easier to read)
.button {
    white-space: nowrap;
    --text:   var(--beige);
    --main:   var(--med-magenta);
    --side:   var(--dark-magenta);

    --main-hover:   var(--magenta);
    --side-hover:   var(--med-magenta);
}

.button.alt {
    --text:   var(--beige);
    --main:   var(--med-magenta);
    --side:   var(--dark-magenta);

    --main-hover:   var(--magenta);
    --side-hover:   var(--med-magenta);
}

$buttonOuterSpread: 2px;
$buttonOuterBlur: 10px;

.external-link-icon {
    margin-left: 5px;
    position: relative;
    top: 2px;
    height: 19px;
}

.button {
    --button-speed: .1s;
    display: inline-block;
    top: calc( -1 * var(--button-height) ); 
    position: relative;
    content: " ";
    text-decoration: none;
    border: none;
    padding: 15px 35px;
    border-radius: 9999px;
    font-size: 20px;
    text-transform: uppercase;
    transition: 
        background-color var(--button-speed) ease,
        box-shadow var(--button-speed) ease,
        color var(--button-speed) ease, 
        top var(--button-speed) ease
    ;
    cursor: pointer;
    color: var(--text);
    background: var(--main);
    box-shadow: 
        0 var(--button-height) 0 0 var(--side),
        0 calc( var(--button-height) * .5 ) 0 0 var(--side),
        0 var(--button-height) $buttonOuterBlur $buttonOuterSpread var(--side)
    ;
}
.button:hover, .router-link-exact-active.button {
    background: var(--main-hover);
    box-shadow: 
        0 var(--button-height) 0 0 var(--side-hover), 
        0 calc( var(--button-height) * .5 ) 0 0 var(--side-hover),
        0 var(--button-height) $buttonOuterBlur $buttonOuterSpread var(--side-hover)
    ;
}
.button:active, .button.pressed {
    background: var(--main-hover);
    box-shadow: 
        0 0px 0 0 var(--side),
        0 3px 15px var(--main-hover),
        0 0 0 0 var(--main-hover)
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
// .button.alt {
//     color: var(--blue);
//     background: var(--beige);
//     box-shadow: 
//         0 var(--button-height) 0 0 var(--blue), 
//         0 var(--button-height) var(--inset-shadow) var(--dark-pink)
// }
// .button.alt:hover {
//     background: var(--beige);
//     box-shadow: 
//         0 var(--button-height) 0 var(--green),
//         0 var(--button-height) var(--inset-shadow) var(--dark-pink),
//         0 2px 15px var(--beige)
//     ;
// }
// .button.alt:active, nav .button.pressed {
//     background: var(--beige);
//     box-shadow: 
//         0 0 0 var(--dark-pink), 
//         0 2px 15px var(--beige)
//     ;
// }
</style>

<script>
import FeatherIcons from 'feather-icons'

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
    beforeTrigger: {
      type: Function,
      default: () => {},
    },
    afterTrigger: {
      type: Function,
      default: () => {},
    },
  },
  mounted(){
    FeatherIcons.replace()
  }
}
</script>