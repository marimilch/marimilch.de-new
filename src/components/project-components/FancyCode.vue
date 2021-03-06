<template>
    <FancyHalves :data-flip="flip" ref="toFancifyWrap">
        <template v-slot:media>
            <Lerpy 
                :scrollWithStrength=".3"
                :lerpSpeed="3.5"
            >
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
                                v-on:click="backAndForth()"
                                :style="`--button-height: ${buttonHeight}px;`"
                            >
                            </div>
                            <div 
                                class="window-button" 
                                v-on:click="hueRotate = (hueRotate + 45) % 360"
                                :style="`--button-height: ${buttonHeight}px;`"
                            >
                            </div>
                            <a 
                                class="title"
                                target="_blank"
                                :href="href"
                            >
                                {{ title }}
                                <i data-feather="external-link"></i>
                            </a>
                        </div>
                        <div class="code-content"><slot name="code"></slot></div>
                        <div class="bottom-bar bar"><strong>{{language}}</strong></div>
                    </div>
                    <div 
                        class="below" 
                        :style="`transform: scaleY( ${scaleYText} ); height: ${heightText}px; padding-top: ${paddingText}px;`"
                    >
                        <sup><em>virtuelle</em></sup><strong>macro</strong><span>:pro</span><sup>2003</sup><sub>SE</sub>
                    </div>
                </div>
            </Lerpy>
        </template>
        <template v-slot:description>
            <Lerpy>
                <Appearing effect="fancyParagraphAppear">
                    <FancyParagraph><slot name="comment"></slot></FancyParagraph>
                </Appearing>
            </Lerpy>
        </template>
    </FancyHalves>
</template>

<script>
import { distanceToCenter } from '@/assets/js/distance-to-center.js'
import hljs from 'highlight.js'
import Appearing from '@/components/effects/Appearing'
import Lerpy from '@/components/effects/Lerpy'
import FancyHalves from '@/components/project-components/FancyHalves'
import FancyParagraph from '@/components/project-components/FancyParagraph'
import FeatherIcons from 'feather-icons'
import 'highlight.js/styles/github-dark.css'

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
    href: {
      required: true,
      type: String
    },
    title: {
      default: '',
      type: String
    },
  },
  mounted(){
    this.$nextTick( function(){        
      FeatherIcons.replace()
      // Unfortunately, to keep the indentations, we have to do it this way
      const codeBlock = this.$refs.codeWindow.querySelector('code')
            
      codeBlock.classList.add(`language-${this.language}`)
      hljs.highlightAll()

      return
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
      this.back = !this.back

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
    }
  },
  components: {
    Appearing,
    Lerpy,
    FancyHalves,
    FancyParagraph
  },
}
</script>

<style lang="scss" scoped>
$windowPaddingX: 50px;
$windowPaddingY: 15px;
$windowButtonSize: 18px;
$fontSize: 18px;
$timing: 1s;

.title {
    color: var(--neutral);
    text-decoration: none;
    transition: border-bottom .1s linear;
    border-bottom: var(--neutral) 0 solid;

    .feather {
        transform: translateY(4px);
        margin-left: 5px;
    }

    &:hover, &:active {
        border-bottom: var(--neutral) 2px solid;
    }
}

::v-deep {
    @keyframes blink {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .left-side * {
        --primary: var(--magenta) !important; // main color
        --neutral: var(--cyan) !important; // text color
        --canvas: var(--dark-purple) !important; // background color
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
        // top: 0;
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

            &::before {
                content: ' ';
                display: block;
                height: var(--button-height);
                width: 100%;
                transform: translateY(-100%);
            }
        }

        color: transparent;
        &:hover, &:active {
            color: var(--style2-neutral);
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