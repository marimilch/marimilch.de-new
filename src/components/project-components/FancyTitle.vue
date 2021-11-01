<template>
    <div class="fancy-title">
        <div class="sticky">
            <ClipBackground :src="'/clips/' + backgroundVideoSrc" class="clip-background"></ClipBackground>
        </div>

        <Appearing class="h-screen frame main" effect="letterplay">
            <h1 class="project-name"><slot name="title"></slot></h1>
            <Lerpy :scrollWithStrength=".3" :lerpSpeed="3.5">
                <p class="date">{{niceDate}}</p>
            </Lerpy>
        </Appearing>

        <div class="h-screen additional-text-wrap frame">
            <div class="additional-text">
                <Lerpy :scrollWithStrength=".4" :lerpSpeed="3"><hr></Lerpy>

                <Lerpy :scrollWithStrength=".25" :lerpSpeed="2.5">
                    <Appearing class="content" effect="fancyTitleBlockAppear">
                        <p><slot name="description"></slot></p>
                    </Appearing>
                </Lerpy>

                <Lerpy :scrollWithStrength=".1" :lerpSpeed="2"><hr></Lerpy>
            </div>  
        </div>
    </div>
</template>

<script>
import ClipBackground from '@/components/project-components/ClipBackground'
import Appearing from '@/components/effects/Appearing'
import Lerpy from '@/components/effects/Lerpy'

export default {
    mounted(){
        // console.log('project', this.project)
    },
    computed: {
        niceDate(){
            const dateStart = new Date(this.dateStart)
            const dateEnd = new Date(this.dateEnd)
            const dateStartStr = `${dateStart.getMonth() + 1}.${dateStart.getFullYear()}`
            const dateEndStr = `${dateEnd.getMonth() + 1}.${dateEnd.getFullYear()}`

            return dateStartStr + ' — ' + dateEndStr
        }
    },
    props: {
        backgroundVideoSrc: {
            required: true,
            type: String,
        },
        dateStart: {
            required: true,
            type: String,
        },
        dateEnd: {
            required: true,
            type: String,
        },
    },
    components: {
        ClipBackground,
        Appearing,
        Lerpy,
    }
}
</script>

<style lang="scss" scoped>
.main {
    flex-direction: column;
    justify-content: center;
}
.sticky {
    position: sticky;
    top: 0;
    z-index: -1;
}
.date {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 24px;
}
.h-screen {
    height: 100vh;
}
.frame {
    display: flex;
    width: 100%;
    max-width: 100%;
    align-content: center; 
    align-items: center; 
}
hr {
    border-top: var(--neutral) 2px solid;
}
.additional-text-wrap {
    display: flex;
    justify-content: flex-end;
    padding: 0 var(--content-padding-x);

    .additional-text {
        max-width: 800px;
    }

    p {
        font-family: Manrope, sans-serif;
        text-transform: uppercase;
        letter-spacing: 3px;
        
        padding: 50px 0;
        font-size: 32px;

        color: var(--neutral);
    }
}
h1 {
    // font-family: Manrope, sans-serif;
    // text-transform: uppercase;
    // letter-spacing: 10px;
    font-size: 140px;
    width: 100%;

    // color: var(--primary);
}
</style>