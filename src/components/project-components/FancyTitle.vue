<template>
    <div class="fancy-title">
        <div class="sticky">
            <ClipBackground :src="`/clips/${project.slug}/fancy`" class="clip-background"></ClipBackground>
        </div>

        <Appearing class="frame main" effect="letterplay">
            <h1 class="project-name"><slot name="title"></slot></h1>
            <p class="date">{{niceDate}}</p>
        </Appearing>

        <div class="frame additional-text">
            <Appearing class="content" effect="fancyTitleBlockAppear">
                <p><slot name="description"></slot></p>
            </Appearing>
        </div>
    </div>
</template>

<script>
import ClipBackground from '@/components/project-components/ClipBackground'
import Appearing from '@/components/effects/Appearing'

export default {
    mounted(){
        // console.log('project', this.project)
    },
    computed: {
        niceDate(){
            const dateStart = new Date(this.project.dateStart)
            const dateEnd = new Date(this.project.dateEnd)
            const dateStartStr = `${dateStart.getMonth() + 1}.${dateStart.getFullYear()}`
            const dateEndStr = `${dateEnd.getMonth() + 1}.${dateEnd.getFullYear()}`

            return dateStartStr + ' — ' + dateEndStr
        }
    },
    props: {
        project: {
            required: true
        },
    },
    components: {
        ClipBackground,
        Appearing
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
.frame {
    display: flex;
    width: 100%;
    max-width: 100%;
    height: 100vh;
    align-content: center; 
    align-items: center; 
}
.additional-text {
    justify-content: flex-end;
    padding: 0 var(--content-padding-x);

    p {
        max-width: 800px;
        font-family: Manrope, sans-serif;
        text-transform: uppercase;
        letter-spacing: 3px;
        border-top: var(--neutral) 2px solid;
        border-bottom: var(--neutral) 2px solid;
        
        padding: 50px 0;
        font-size: 32px;

        color: var(--neutral);
    }
}
h1 {
    font-family: Manrope, sans-serif;
    text-transform: uppercase;
    letter-spacing: 10px;
    font-size: 180px;
    width: 100%;

    color: var(--primary);
}
</style>