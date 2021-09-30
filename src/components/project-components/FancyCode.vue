<template>
    <div class="fancy-paragraph" :data-flip="flip" ref="toFancifyWrap">
        <div class="left-side">
            <div 
                class="code-window-wrap" 
                ref="codeWindowWrap" 
                :style="`
                    filter: hue-rotate(${hueRotate}deg);
                    min-height: ${minHeight}px;
                    transform: scaleY(${scaleY})
                `"
            >
                <div 
                    class="code-window" 
                    ref="codeWindow"
                >
                    <div class="top-bar bar">
                        <div 
                            class="window-button"
                            :style="`--button-height: ${buttonHeight}px;`"
                        ></div>
                        <div 
                            class="window-button"
                            v-on:click="backAndForth()"
                            :style="`--button-height: ${buttonHeight}px;`"
                        ></div>
                        <div 
                            class="window-button" 
                            v-on:click="hueRotate = (hueRotate + 45) % 360"
                            :style="`--button-height: ${buttonHeight}px;`"
                        ></div>
                        <span class="title">{{ title }}</span>
                    </div>
                    <div class="code-content"><slot name="code"></slot></div>
                    <div class="bottom-bar bar"><strong>{{language}}</strong></div>
                </div>
                <div 
                    class="below" 
                    :style="`transform: scaleY( ${scaleYText} ); height: ${heightText}px; padding-top: ${paddingText}px;`"
                >
                    <sup><em>virtuelle</em></sup><strong>macro</strong><span>:pro</span><sup>1999</sup><sub>SE</sub>
                </div>
            </div>
        </div>
        <div class="right-side">
            <slot name="comment"></slot>
        </div>
    </div>
</template>

<script>
import { distanceToCenter } from '@/assets/js/distance-to-center.js'
import hljs from 'highlight.js'
import { prefersDark } from '@/assets/js/prefers-dark.js'

if ( prefersDark() ){
    import('highlight.js/styles/github-dark.css')
    
} else {
    import('highlight.js/styles/github.css')
}

export default {
    data() {
        return {
            hueRotate: 0,
            scaleY: 1,
            scaleYText: .5,
            heightText: 30,
            paddingText: 0,
            minHeight: 382,
            buttonHeight: 3,
            back: false,
        }
    },
    props: {
        flip: {
            default: false,
            type: Boolean,
        },
        rotateY: {
            default: .125,
            type: Number
        },
        effectStrength: {
            default: -.05,
            type: Number
        },
        language: {
            default: 'javascript',
            type: String
        },
        title: {
            default: '',
            type: String
        },
    },
    mounted(){
        this.$nextTick( function(){
            // Unfortunately, to keep the indentations, we have to do it this way
            const codeBlock = this.$refs.codeWindow.querySelector('code')
            
            codeBlock.classList.add(`language-${this.language}`)
            hljs.highlightAll()

            return
            this.$refs.toFancify.style.transform = 
                `rotateY(${this.rotateY}turn)`

            this.renderCascade()
        })
    },
    methods: {
        renderCascade(){
            const dtc = distanceToCenter(this.$refs.toFancifyWrap)
            // console.log('dtc', `-${dtc.top}px -${dtc.left}px`)
            // rotateY(${this.rotateY}turn)
            this.$refs.toFancifyWrap.style.perspectiveOrigin = 
                `${-Math.round(dtc.left)}px ${-Math.round(dtc.top)}px`

            window.requestAnimationFrame(this.renderCascade.bind(this))
        },
        backAndForth(){
            if (this.back){
                this.scaleY = .5
                this.scaleYText = 2
                this.heightText = 77
                this.paddingText = 22
                this.minHeight = 482
                this.buttonHeight = 8
            } else {
                this.scaleY = 1
                this.scaleYText = .5
                this.heightText = 30
                this.paddingText = 0
                this.minHeight = 382
                this.buttonHeight = 3
            }

            this.back = !this.back
        }
    }
}
</script>

<style lang="scss" scoped>
$windowPaddingX: 50px;
$windowPaddingY: 15px;
$windowButtonSize: 15px;
$fontSize: 18px;
$timing: 1s;

::v-deep {
    @keyframes blink {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .left-side * {
        // default colors
        --primary: var(--dark-pink) !important; // main color
        --neutral: var(--brown) !important; // text color
        --canvas: var(--beige) !important; // background color

        @media (prefers-color-scheme: dark) {
            --primary: var(--magenta) !important; // main color
            --neutral: var(--cyan) !important; // text color
            --canvas: var(--dark-purple) !important; // background color
        }
    }

    pre {
        margin: 0;
    }

    code {
        line-height: 1.6;
    }

    code::after {
        content: ' ';
        display: inline-block;
        background: var(--neutral);
        height: 24px;

        animation: 1s ease-in-out 0s infinite alternate blink;
    }

    .below {
        transition: 
            transform $timing ease,
            height $timing ease,
            padding-top $timing ease,
        ;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        color: var(--canvas);

        sub, span {
            color: var(--primary);
        }
    }

    .window-button {
        // --button-height: 3px;
        display: inline-block;
        width: $windowButtonSize;
        height: $windowButtonSize;
        background: var(--primary);
        border-radius: 9999px;
        margin-right: 10px;
        box-shadow: 
            var(--neutral) 0 calc( .5 * var(--button-height) ) 0 0,
            var(--neutral) 0 var(--button-height) 0 0;
        position: relative;
        top: 0;
        cursor: pointer;
        transition: 
            top $timing ease,
            box-shadow $timing ease,
            transform var(--timing) ease,
        ;

        &:last-of-type {
            margin-right: 25px;
        }

        &:active {
            transform: translateY( var(--button-height) );
            box-shadow: 
                var(--neutral) 0 0px 0 0,
                var(--neutral) 0 0px 0 0
            ;
        }
    }

    .bar {
        padding-left: $windowPaddingX;
        padding-right: $windowPaddingX;
        font-size: $fontSize;
    }

    .bottom-bar {
        padding-bottom: $windowPaddingY;
        position: absolute;
        bottom: 0;
        font-size: 12px;
    }

    .top-bar {
        padding-top: $windowPaddingY;
        margin-bottom: 15px;
    }

    .code-window-wrap {
        background: var(--neutral);
        padding: 2px 2px 30px 2px;
        border-radius: 50px;
        transition: 
            filter .5s ease,
            transform $timing ease,
            min-height $timing ease
        ;

        .code-window {
            min-height: 350px;
            background: var(--canvas);
            border-radius: 48px;
            position: relative;
            transform-origin: 50% 18px;
        }
    }

    .left-side {
        padding-left: var(--content-padding-x);
        padding-right: var(--content-padding-x);
    }

    .code-content {
        font-size: $fontSize;
        padding-left: $windowPaddingX;
        padding-right: $windowPaddingX;
    }

    .hljs {
        background: transparent;
    }

    [data-flip="true"]{
        flex-direction: row-reverse;
    }
}
</style>